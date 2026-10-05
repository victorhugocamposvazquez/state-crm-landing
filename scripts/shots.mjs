import { chromium } from "playwright";
import fs from "node:fs";

const out = process.env.OUT || "shots";
fs.mkdirSync(out, { recursive: true });

const url = process.env.URL || "http://localhost:3123/";
const mobile = process.argv.includes("--mobile");
const vw = mobile ? 390 : 1440;
const vh = mobile ? 844 : 900;
const tag = mobile ? "m" : "d";

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const total = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
console.log("scrollable px:", total);

// Posiciones: fracciones del scroll total
const stops = process.env.STOPS ? process.env.STOPS.split(",").map(Number) : [0, 0.04, 0.09, 0.14, 0.19, 0.24, 0.3, 0.36, 0.42, 0.48, 0.54, 0.6, 0.66, 0.72, 0.78, 0.84, 0.9, 0.96, 1];
for (const f of stops) {
  const y = Math.round(total * f);
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/${tag}-${String(Math.round(f * 100)).padStart(3, "0")}.png` });
}
console.log("errors:", errors.length ? errors.join("\n") : "none");
await browser.close();
