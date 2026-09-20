// One-off image optimization pass. Run manually:
//   node scripts/optimize-images.mjs
// Not wired into `npm run build` — this rewrites files in `public/` in place.
//
// Two passes:
// 1. Recompress every existing .webp under public/renders and public/work in place
//    (same filename, zero reference risk) — only overwrites if the result is smaller.
// 2. Convert the oversized cover PNGs to .webp (renamed) at a capped width. Callers must
//    update every reference to these filenames themselves (see PLAN item 1) — this script
//    only touches public/, not source files.

import sharp from 'sharp'
import { readdir, stat, unlink, readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname, join, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = resolve(root, 'public')

function fmt(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else files.push(full)
  }
  return files
}

async function recompressWebp(file) {
  // Read fully into memory via plain fs (closes its handle immediately), so
  // libvips/sharp never has the source path open when we write back to it —
  // opening the same path for read then write in quick succession is what
  // was unreliable on Windows (Defender/indexer holds a transient handle).
  const input = await readFile(file)
  const before = input.length
  const output = await sharp(input).webp({ quality: 79, effort: 6 }).toBuffer()
  if (output.length < before) {
    await writeFile(file, output)
    return { before, after: output.length }
  }
  return { before, after: before }
}

async function convertPngToWebp(file, { widthCap, quality = 82 } = {}) {
  const before = (await stat(file)).size
  const out = join(dirname(file), `${basename(file, extname(file))}.webp`)
  await sharp(file)
    .resize({ width: widthCap, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out)
  const after = (await stat(out)).size
  await unlink(file)
  return { before, after, out }
}

async function main() {
  console.log('--- Pass 1: recompress existing .webp in place ---')
  let totalBefore = 0
  let totalAfter = 0
  const failed = []
  for (const sub of ['renders', 'work']) {
    const dir = join(publicDir, sub)
    let files
    try {
      files = (await walk(dir)).filter((f) => extname(f).toLowerCase() === '.webp')
    } catch {
      continue
    }
    for (const file of files) {
      try {
        const { before, after } = await recompressWebp(file)
        totalBefore += before
        totalAfter += after
        if (after < before) {
          console.log(`  ${file.replace(publicDir, 'public')}: ${fmt(before)} -> ${fmt(after)}`)
        }
      } catch (err) {
        // Windows Defender/indexer occasionally holds a transient lock on a
        // just-written file. Skip and report — safe to re-run the script,
        // recompressing an already-recompressed file is a harmless no-op.
        failed.push(file)
        console.warn(`  SKIPPED (locked?) ${file.replace(publicDir, 'public')}: ${err.message}`)
      }
    }
  }
  console.log(`Pass 1 total: ${fmt(totalBefore)} -> ${fmt(totalAfter)}`)
  if (failed.length) console.log(`Pass 1: ${failed.length} file(s) skipped — re-run the script to retry them.`)

  console.log('\n--- Pass 2: convert oversized cover PNGs to .webp ---')
  const targets = [
    { file: join(publicDir, 'work-cover-armor-custom.png'), widthCap: 1600 },
    { file: join(publicDir, 'work-cover-renderfolio-custom.png'), widthCap: 1600 },
    { file: join(publicDir, 'work-cover-ice-tray-custom.png'), widthCap: 1600 },
  ]
  for (const { file, widthCap } of targets) {
    try {
      const { before, after, out } = await convertPngToWebp(file, { widthCap })
      console.log(`  ${file.replace(publicDir, 'public')} -> ${out.replace(publicDir, 'public')}: ${fmt(before)} -> ${fmt(after)}`)
    } catch (err) {
      console.warn(`  skipped ${file}: ${err.message}`)
    }
  }

  console.log('\nDone. Update src/data/workSamples.ts, scripts/prerender.mjs, and src/components/Seo.tsx')
  console.log('to reference the new .webp filenames for armor / renderfolio / ice-tray.')
}

main()
