import { useState, useEffect, useRef, useCallback } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";



// ─── Images ──────────────────────────────────────────────────────────────────
const IMG = {
  coffee:    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&auto=format&fit=crop",
  interior:  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop",
  barista:   "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&auto=format&fit=crop",
  pastry:    "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&auto=format&fit=crop",
  latte:     "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&auto=format&fit=crop",
  outdoor:   "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&auto=format&fit=crop",
  barista2:  "https://images.unsplash.com/photo-1515860734122-e0d771b36d3e?w=400&h=400&auto=format&fit=crop",
  barista3:  "https://images.unsplash.com/photo-1599549192669-6baac5d32432?w=400&h=400&auto=format&fit=crop",
  interior2: "https://images.unsplash.com/photo-1712730642507-d4ad0904e997?w=800&auto=format&fit=crop",
  interior3: "https://images.unsplash.com/photo-1624583338957-4d155ca886dc?w=800&auto=format&fit=crop",
  interior4: "https://images.unsplash.com/photo-1617529503973-101eb4cd2fe1?w=800&auto=format&fit=crop",
  cup:       "https://images.unsplash.com/photo-1623035570668-a0f52a7d5640?w=800&auto=format&fit=crop",
  cake:      "https://images.unsplash.com/photo-1529942458412-eda69f76291d?w=800&auto=format&fit=crop",
  mug:       "https://images.unsplash.com/photo-1613856204847-7f0060f81b3e?w=800&auto=format&fit=crop",
  saucer:    "https://images.unsplash.com/photo-1551727609-1f89c019b5ca?w=800&auto=format&fit=crop",
  whiteMug:  "https://images.unsplash.com/photo-1607681034592-10e8936ebbff?w=800&auto=format&fit=crop",
};

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = "home" | "menu" | "story" | "gallery" | "reservations" | "contact";
type MenuTab = "espresso" | "pourover" | "pastries" | "seasonal";
type GalCat = "all" | "coffee" | "food" | "interior";

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Menu", page: "menu" },
  { label: "Our Story", page: "story" },
  { label: "Gallery", page: "gallery" },
  { label: "Reservations", page: "reservations" },
  { label: "Contact", page: "contact" },
];

const MENU_DATA: Record<MenuTab, { img: string; name: string; desc: string; price: string }[]> = {
  espresso: [
    { img: IMG.coffee,   name: "Signature Espresso", desc: "Double shot, dark chocolate notes, 9-bar extraction.", price: "₹180" },
    { img: IMG.latte,    name: "Flat White",          desc: "Velvety microfoam over a ristretto base.", price: "₹240" },
    { img: IMG.cup,      name: "Cortado",             desc: "Equal espresso and warm milk — bitterness meets silk.", price: "₹210" },
    { img: IMG.mug,      name: "Americano",           desc: "Espresso let loose in hot water. Complex in character.", price: "₹170" },
  ],
  pourover: [
    { img: IMG.whiteMug, name: "V60 Pour Over",       desc: "Single-origin, hand-poured. The slow ritual.", price: "₹320" },
    { img: IMG.saucer,   name: "Chemex",              desc: "Bright, clean, paper-filtered. A different clarity.", price: "₹340" },
    { img: IMG.mug,      name: "Cold Brew",           desc: "18-hour steep, one large ice cube. Low-acid.", price: "₹280" },
    { img: IMG.cup,      name: "AeroPress",           desc: "Concentrated, pressure-brewed, unexpectedly complex.", price: "₹260" },
  ],
  pastries: [
    { img: IMG.pastry,   name: "Almond Croissant",   desc: "Laminated dough, frangipane, toasted almonds.", price: "₹195" },
    { img: IMG.cake,     name: "Cardamom Bun",        desc: "Scandinavian, green cardamom, demerara sugar.", price: "₹165" },
    { img: IMG.cake,     name: "Olive Oil Cake",      desc: "Dense, fragrant with lemon zest. Quietly perfect.", price: "₹220" },
    { img: IMG.pastry,   name: "Dark Chocolate Tart", desc: "70% ganache, shortcrust, Maldon sea salt.", price: "₹260" },
  ],
  seasonal: [
    { img: IMG.latte,    name: "Mango Shakerato",    desc: "Alphonso mango, espresso, shaken over ice. May–Jul.", price: "₹310" },
    { img: IMG.cup,      name: "Rose Latte",          desc: "House-made rose syrup, oat milk, espresso.", price: "₹285" },
    { img: IMG.whiteMug, name: "Turmeric Oat",        desc: "Fresh turmeric, black pepper, oat milk, vanilla.", price: "₹250" },
    { img: IMG.mug,      name: "Monsoon Cold Brew",   desc: "Monsooned Malabar beans, ginger-lime float.", price: "₹340" },
  ],
};

const GALLERY_IMGS: { src: string; cat: GalCat; alt: string }[] = [
  { src: IMG.coffee,    cat: "coffee",   alt: "Espresso shot" },
  { src: IMG.latte,     cat: "coffee",   alt: "Latte art" },
  { src: IMG.barista,   cat: "coffee",   alt: "Barista at work" },
  { src: IMG.cup,       cat: "coffee",   alt: "Coffee on table" },
  { src: IMG.mug,       cat: "coffee",   alt: "Black ceramic mug" },
  { src: IMG.interior,  cat: "interior", alt: "Café interior" },
  { src: IMG.interior2, cat: "interior", alt: "Warm café seating" },
  { src: IMG.interior3, cat: "interior", alt: "Wooden tables" },
  { src: IMG.outdoor,   cat: "interior", alt: "Café outdoor" },
  { src: IMG.pastry,    cat: "food",     alt: "Fresh pastries" },
  { src: IMG.cake,      cat: "food",     alt: "Olive oil cake" },
  { src: IMG.saucer,    cat: "food",     alt: "Cup on saucer" },
];

const TESTIMONIALS = [
  { text: "The flat white here ruined every other café for me. I mean that as the highest compliment.", author: "Aditi R., Regular" },
  { text: "MH13 has the rare quality of feeling completely unhurried. The cardamom bun and a window seat — that is my Saturday ritual.", author: "Karan M., Architect" },
  { text: "I took a meeting here instead of a boardroom. The client signed. I credit the pour-over.", author: "Priya D., Founder" },
];

