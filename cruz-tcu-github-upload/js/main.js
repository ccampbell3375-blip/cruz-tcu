/* ==========================================================
   Shared site code: nav, footer, photo slots, scroll reveals,
   counters, confetti.  EDIT THE SITE CONFIG BELOW.
   ========================================================== */
const SITE = {
  name: "Cruz Campbell",
  number: "1",             // jersey number
  email: "ccampbell3375@gmail.com",
  phone: "",               // TODO (optional)
  hudl: "https://www.hudl.com/profile/27116628", // highlight film
  pages: [
    ["index.html", "The File"],
    ["story.html", "My Story"],
    ["carlsbad.html", "Carlsbad"],
    ["football.html", "Football"],
    ["beyond.html", "Beyond the Field"],
    ["why-tcu.html", "Why TCU"]
  ]
};

(function () {
  const here = location.pathname.split("/").pop() || "index.html";
  const unlocked = (() => { try { return sessionStorage.getItem("cruzUnlocked") === "1"; } catch (e) { return false; } })();

  // ---- Nav ----
  const nav = document.createElement("header");
  nav.className = "nav";
  nav.innerHTML = `
    <div class="wrap">
      <a class="brand" href="index.html" aria-label="Home"><b>${SITE.number}</b> ${SITE.name.toUpperCase()}${unlocked ? ' <span class="unlock-badge">UNLOCKED</span>' : ""}</a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="navlist">Menu</button>
      <nav aria-label="Main"><ul id="navlist">
        ${SITE.pages.map(([h, t]) => `<li><a href="${h}" ${h === here ? 'aria-current="page"' : ""}>${t}</a></li>`).join("")}
      </ul></nav>
    </div>`;
  document.body.prepend(nav);
  const btn = nav.querySelector(".nav-toggle"), list = nav.querySelector("#navlist");
  btn.addEventListener("click", () => { const o = list.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });

  // ---- Footer ----
  const f = document.createElement("footer");
  f.className = "footer";
  f.innerHTML = `<div class="wrap">
      <div><div class="go">GO FROGS.</div>Thanks for taking the time. — ${SITE.name}, Santa Fe Christian, Class of 2027</div>
      <div><a href="mailto:${SITE.email}">${SITE.email}</a></div>
    </div>`;
  document.body.append(f);

  if (/[?&]edit/.test(location.search)) document.body.classList.add("edit-mode");

  // ---- Photo slots: auto-swap placeholder for the real photo ----
  const camera = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h3l2-3h8l2 3h3v11H3z"/><circle cx="12" cy="13" r="4"/></svg>';
  document.querySelectorAll("figure.slot").forEach(fig => {
    const src = fig.dataset.img, label = fig.dataset.label || "Photo";
    if (fig.dataset.ratio) fig.style.setProperty("--ratio", fig.dataset.ratio);
    const frame = document.createElement("div");
    frame.className = "frame";
    frame.innerHTML = `<div class="ph">${camera}<strong>${label}</strong><code>${src}</code></div>`;
    fig.prepend(frame);
    const img = new Image();
    img.alt = fig.dataset.alt || label;
    img.onload = () => { frame.innerHTML = ""; frame.append(img); };
    img.src = src; // if the file doesn't exist yet, the placeholder stays
  });

  // ---- Scroll reveal ----
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 }) : null;
  document.querySelectorAll(".reveal-up").forEach(el => io ? io.observe(el) : el.classList.add("in"));

  // ---- Counters ----
  const co = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach(e => {
    if (!e.isIntersecting) return; co.unobserve(e.target);
    const el = e.target, end = +el.dataset.count || 0, dec = +el.dataset.dec || 0, t0 = performance.now(), dur = 1400;
    (function tick(t) { const p = Math.min(1, (t - t0) / dur); const v = end * (1 - Math.pow(1 - p, 3)); el.textContent = dec ? v.toFixed(dec) : Math.round(v); if (p < 1) requestAnimationFrame(tick); })(t0);
  }), { threshold: .5 }) : null;
  document.querySelectorAll("[data-count]").forEach(el => co && co.observe(el));
})();

/* ---------- Confetti ---------- */
window.confettiBurst = function (opts = {}) {
  let c = document.getElementById("confetti");
  if (!c) { c = document.createElement("canvas"); c.id = "confetti"; document.body.append(c); }
  const ctx = c.getContext("2d");
  const fit = () => { c.width = innerWidth; c.height = innerHeight; };
  fit();
  const colors = ["#4d1979", "#ffffff", "#f2b84b", "#d9c7ee", "#6b2fa3", "#1e8fa8"];
  const n = opts.count || 220;
  const ps = Array.from({ length: n }, () => ({
    x: innerWidth / 2 + (Math.random() - .5) * 120, y: innerHeight * .55,
    vx: (Math.random() - .5) * 18, vy: -Math.random() * 20 - 6,
    w: 6 + Math.random() * 8, h: 8 + Math.random() * 10, r: Math.random() * 6.28, vr: (Math.random() - .5) * .4,
    color: colors[(Math.random() * colors.length) | 0], life: 0
  }));
  let raf;
  (function frame() {
    ctx.clearRect(0, 0, c.width, c.height);
    let alive = 0;
    ps.forEach(p => {
      p.vy += .42; p.vx *= .992; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
      if (p.y < c.height + 30) alive++;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    });
    if (alive) raf = requestAnimationFrame(frame); else ctx.clearRect(0, 0, c.width, c.height);
  })();
};
