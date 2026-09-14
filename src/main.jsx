import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  Clock3,
  Dice5,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Sparkles,
  Users,
  X,
  Library,
  SlidersHorizontal,
} from "lucide-react";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import {
  games,
  moods,
  defaults,
  normalize,
  recommendations,
  encodeNight,
  decodeNight,
} from "./catalog.mjs";
import { GameArt, HeroArt } from "./Art";
import "./style.css";
const key = "one-more-round:v1";
function load() {
  const shared = decodeNight(location.hash);
  if (shared) return shared;
  try {
    return normalize(JSON.parse(localStorage.getItem(key) || "null"));
  } catch {
    return normalize(defaults);
  }
}
function Dialog({ title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.showModal();
    return () => ref.current?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="dialog-title"
    >
      <div className="dialog-head">
        <h2 id="dialog-title">{title}</h2>
        <button
          className="icon-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
function App() {
  const [state, setState] = useState(load),
    [modal, setModal] = useState(null),
    [detail, setDetail] = useState(null),
    [notice, setNotice] = useState(""),
    [storageFailed, setStorageFailed] = useState(false),
    [link, setLink] = useState("");
  const matches = recommendations(state),
    chosen = matches.find((g) => g.id === state.chosen);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
      setStorageFailed(false);
    } catch {
      setStorageFailed(true);
    }
  }, [state]);
  useEffect(() => {
    const handler = () => {
      const next = decodeNight(location.hash);
      if (next) setState(next);
    };
    addEventListener("hashchange", handler);
    return () => removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(timeout);
  }, [notice]);
  function change(patch) {
    setState((s) => normalize({ ...s, ...patch, chosen: null }));
    if (location.hash)
      history.replaceState(null, "", location.pathname + location.search);
  }
  function owned(id) {
    change({
      owned: state.owned.includes(id)
        ? state.owned.filter((x) => x !== id)
        : [...state.owned, id],
    });
  }
  function showGame(game) {
    setDetail(game);
    setModal("game");
  }
  function lock(game) {
    setState((s) => ({ ...s, chosen: game.id }));
    setDetail(game);
    setModal("plan");
  }
  function share() {
    setLink(
      `${location.origin}${location.pathname}#night=${encodeNight(state)}`,
    );
    setModal("share");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setNotice("Night link copied. Send it to your group.");
    } catch {
      setNotice("Copy the selected link below.");
      document.getElementById("share-link")?.select();
    }
  }
  function reset() {
    change({ ...defaults, preferences: [...defaults.preferences] });
    setNotice("A fresh table. Let’s find your next game.");
  }
  const close = () => setModal(null);
  return (
    <>
      <a href="#picker" className="skip">
        Skip to game picker
      </a>
      <header className="site-header">
        <a href="#" className="brand" aria-label="One More Round home">
          <span className="brand-die">
            <Dice5 size={26} />
          </span>
          <span>
            one more
            <br />
            <strong>round.</strong>
          </span>
        </a>
        <nav aria-label="Main">
          <a href="#picker" className="nav-active">
            Find a game
          </a>
          <button onClick={() => setModal("how")}>How it works</button>
        </nav>
        <button className="shelf-button" onClick={() => setModal("shelf")}>
          <Library size={17} />
          <span>My shelf</span>
          <b>{state.owned.length}</b>
        </button>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="tiny-dot" /> GOOD PEOPLE. GREAT GAME NIGHTS.
            </span>
            <h1>
              Less deciding.
              <br />
              More <span>playing.</span>
            </h1>
            <p>
              The right game for your people, your mood,
              <br className="desktop-break" /> and the time you’ve got tonight.
            </p>
            <a className="button lime" href="#picker">
              Find tonight’s game <ArrowRight size={19} />
            </a>
            <span className="hero-note">
              No accounts. No endless scrolling. Just one more round.
            </span>
          </div>
          <div className="hero-visual">
            <HeroArt />
            <span className="art-caption">
              A LITTLE FRIENDLY COMPETITION NEVER HURT.
            </span>
            <span className="hand-note">bring your people ↙</span>
          </div>
        </section>
        <div className="intro-strip">
          <span>
            <span className="number">01</span> Set the scene
          </span>
          <ChevronRight size={15} />
          <span>
            <span className="number">02</span> Read the room
          </span>
          <ChevronRight size={15} />
          <span>
            <span className="number">03</span> Play something good
          </span>
        </div>
        <section id="picker" className="workspace">
          <aside className="setup">
            <div className="section-kicker">
              <SlidersHorizontal size={15} /> YOUR NIGHT, YOUR RULES
            </div>
            <h2>Set the table.</h2>
            <div className="control-block">
              <label className="control-label">
                Who’s coming?<span>2–8 players</span>
              </label>
              <div className="stepper">
                <button
                  aria-label="Remove a player"
                  disabled={state.players === 2}
                  onClick={() => change({ players: state.players - 1 })}
                >
                  <Minus size={18} />
                </button>
                <div>
                  <Users size={19} />
                  <strong>{state.players}</strong>
                  <span>players</span>
                </div>
                <button
                  aria-label="Add a player"
                  disabled={state.players === 8}
                  onClick={() => change({ players: state.players + 1 })}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            <div className="control-block">
              <label className="control-label" htmlFor="budget">
                How long have you got?
              </label>
              <select
                id="budget"
                value={state.budget}
                onChange={(e) => change({ budget: Number(e.target.value) })}
              >
                {[20, 30, 45, 60, 90, 120].map((t) => (
                  <option value={t} key={t}>
                    {t === 60
                      ? "1 hour"
                      : t === 90
                        ? "1½ hours"
                        : t === 120
                          ? "2 hours"
                          : `${t} minutes`}
                  </option>
                ))}
              </select>
              <label className="check-line">
                <input
                  type="checkbox"
                  checked={state.teach}
                  onChange={(e) => change({ teach: e.target.checked })}
                />
                <span>Leave time to learn the rules</span>
              </label>
            </div>
            <fieldset className="control-block">
              <legend className="control-label">How much brainpower?</legend>
              <div className="segmented">
                {[
                  ["any", "Either"],
                  ["light", "Keep it light"],
                  ["thinky", "Thinky"],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    aria-pressed={state.effort === v}
                    onClick={() => change({ effort: v })}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="group-head">
              <div>
                <span className="section-kicker">READ THE ROOM</span>
                <h3>Everyone gets a say.</h3>
              </div>
              <span className="mini-heart">
                <Heart size={18} />
              </span>
            </div>
            <p className="subtext">
              Pass the phone around. What’s each person in the mood for?
            </p>
            <div className="preferences">
              {state.preferences.map((m, i) => (
                <div className="person" key={i}>
                  <span className={`avatar avatar-${i % 4}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <label className="sr-only" htmlFor={`mood-${i}`}>
                    Player {i + 1} mood
                  </label>
                  <select
                    id={`mood-${i}`}
                    value={m}
                    onChange={(e) =>
                      change({
                        preferences: state.preferences.map((v, j) =>
                          j === i ? e.target.value : v,
                        ),
                      })
                    }
                  >
                    {moods.map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="setup-foot">
              <span>
                <Check size={13} />
                {storageFailed
                  ? "Saving unavailable in this browser"
                  : "Saved on this device"}
              </span>
              <button onClick={reset} aria-label="Reset night">
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </aside>
          <div className="results">
            <div className="results-heading">
              <div>
                <span className="section-kicker">YOUR EVENING, SORTED</span>
                <h2>
                  {chosen ? "It’s a game night." : "Meet your next good night."}
                </h2>
              </div>
              <button
                className="icon-button bordered"
                aria-label="Share this night"
                onClick={share}
              >
                <Share2 size={18} />
              </button>
            </div>
            <p className="result-sub">
              {state.players} people · {state.budget} minutes ·{" "}
              {state.teach ? "learning time included" : "play time only"}
            </p>
            {chosen && (
              <div className="chosen-banner">
                <div>
                  <span className="chosen-icon">
                    <Check size={21} />
                  </span>
                  <div>
                    <b>Tonight’s pick: {chosen.name}</b>
                    <p>
                      {chosen.total} minutes set aside. Snacks are up to you.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setDetail(chosen);
                    setModal("plan");
                  }}
                >
                  View your plan <ArrowUpRight size={17} />
                </button>
              </div>
            )}
            <div className="result-toolbar">
              <div className="tabs">
                <button
                  aria-pressed={!state.onlyOwned}
                  onClick={() => change({ onlyOwned: false })}
                >
                  All games <span>{games.length}</span>
                </button>
                <button
                  aria-pressed={state.onlyOwned}
                  onClick={() => change({ onlyOwned: true })}
                >
                  On my shelf <span>{state.owned.length}</span>
                </button>
              </div>
              <span className="count" aria-live="polite">
                {matches.length} {matches.length === 1 ? "match" : "matches"}
              </span>
            </div>
            {matches.length > 0 ? (
              <>
                <div className="match-explainer">
                  <Sparkles size={15} />
                  <span>
                    {matches[0].expressed
                      ? `Sorted by your group’s moods, then by shortest session.`
                      : "All moods welcome. Showing the quickest sessions first."}
                  </span>
                </div>
                <div className="game-grid">
                  {matches.map((g, i) => (
                    <article className="game-card" key={g.id} data-game={g.id}>
                      <div className={`game-image ${g.color}`}>
                        <GameArt type={g.art} />
                        {i === 0 && (
                          <span className="top-pick">
                            <Sparkles size={12} />
                            {g.expressed ? "TOP GROUP PICK" : "QUICK START"}
                          </span>
                        )}
                        <button
                          className={`save-game ${state.owned.includes(g.id) ? "saved" : ""}`}
                          aria-label={`${state.owned.includes(g.id) ? "Remove" : "Add"} ${g.name} ${state.owned.includes(g.id) ? "from" : "to"} shelf`}
                          aria-pressed={state.owned.includes(g.id)}
                          onClick={() => owned(g.id)}
                        >
                          <Bookmark
                            size={17}
                            fill={
                              state.owned.includes(g.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      </div>
                      <div className="game-body">
                        <div className="game-kind">{g.kind}</div>
                        <button
                          className="game-title"
                          onClick={() => showGame(g)}
                        >
                          <h3>{g.name}</h3>
                          <ArrowUpRight size={20} />
                        </button>
                        <p className="tagline">{g.subtitle}</p>
                        <div className="game-stats">
                          <span>
                            <Users size={14} />
                            {g.min}–{g.max}
                          </span>
                          <span>
                            <Clock3 size={14} />
                            {g.total} min{" "}
                            {state.teach && <small>incl. teach</small>}
                          </span>
                        </div>
                        <div className="match-reason">
                          <span className="match-dot" />
                          {g.expressed
                            ? `${g.matched} of ${g.expressed} mood picks matched`
                            : "Fits your group & your time"}
                        </div>
                        <button
                          className="choose-button"
                          onClick={() => showGame(g)}
                        >
                          Meet the game <ArrowRight size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="empty">
                <Dice5 size={44} />
                <h3>No games fit this table yet.</h3>
                <p>
                  {state.onlyOwned && state.owned.length === 0
                    ? "Add games you own to your shelf, then we’ll find what fits."
                    : "Try a longer evening, allow either brainpower level, or browse beyond your shelf. Your player count and time limit are always respected."}
                </p>
                <button
                  className="button dark"
                  onClick={() =>
                    state.onlyOwned && state.owned.length === 0
                      ? setModal("shelf")
                      : change({ budget: 120, effort: "any", onlyOwned: false })
                  }
                >
                  {state.onlyOwned && state.owned.length === 0
                    ? "Build my shelf"
                    : "Broaden the search"}
                  <ArrowRight size={17} />
                </button>
              </div>
            )}
            <div className="bottom-note">
              <Clock3 size={17} />
              <p>
                A little breathing room goes a long way. Times are estimates for
                one game or session, not a promise.{" "}
                <button onClick={() => setModal("how")}>
                  About our picks <ArrowUpRight size={12} />
                </button>
              </p>
            </div>
          </div>
        </section>
        <section className="closing">
          <span className="closing-icon">
            <Dice5 size={34} />
          </span>
          <div>
            <h2>The best part isn’t winning.</h2>
            <p>It’s having everyone around the same table.</p>
          </div>
          <span className="closing-star">✳</span>
        </section>
      </main>
      <footer>
        <span>
          one more round. <small>A good night starts here.</small>
        </span>
        <div>
          <button onClick={() => setModal("how")}>About & sources</button>
          <button onClick={() => setModal("privacy")}>Your data</button>
        </div>
        <small>MADE FOR THE TABLE.</small>
      </footer>
      {notice && (
        <div className="toast" role="status">
          <Check size={17} />
          {notice}
        </div>
      )}
      {modal && (
        <Dialog
          title={
            modal === "shelf"
              ? "Your game shelf"
              : modal === "game"
                ? detail.name
                : modal === "plan"
                  ? "Tonight is officially sorted."
                  : modal === "share"
                    ? "Bring everyone in."
                    : modal === "privacy"
                      ? "Your night stays yours."
                      : "A good fit, explained."
          }
          onClose={close}
        >
          {modal === "shelf" && (
            <div className="dialog-content">
              <p>
                Which of these games do you have access to? Your shelf is saved
                on this device.
              </p>
              <div className="shelf-list">
                {games.map((g) => (
                  <label key={g.id}>
                    <span className={`shelf-art ${g.color}`}>
                      <GameArt type={g.art} />
                    </span>
                    <span>
                      <b>{g.name}</b>
                      <small>
                        {g.min}–{g.max} players · {g.minutes} min play
                      </small>
                    </span>
                    <input
                      type="checkbox"
                      checked={state.owned.includes(g.id)}
                      onChange={() => owned(g.id)}
                    />
                  </label>
                ))}
              </div>
              <button
                className="button dark full"
                onClick={() => {
                  change({ onlyOwned: true });
                  close();
                  document
                    .getElementById("picker")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                Find games on my shelf <ArrowRight size={17} />
              </button>
            </div>
          )}
          {modal === "game" && detail && (
            <div className="dialog-content">
              <div className={`detail-art ${detail.color}`}>
                <GameArt type={detail.art} />
              </div>
              <span className="game-kind">{detail.kind}</span>
              <p className="description">{detail.description}</p>
              <div className="detail-stats">
                <span>
                  <b>
                    {detail.min}–{detail.max}
                  </b>
                  players
                </span>
                <span>
                  <b>{detail.minutes} min</b>play estimate
                </span>
                <span>
                  <b>+{state.teach ? detail.teach : 0} min</b>learning allowance
                </span>
              </div>
              <h3>Get the table ready</h3>
              <p>{detail.tip}</p>
              <p className="fine">{detail.note}</p>
              <a
                className="source-link"
                href={detail.source}
                target="_blank"
                rel="noreferrer"
              >
                Publisher & rules <ArrowUpRight size={15} />
              </a>
              <div className="detail-actions">
                <button
                  className="button dark"
                  disabled={!matches.some((g) => g.id === detail.id)}
                  onClick={() => lock(matches.find((g) => g.id === detail.id))}
                >
                  This is the one <Check size={17} />
                </button>
                <button
                  className="button outline"
                  onClick={() => owned(detail.id)}
                >
                  <Bookmark size={17} />
                  {state.owned.includes(detail.id)
                    ? "On my shelf"
                    : "Add to shelf"}
                </button>
              </div>
              {!matches.some((g) => g.id === detail.id) && (
                <p className="fine">
                  This game no longer fits the current filters.
                </p>
              )}
            </div>
          )}
          {modal === "plan" && detail && (
            <div className="dialog-content plan">
              <div className={`detail-art ${detail.color}`}>
                <GameArt type={detail.art} />
              </div>
              <span className="section-kicker">TONIGHT’S PICK</span>
              <h3>{detail.name}</h3>
              <p>
                {state.players} people ·{" "}
                {detail.minutes + (state.teach ? detail.teach : 0)} minutes
                planned
              </p>
              <div className="timeline">
                {state.teach && (
                  <div>
                    <span>01</span>
                    <p>
                      <b>Learn together · {detail.teach} min</b>
                      {detail.tip}
                    </p>
                  </div>
                )}
                <div>
                  <span>{state.teach ? "02" : "01"}</span>
                  <p>
                    <b>Play a session · {detail.minutes} min</b>
                    {detail.note}
                  </p>
                </div>
                <div>
                  <span>✓</span>
                  <p>
                    <b>
                      {Math.max(
                        0,
                        state.budget -
                          detail.minutes -
                          (state.teach ? detail.teach : 0),
                      )}{" "}
                      min left in your budget
                    </b>
                    Leave it for snacks, chatter, or a little extra thinking.
                  </p>
                </div>
              </div>
              <button className="button dark full" onClick={share}>
                Share this night <Share2 size={17} />
              </button>
              <p className="fine">
                You’ll need access to the physical game. This app helps you
                choose; it doesn’t host the game.
              </p>
            </div>
          )}
          {modal === "share" && (
            <div className="dialog-content">
              <p>
                Send a snapshot of your setup
                {chosen ? ` and your pick, ${chosen.name}` : ""}. Friends can
                open it and make their own changes.
              </p>
              <label className="control-label" htmlFor="share-link">
                Your night link
              </label>
              <input
                className="share-input"
                id="share-link"
                readOnly
                value={link}
                onFocus={(e) => e.target.select()}
              />
              <button className="button dark full" onClick={copy}>
                Copy link <Share2 size={17} />
              </button>
              {notice && (
                <p className="copy-feedback" role="status">
                  {notice}
                </p>
              )}
              <p className="fine">
                The link includes player count, moods, shelf choices, and your
                selected game. It is a snapshot, not a live voting room.
              </p>
            </div>
          )}
          {modal === "how" && (
            <div className="dialog-content prose">
              <p>
                One More Round helps your group choose a tabletop game for
                tonight from eight handpicked titles.
              </p>
              <h3>First, the practical stuff.</h3>
              <p>
                We filter by supported player count, your time budget,
                brainpower, and—if you choose—your shelf. Turning on learning
                time adds a separate teaching estimate to the play duration.
              </p>
              <h3>Then, what people want.</h3>
              <p>
                Every specific mood pick gets one equal vote. A game earns one
                point when its editorial mood tags match that pick. “Up for
                anything” does not affect the ranking. Ties go to shorter
                sessions, then alphabetical order. Zero mood matches can still
                appear if the game fits your practical limits.
              </p>
              <h3>Small catalogue. Transparent choices.</h3>
              <p>
                Player counts and play estimates are based on publisher
                information, with conservative session allowances where needed.
                Mood tags, brainpower, and teaching time are our editorial
                judgments. Times vary by group. All illustrations here are
                original decorative artwork, not official box art.
              </p>
              <ul className="sources">
                {games.map((g) => (
                  <li key={g.id}>
                    <a href={g.source} target="_blank" rel="noreferrer">
                      {g.name} · publisher <ArrowUpRight size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {modal === "privacy" && (
            <div className="dialog-content prose">
              <p>
                Your setup, shelf, and selected game are stored in this
                browser’s local storage. We don’t ask for names, accounts, or
                payment information.
              </p>
              <p>
                Sharing makes a link containing a snapshot of your choices.
                Anyone with that link can read them. Friends’ changes are not
                synchronized with your device.
              </p>
              <p>
                No analytics or external catalogue API is used. Vercel serves
                the site and may keep standard hosting request logs. Publisher
                links take you to external sites.
              </p>
              <button
                className="button outline"
                onClick={() => {
                  reset();
                  close();
                }}
              >
                Clear my saved setup <RotateCcw size={16} />
              </button>
            </div>
          )}
        </Dialog>
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
