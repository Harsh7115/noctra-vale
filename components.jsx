/* Reusable visual components for Noctra Vale */
const { useState, useEffect, useRef, useMemo } = React;

/* Brand sigil — original mark: 6-petal flower over diamond, with hairline ring */
function Sigil({ size = 64, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke={color} strokeWidth="0.8">
      <circle cx="32" cy="32" r="22" opacity="0.5" />
      <path d="M32 10 L42 32 L32 54 L22 32 Z" opacity="0.85" />
      <g opacity="0.95">
        <ellipse cx="32" cy="22" rx="3.2" ry="6" />
        <ellipse cx="32" cy="42" rx="3.2" ry="6" />
        <ellipse cx="22" cy="32" rx="6" ry="3.2" />
        <ellipse cx="42" cy="32" rx="6" ry="3.2" />
        <ellipse cx="25" cy="25" rx="3.6" ry="5" transform="rotate(-45 25 25)" />
        <ellipse cx="39" cy="39" rx="3.6" ry="5" transform="rotate(-45 39 39)" />
        <ellipse cx="39" cy="25" rx="3.6" ry="5" transform="rotate(45 39 25)" />
        <ellipse cx="25" cy="39" rx="3.6" ry="5" transform="rotate(45 25 39)" />
      </g>
      <circle cx="32" cy="32" r="2" fill={color} stroke="none" />
      <circle cx="32" cy="32" r="30" opacity="0.25" strokeDasharray="1 4" />
    </svg>
  );
}

/* Mask-reveal text — splits into spans, staggered rise */
function Reveal({ children, delay = 0, stagger = 0.04, as: As = "span", className = "" }) {
  const words = String(children).split(" ");
  return (
    <As className={className}>
      {words.map((w, i) => (
        <span className="reveal" key={i}>
          <span style={{ "--d": `${delay + i * stagger}s` }}>{w}{i < words.length - 1 ? "\u00A0" : ""}</span>
        </span>
      ))}
    </As>
  );
}

/* Garment silhouettes — placeholders that read as wearable art */
function GarmentSilhouette({ kind }) {
  const stroke = "oklch(94% 0.005 280 / 0.55)";
  const fill = "oklch(20% 0.02 285 / 0.7)";

  if (kind === "tee") return (
    <svg viewBox="0 0 200 240" fill={fill} stroke={stroke} strokeWidth="0.8">
      <path d="M50 40 L80 30 L100 38 L120 30 L150 40 L175 70 L160 90 L145 80 L145 210 L55 210 L55 80 L40 90 L25 70 Z" />
      <path d="M55 80 L55 210 L145 210 L145 80" opacity="0.5" />
    </svg>
  );
  if (kind === "hoodie") return (
    <svg viewBox="0 0 200 260" fill={fill} stroke={stroke} strokeWidth="0.8">
      <path d="M70 30 Q100 18 130 30 L160 50 L185 90 L165 110 L150 96 L150 230 L50 230 L50 96 L35 110 L15 90 L40 50 Z" />
      <path d="M80 40 Q100 28 120 40 L120 70 L80 70 Z" opacity="0.7" />
      <line x1="100" y1="40" x2="100" y2="120" opacity="0.5" />
      <path d="M88 90 Q100 100 112 90" opacity="0.5" />
    </svg>
  );
  if (kind === "jacket") return (
    <svg viewBox="0 0 200 260" fill={fill} stroke={stroke} strokeWidth="0.8">
      <path d="M55 35 L85 28 L100 40 L115 28 L145 35 L175 60 L165 95 L150 88 L150 230 L100 232 L50 230 L50 88 L35 95 L25 60 Z" />
      <line x1="100" y1="40" x2="100" y2="230" opacity="0.5" />
      <path d="M85 28 L100 90 L115 28" opacity="0.4" />
      <circle cx="100" cy="120" r="1.5" />
      <circle cx="100" cy="150" r="1.5" />
      <circle cx="100" cy="180" r="1.5" />
    </svg>
  );
  if (kind === "jeans") return (
    <svg viewBox="0 0 200 280" fill={fill} stroke={stroke} strokeWidth="0.8">
      <path d="M55 20 L145 20 L150 60 L155 260 L115 265 L105 100 L95 100 L85 265 L45 260 L50 60 Z" />
      <line x1="100" y1="20" x2="100" y2="100" opacity="0.5" />
      <path d="M55 35 L145 35" opacity="0.5" />
    </svg>
  );
  if (kind === "crop") return (
    <svg viewBox="0 0 200 180" fill={fill} stroke={stroke} strokeWidth="0.8">
      <path d="M55 30 L85 22 L100 32 L115 22 L145 30 L170 55 L155 75 L142 65 L142 150 L58 150 L58 65 L45 75 L30 55 Z" />
      <path d="M58 65 L58 150 L142 150 L142 65" opacity="0.5" />
    </svg>
  );
  if (kind === "pants") return (
    <svg viewBox="0 0 200 280" fill={fill} stroke={stroke} strokeWidth="0.8">
      <path d="M50 20 L150 20 L160 65 L170 270 L120 272 L108 105 L92 105 L80 272 L30 270 L40 65 Z" />
      <line x1="100" y1="22" x2="100" y2="105" opacity="0.4" />
    </svg>
  );
  return null;
}

