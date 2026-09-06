// Rasterize a brand-native SVG composition for social platforms that need PNG.
import fs from "node:fs/promises";
import sharp from "sharp";

const logo = await fs.readFile(
  new URL("../src/assets/logo.svg", import.meta.url),
  "utf8",
);
const output = new URL("../public/social/", import.meta.url);
const shareBackground = new URL(
  "../public/social/share-background.png",
  import.meta.url,
);
await fs.mkdir(output, { recursive: true });
await fs.writeFile(
  new URL("../public/logo.svg", import.meta.url),
  logo.replaceAll("currentColor", "#1e1f28"),
);
const paths = logo
  .replace(/<svg[^>]*>/, "")
  .replace("</svg>", "")
  .replaceAll("currentColor", "#d8d8d1");

for (const locale of ["ar", "en"]) {
  const rtl = locale === "ar";
  const textAnchor = rtl ? "end" : "start";
  const textX = rtl ? 680 : 72;
  const lines = rtl
    ? ["مكتب هندسي في الرياض", "تصميم معماري · إشراف هندسي · تصميم داخلي"]
    : [
        "Engineering office in Riyadh",
        "Architecture · Supervision · Interior design",
      ];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="copy-backdrop" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stop-color="#17191f" stop-opacity="0.9"/>
        <stop offset="0.58" stop-color="#17191f" stop-opacity="0.72"/>
        <stop offset="1" stop-color="#17191f" stop-opacity="0.04"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#copy-backdrop)"/>
    <g transform="translate(72 62) scale(0.98)">${paths}</g>
    <rect x="72" y="300" width="62" height="4" fill="#b9794f"/>
    <text x="${textX}" y="390" text-anchor="${textAnchor}" direction="${rtl ? "rtl" : "ltr"}" font-family="Arial, sans-serif" font-size="48" font-weight="600" fill="#f9faf9">${lines[0]}</text>
    <text x="${textX}" y="448" text-anchor="${textAnchor}" direction="${rtl ? "rtl" : "ltr"}" font-family="Arial, sans-serif" font-size="25" fill="#e0ddd5">${lines[1]}</text>
    <text x="72" y="566" font-family="Arial, sans-serif" font-size="22" letter-spacing="1.5" fill="#e0ddd5">ARCHES.SA</text>
  </svg>`;
  await sharp(shareBackground.pathname)
    .resize(1200, 630, { fit: "cover" })
    .composite([{ input: Buffer.from(svg) }])
    .png()
    .toFile(new URL(`${locale}.png`, output).pathname);
}
console.log(
  "Generated Arabic and English social previews (1200 × 630) and public logo.",
);
