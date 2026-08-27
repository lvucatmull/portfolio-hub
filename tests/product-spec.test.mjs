import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const [appSource, storySource, specDocument, specSource, packageSource] = await Promise.all([
  readFile(new URL("src/App.jsx", root), "utf8"),
  readFile(new URL("src/productStories.js", root), "utf8"),
  readFile(new URL("docs/product-spec.md", root), "utf8"),
  readFile(new URL("docs/product-spec.json", root), "utf8").then(JSON.parse),
  readFile(new URL("package.json", root), "utf8").then(JSON.parse),
]);

function assertOrdered(source, values, label) {
  let previousIndex = -1;

  for (const value of values) {
    const index = source.indexOf(value);
    assert.notEqual(index, -1, `${label} is missing: ${value}`);
    assert.ok(index > previousIndex, `${label} is out of order: ${value}`);
    previousIndex = index;
  }
}

test("navigation contract is implemented in the declared order", () => {
  assert.deepEqual(
    specSource.navigation.tabs.map(({ id }) => id),
    ["my-info", "experience", "portfolio"],
  );
  assert.equal(specSource.navigation.fallback, "my-info");

  assertOrdered(
    appSource,
    specSource.navigation.tabs.flatMap(({ id, label }) => [`id: "${id}"`, `label: "${label}"`]),
    "navigation tab",
  );
});

test("approved My Info content remains present", () => {
  assert.ok(appSource.includes(specSource.myInfo.brand));

  for (const phrase of ["I build reliable 3D experiences", "and the systems behind them."]) {
    assert.ok(appSource.includes(phrase), `My Info headline is missing: ${phrase}`);
  }
});

test("verified experience remains complete and reverse chronological", () => {
  assertOrdered(appSource, specSource.experience.companies, "experience company");
  assert.equal(new Set(specSource.experience.companies).size, 4);
});

test("public product links are official HTTPS URLs implemented by the app", () => {
  for (const product of specSource.experience.publicProductLinks) {
    const url = new URL(product.href);
    assert.equal(url.protocol, "https:");
    assert.equal(url.hostname, "dentbird.com");
    assert.ok(appSource.includes(product.label), `Product label is missing: ${product.label}`);
    assert.ok(appSource.includes(product.href), `Product URL is missing: ${product.href}`);
  }
});

test("only confirmed portfolio projects are contracted", () => {
  assert.deepEqual(specSource.portfolio.projects, [
    "Ray Tracing Scene Lab",
    "Airspace Replay",
    "my linear",
    "Observability Platform",
    "Vertex Studio CAD",
  ]);
  assertOrdered(appSource, specSource.portfolio.projects, "portfolio project");
});

test("every portfolio project has an embedded product overview instead of a live action", () => {
  assert.deepEqual(specSource.portfolio.productOverviewIds, [
    "ray-tracing-scene-lab",
    "airspace-replay",
    "my-linear",
    "observability-platform",
    "vertex-studio-cad",
  ]);
  assert.equal(specSource.portfolio.livePreviewActions, false);
  assert.ok(appSource.includes("Product overview"));
  assert.ok(!appSource.includes("liveUrl"));
  assert.ok(!appSource.includes("liveLabel"));
  for (const id of specSource.portfolio.productOverviewIds) {
    assert.ok(storySource.includes(`id: "${id}"`), `Product story is missing: ${id}`);
  }
});

test("observability uses the contracted independent replay screenshot without a public source action", () => {
  assert.equal(specSource.portfolio.observabilityScreenshot, "/observability-platform.png");
  assert.equal(specSource.portfolio.observabilitySurface, "independent-replay-viewer");
  assert.ok(appSource.includes('image: "/observability-platform.png"'));
  const observabilityBlock = appSource.slice(
    appSource.indexOf('storyId: "observability-platform"'),
    appSource.indexOf('storyId: "vertex-studio-cad"'),
  );
  assert.ok(!observabilityBlock.includes("sourceUrl"));
  assert.ok(observabilityBlock.includes("Filter · Search · Pagination"));
});

test("human-readable plan covers every machine-readable acceptance criterion", () => {
  for (const criterion of specSource.acceptanceCriteria) {
    assert.ok(specDocument.includes(`| ${criterion} |`), `Documented criterion is missing: ${criterion}`);
  }
});

test("quality scripts expose contract and E2E checks", () => {
  assert.equal(packageSource.scripts["test:spec"], "node --test tests/product-spec.test.mjs");
  assert.equal(packageSource.scripts["test:e2e"], "playwright test");
});