/* Embroidery / cybersigil mark for product page */
function Embroidery() {
  return (
    <svg viewBox="0 0 240 240" fill="none" stroke="oklch(82% 0.06 350 / 0.85)" strokeWidth="0.6">
      <circle cx="120" cy="120" r="100" opacity="0.4" />
      <circle cx="120" cy="120" r="80" opacity="0.6" />
      <circle cx="120" cy="120" r="60" opacity="0.8" strokeDasharray="2 4" />
      <path d="M120 30 L150 120 L120 210 L90 120 Z" />
      <path d="M30 120 L120 90 L210 120 L120 150 Z" opacity="0.7" />
      <g stroke="oklch(72% 0.18 350 / 0.85)">
        <path d="M120 60 L130 120 L120 180 L110 120 Z" />
        <path d="M60 120 L120 110 L180 120 L120 130 Z" />
      </g>
      <circle cx="120" cy="120" r="6" fill="oklch(72% 0.18 350)" stroke="none" />
      <circle cx="120" cy="120" r="14" opacity="0.5" />
      <text x="120" y="232" textAnchor="middle"
            fontFamily="JetBrains Mono" fontSize="6" letterSpacing="2"
            fill="oklch(82% 0.06 350 / 0.6)" stroke="none">
        N · V · 001 · MMXXVI
      </text>
    </svg>
  );
}

/* Top bar */
function TopBar({ onMenu, onCart, cartCount, time }) {
  return (
    <div className="topbar">
      <div className="left">
        <button className="icon-btn" onClick={onMenu} aria-label="Open menu">
          <span className="bars"><span></span><span></span></span>
        </button>
      </div>
      <a href="#" className="brand-mark" onClick={(e) => e.preventDefault()}>
        Noctra<span className="dot"></span>Vale
      </a>
      <div className="right">
        <span className="timecode">{time}</span>
        <button className="icon-btn" onClick={onCart} aria-label="Cart">
          Cart<span style={{ color: 'var(--chrome)', marginLeft: 6 }}>({cartCount})</span>
        </button>
      </div>
    </div>
  );
}

/* Bottom bar */
function BottomBar({ scene, reelIndex, reelCount }) {
  return (
    <div className="bottombar">
      <div className="crumb">
        <span>{scene.toUpperCase()}</span>
      </div>
      <div className="reel">
        {Array.from({ length: reelCount }).map((_, i) => (
          <span key={i} className={"pill" + (i === reelIndex ? " active" : "")}></span>
        ))}
      </div>
      <div></div>
    </div>
  );
}

