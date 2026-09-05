// Rasterize a brand-native SVG composition for social platforms that need PNG.
import fs from "node:fs/promises";
import sharp from "sharp";

const logo = await fs.readFile(
  new URL("../src/assets/logo.svg", import.meta.url),
  "utf8",
);
const output = new URL("../public/social/", import.meta.url);
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
  const lines = rtl
    ? ["مكتب هندسي في الرياض", "تصميم معماري · إشراف هندسي · تصميم داخلي"]
    : [
        "Engineering office in Riyadh",
        "Architecture · Supervision · Interior design",
      ];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#1e1f28"/>
    <path d="M920 630V280a170 170 0 0 1 340 0v350M960 630V280a130 130 0 0 1 260 0v350" fill="none" stroke="#854b28" stroke-width="3"/>
    <g transform="translate(64 64) scale(1.1)">${paths}</g>
    <rect x="64" y="255" width="80" height="5" fill="#b9794f"/>
    <text x="600" y="360" text-anchor="middle" direction="${rtl ? "rtl" : "ltr"}" font-family="Arial, sans-serif" font-size="54" fill="#f9faf9">${lines[0]}</text>
    <text x="600" y="432" text-anchor="middle" direction="${rtl ? "rtl" : "ltr"}" font-family="Arial, sans-serif" font-size="30" fill="#d8d8d1">${lines[1]}</text>
    <text x="64" y="566" font-family="Arial, sans-serif" font-size="26" fill="#d8d8d1">arches.sa</text>
  </svg>`;
  await sharp(Buffer.from(svg))
    .png()
    .toFile(new URL(`${locale}.png`, output).pathname);
}
console.log(
  "Generated Arabic and English social previews (1200 × 630) and public logo.",
);
