import { expect, test } from "@playwright/test";

test("tabs update the hash and render the contracted panels", async ({ page }) => {
  await page.goto("/#my-info");

  await expect(page).toHaveTitle("Seongjoo Kim — Software Engineer");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "I build reliable 3D experiences",
  );

  const experienceTab = page.getByRole("tab", { name: "Experience" });
  await experienceTab.click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(experienceTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { level: 1, name: "Experience" })).toBeVisible();

  const portfolioTab = page.getByRole("tab", { name: "Portfolio" });
  await portfolioTab.click();
  await expect(page).toHaveURL(/#portfolio$/);
  await expect(portfolioTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { level: 1, name: "Portfolio" })).toBeVisible();
});

test("arrow keys move tab focus and selection", async ({ page }) => {
  await page.goto("/#my-info");

  const myInfoTab = page.getByRole("tab", { name: "My Info" });
  const experienceTab = page.getByRole("tab", { name: "Experience" });
  await myInfoTab.focus();
  await myInfoTab.press("ArrowRight");

  await expect(experienceTab).toBeFocused();
  await expect(experienceTab).toHaveAttribute("aria-selected", "true");
  await expect(page).toHaveURL(/#experience$/);
});

test("Experience shows verified companies and official Dentbird links", async ({ page }) => {
  await page.goto("/#experience");

  await expect(page.locator(".company-summary strong")).toHaveText([
    "ImagoWorks",
    "TmaxCloud",
    "TmaxA&C",
    "TmaxOS",
  ]);

  const modeler = page.getByRole("link", { name: "Dentbird Modeler" });
  const batch = page.getByRole("link", { name: "Dentbird Batch" });
  await expect(modeler).toHaveAttribute("href", "https://dentbird.com/products/dentbird-modeler");
  await expect(batch).toHaveAttribute("href", "https://dentbird.com/products/dentbird-batch");

  for (const link of [modeler, batch]) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noreferrer/);
  }
});

test("Portfolio contains only the confirmed projects", async ({ page }) => {
  await page.goto("/#portfolio");

  const cards = page.locator(".project-card");
  await expect(cards).toHaveCount(6);
  await expect(cards.locator("h2")).toHaveText([
    "Ray Tracing Scene Lab",
    "Airspace Replay",
    "my linear",
    "Observability Platform",
    "Taedong (테동)",
    "Vertex Studio CAD",
  ]);
  await expect(page.getByRole("button", { name: "Product overview" })).toHaveCount(6);
  await expect(page.getByRole("link", { name: "Source code" })).toHaveCount(4);
  await expect(page.getByRole("link", { name: /^Open / })).toHaveCount(0);

  const myLinearCard = cards.filter({ hasText: "my linear" });
  await expect(myLinearCard).toContainText("IndexedDB");
  await expect(myLinearCard.getByRole("link", { name: "Source code" })).toHaveAttribute(
    "href",
    "https://github.com/lvucatmull/my-linear",
  );

  const taedongCard = cards.filter({ hasText: "Taedong (테동)" });
  await expect(taedongCard).toContainText("Expo");
  await expect(taedongCard).toContainText("NTRP");
  await expect(taedongCard).toContainText("iOS native build verified");
  await expect(taedongCard.getByRole("link")).toHaveCount(0);

  const observabilityCard = cards.filter({ hasText: "Observability Platform" });
  await expect(observabilityCard.locator("img")).toHaveAttribute(
    "src",
    "/observability-platform.png",
  );
  await expect(observabilityCard).toContainText("Grafana");
  await expect(observabilityCard).toContainText("Filter · Search · Pagination");
  await expect(observabilityCard.getByRole("link")).toHaveCount(0);
  await observabilityCard.getByRole("button", { name: "Product overview" }).click();
  const observabilityDialog = page.getByRole("dialog", { name: "Observability Platform" });
  await expect(observabilityDialog).toContainText("Independent replay catalog");
  await expect(observabilityDialog).toContainText("server-side pagination");
  await observabilityDialog.getByRole("button", { name: "Close product overview" }).click();

  const cadCard = cards.filter({ hasText: "Vertex Studio CAD" });
  await cadCard.getByRole("button", { name: "Product overview" }).click();
  const dialog = page.getByRole("dialog", { name: "Vertex Studio CAD" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Product journey");
  await expect(dialog).toContainText("lightweight parametric analytic-solid kernel");
  await dialog.getByRole("button", { name: "Close product overview" }).click();
  await expect(dialog).not.toBeVisible();
});

test("Experience has no horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#experience");

  await expect(page.getByRole("heading", { level: 1, name: "Experience" })).toBeVisible();
  await expect(page.locator(".company-summary strong")).toHaveCount(4);

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("Portfolio has no horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#portfolio");

  await expect(page.getByRole("heading", { level: 2, name: "my linear" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Product overview" }).first()).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
