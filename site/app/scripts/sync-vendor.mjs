// Sync the vendored Gwern frontend (../../vendor/gwern) into public/static so it
// serves at the absolute /static/... paths the bundles expect. public/static is
// gitignored: it is a build artifact, regenerated from the vendored source of
// truth. Maps the GENERATED bundles to the runtime filenames the layout loads.
import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const VENDOR = resolve(here, '../../vendor/gwern');
const OUT = resolve(here, '../public/static');

async function copyFile(from, to) {
  await mkdir(dirname(to), { recursive: true });
  await cp(from, to);
}

async function main() {
  if (!existsSync(VENDOR)) throw new Error(`vendor not found: ${VENDOR}`);
  await rm(OUT, { recursive: true, force: true });

  // JS bundles: head.js (sync bootstrap) + script.js (main runtime).
  await copyFile(`${VENDOR}/js/head-GENERATED.js`, `${OUT}/js/head.js`);
  await copyFile(`${VENDOR}/js/script-GENERATED.js`, `${OUT}/js/script.js`);

  // CSS bundles: head.css + style.css (self-contained; style.css carries fonts).
  await copyFile(`${VENDOR}/css/head-GENERATED.css`, `${OUT}/css/head.css`);
  await copyFile(`${VENDOR}/css/style-GENERATED.css`, `${OUT}/css/style.css`);

  // The required inline color vars, extracted from inlined-standalone.html into a
  // linked stylesheet loaded before head.css/style.css.
  const standalone = await readFile(`${VENDOR}/include/inlined-standalone.html`, 'utf8');
  const m = standalone.match(/<style id="inlined-styles-colors">([\s\S]*?)<\/style>/);
  if (!m) throw new Error('could not extract inlined-styles-colors block');
  await mkdir(`${OUT}/css`, { recursive: true });
  await writeFile(`${OUT}/css/colors.css`, m[1].trim(), 'utf8');

  // Fonts (otf/ttf; ?v= query is ignored by the server). font/dropcap was not
  // vendored — those @font-face rules 404 harmlessly (image-dropcaps only).
  await cp(`${VENDOR}/font`, `${OUT}/font`, { recursive: true });

  // Link-icon sprite.
  await copyFile(`${VENDOR}/img/icon/icons.svg`, `${OUT}/img/icon/icons.svg`);

  console.log('[sync-vendor] wrote', OUT);
}

main().catch((e) => {
  console.error('[sync-vendor]', e.message);
  process.exit(1);
});
