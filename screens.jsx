/* Screens for Noctra Vale */
const { Sigil, Reveal, GarmentSilhouette, Embroidery } = window.NVUI;

/* Catalog */
const PIECES = [
  { id: 'tee',    code: 'NV/01', name: 'Etheric Tee',         type: 'T-Shirt',          price: 240, kind: 'tee',
    bg: 'garment-tee',    span: 'span-5', shape: 'tall',     rare: true,
    whisper: 'A whisper across the chest.', edition: '120 made',
    fabric: 'Heavy 320gsm Japanese cotton, garment-dyed',
    detail: 'Hand-pulled emulsion print · raw hem',
    verse: 'Worn first by ghosts.' },
  { id: 'hoodie', code: 'NV/02', name: 'Underleaf Hoodie',    type: 'Hoodie',           price: 580, kind: 'hoodie',
    bg: 'garment-hoodie', span: 'span-7', shape: 'wide',     rare: false,
    whisper: 'For the hour before dawn.', edition: '90 made',
    fabric: 'Brushed loop-back — 480gsm — French terry',
    detail: 'Cybersigil embroidery — 14k matte chrome thread',
    verse: 'Pulled close, the city dissolves.' },
  { id: 'jacket', code: 'NV/03', name: 'Cathedral Jacket',    type: 'Outerwear',        price: 1240, kind: 'jacket',
    bg: 'garment-jacket', span: 'span-8', shape: 'portrait', rare: true,
    whisper: 'An architecture, worn quietly.', edition: '40 made',
    fabric: 'Waxed Italian canvas — bonded with silk lining',
    detail: 'Storm placket · interior pocket lined in moiré',
    verse: 'Built like a chapel for one.' },
  { id: 'jeans',  code: 'NV/04', name: 'Vale Oversized Jean', type: 'Denim',            price: 460, kind: 'jeans',
    bg: 'garment-jeans',  span: 'span-4', shape: 'tall',     rare: false,
    whisper: 'Falls like fog on the body.', edition: '160 made',
    fabric: 'Selvedge from a small mill in Okayama',
    detail: 'Wide drape · concealed knee taper',
    verse: 'A long night, folded down.' },
  { id: 'crop',   code: 'NV/05', name: 'Aether Crop',         type: 'Crop Top',         price: 220, kind: 'crop',
    bg: 'garment-crop',   span: 'span-5', shape: 'wide',     rare: true,
    whisper: 'A line across the body, then silence.', edition: '80 made',
    fabric: 'Bonded mesh layered over silk jersey',
    detail: 'Hand-finished horizontal seam',
    verse: 'Half a syllable, held mid-breath.' },
  { id: 'pants',  code: 'NV/06', name: 'Stillness Sweatpant', type: 'Baggy Sweatpant',  price: 380, kind: 'pants',
    bg: 'garment-pants',  span: 'span-7', shape: 'portrait', rare: false,
    whisper: 'The garment that listens.', edition: '120 made',
    fabric: 'Cashmere-blend loopback · 520gsm',
    detail: 'Anchor cord · brushed inner face',
    verse: 'Worn between rooms, between thoughts.' },
];
window.NV_PIECES = PIECES;

