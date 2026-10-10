import { chromium } from "../.preview/node_modules/playwright/index.mjs";
import assert from "node:assert/strict";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
const assetErrors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => {
  if (response.status() >= 400 && !response.url().includes("/missing-page/"))
    assetErrors.push(`${response.status()} ${response.url()}`);
});
const routes = [
  "/",
  "/projects/",
  "/projects/airptcoach/",
  "/projects/al2beat/",
  "/projects/sumo-research/",
  "/about/",
  "/experience/",
  "/contact/",
];
const layouts = [];
try {
  for (const width of [375, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(`http://127.0.0.1:4173${route}`);
      assert.equal(response.status(), 200, route);
      await page.locator("h1").waitFor();
      assert.equal(await page.locator("h1").count(), 1, `One h1: ${route}`);
      const size = await page.evaluate(() => ({
        viewport: window.innerWidth,
        content: document.documentElement.scrollWidth,
      }));
      assert.ok(
        size.content <= size.viewport,
        `Horizontal overflow at ${width}px ${route}: ${size.content}`,
      );
      assert.equal(
        await page.locator('a[href$="resume.pdf"]').count(),
        0,
        "Absent PDF link must be hidden",
      );
      const title = await page.title();
      assert.ok(title.includes("이현준"), `Page SEO title: ${route}`);
      layouts.push({ width, route, overflow: false });
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:4173/projects/");
  for (const [category, count, name] of [
    ["Android", 1, "AIRPTCoach"],
    ["AI-ML", 1, "AIRPTCoach"],
    ["Full-Stack", 1, "Al2Beat"],
    ["Research", 1, "SUMO Research"],
    ["All", 3, "AIRPTCoach"],
  ]) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await page.waitForFunction(
      (expected) =>
        document.querySelectorAll(".project-card").length === expected,
      count,
    );
    assert.equal(await page.locator(".project-card").count(), count);
    assert.ok(
      (await page.locator(".project-card").allTextContents())
        .join(" ")
        .includes(name),
    );
  }
  for (const slug of ["airptcoach", "al2beat", "sumo-research"]) {
    const response = await page.goto(`http://127.0.0.1:4173/projects/${slug}`);
    assert.equal(response.status(), 200);
    assert.ok(page.url().endsWith("/"));
    assert.equal((await page.reload()).status(), 200);
  }
  await page.goto("http://127.0.0.1:4173/");
  await page.screenshot({ path: ".preview/desktop-top.png" });
  await page.screenshot({ path: ".preview/desktop-home.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: ".preview/mobile-top.png" });
  await page.screenshot({ path: ".preview/mobile-home.png", fullPage: true });
  await page.getByRole("button", { name: "메뉴 열기" }).click();
  await page.getByRole("navigation", { name: "모바일 메뉴" }).waitFor();
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByRole("button", { name: "메뉴 열기" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.getByRole("button", { name: "메뉴 열기" }).click();
  await page
    .getByRole("navigation", { name: "모바일 메뉴" })
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await page.waitForURL("**/projects/");
  assert.equal(
    await page.getByRole("navigation", { name: "모바일 메뉴" }).count(),
    0,
  );
  await page.screenshot({
    path: ".preview/mobile-projects.png",
    fullPage: true,
  });
  const contact = await page.goto("http://127.0.0.1:4173/contact/");
  assert.equal(contact.status(), 200);
  assert.equal(
    await page
      .getByRole("link", { name: "이메일 보내기" })
      .getAttribute("href"),
    "mailto:hyunjoon1258@gmail.com",
  );
  const links = await page
    .locator('a[target="_blank"]')
    .evaluateAll((elements) =>
      elements.map((element) => ({
        href: element.getAttribute("href"),
        rel: element.getAttribute("rel"),
      })),
    );
  assert.ok(
    links.every(
      (link) =>
        link.rel.includes("noopener") && link.rel.includes("noreferrer"),
    ),
  );
  assert.equal(
    (await page.goto("http://127.0.0.1:4173/missing-page/")).status(),
    404,
  );
  assert.ok(
    (await page.locator("h1").textContent()).includes(
      "페이지를 찾을 수 없습니다",
    ),
  );
  assert.deepEqual(errors, [], "Browser runtime errors");
  assert.deepEqual(assetErrors, [], "Broken local assets");
  console.log(
    JSON.stringify(
      {
        responsiveChecks: layouts.length,
        routes: routes.length,
        filterCategories: 5,
        directAccessAndRefresh: 3,
        mobileMenu: "passed",
        absentResume: "hidden",
        metadata: "passed",
        localAssets: "passed",
        runtimeErrors: 0,
        notFound: "passed",
        screenshots: [
          ".preview/desktop-home.png",
          ".preview/mobile-home.png",
          ".preview/mobile-projects.png",
        ],
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
