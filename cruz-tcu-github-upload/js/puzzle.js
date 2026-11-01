/* Scouting-report puzzle.
   Each clue reveals part of the prospect's name. Reveal all five -> unlock. */
(function () {
  const NAME = "CRUZ CAMPBELL"; // TODO: change if you want to use a different display name
  const file = document.getElementById("file");
  if (!file) return;
  const prospect = file.querySelector(".prospect");
  const clues = [...file.querySelectorAll(".clue")];
  const bar = file.querySelector(".bar i");
  const count = file.querySelector(".count");
  const stage = document.getElementById("puzzleStage");
  const reveal = document.getElementById("reveal");

  // Build redacted name
  const letters = [];
  NAME.split("").forEach(ch => {
    const s = document.createElement("span");
    if (ch === " ") { s.className = "sp"; s.innerHTML = "&nbsp;"; }
    else { s.className = "hid"; s.textContent = ch; letters.push(s); }
    prospect.append(s);
  });
  // Which name letters each clue unlocks (indexes into non-space letters)
  const groups = [[0, 1], [2, 3], [4, 5, 6], [7, 8], [9, 10, 11]].filter(g => g.every(i => i < letters.length));
  const start = Date.now();
  let opened = 0;

  function showUnlocked(skipped) {
    try { sessionStorage.setItem("cruzUnlocked", "1"); } catch (e) {}
    stage.classList.add("hidden");
    reveal.classList.remove("hidden");
    document.querySelector(".unlock-badge") || (document.querySelector(".brand") && document.querySelector(".brand").insertAdjacentHTML("beforeend", ' <span class="unlock-badge">UNLOCKED</span>'));
    reveal.scrollIntoView({ behavior: "smooth", block: "start" });
    if (!skipped) { confettiBurst({ count: 260 }); setTimeout(() => confettiBurst({ count: 160 }), 450); setTimeout(() => confettiBurst({ count: 120 }), 900); }
    const t = reveal.querySelector("#timeStat");
    if (t && !skipped) t.textContent = `Unlocked in ${Math.round((Date.now() - start) / 1000)} seconds.`;
  }

  clues.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("open")) return;
      btn.classList.add("open"); btn.classList.remove("pulse");
      btn.setAttribute("aria-expanded", "true");
      const redact = btn.querySelector(".redact");
      redact.textContent = btn.dataset.text;
      (groups[i] || []).forEach(idx => { const s = letters[idx]; s.classList.remove("hid"); s.classList.add("pop"); });
      opened++;
      bar.style.width = (opened / clues.length * 100) + "%";
      count.textContent = `${opened}/${clues.length} declassified`;
      if (opened === clues.length) {
        file.classList.add("done");
        confettiBurst({ count: 60 });
        setTimeout(() => showUnlocked(false), 1500);
      }
    });
  });
  // gentle nudge on first clue
  if (clues[0]) clues[0].classList.add("pulse");

  // Skip / replay / already unlocked this visit
  document.getElementById("skipPuzzle").addEventListener("click", () => showUnlocked(true));
  document.getElementById("replay").addEventListener("click", () => {
    try { sessionStorage.removeItem("cruzUnlocked"); } catch (e) {}
    location.reload();
  });
  let was = false; try { was = sessionStorage.getItem("cruzUnlocked") === "1"; } catch (e) {}
  if (was) { stage.classList.add("hidden"); reveal.classList.remove("hidden"); }
})();