/* ─── Hero scene ─── */
function Hero({ reelIndex, onReel, onProduct }) {
  const lines = [
    { eyebrow: 'Archive 01 · Stillness Protocol',  h1a: 'Your presence speaks',  h1b: 'before you do.', tag: 'A wearable archive · 6 pieces' },
    { eyebrow: 'Film I · Underleaf',                h1a: 'A garment is',          h1b: 'a private weather.',  tag: 'Cathedral Jacket · in the rain' },
    { eyebrow: 'Film II · Cathedral',               h1a: 'Worn like',             h1b: 'a held breath.', tag: 'Etheric Tee · NV/01' },
  ];
  const line = lines[reelIndex];

  const [dragOffset, setDragOffset] = useState(0);
  const drag = useRef({ active: false, startX: 0, startY: 0, isHorizontal: null });

  function dragStart(x, y) {
    drag.current = { active: true, startX: x, startY: y, isHorizontal: null };
  }
  function dragMove(x, y) {
    const d = drag.current;
    if (!d.active) return;
    const dx = x - d.startX;
    const dy = y - d.startY;
    if (d.isHorizontal === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      d.isHorizontal = Math.abs(dx) >= Math.abs(dy);
    }
    if (d.isHorizontal) setDragOffset(dx * 0.35);
  }
  function dragEnd(x) {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    const dx = x - d.startX;
    setDragOffset(0);
    if (Math.abs(dx) > 50) onReel(dx < 0 ? 1 : -1);
  }

  return (
    <section className="scene page" data-screen-label="01 Hero">
      <div className="hero"
        style={{ userSelect: 'none' }}
        onTouchStart={e => dragStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={e => dragMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={e => dragEnd(e.changedTouches[0].clientX)}
        onMouseDown={e => { if (e.button === 0) dragStart(e.clientX, e.clientY); }}
        onMouseMove={e => dragMove(e.clientX, e.clientY)}
        onMouseUp={e => dragEnd(e.clientX)}
        onMouseLeave={e => { if (drag.current.active) dragEnd(e.clientX); }}
      >
        <div className="hero-reel" style={{
          transform: `translateX(calc(-${reelIndex * 100}% + ${dragOffset}px))`,
          transition: dragOffset !== 0 ? 'none' : undefined
        }}>
          <div className="hero-frame"><div className="film film-1"><div className="film-shape"></div></div></div>
          <div className="hero-frame"><div className="film film-2"><div className="film-shape"></div></div></div>
          <div className="hero-frame"><div className="film film-3"><div className="film-shape"></div></div></div>
        </div>

        <div className="hero-copy" key={reelIndex}>
          <span className="eyebrow">{line.eyebrow}</span>
          <h1>
            <Reveal stagger={0.05}>{line.h1a}</Reveal><br/>
            <em><Reveal delay={0.25} stagger={0.05}>{line.h1b}</Reveal></em>
          </h1>
          <span className="tag"><span className="dash"></span> {line.tag}</span>
        </div>

        <div className="hero-edge">
          <button className="nav-arrow" onClick={() => onReel(-1)} aria-label="Previous frame">
            <svg viewBox="0 0 14 14"><path d="M9 2 L3 7 L9 12" /></svg>
          </button>
          <button className="nav-arrow" onClick={() => onReel(1)} aria-label="Next frame">
            <svg viewBox="0 0 14 14"><path d="M5 2 L11 7 L5 12" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Collection ─── */
function Collection({ onProduct }) {
  return (
    <section className="collection page" data-screen-label="02 Collection">
      <div className="coll-head">
        <div>
          <span className="eyebrow">Archive 01 · MMXXVI</span>
          <h2 style={{ marginTop: 18 }}>
            Six pieces, <em>one stillness.</em>
          </h2>
        </div>
        <div className="meta">
          <b>Edition · sealed at sundown</b>
          <span>Each piece is numbered, hand-tagged,<br/>and shipped with its own cyanotype.</span>
        </div>
      </div>

      <div className="coll-grid">
        {PIECES.map((p, i) => (
          <div
            key={p.id}
            className={`coll-card ${p.span} ${p.shape}`}
            onClick={() => onProduct(p.id)}
            onMouseEnter={() => window.NV.whisper(p.whisper, 2200)}
          >
            <div className="frame">
              <div className={"photo " + p.bg}></div>
              <div className="garment-silhouette"><GarmentSilhouette kind={p.kind} /></div>
              <div className="ribbon">
                <span className="pill">{p.code}</span>
                {p.rare && <span className="pill rare">Rare · {p.edition}</span>}
              </div>
              <div className="index">№ {String(i + 1).padStart(3, '0')} / 006</div>
              <div className="whisper">"{p.whisper}"</div>
            </div>
            <div className="info">
              <div>
                <h3>{p.name}</h3>
                <span className="sub">{p.type} · {p.edition}</span>
              </div>
              <div className="price">€{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Product page ─── */
function Product({ id, onBack, onAdd }) {
  const piece = PIECES.find(p => p.id === id) || PIECES[0];
  const [size, setSize] = React.useState('M');
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <section className="product page" data-screen-label={"03 Product · " + piece.name}>
      <div className="product-stage">
        <div className="hero-shot">
          <div className={"photo " + piece.bg}></div>
          <div className="garment-silhouette" style={{ inset: '6%' }}>
            <GarmentSilhouette kind={piece.kind} />
          </div>
          <div className="index">{piece.code} · ARCHIVE 01 · MMXXVI</div>
          <div className="corners"><i></i><b></b></div>
        </div>
        <div className="row">
          <div className="frame embroidery">
            <Embroidery />
            <div className="label-bottom">Cybersigil · 200% zoom</div>
          </div>
          <div className="frame fabric">
            <div className="label-bottom">Fabric · 800% zoom</div>
          </div>
        </div>
      </div>

      <div className="product-meta">
        <div className="head">
          <span className="eyebrow">{piece.code} · {piece.edition}</span>
          <h1><Reveal>{piece.name.split(' ')[0]}</Reveal> <em><Reveal delay={0.2}>{piece.name.split(' ').slice(1).join(' ')}</Reveal></em></h1>
          <p className="verse">"{piece.verse}"</p>
        </div>

        <div className="facts">
          <div><span className="label">Fabric</span><span className="value">{piece.fabric}</span></div>
          <div><span className="label">Detail</span><span className="value">{piece.detail}</span></div>
          <div><span className="label">Made in</span><span className="value">Studio Berlin · by hand</span></div>
          <div><span className="label">Edition</span><span className="value">{piece.edition}</span></div>
        </div>

        <div>
          <span className="label" style={{ display: 'block', marginBottom: 12 }}>Size</span>
          <div className="sizes">
            {sizes.map(s => (
              <button key={s} onClick={() => setSize(s)} className={"size-chip" + (size === s ? " on" : "")}>{s}</button>
            ))}
          </div>
        </div>

        <div className="cta-row">
          <button className="cta" onClick={() => onAdd(piece, size)}>Add · €{piece.price}</button>
          <button className="cta ghost" onClick={onBack}>Return to archive</button>
        </div>

        <div className="lore">
          <div className="row"><span className="label">Lore I</span><span>Drawn from the field notes of an unnamed Berlin atelier, between 03:00 and dawn.</span></div>
          <div className="row"><span className="label">Lore II</span><span>The cybersigil at the chest is a personal mark — never repeated, never reissued.</span></div>
          <div className="row"><span className="label">Lore III</span><span>Each tag is cyanotype-printed under the same evening sky.</span></div>
        </div>

        <div className="tag-strip">
          <span className="dot"></span>
          <span>Authenticity · NFC tag · 0184 of {piece.edition}</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Archive (VHS / forgotten files) ─── */
function Archive({ onLine }) {
  const rows = [
    { ts: '21·11·24', id: 'NV/A·001', title: <>Underleaf <em>study, in fog</em></>, status: 'OPEN', note: 'A coat that never left the studio.' },
    { ts: '04·02·25', id: 'NV/A·002', title: <>Cathedral <em>I — chapel run</em></>, status: 'OPEN', note: 'Tested under 14 hours of rain.' },
    { ts: '17·05·25', id: 'NV/A·003', title: <>Soft <em>weather suit</em></>, status: 'LOCKED', note: 'Held back. Will not ship.', locked: true },
    { ts: '02·08·25', id: 'NV/A·004', title: <>Aether <em>scarf</em></>, status: 'OPEN', note: 'A 3m run of hand-loomed silk.' },
    { ts: '23·10·25', id: 'NV/A·005', title: <>The <em>quiet boot</em></>, status: 'LOCKED', note: 'Soles in development.', locked: true },
    { ts: '11·12·25', id: 'NV/A·006', title: <>Stillness <em>protocol I</em></>, status: 'OPEN', note: 'Becomes Archive 01.' },
    { ts: '04·03·26', id: 'NV/A·007', title: <>Drop II <em>· seedlings</em></>, status: 'LOCKED', note: 'Whisper only.', locked: true },
  ];
  return (
    <section className="archive page" data-screen-label="04 Archive">
      <div className="archive-head">
        <h2>The <em>forgotten files.</em></h2>
        <p>Studies, refusals, and pieces that never reached the archive. Some open. Some held back. Read by candlelight; the screen does not love this place.</p>
      </div>
      <div className="archive-list">
        {rows.map((r, i) => (
          <div className="archive-row" key={i}
               onMouseEnter={() => onLine && onLine(r.note)}>
            <div className="ts">{r.ts}</div>
            <div className="id">{r.id}</div>
            <div className="title">{r.title}</div>
            <div className={"status" + (r.locked ? ' locked' : '')}>{r.status}{r.locked ? ' · sealed' : ''}</div>
            <div className="arrow">↗</div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.NVScreens = { Hero, Collection, Product, Archive };