const TIMELINE = [
  { year: "2022", title: "The Idea", desc: "What began as a dream over bad office coffee became a blueprint sketched on a napkin in Koregaon Park." },
  { year: "2023", title: "Finding the Space", desc: "After six months of searching, we found a 19th-century bungalow with original teak floors and twelve-foot ceilings." },
  { year: "2024", title: "Opening Day", desc: "January 14th. We served 47 cups. One customer said it was the best flat white she'd had outside Melbourne. We haven't stopped." },
  { year: "Now", title: "Still Growing", desc: "A roastery program launching in Q3, a weekend supper club, and a table always ready for you." },
];

const FAQ = [
  { q: "Do you take walk-ins?", a: "Yes — we always keep a few tables open. Peak hours (9–11am, 4–7pm) fill fast, so a reservation helps." },
  { q: "Is there Wi-Fi?", a: "There is. Password on the back of your menu card. We only ask you close the laptop when the café is busy." },
  { q: "Do you source beans locally?", a: "We work with three Indian estates — one in Coorg, one in Araku, one in the Nilgiris — plus seasonal single-origins from Ethiopia and Colombia." },
  { q: "Can we host private events?", a: "Yes. The café can be reserved Monday–Wednesday evenings for 15–40 guests. Write to us at events@mh13cafe.in." },
  { q: "Do you have vegan options?", a: "Oat milk, almond milk, and soy milk are on the menu. Most pastries can be made vegan — ask at the counter." },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useInView(ref: React.RefObject<Element | null>, threshold = 0.15) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold });
    o.observe(el); return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}

// ─── Global CSS ───────────────────────────────────────────────────────────────
const G = `
  html { scroll-behavior: smooth; }
  *, *::before, *::after { box-sizing: border-box; }
  img { display: block; max-width: 100%; }
  ::-webkit-scrollbar { display: none; }
  body { scrollbar-width: none; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
  @keyframes steam {
    0%   { opacity:0; transform:translateY(0) scaleX(1); }
    30%  { opacity:.55; }
    70%  { opacity:.3; }
    100% { opacity:0; transform:translateY(-28px) scaleX(1.2); }
  }

  .a0  { animation: fadeUp .7s cubic-bezier(.4,0,.2,1) .15s both; }
  .a1  { animation: fadeUp .6s cubic-bezier(.4,0,.2,1) .40s both; }
  .a2  { animation: fadeUp .6s cubic-bezier(.4,0,.2,1) .60s both; }
  .a3  { animation: fadeUp .6s cubic-bezier(.4,0,.2,1) .80s both; }
  .a4  { animation: fadeUp .6s cubic-bezier(.4,0,.2,1) 1.00s both; }
  .hw  { display:inline-block; }
  .hw0 { animation: fadeUp .6s cubic-bezier(.4,0,.2,1) .40s both; }
  .hw1 { animation: fadeUp .6s cubic-bezier(.4,0,.2,1) .55s both; }
  .hw2 { animation: fadeUp .6s cubic-bezier(.4,0,.2,1) .70s both; }
  .hw3 { animation: fadeUp .6s cubic-bezier(.4,0,.2,1) .85s both; }
  .hw4 { animation: fadeUp .6s cubic-bezier(.4,0,.2,1) 1.00s both; }
  .hw5 { animation: fadeUp .6s cubic-bezier(.4,0,.2,1) 1.15s both; }

  .sp1 { animation: steam 3s ease-in-out infinite; transform-origin: bottom center; }
  .sp2 { animation: steam 3s ease-in-out 1s infinite; transform-origin: bottom center; }
  .sp3 { animation: steam 3s ease-in-out 2s infinite; transform-origin: bottom center; }

  .nav-a { position:relative; text-decoration:none; }
  .nav-a::after { content:''; position:absolute; bottom:-3px; right:0; width:0; height:1.5px; background:#AB1509; transition: width .25s cubic-bezier(.4,0,.2,1); }
  .nav-a:hover::after { width:100%; left:0; right:auto; }
  .ftr-a { transition: color .2s; }
  .ftr-a:hover { color:#AB1509 !important; }
  .card-lift { transition: transform .2s cubic-bezier(.4,0,.2,1), box-shadow .2s cubic-bezier(.4,0,.2,1), border-color .2s cubic-bezier(.4,0,.2,1); }
  .card-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(43,13,5,.12); border-color:#AB1509 !important; }

  .btn-wh { font-family:'Jost',sans-serif; font-size:.82rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; text-decoration:none; padding:.82rem 2rem; border:1.5px solid rgba(255,255,255,.7); color:#fff; background:transparent; cursor:pointer; transition:all .2s cubic-bezier(.4,0,.2,1); display:inline-block; }
  .btn-wh:hover { background:rgba(255,255,255,.12); border-color:#fff; }
  .btn-yw { font-family:'Jost',sans-serif; font-size:.82rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; text-decoration:none; padding:.82rem 2rem; border:1.5px solid #fff7d3; color:#AB1509; background:#fff7d3; cursor:pointer; transition:all .2s cubic-bezier(.4,0,.2,1); display:inline-block; }
  .btn-yw:hover { background:transparent; color:#fff7d3; }
  .btn-rd { font-family:'Jost',sans-serif; font-size:.82rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; text-decoration:none; padding:.82rem 2rem; border:1.5px solid #AB1509; color:#AB1509; background:transparent; cursor:pointer; transition:all .2s cubic-bezier(.4,0,.2,1); display:inline-block; }
  .btn-rd:hover { background:#AB1509; color:#fff; }
  .btn-rd-fill { font-family:'Jost',sans-serif; font-size:.82rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; text-decoration:none; padding:.82rem 2rem; border:1.5px solid #AB1509; color:#fff; background:#AB1509; cursor:pointer; transition:all .2s cubic-bezier(.4,0,.2,1); display:inline-block; }
  .btn-rd-fill:hover { background:#8e1007; border-color:#8e1007; }

  .reveal { opacity:0; transform:translateY(20px); transition: opacity .6s ease-out, transform .6s ease-out; }
  .reveal.vis { opacity:1; transform:translateY(0); }
  .reveal-l { opacity:0; transform:translateX(-36px); transition: opacity .6s ease-out, transform .6s ease-out; }
  .reveal-l.vis { opacity:1; transform:translateX(0); }
  .reveal-r { opacity:0; transform:translateX(36px); transition: opacity .6s ease-out, transform .6s ease-out; }
  .reveal-r.vis { opacity:1; transform:translateX(0); }

  .tab-pill { font-family:'Jost',sans-serif; font-size:.8rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; padding:.55rem 1.4rem; border:1.5px solid #AB1509; border-radius:50px; cursor:pointer; transition:all .2s cubic-bezier(.4,0,.2,1); background:transparent; color:#AB1509; }
  .tab-pill.on { background:#AB1509; color:#fff; }
  .tab-pill:hover:not(.on) { background:rgba(171,21,9,.08); }

  .gal-img-wrap { position:relative; overflow:hidden; cursor:pointer; }
  .gal-img-wrap img { width:100%; height:100%; object-fit:cover; transition:transform .35s cubic-bezier(.4,0,.2,1); display:block; }
  .gal-img-wrap:hover img { transform:scale(1.05); }
  .gal-overlay { position:absolute; inset:0; background:rgba(26,10,0,0); display:flex; align-items:center; justify-content:center; transition:background .3s; }
  .gal-img-wrap:hover .gal-overlay { background:rgba(26,10,0,.48); }
  .gal-overlay-txt { font-family:'Jost',sans-serif; font-size:.82rem; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:#fff; opacity:0; transition:opacity .3s; }
  .gal-img-wrap:hover .gal-overlay-txt { opacity:1; }

  .faq-item { border-bottom:1px solid rgba(171,21,9,.15); }
  .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content:space-between; padding:1.2rem 0; font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:400; color:#2b0d05; }
  .faq-arrow { width:20px; height:20px; flex-shrink:0; position:relative; transition:transform .3s cubic-bezier(.4,0,.2,1); }
  .faq-arrow::before, .faq-arrow::after { content:''; position:absolute; background:#AB1509; border-radius:2px; }
  .faq-arrow::before { width:12px; height:1.5px; top:9px; left:4px; }
  .faq-arrow::after { width:1.5px; height:12px; top:4px; left:9px; transition:transform .3s cubic-bezier(.4,0,.2,1); }
  .faq-arrow.open { transform:rotate(45deg); }
  .faq-body { overflow:hidden; max-height:0; transition:max-height .35s cubic-bezier(.4,0,.2,1); }
  .faq-body.open { max-height:160px; }
  .faq-body p { font-family:'Jost',sans-serif; font-size:.95rem; font-weight:300; line-height:1.75; color:#6b4a3a; padding-bottom:1.2rem; }

  .form-input { width:100%; font-family:'Jost',sans-serif; font-size:.95rem; font-weight:300; background:#fff7d3; border:1.5px solid rgba(171,21,9,.25); color:#2b0d05; padding:.75rem 1rem; outline:none; transition:border-color .2s; }
  .form-input:focus { border-color:#AB1509; box-shadow:0 0 0 3px rgba(171,21,9,.12); }
  .form-input::placeholder { color:rgba(43,13,5,.4); }
  .form-err { font-family:'Jost',sans-serif; font-size:.78rem; color:#AB1509; margin-top:.3rem; display:block; }

  .social-circle { width:48px; height:48px; border:1.5px solid rgba(171,21,9,.3); border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s cubic-bezier(.4,0,.2,1); text-decoration:none; }
  .social-circle:hover { background:#AB1509; border-color:#AB1509; }
  .social-circle:hover svg { fill:#fff; stroke:#fff; }

  .dev-social:hover { background:#AB1509 !important; border-color:#AB1509 !important; transform: translateY(-3px) scale(1.04); }
  .dev-social:hover svg { transition: color .2s ease; }


  @media(max-width:768px) {
    .desktop-nav { display:none !important; }
    .hamburger { display:flex !important; }
    .story-grid { grid-template-columns:1fr !important; }
    .feat-grid { grid-template-columns:1fr !important; }
    .vals-grid { grid-template-columns:1fr !important; }
    .team-grid { grid-template-columns:1fr 1fr !important; }
    .footer-grid { grid-template-columns:1fr !important; }
    .contact-grid { grid-template-columns:1fr !important; }
    .res-grid { grid-template-columns:1fr !important; }
    .info-grid { grid-template-columns:1fr !important; }
  }
  @media(max-width:480px) {
    .hero-btns { flex-direction:column !important; align-items:center !important; }
    .team-grid { grid-template-columns:1fr !important; }
  }
`;

