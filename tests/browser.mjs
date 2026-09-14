import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
const base = process.env.BASE_URL || "http://localhost:5180";
const out = process.env.SCREENSHOT_DIR || "docs";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base);
  await page
    .getByRole("heading", { name: "Less deciding. More playing." })
    .waitFor();
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator(".game-card").count(), 8);
  await page.screenshot({ path: `${out}/desktop.png`, fullPage: true });
  await page.getByLabel("Player 1 mood").selectOption("teamwork");
  await page.getByLabel("Player 2 mood").selectOption("chill");
  assert.equal(
    await page.locator(".game-card").first().getAttribute("data-game"),
    "just-one",
  );
  await page
    .getByRole("button", { name: "Add Just One to shelf", exact: true })
    .click();
  await page.getByRole("button", { name: /^On my shelf/ }).click();
  assert.equal(await page.locator(".game-card").count(), 1);
  await page.reload();
  assert.equal(await page.locator(".game-card").count(), 1);
  assert.equal(await page.getByLabel("Player 1 mood").inputValue(), "teamwork");
  await page
    .getByRole("button", { name: "Meet the game", exact: true })
    .click();
  await page
    .getByRole("button", { name: "This is the one", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Tonight is officially sorted." })
    .waitFor();
  await page.screenshot({ path: `${out}/night-plan.png`, fullPage: true });
  await page
    .getByRole("button", { name: "Share this night", exact: true })
    .last()
    .click();
  const shared = await page.getByLabel("Your night link").inputValue();
  assert.ok(shared.includes("#night="));
  await page.getByRole("button", { name: "Close dialog" }).click();
  await page.reload();
  await page.getByText("Tonight’s pick: Just One").waitFor();
  const guest = await browser.newPage();
  await guest.goto(shared);
  await guest.getByText("Tonight’s pick: Just One").waitFor();
  assert.equal(await guest.locator(".game-card").count(), 1);
  await guest.close();
  await page.getByRole("button", { name: "Reset night" }).click();
  for (let i = 0; i < 4; i++)
    await page.getByRole("button", { name: "Add a player" }).click();
  assert.ok(
    await page.getByRole("button", { name: "Add a player" }).isDisabled(),
  );
  await page.getByLabel("How long have you got?").selectOption("20");
  await page
    .getByRole("heading", { name: "No games fit this table yet." })
    .waitFor();
  await page.getByRole("button", { name: "Broaden the search" }).click();
  assert.ok((await page.locator(".game-card").count()) > 0);
  await page.getByRole("button", { name: "Reset night" }).click();
  await page.getByRole("button", { name: /^On my shelf/ }).click();
  await page.getByRole("button", { name: "Build my shelf" }).click();
  await page.getByRole("dialog").getByRole("checkbox").first().check();
  await page.getByRole("button", { name: "Find games on my shelf" }).click();
  assert.equal(await page.locator(".game-card").count(), 1);
  await page.getByRole("button", { name: "Reset night" }).click();
  await page.getByRole("button", { name: "How it works", exact: true }).click();
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  const phone = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    deviceScaleFactor: 2,
  });
  phone.on("pageerror", (e) => errors.push(e.message));
  await phone.goto(base);
  await phone.evaluate(() => document.fonts.ready);
  assert.ok(
    await phone.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await phone.screenshot({ path: `${out}/phone.png`, fullPage: true });
  await phone.getByLabel("Player 1 mood").selectOption("teamwork");
  await phone.getByLabel("How long have you got?").selectOption("30");
  await phone
    .locator(".game-card")
    .first()
    .getByRole("button", { name: "Meet the game" })
    .click();
  await phone.getByRole("button", { name: "This is the one" }).click();
  await phone
    .getByRole("heading", { name: "Tonight is officially sorted." })
    .waitFor();
  await phone.screenshot({ path: `${out}/phone-plan.png`, fullPage: true });
  assert.ok(
    await phone.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  // Corrupt and unavailable local storage must not break discovery.
  const broken = await browser.newPage();
  await broken.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
  });
  await broken.goto(base);
  await broken.getByText("Saving unavailable in this browser").waitFor();
  assert.equal(await broken.locator(".game-card").count(), 8);
  assert.deepEqual(errors, []);
  console.log(
    "PASS: group ranking, shelf, reload persistence, plan, share to a fresh browser, hard limits, empty-state recovery, keyboard dialog, phone layout, unavailable storage; no browser errors.",
  );
} finally {
  await browser.close();
}
