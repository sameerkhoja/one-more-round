// Publisher player counts and play durations; teaching allowances and mood tags are editorial estimates.
export const moods = [
  ["any", "Up for anything"],
  ["laughs", "Make us laugh"],
  ["strategy", "A little strategy"],
  ["teamwork", "Work together"],
  ["chill", "Keep it chill"],
];
export const games = [
  {
    id: "codenames",
    name: "Codenames",
    subtitle: "Read between the lines.",
    min: 4,
    max: 8,
    minutes: 15,
    teach: 10,
    moods: ["laughs", "strategy", "teamwork"],
    effort: "light",
    color: "peach",
    art: "cards",
    kind: "TEAM WORDPLAY",
    description:
      "Two teams, a grid of words, and clues that make perfect sense… to the person giving them. A lively pick for groups who enjoy making unlikely connections.",
    tip: "Split into two teams and choose a clue-giver for each. Leave a little room on the table for the word grid.",
    note: "One standard team game. The app supports groups up to eight; other variants are not included.",
    source: "https://www.czechgames.com/for-press-games/codenames",
  },
  {
    id: "sushi-go",
    name: "Sushi Go!",
    subtitle: "Good taste. Sneaky choices.",
    min: 2,
    max: 5,
    minutes: 15,
    teach: 5,
    moods: ["chill", "strategy"],
    effort: "light",
    color: "sage",
    art: "sushi",
    kind: "CARD DRAFTING",
    description:
      "Pick a card, pass your hand, and build a delicious little collection. Quick simultaneous choices keep everyone involved from the first plate to the last pudding.",
    tip: "Give everyone room to display their cards. Explain the different scoring combinations before you deal.",
    note: "The original Sushi Go!, not Sushi Go Party!.",
    source: "https://www.gamewright.com/product/Sushi-Go",
  },
  {
    id: "just-one",
    name: "Just One",
    subtitle: "Great minds think differently.",
    min: 3,
    max: 7,
    minutes: 20,
    teach: 5,
    moods: ["laughs", "teamwork", "chill"],
    effort: "light",
    color: "lavender",
    art: "pencil",
    kind: "COOPERATIVE PARTY",
    description:
      "Help one friend guess a mystery word with a single clue each. The catch: matching clues disappear. A gentle way to discover how differently your friends think.",
    tip: "Hand out the easels and markers. Make sure everyone understands that duplicate clues are removed.",
    note: "A full 13-card game; everyone plays on the same team.",
    source: "https://www.rprod.com/en/games/just-one",
  },
  {
    id: "the-crew",
    name: "The Crew",
    subtitle: "One crew. Very little talking.",
    min: 3,
    max: 5,
    minutes: 20,
    teach: 10,
    moods: ["teamwork", "strategy"],
    effort: "thinky",
    color: "blue",
    art: "orbit",
    kind: "COOPERATIVE CARDS",
    description:
      "Coordinate a space mission through clever card play and carefully limited communication. A satisfying shared puzzle for friends who like a little concentration.",
    tip: "Start with an early mission. Teach following suit and winning tricks before explaining the mission objective.",
    note: "The Quest for Planet Nine: one mission/session, not the entire campaign. Two-player variant excluded.",
    source: "https://thamesandkosmos.com/products/the-crew",
  },
  {
    id: "cascadia",
    name: "Cascadia",
    subtitle: "A little wilderness on the table.",
    min: 1,
    max: 4,
    minutes: 45,
    teach: 10,
    moods: ["chill", "strategy"],
    effort: "thinky",
    color: "sage",
    art: "mountain",
    kind: "SPATIAL PUZZLE",
    description:
      "Build a patchwork of habitats and arrange wildlife into scoring patterns. Quiet turns and personal puzzles make a lovely landing spot for a slower evening.",
    tip: "Start with the introductory wildlife scoring cards and give each person room to grow their habitat.",
    note: "Base game only. The 45-minute publisher estimate excludes our teaching allowance.",
    source: "https://www.alderac.com/cascadia/",
  },
  {
    id: "forbidden-island",
    name: "Forbidden Island",
    subtitle: "Everybody wins. Or gets wet.",
    min: 2,
    max: 4,
    minutes: 30,
    teach: 10,
    moods: ["teamwork", "strategy"],
    effort: "thinky",
    color: "blue",
    art: "island",
    kind: "COOPERATIVE ADVENTURE",
    description:
      "Rescue treasures from a sinking island, trading cards and saving paths as a team. Shared stakes turn even a small table into an expedition.",
    tip: "Choose the novice water level for your first game. Talk through the action options together.",
    note: "One full game at the chosen difficulty.",
    source: "https://gamewright.com/product/Forbidden-island",
  },
  {
    id: "azul",
    name: "Azul",
    subtitle: "Beautiful tiles. Difficult decisions.",
    min: 2,
    max: 4,
    minutes: 45,
    teach: 10,
    moods: ["strategy", "chill"],
    effort: "thinky",
    color: "gold",
    art: "tiles",
    kind: "TILE DRAFTING",
    description:
      "Collect colorful tiles to build a mosaic while keeping an eye on what everyone else needs. Simple turns open up a wonderfully competitive puzzle.",
    tip: "Use the colored side of the player boards. Walk through an example of taking tiles and scoring a row.",
    note: "Original Azul, base game. We budget 45 minutes for play.",
    source: "https://www.nextmove-games.com/",
  },
  {
    id: "wavelength",
    name: "Wavelength",
    subtitle: "Get on the same frequency.",
    min: 2,
    max: 8,
    minutes: 45,
    teach: 5,
    moods: ["laughs", "teamwork"],
    effort: "light",
    color: "peach",
    art: "dial",
    kind: "SOCIAL GUESSING",
    description:
      "Decide where a clue belongs between two extremes. Expect friendly disagreements, surprising explanations, and a table full of very strong opinions.",
    tip: "Use the cooperative rules for a small group. With a larger group, split into two teams.",
    note: "App limit: eight players. We allow 45 minutes for a session; conversation can run longer.",
    source: "https://www.cmyk.games/products/wavelength",
  },
];
export const defaults = {
  players: 4,
  budget: 60,
  effort: "any",
  teach: true,
  onlyOwned: false,
  owned: [],
  preferences: ["any", "any", "any", "any"],
  chosen: null,
};
export function normalize(value = {}) {
  if (!value || typeof value !== "object") value = {};
  const players =
    Number.isInteger(value.players) && value.players >= 2 && value.players <= 8
      ? value.players
      : 4;
  return {
    players,
    budget: [20, 30, 45, 60, 90, 120].includes(value.budget)
      ? value.budget
      : 60,
    effort: ["any", "light", "thinky"].includes(value.effort)
      ? value.effort
      : "any",
    teach: value.teach !== false,
    onlyOwned: value.onlyOwned === true,
    owned: Array.isArray(value.owned)
      ? [...new Set(value.owned.filter((id) => games.some((g) => g.id === id)))]
      : [],
    preferences: Array.from({ length: players }, (_, i) =>
      moods.some((m) => m[0] === value.preferences?.[i])
        ? value.preferences[i]
        : "any",
    ),
    chosen: games.some((g) => g.id === value.chosen) ? value.chosen : null,
  };
}
export function recommendations(input) {
  const state = normalize(input);
  return games
    .filter(
      (g) =>
        state.players >= g.min &&
        state.players <= g.max &&
        g.minutes + (state.teach ? g.teach : 0) <= state.budget &&
        (state.effort === "any" || g.effort === state.effort) &&
        (!state.onlyOwned || state.owned.includes(g.id)),
    )
    .map((g) => {
      const expressed = state.preferences.filter((m) => m !== "any");
      const matched = expressed.filter((m) => g.moods.includes(m)).length;
      return {
        ...g,
        total: g.minutes + (state.teach ? g.teach : 0),
        matched,
        expressed: expressed.length,
      };
    })
    .sort(
      (a, b) =>
        b.matched - a.matched ||
        a.total - b.total ||
        a.name.localeCompare(b.name),
    );
}
export function encodeNight(state) {
  return encodeURIComponent(JSON.stringify(normalize(state)));
}
export function decodeNight(hash) {
  try {
    if (hash.length > 5000 || !hash.startsWith("#night=")) return null;
    return normalize(JSON.parse(decodeURIComponent(hash.slice(7))));
  } catch {
    return null;
  }
}
