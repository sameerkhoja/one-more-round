import test from "node:test";
import assert from "node:assert/strict";
import {
  games,
  defaults,
  normalize,
  recommendations,
  encodeNight,
  decodeNight,
} from "../src/catalog.mjs";
test("every returned game respects hard constraints across supported groups and budgets", () => {
  for (let players = 2; players <= 8; players++)
    for (const budget of [20, 30, 45, 60, 90, 120])
      for (const teach of [true, false])
        for (const effort of ["any", "light", "thinky"]) {
          for (const g of recommendations({
            ...defaults,
            players,
            budget,
            teach,
            effort,
          })) {
            assert.ok(players >= g.min && players <= g.max);
            assert.ok(g.total <= budget);
            assert.equal(g.total, g.minutes + (teach ? g.teach : 0));
            if (effort !== "any") assert.equal(g.effort, effort);
          }
        }
});
test("teaching time can exclude a game; an exact budget is allowed", () => {
  assert.ok(
    !recommendations({ ...defaults, budget: 20 }).some(
      (g) => g.id === "just-one",
    ),
  );
  assert.ok(
    recommendations({ ...defaults, budget: 20, teach: false }).some(
      (g) => g.id === "just-one",
    ),
  );
  assert.ok(
    recommendations({ ...defaults, budget: 20 }).some(
      (g) => g.id === "sushi-go",
    ),
  );
});
test("group moods have equal votes; no-preference votes do not inflate matches", () => {
  const picks = recommendations({
    ...defaults,
    preferences: ["teamwork", "teamwork", "chill", "any"],
  });
  assert.equal(picks[0].id, "just-one");
  assert.equal(picks[0].matched, 3);
  assert.equal(picks[0].expressed, 3);
  assert.equal(picks.find((g) => g.id === "sushi-go").matched, 1);
});
test("shelf is a hard filter and an empty shelf has no matches", () => {
  assert.deepEqual(recommendations({ ...defaults, onlyOwned: true }), []);
  assert.deepEqual(
    recommendations({ ...defaults, onlyOwned: true, owned: ["cascadia"] }).map(
      (g) => g.id,
    ),
    ["cascadia"],
  );
  assert.deepEqual(
    recommendations({
      ...defaults,
      players: 8,
      onlyOwned: true,
      owned: ["cascadia"],
    }),
    [],
  );
});
test("no results never silently relax a player or time constraint", () => {
  assert.equal(
    recommendations({ ...defaults, players: 8, budget: 20 }).length,
    0,
  );
});
test("invalid shared or saved state is bounded and cannot inject arbitrary games", () => {
  for (const input of [
    null,
    {},
    [],
    {
      players: 100,
      budget: 1,
      owned: ["bad", "azul", "azul"],
      preferences: ["evil"],
      chosen: "bad",
      effort: "bad",
    },
    "garbage",
  ]) {
    const s = normalize(input);
    assert.ok(s.players >= 2 && s.players <= 8);
    assert.equal(s.preferences.length, s.players);
    assert.ok(s.owned.every((id) => games.some((g) => g.id === id)));
    assert.ok(s.chosen === null);
  }
  assert.equal(decodeNight("#night=%oops"), null);
  assert.equal(decodeNight("#night=" + "a".repeat(5001)), null);
});
test("a shared night preserves choices, chosen game and shelf without credentials", () => {
  const s = normalize({
    ...defaults,
    players: 6,
    owned: ["just-one"],
    onlyOwned: true,
    chosen: "just-one",
    preferences: ["chill", "teamwork", "laughs"],
  });
  assert.deepEqual(decodeNight("#night=" + encodeNight(s)), s);
});
test("changing player count truncates or fills mood slots", () => {
  assert.deepEqual(normalize({ ...defaults, players: 2 }).preferences, [
    "any",
    "any",
  ]);
  assert.equal(normalize({ ...defaults, players: 8 }).preferences.length, 8);
});