// ─── Shared: Nav ─────────────────────────────────────────────────────────────
function Nav({ current, go }: { current: Page; go: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [current]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.3rem 5vw", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "#fff7d3" : "transparent",
        borderBottom: scrolled ? "1.5px solid #AB1509" : "1.5px solid transparent",
        transition: "background .35s cubic-bezier(.4,0,.2,1), border-color .35s",
      }}>
        <button onClick={() => go("home")} style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#AB1509", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.02em" }}>
          MH13 CAFÉ
        </button>
        <ul className="desktop-nav" style={{ display: "flex", gap: "2.2rem", listStyle: "none", margin: 0, padding: 0 }}>
          {NAV.map(n => (
            <li key={n.page}>
              <button onClick={() => go(n.page)} className="nav-a"
                style={{ fontFamily: "'Jost',sans-serif", fontSize: ".84rem", fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", color: scrolled ? "#2b0d05" : "#fff", transition: "color .2s" }}>
                {n.label}
              </button>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href="https://github.com/laptopah16-art"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="dev-social"
            style={{
              width: 44,
              height: 44,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid rgba(171,21,9,.3)",
              borderRadius: 999,
              textDecoration: "none",
              background: "transparent",
              color: "#AB1509",
              transition: "transform .25s cubic-bezier(.4,0,.2,1), background .25s, border-color .25s",
            }}
          >
            <FaGithub size={22} />
          </a>

          <button className="hamburger" onClick={() => setMob(true)}
            style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", padding: 4, cursor: "pointer" }}>
            {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 26, height: 2, background: scrolled ? "#2b0d05" : "#fff" }} />)}
          </button>
        </div>
      </nav>


      {mob && (
        <div style={{ position: "fixed", inset: 0, background: "#AB1509", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
          <button onClick={() => setMob(false)} style={{ position: "absolute", top: "1.5rem", right: "5vw", background: "none", border: "none", color: "#fff", fontSize: "2rem", cursor: "pointer" }}>✕</button>
          {NAV.map(n => (
            <button key={n.page} onClick={() => { go(n.page); setMob(false); }}
              style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "#fff", background: "none", border: "none", cursor: "pointer", fontStyle: "italic" }}>
              {n.label}
            </button>
          ))}

          <div style={{ marginTop: "1.5rem", display: "flex", gap: ".8rem" }}>
            <a
              href="https://github.com/laptopah16-art"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                width: 48,
                height: 48,
                border: "1.5px solid rgba(255,255,255,.45)",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>

      )}
    </>
  );
}

