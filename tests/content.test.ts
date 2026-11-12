// Content checks for i2089.com, run with `npm test` (Node's built-in
// test runner; Node 24 strips the TypeScript types). They guard the
// rules the site copy follows, so a content edit cannot break a link,
// lose an image or slip back into a known misreading.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  allWork,
  bands,
  clients,
  services,
  type Item,
} from "../app/_shared/content.ts";

const PUBLIC = join(import.meta.dirname, "..", "public");

// every page the content can link to
const ROUTES = new Set([
  "/",
  "/about",
  "/projects",
  "/blog",
  ...services.map((s) => `/${s.slug}`),
  ...allWork.map((p) => `/projects/${p.slug}`),
]);

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const textOf = (item: Item) =>
  typeof item === "string"
    ? item
    : "text" in item
      ? item.text
      : item.steps.join(" ");

test("links in entry texts open a page that exists", () => {
  for (const s of services) {
    for (const item of s.items) {
      for (const [, words, href] of textOf(item).matchAll(LINK)) {
        assert.ok(ROUTES.has(href), `${s.slug}: "${words}" → ${href}`);
      }
    }
  }
});

test("client names and home bands link to existing pages", () => {
  for (const c of clients) assert.ok(ROUTES.has(c.href), `${c.name} → ${c.href}`);
  for (const b of bands) {
    for (const slug of b.slugs) assert.ok(ROUTES.has(`/${slug}`), `band → /${slug}`);
  }
});

test("every case has a screenshot on disk, a role, work lines and a stack", () => {
  for (const p of allWork) {
    assert.ok(p.images.length > 0, `${p.slug}: no image`);
    for (const src of p.images) {
      assert.ok(existsSync(join(PUBLIC, src)), `${p.slug}: missing ${src}`);
    }
    assert.ok(p.role && p.intro, `${p.slug}: role or intro missing`);
    assert.ok(p.highlights.length > 0, `${p.slug}: no work lines`);
    assert.ok(p.stack.length > 0, `${p.slug}: no stack`);
  }
});

// swiss-engineer-voice: finished work drops "I" and starts with a verb
test('project work lines start with a verb, not "I"', () => {
  for (const p of allWork) {
    for (const h of p.highlights) {
      assert.doesNotMatch(h, /^I /, `${p.slug}: "${h}"`);
    }
  }
});

// PFD 2026-11-12: offer entries are noun phrases. A present-tense verb
// without a subject reads as an order to the reader ("Set up Claude Code
// in your projects…"), and "I" made the offer pages read as self-talk.
test("offer entries and steps are noun phrases, not orders or I-sentences", () => {
  const BAD = /^(I |Design|Build|Develop|Set up|Show|Ship|Run|Teach|Keep)\b/;
  for (const s of services.filter((s) => s.slug !== "about")) {
    for (const item of s.items) {
      if (typeof item === "string") continue;
      const lines = "text" in item ? [item.text] : item.steps;
      for (const line of lines) {
        assert.doesNotMatch(line, BAD, `${s.slug} / ${item.term}: "${line}"`);
      }
    }
  }
});

test("no copy uses an em dash", () => {
  const all = [
    ...services.flatMap((s) => s.items.map(textOf)),
    ...allWork.flatMap((p) => [p.intro, ...p.highlights]),
    ...bands.map((b) => b.sub),
  ];
  for (const t of all) assert.ok(!t.includes("—"), `em dash in "${t}"`);
});