/* Side menu */
function Menu({ open, onClose, onNavigate }) {
  const [hover, setHover] = useState(null);
  useEffect(() => {
    if (!open) { window.NV.setMood('home'); return; }
    if (hover) window.NV.setMood(hover);
  }, [open, hover]);

  const items = [
    { id: 'home',       label: 'Home',       mood: 'home',       prev: 'preview-home' },
    { id: 'collection', label: 'Collection', mood: 'collection', prev: 'preview-coll' },
    { id: 'archive',    label: 'Archive',    mood: 'archive',    prev: 'preview-archive' },
    { id: 'campaign',   label: 'Campaign',   mood: 'campaign',   prev: 'preview-camp' },
    { id: 'about',      label: 'About',      mood: 'about',      prev: 'preview-about' },
    { id: 'cart',       label: 'Cart',       mood: 'cart',       prev: 'preview-cart' },
  ];

  return (
    <div className={"menu" + (open ? " open" : "")}>
      <div className="scrim" onClick={onClose}></div>
      <aside className="panel" role="dialog" aria-label="Navigation">
        <div className="menu-head">
          <span className="eyebrow">Index · Noctra Vale</span>
          <button className="menu-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 14 14"><path d="M2 2 L12 12 M12 2 L2 12" /></svg>
          </button>
        </div>

        <ul className="menu-list">
          {items.map((item, i) => (
            <li key={item.id} style={{ "--d": `${0.15 + i * 0.06}s` }}>
              <a href="#"
                 onMouseEnter={() => setHover(item.mood)}
                 onMouseLeave={() => setHover(null)}
                 onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}>
                <span style={{ position: 'relative' }}>
                  {item.label}
                  <span className="preview"><span className={"pv " + item.prev}></span></span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="menu-foot">
          <div className="col">
            <span>Coordinates</span>
            <b>52.5° N / 13.4° E</b>
          </div>
          <div className="col">
            <span>Drop</span>
            <b>01 · MMXXVI</b>
          </div>
          <div className="col">
            <span>Members</span>
            <b>0184 / 0500</b>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* Sigil easter egg */
function HiddenSigil({ onFound }) {
  const [hoverStart, setHoverStart] = useState(null);
  const [whispered, setWhispered] = useState(false);
  const [found, setFound] = useState(false);
  const timerRef = useRef(null);

  function onEnter() {
    setHoverStart(Date.now());
    timerRef.current = setTimeout(() => {
      setWhispered(true);
      window.NV.whisper("You found something.", 2600);
    }, 3000);
  }
  function onLeave() {
    clearTimeout(timerRef.current);
    setHoverStart(null);
  }
  function onClick() {
    if (!whispered) return;
    setFound(true);
    onFound();
  }

  return (
    <button
      className={"sigil" + (found ? " found" : "")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      aria-label="Hidden sigil"
    >
      <span className="ring"></span>
      <Sigil size={48} color="oklch(82% 0.12 350)" />
    </button>
  );
}

/* Found-modal */
function FoundModal({ open, onClose }) {
  return (
    <div className={"found-modal" + (open ? " open" : "")}>
      <div className="scrim" onClick={onClose}></div>
      <div className="card">
        <div className="sigil-glow"><Sigil size={72} color="oklch(82% 0.12 350)" /></div>
        <h3>You found something.</h3>
        <p>A 2% Hidden Member Access has been etched into your archive.</p>
        <div className="code">
          <span className="dot"></span>
          NV · 02 · UNDERLEAF
        </div>
        <div>
          <button className="dismiss" onClick={onClose}>Close · the whisper remains</button>
        </div>
      </div>
    </div>
  );
}

/* Cart drawer */
function CartDrawer({ open, onClose, items, onCheckout }) {
  const sub = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <aside className={"cart-drawer" + (open ? " open" : "")} aria-hidden={!open}>
      <div className="head">
        <h3>Stillness · 0{items.length}</h3>
        <button className="menu-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 2 L12 12 M12 2 L2 12" />
          </svg>
        </button>
      </div>
      <div className="body">
        {items.length === 0 && <div className="cart-empty">The archive awaits a chosen piece.</div>}
        {items.map((it, idx) => (
          <div key={idx} className="cart-line">
            <div className="thumb">
              <div className={"photo " + it.bg}></div>
              <div className="garment-silhouette"><GarmentSilhouette kind={it.kind} /></div>
            </div>
            <div className="meta">
              <h4>{it.name}</h4>
              <span className="sub">SIZE {it.size} · QTY {it.qty}</span>
              <span className="price">€{it.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-foot">
        <div className="totals"><span>Subtotal</span><span>€{sub}</span></div>
        <div className="totals"><span>Shipping</span><span>Wrapped in linen</span></div>
        <div className="totals grand"><span>Total</span><span>€{sub}</span></div>
        <div className="packaging">Each piece arrives sealed in linen, with a numbered cyanotype tag.</div>
        <button className="cta" onClick={onCheckout}>Enter Stillness Protocol</button>
      </div>
    </aside>
  );
}

window.NVUI = { Sigil, Reveal, GarmentSilhouette, Embroidery, TopBar, BottomBar, Menu, HiddenSigil, FoundModal, CartDrawer };