// ─── Shared: Footer ───────────────────────────────────────────────────────────
function Footer({ go }: { go: (p: Page) => void }) {
  return (
    <footer style={{ background: "#1a0a00", borderTop: "2.5px solid #AB1509", padding: "4rem 5vw 2.5rem" }}>
      <div
        className="footer-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: "3rem",
          marginBottom: "3rem",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#AB1509",
              display: "block",
              marginBottom: ".8rem",
            }}
          >
            MH13 CAFÉ
          </span>
          <p
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: ".86rem",
              fontWeight: 300,
              color: "rgba(255,247,211,.4)",
              lineHeight: 1.75,
            }}
          >
            Where every sip tells a story.
            <br />
            Est. 2024, Railway Lines, Solapur, Maharashtra.
          </p>
        </div>

        <div>
          <h4
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: ".72rem",
              fontWeight: 600,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "rgba(255,247,211,.45)",
              marginBottom: "1.1rem",
            }}
          >
            Navigate
          </h4>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: ".6rem" }}>
            {NAV.map((n) => (
              <li key={n.page}>
                <button
                  onClick={() => go(n.page)}
                  className="ftr-a"
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: ".88rem",
                    fontWeight: 300,
                    color: "rgba(255,247,211,.6)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                  }}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: ".72rem",
              fontWeight: 600,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "rgba(255,247,211,.45)",
              marginBottom: "1.1rem",
            }}
          >
            Find Us
          </h4>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: ".6rem" }}>
            {["MH13 Road, Koregaon Park", "Pune 411001, Maharashtra", "hello@mh13cafe.in", "+91 20 1234 5678", "Open daily 7am – 10pm"].map((t) => (
              <li key={t} style={{ fontFamily: "'Jost',sans-serif", fontSize: ".88rem", fontWeight: 300, color: "rgba(255,247,211,.6)" }}>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: ".72rem",
              fontWeight: 600,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "rgba(255,247,211,.45)",
              marginBottom: "1.1rem",
            }}
          >
            Developer
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: ".55rem" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.08rem", fontWeight: 700, color: "rgba(255,247,211,.9)" }}>
              Anand Helave
            </div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: ".88rem", fontWeight: 300, color: "rgba(255,247,211,.65)", lineHeight: 1.6 }}>
              Full Stack Developer
            </div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: ".88rem", fontWeight: 300, color: "rgba(255,247,211,.65)", lineHeight: 1.6 }}>
              Solapur, Maharashtra, India
            </div>

            <div style={{ display: "flex", gap: ".7rem", marginTop: ".6rem", flexWrap: "wrap" }}>
              <a
                href="https://github.com/laptopah16-art"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="dev-social"
                style={{
                  width: 44,
                  height: 44,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1.5px solid rgba(171,21,9,.3)",
                  borderRadius: 999,
                  textDecoration: "none",
                  background: "transparent",
                  color: "#AB1509",
                  transition: "transform .25s cubic-bezier(.4,0,.2,1), background .25s, border-color .25s",
                }}
              >
                <FaGithub size={22} />
              </a>

              <a
                href="https://www.linkedin.com/in/anand-dev-2a0948401/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="dev-social"
                style={{
                  width: 44,
                  height: 44,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1.5px solid rgba(171,21,9,.3)",
                  borderRadius: 999,
                  textDecoration: "none",
                  background: "transparent",
                  color: "#AB1509",
                  transition: "transform .25s cubic-bezier(.4,0,.2,1), background .25s, border-color .25s",
                }}
              >
                <FaLinkedin size={22} />
              </a>

              <a
                href="mailto:anand.code.16@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="dev-social"
                style={{
                  width: 44,
                  height: 44,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1.5px solid rgba(171,21,9,.3)",
                  borderRadius: 999,
                  textDecoration: "none",
                  background: "transparent",
                  color: "#AB1509",
                  transition: "transform .25s cubic-bezier(.4,0,.2,1), background .25s, border-color .25s",
                }}
              >
                <FaEnvelope size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,247,211,.07)",
          paddingTop: "1.8rem",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: ".8rem",
        }}
      >
        <span style={{ fontFamily: "'Jost',sans-serif", fontSize: ".76rem", color: "rgba(255,247,211,.25)", fontWeight: 300 }}>
          Designed & Developed by Anand Helave © 2026
        </span>
        <span style={{ fontFamily: "'Jost',sans-serif", fontSize: ".76rem", color: "rgba(255,247,211,.25)", fontWeight: 300 }}>
          Solapur, Maharashtra
        </span>
      </div>
    </footer>
  );
}


// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function R({ children, cls = "reveal", delay = 0 }: { children: React.ReactNode; cls?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref);
  return (
    <div ref={ref} className={`${cls}${v ? " vis" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// ─── PAGE: Home ───────────────────────────────────────────────────────────────
function HomePage({ go }: { go: (p: Page) => void }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSlide(s => (s + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <video autoPlay muted loop playsInline poster={IMG.outdoor}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(26,10,0,.52)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "8rem 5vw 6rem" }}>
          <p className="a0" style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.35rem", color: "rgba(255,247,211,.85)", marginBottom: "1rem" }}>Est. 2024 · Solapur</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(3rem,8vw,6.5rem)", color: "#fff", lineHeight: 1.08, marginBottom: "1.4rem" }}>
            {"Where Every Sip Tells a Story".split(" ").map((w, i) => (
              <span key={i} className={`hw hw${i}`} style={{ marginRight: ".25em" }}>{w}</span>
            ))}
          </h1>
          <p className="a3" style={{ fontFamily: "'Jost',sans-serif", fontSize: "clamp(.95rem,1.8vw,1.12rem)", color: "rgba(255,247,211,.8)", fontWeight: 300, marginBottom: "2.4rem", maxWidth: 500, margin: "0 auto 2.4rem" }}>
            Handcrafted coffee. Warm bites. A table waiting for you.
          </p>
          <div className="a4 hero-btns" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("menu")} className="btn-wh">Explore Menu</button>
            <button onClick={() => go("reservations")} className="btn-yw">Reserve a Table</button>
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={{ background: "#AB1509", padding: "7rem 5vw" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="story-grid">
          <R cls="reveal-l">
            <blockquote style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(1.6rem,3vw,2.3rem)", color: "#fff", lineHeight: 1.38, margin: 0, borderLeft: "3px solid rgba(255,247,211,.4)", paddingLeft: "1.4rem" }}>
              "Coffee is not a drink. It is a ritual."
            </blockquote>
          </R>
          <R cls="reveal-r" delay={0.15}>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "1rem", fontWeight: 300, color: "rgba(255,247,211,.82)", lineHeight: 1.82, marginBottom: "1.5rem" }}>
Tucked in Solapur, Maharashtra, MH13 was born from one belief — that a great cup can anchor a moment in time.
            </p>
            <button onClick={() => go("story")} className="btn-wh">Our Story</button>
          </R>
        </div>
      </section>

      {/* FEATURED MENU */}
      <section style={{ background: "#fff7d3", padding: "8rem 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <R><span style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.2rem", color: "#AB1509", display: "block", marginBottom: ".6rem" }}>From the Counter</span></R>
          <R delay={0.1}><h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#2b0d05", marginBottom: "3rem" }}>A Few Favourites</h2></R>
          <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              { img: IMG.coffee, name: "Signature Espresso", desc: "Double shot, dark chocolate, 9-bar extraction.", price: "₹180" },
              { img: IMG.latte,  name: "Flat White",         desc: "Velvety microfoam over a ristretto base.", price: "₹240" },
              { img: IMG.pastry, name: "Almond Croissant",   desc: "Frangipane-filled, toasted almonds, warm.", price: "₹195" },
            ].map((c, i) => (
              <R key={i} delay={i * 0.1}>
                <div className="card-lift" style={{ background: "#f5e6c8", borderLeft: "3px solid transparent", overflow: "hidden" }}>
                  <div style={{ height: 220, overflow: "hidden" }}>
                    <img src={c.img} alt={c.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s cubic-bezier(.4,0,.2,1)" }} />
                  </div>
                  <div style={{ padding: "1.4rem 1.4rem 1.6rem" }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.12rem", color: "#2b0d05", marginBottom: ".4rem" }}>{c.name}</div>
                    <div style={{ fontFamily: "'Jost',sans-serif", fontSize: ".86rem", fontWeight: 300, color: "#6b4a3a", marginBottom: ".9rem", lineHeight: 1.65 }}>{c.desc}</div>
                    <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: ".95rem", color: "#AB1509" }}>{c.price}</div>
                  </div>
                </div>
              </R>
            ))}
          </div>
          <R><div style={{ textAlign: "center" }}><button onClick={() => go("menu")} className="btn-rd">View Full Menu</button></div></R>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section style={{ background: "#f5e6c8", padding: "8rem 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <R><span style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.2rem", color: "#AB1509", display: "block", marginBottom: ".6rem" }}>A Glimpse Inside</span></R>
          <R delay={0.1}><h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#2b0d05", marginBottom: "2.5rem" }}>The Atmosphere</h2></R>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gridTemplateRows: "240px 240px", gap: "1rem", marginBottom: "2.5rem" }}>
            {[IMG.interior, IMG.barista, IMG.outdoor, IMG.latte].map((src, i) => (
              <div key={i} className="gal-img-wrap" onClick={() => go("gallery")} style={{ gridRow: i === 0 ? "1/3" : undefined }}>
                <img src={src} alt="Gallery" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="gal-overlay"><span className="gal-overlay-txt">View Gallery</span></div>
              </div>
            ))}
          </div>
          <R><div style={{ textAlign: "center" }}><button onClick={() => go("gallery")} className="btn-rd">View Full Gallery</button></div></R>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "#fff7d3", padding: "8rem 5vw", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <R><span style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.2rem", color: "#AB1509", display: "block", marginBottom: ".6rem" }}>Voices from the Table</span></R>
          <R delay={0.1}><h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#2b0d05", marginBottom: "3rem" }}>What People Say</h2></R>
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ position: "relative", minHeight: 200 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ position: i === slide ? "relative" : "absolute", inset: 0, opacity: i === slide ? 1 : 0, transition: "opacity .6s cubic-bezier(.4,0,.2,1)", pointerEvents: i === slide ? "auto" : "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontFamily: "'Dancing Script',cursive", fontSize: "5rem", color: "#AB1509", lineHeight: .5, marginBottom: ".8rem", opacity: .45 }}>"</span>
                <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(1.1rem,2.2vw,1.42rem)", color: "#2b0d05", lineHeight: 1.68, marginBottom: "1.2rem" }}>{t.text}</p>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: ".8rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#AB1509" }}>— {t.author}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", marginTop: "2rem" }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                style={{ width: 7, height: 7, borderRadius: "50%", border: "none", padding: 0, cursor: "pointer", background: i === slide ? "#AB1509" : "rgba(171,21,9,.22)", transform: i === slide ? "scale(1.3)" : "scale(1)", transition: "all .2s" }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── PAGE: Menu ───────────────────────────────────────────────────────────────
function MenuPage() {
  const [tab, setTab] = useState<MenuTab>("espresso");
  const [fading, setFading] = useState(false);
  const tabs: { id: MenuTab; label: string }[] = [
    { id: "espresso", label: "Espresso" }, { id: "pourover", label: "Pour Over" },
    { id: "pastries", label: "Pastries" }, { id: "seasonal", label: "Seasonal" },
  ];
  const switchTab = (id: MenuTab) => {
    if (id === tab) return;
    setFading(true);
    setTimeout(() => { setTab(id); setFading(false); }, 220);
  };

  return (
    <>
      <section style={{ height: "55vh", minHeight: 380, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={IMG.coffee} alt="Menu hero" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(26,10,0,.55)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem 5vw" }}>
          <span className="a0" style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.2rem", color: "rgba(255,247,211,.8)", display: "block", marginBottom: ".6rem" }}>Handcrafted Daily</span>
          <h1 className="a1" style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2.8rem,6vw,5rem)", color: "#fff" }}>Our Menu</h1>
        </div>
      </section>

      <section style={{ background: "#fff7d3", padding: "7rem 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: ".6rem", marginBottom: "2.8rem", flexWrap: "wrap" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => switchTab(t.id)} className={`tab-pill${tab === t.id ? " on" : ""}`}>{t.label}</button>
            ))}
          </div>
          <div style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(6px)" : "translateY(0)", transition: "opacity .22s ease, transform .22s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "1.5rem" }}>
              {MENU_DATA[tab].map((item, i) => (
                <div key={i} className="card-lift" style={{ background: "#f5e6c8", borderLeft: "3px solid transparent", overflow: "hidden" }}>
                  <div style={{ height: 200, overflow: "hidden" }}>
                    <img src={item.img} alt={item.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "1.3rem 1.3rem 1.5rem" }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem", color: "#2b0d05", marginBottom: ".4rem" }}>{item.name}</div>
                    <div style={{ fontFamily: "'Jost',sans-serif", fontSize: ".86rem", fontWeight: 300, color: "#6b4a3a", lineHeight: 1.65, marginBottom: ".9rem" }}>{item.desc}</div>
                    <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: ".95rem", color: "#AB1509" }}>{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── PAGE: Story ──────────────────────────────────────────────────────────────
function StoryPage() {
  return (
    <>
      <section style={{ height: "65vh", minHeight: 420, backgroundImage: `url(${IMG.interior})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(26,10,0,.5)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem 5vw" }}>
          <span className="a0" style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.2rem", color: "rgba(255,247,211,.8)", display: "block", marginBottom: ".6rem" }}>Est. 2024 · Solapur</span>
          <h1 className="a1" style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2.8rem,6vw,5rem)", color: "#fff" }}>Our Story</h1>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "#fff7d3", padding: "8rem 5vw" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <R><span style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.2rem", color: "#AB1509", display: "block", marginBottom: ".6rem" }}>The Journey</span></R>
          <R delay={0.1}><h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#2b0d05", marginBottom: "4rem" }}>How We Got Here</h2></R>
          <div style={{ position: "relative", paddingLeft: "3rem" }}>
            <div style={{ position: "absolute", left: "1.1rem", top: 0, bottom: 0, width: 2, background: "rgba(171,21,9,.2)" }} />
            {TIMELINE.map((m, i) => (
              <R key={i} cls={i % 2 === 0 ? "reveal-l" : "reveal-r"} delay={i * 0.1}>
                <div style={{ marginBottom: "3.5rem", position: "relative" }}>
                  <div style={{ position: "absolute", left: "-2.6rem", top: 6, width: 14, height: 14, borderRadius: "50%", background: "#AB1509", border: "3px solid #fff7d3", boxShadow: "0 0 0 2px #AB1509" }} />
                  <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.5rem", color: "#AB1509", display: "block", marginBottom: ".3rem" }}>{m.year}</span>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.15rem", color: "#2b0d05", marginBottom: ".5rem" }}>{m.title}</h3>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: ".95rem", fontWeight: 300, color: "#6b4a3a", lineHeight: 1.78 }}>{m.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "#f5e6c8", padding: "8rem 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <R><span style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.2rem", color: "#AB1509", display: "block", marginBottom: ".6rem" }}>The People</span></R>
          <R delay={0.1}><h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#2b0d05", marginBottom: "3.5rem" }}>Who Makes It Happen</h2></R>
          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2.5rem" }}>
            {[
              { img: IMG.barista,  name: "Rohan Mehta",   role: "Head Roaster" },
              { img: IMG.barista2, name: "Aisha Kapoor",  role: "Head Barista" },
              { img: IMG.barista3, name: "Priya Sharma",  role: "Pastry Chef" },
            ].map((p, i) => (
              <R key={i} delay={i * 0.1}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 180, height: 180, borderRadius: "50%", overflow: "hidden", margin: "0 auto 1.2rem", border: "4px solid rgba(171,21,9,.15)" }}>
                    <img src={p.img} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.15rem", color: "#2b0d05", marginBottom: ".3rem" }}>{p.name}</div>
                  <div style={{ fontFamily: "'Jost',sans-serif", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#AB1509" }}>{p.role}</div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "#fff7d3", padding: "8rem 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <R><h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#2b0d05", marginBottom: "3.5rem", textAlign: "center" }}>What We Stand For</h2></R>
          <div className="vals-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
            {[
              { icon: "●", title: "Origin Matters", desc: "Every bean we use is traceable to a farm. We know the altitude, the variety, the harvest season." },
              { icon: "◆", title: "Slow by Design", desc: "We don't rush cups. Pour-overs take 3 minutes. Some things shouldn't be optimised." },
              { icon: "▲", title: "Community First", desc: "This café is yours as much as ours. We host growers, artists, and neighbours at the same table." },
            ].map((v, i) => (
              <R key={i} delay={i * 0.1}>
                <div style={{ padding: "2rem", background: "#f5e6c8" }}>
                  <span style={{ fontSize: "1.5rem", color: "#AB1509", display: "block", marginBottom: "1rem" }}>{v.icon}</span>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.18rem", color: "#2b0d05", marginBottom: ".7rem" }}>{v.title}</h3>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: ".92rem", fontWeight: 300, color: "#6b4a3a", lineHeight: 1.78 }}>{v.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── PAGE: Gallery ────────────────────────────────────────────────────────────
function GalleryPage() {
  const [filter, setFilter] = useState<GalCat>("all");
  const [lb, setLb] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const cats: { id: GalCat; label: string }[] = [
    { id: "all", label: "All" }, { id: "coffee", label: "Coffee" },
    { id: "food", label: "Food" }, { id: "interior", label: "Interior" },
  ];
  const filtered = GALLERY_IMGS.filter(g => filter === "all" || g.cat === filter);

  const applyFilter = (c: GalCat) => {
    if (c === filter) return;
    setFading(true);
    setTimeout(() => { setFilter(c); setFading(false); }, 220);
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (lb === null) return;
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") setLb(i => (i! + 1) % filtered.length);
      if (e.key === "ArrowLeft") setLb(i => (i! - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lb, filtered.length]);

  return (
    <>
      <section style={{ height: "50vh", minHeight: 340, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={IMG.interior2} alt="Gallery" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(26,10,0,.52)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem 5vw" }}>
          <span className="a0" style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.2rem", color: "rgba(255,247,211,.8)", display: "block", marginBottom: ".6rem" }}>Moments Captured</span>
          <h1 className="a1" style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2.8rem,6vw,5rem)", color: "#fff" }}>Gallery</h1>
        </div>
      </section>

      <section style={{ background: "#fff7d3", padding: "7rem 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: ".6rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            {cats.map(c => <button key={c.id} onClick={() => applyFilter(c.id)} className={`tab-pill${filter === c.id ? " on" : ""}`}>{c.label}</button>)}
          </div>
          <div style={{ opacity: fading ? 0 : 1, transition: "opacity .22s ease", columns: "3 280px", columnGap: "1rem" }}>
            {filtered.map((g, i) => (
              <div key={`${filter}-${i}`} className="gal-img-wrap" onClick={() => setLb(i)} style={{ marginBottom: "1rem", breakInside: "avoid" }}>
                <img src={g.src} alt={g.alt} loading="lazy" style={{ width: "100%", display: "block" }} />
                <div className="gal-overlay"><span className="gal-overlay-txt">View</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lb !== null && (
        <div onClick={() => setLb(null)} style={{ position: "fixed", inset: 0, background: "rgba(26,10,0,.92)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setLb(null)} style={{ position: "absolute", top: "1.5rem", right: "2rem", background: "none", border: "none", color: "#fff7d3", fontSize: "2rem", cursor: "pointer", lineHeight: 1 }}>✕</button>
          <button onClick={e => { e.stopPropagation(); setLb(i => (i! - 1 + filtered.length) % filtered.length); }}
            style={{ position: "absolute", left: "2rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "1.5px solid #ECBC6B", color: "#ECBC6B", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem" }}>‹</button>
          <img src={filtered[lb].src} alt={filtered[lb].alt} onClick={e => e.stopPropagation()}
            style={{ maxWidth: "88vw", maxHeight: "82vh", objectFit: "contain" }} />
          <button onClick={e => { e.stopPropagation(); setLb(i => (i! + 1) % filtered.length); }}
            style={{ position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "1.5px solid #ECBC6B", color: "#ECBC6B", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem" }}>›</button>
          <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", fontFamily: "'Jost',sans-serif", fontSize: ".8rem", color: "rgba(255,247,211,.5)", letterSpacing: ".1em" }}>
            {lb + 1} / {filtered.length}
          </div>
        </div>
      )}
    </>
  );
}

// ─── PAGE: Reservations ───────────────────────────────────────────────────────
function ReservationsPage() {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", guests: "", notes: "" });
  const [errs, setErrs] = useState<Partial<typeof form>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email.";
    if (!form.date) e.date = "Please pick a date.";
    if (!form.time) e.time = "Please pick a time.";
    if (!form.guests) e.guests = "Select number of guests.";
    return e;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrs(v); return; }
    setErrs({}); setSent(true);
  };

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrs(p => ({ ...p, [k]: undefined }));
  };

  return (
    <>
      <section style={{ height: "52vh", minHeight: 360, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={IMG.interior3} alt="Reservations" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(26,10,0,.55)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem 5vw" }}>
          <span className="a0" style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.2rem", color: "rgba(255,247,211,.8)", display: "block", marginBottom: ".6rem" }}>Your Seat Awaits</span>
          <h1 className="a1" style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2.8rem,6vw,5rem)", color: "#fff" }}>Reserve Your Table</h1>
        </div>
      </section>

      <section style={{ background: "#fff7d3", padding: "7rem 5vw" }}>
        <div className="res-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "5rem", alignItems: "start" }}>
          <R>
            {sent ? (
              <div style={{ padding: "3rem", background: "#f5e6c8", textAlign: "center" }}>
                <span style={{ fontFamily: "'Dancing Script',cursive", fontSize: "2rem", color: "#AB1509", display: "block", marginBottom: ".8rem" }}>Thank you!</span>
                <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, color: "#2b0d05", lineHeight: 1.75 }}>
                  We've received your reservation request for <strong>{form.name}</strong>. We'll confirm by email within the hour.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", date: "", time: "", guests: "", notes: "" }); }} className="btn-rd" style={{ marginTop: "1.5rem" }}>
                  Another Booking
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.8rem", color: "#2b0d05", marginBottom: "2rem" }}>Make a Reservation</h2>
                {([
                  { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                ] as const).map(({ key, label, type, placeholder }) => (
                  <div key={key} style={{ marginBottom: "1.4rem" }}>
                    <label style={{ fontFamily: "'Jost',sans-serif", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#AB1509", display: "block", marginBottom: ".5rem" }}>{label}</label>
                    <input className="form-input" type={type} placeholder={placeholder} value={form[key]} onChange={f(key)} />
                    {errs[key] && <span className="form-err">{errs[key]}</span>}
                  </div>
                ))}
                <div className="res-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.4rem" }}>
                  <div>
                    <label style={{ fontFamily: "'Jost',sans-serif", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#AB1509", display: "block", marginBottom: ".5rem" }}>Date</label>
                    <input className="form-input" type="date" value={form.date} onChange={f("date")} min={new Date().toISOString().split("T")[0]} />
                    {errs.date && <span className="form-err">{errs.date}</span>}
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Jost',sans-serif", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#AB1509", display: "block", marginBottom: ".5rem" }}>Time</label>
                    <select className="form-input" value={form.time} onChange={f("time")}>
                      <option value="">Select time</option>
                      {["7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errs.time && <span className="form-err">{errs.time}</span>}
                  </div>
                </div>
                <div style={{ marginBottom: "1.4rem" }}>
                  <label style={{ fontFamily: "'Jost',sans-serif", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#AB1509", display: "block", marginBottom: ".5rem" }}>Number of Guests</label>
                  <select className="form-input" value={form.guests} onChange={f("guests")}>
                    <option value="">Select guests</option>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
                  </select>
                  {errs.guests && <span className="form-err">{errs.guests}</span>}
                </div>
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ fontFamily: "'Jost',sans-serif", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#AB1509", display: "block", marginBottom: ".5rem" }}>Special Requests</label>
                  <textarea className="form-input" rows={3} placeholder="Allergies, celebrations, seating preferences…" value={form.notes} onChange={f("notes")} style={{ resize: "vertical" }} />
                </div>
                <button type="submit" className="btn-rd-fill">Confirm Reservation</button>
              </form>
            )}
          </R>

          <div>
            <R delay={0.1}><h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.8rem", color: "#2b0d05", marginBottom: "2rem" }}>Good to Know</h2></R>
            <div className="info-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.2rem" }}>
              {[
                { icon: "◷", title: "Hours", lines: ["Monday – Friday: 7am – 10pm", "Saturday – Sunday: 8am – 11pm"] },
                { icon: "◎", title: "Location", lines: ["Solapur, Maharashtra", "413001"] },
                { icon: "☎", title: "Phone", lines: ["+91 20 1234 5678", "hello@mh13cafe.in"] },
              ].map((c, i) => (
                <R key={i} delay={0.1 + i * 0.08}>
                  <div style={{ background: "#f5e6c8", padding: "1.4rem 1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.4rem", color: "#AB1509", lineHeight: 1.2 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Jost',sans-serif", fontSize: ".76rem", fontWeight: 600, letterSpacing: ".13em", textTransform: "uppercase", color: "#AB1509", marginBottom: ".4rem" }}>{c.title}</div>
                      {c.lines.map(l => <div key={l} style={{ fontFamily: "'Jost',sans-serif", fontSize: ".92rem", fontWeight: 300, color: "#2b0d05", lineHeight: 1.6 }}>{l}</div>)}
                    </div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── PAGE: Contact ────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errs, setErrs] = useState<Partial<typeof form>>({});
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Enter a valid email.";
    if (!form.message.trim()) errs.message = "Message is required.";
    if (Object.keys(errs).length) { setErrs(errs); return; }
    setErrs({}); setSent(true);
  };

  const fld = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrs(p => ({ ...p, [k]: undefined }));
  };

  return (
    <>
      <section style={{ height: "50vh", minHeight: 340, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={IMG.outdoor} alt="Contact" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(26,10,0,.52)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="a0" style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.2rem", color: "rgba(255,247,211,.8)", display: "block", marginBottom: ".6rem" }}>We'd Love to Hear</span>
          <h1 className="a1" style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2.8rem,6vw,5rem)", color: "#fff" }}>Get in Touch</h1>
        </div>
      </section>

      <section style={{ background: "#fff7d3", padding: "7rem 5vw" }}>
        <div className="contact-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
          {/* Form */}
          <R>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.8rem", color: "#2b0d05", marginBottom: "2rem" }}>Send a Message</h2>
            {sent ? (
              <div style={{ padding: "2rem", background: "#f5e6c8" }}>
                <span style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.8rem", color: "#AB1509", display: "block", marginBottom: ".6rem" }}>Message received.</span>
                <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, color: "#2b0d05", lineHeight: 1.75 }}>We'll write back within one business day.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }} className="btn-rd" style={{ marginTop: "1.2rem" }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                {(["name", "email"] as const).map(k => (
                  <div key={k}>
                    <label style={{ fontFamily: "'Jost',sans-serif", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#AB1509", display: "block", marginBottom: ".5rem" }}>{k === "name" ? "Full Name" : "Email"}</label>
                    <input className="form-input" type={k === "email" ? "email" : "text"} value={form[k]} onChange={fld(k)} placeholder={k === "name" ? "Your name" : "your@email.com"} />
                    {errs[k] && <span className="form-err">{errs[k]}</span>}
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: "'Jost',sans-serif", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#AB1509", display: "block", marginBottom: ".5rem" }}>Message</label>
                  <textarea className="form-input" rows={5} value={form.message} onChange={fld("message")} placeholder="How can we help?" style={{ resize: "vertical" }} />
                  {errs.message && <span className="form-err">{errs.message}</span>}
                </div>
                <button type="submit" className="btn-rd-fill" style={{ alignSelf: "flex-start" }}>Send Message</button>
              </form>
            )}

            {/* Social */}
            <div style={{ marginTop: "3rem" }}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: ".76rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#AB1509", marginBottom: "1rem" }}>Follow Along</div>
              <div style={{ display: "flex", gap: ".8rem" }}>
                {[
                  { label: "IG", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                  { label: "FB", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                  { label: "TW", path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
                ].map(s => (
                  <a key={s.label} href="#" className="social-circle" title={s.label}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#AB1509" style={{ transition: "fill .2s" }}>
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </R>

          {/* Right: Map + address + FAQ */}
          <div>
            <R delay={0.1}>
              <iframe
              src="https://www.google.com/maps?q=Solapur%20Maharashtra%20413001&output=embed"
              title="MH13 Café location"
              width="100%"
              height="260"
              style={{
                border: 0,
                display: "block",
                marginBottom: "2rem",
                filter: "sepia(30%) saturate(80%)"
                  }}
                  allowFullScreen
                  loading="lazy"
            />
    <div style={{ marginBottom: "2rem" }}>
      {[
        { label: "Address", value: "Railway Lines, Solapur, Maharashtra 413001" },
        { label: "Phone", value: "+91 217 123 4567" },
        { label: "Email", value: "hello@mh13cafe.in" },
      ].map(d => (
        <div
          key={d.label}
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: ".8rem",
            alignItems: "baseline"
          }}
        >
          <span
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: ".74rem",
              fontWeight: 600,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "#AB1509",
              flex: "0 0 72px"
            }}
          >
            {d.label}
          </span>
          <span
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1rem",
              color: "#2b0d05"
            }}
          >
            {d.value}
          </span>
        </div>
      ))}
    </div>
  </R>


            {/* FAQ */}
            <R delay={0.15}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.4rem", color: "#2b0d05", marginBottom: "1.2rem" }}>FAQ</h3>
              <div className="faq-item" style={{ borderTop: "1px solid rgba(171,21,9,.15)" }}>
                {FAQ.map((item, i) => (
                  <div key={i} className="faq-item">
                    <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                      <span>{item.q}</span>
                      <span className={`faq-arrow${open === i ? " open" : ""}`} />
                    </button>
                    <div className={`faq-body${open === i ? " open" : ""}`}>
                      <p>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");

  const go = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const Page = { home: HomePage, menu: MenuPage, story: StoryPage, gallery: GalleryPage, reservations: ReservationsPage, contact: ContactPage }[page];

  return (
    <>
      <style>{G}</style>
      <div style={{ fontFamily: "'Jost',sans-serif", color: "#2b0d05", background: "#fff7d3", overflowX: "hidden" }}>
        <Nav current={page} go={go} />
        <main style={{ paddingTop: page === "home" ? 0 : 0 }}>
          <Page go={go} />
        </main>
        <Footer go={go} />
      </div>
    </>
  );
}
