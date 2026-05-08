/* Noctra Vale — app shell */
const { useState, useEffect, useMemo } = React;
const { TopBar, BottomBar, Menu, HiddenSigil, FoundModal, CartDrawer } = window.NVUI;
const { Hero, Collection, Product, Archive } = window.NVScreens;

function useClock() {
  const [t, setT] = useState(() => fmt(new Date()));
  useEffect(() => {
    const id = setInterval(() => setT(fmt(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);
  return t;
}
function fmt(d) {
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `BERLIN · ${hh}:${mm}`;
}

function App() {
  const [scene, setScene] = useState('home');           // home | collection | archive | product
  const [productId, setProductId] = useState(null);
  const [reel, setReel] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [foundOpen, setFoundOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const time = useClock();

  // mood follows scene
  useEffect(() => {
    const moodMap = { home: 'home', collection: 'collection', product: 'collection', archive: 'archive' };
    if (!menuOpen) window.NV.setMood(moodMap[scene] || 'home');
  }, [scene, menuOpen]);

  // keyboard
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        if (foundOpen) setFoundOpen(false);
        else if (menuOpen) setMenuOpen(false);
        else if (cartOpen) setCartOpen(false);
      }
      if (scene === 'home' && !menuOpen) {
        if (e.key === 'ArrowRight') setReel(r => (r + 1) % 3);
        if (e.key === 'ArrowLeft')  setReel(r => (r - 1 + 3) % 3);
      }
      if (e.key.toLowerCase() === 'm') setMenuOpen(o => !o);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [scene, menuOpen, cartOpen, foundOpen]);

  function navigate(id) {
    setMenuOpen(false);
    if (id === 'cart') { setCartOpen(true); return; }
    if (id === 'home')        setScene('home');
    else if (id === 'collection') setScene('collection');
    else if (id === 'archive') setScene('archive');
    else if (id === 'campaign') {
      window.NV.whisper("Campaign films load in stillness — try the Archive for now.", 3200);
      setScene('archive');
    }
    else if (id === 'about') {
      window.NV.whisper("Noctra Vale is a small Berlin studio. Open the Archive to read.", 3200);
      setScene('archive');
    }
    else setScene('home');
  }

  function openProduct(pid) {
    setProductId(pid);
    setScene('product');
  }

  function addToCart(piece, size) {
    setCart(c => {
      const existing = c.find(x => x.id === piece.id && x.size === size);
      if (existing) return c.map(x => x === existing ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { id: piece.id, name: piece.name, price: piece.price, size, qty: 1, kind: piece.kind, bg: piece.bg }];
    });
    window.NV.whisper(`${piece.name} · added in stillness.`, 2400);
    setCartOpen(true);
  }

  const reelCount = scene === 'home' ? 3 : 1;
  const reelIdx = scene === 'home' ? reel : 0;

  return (
    <>
      <TopBar
        onMenu={() => setMenuOpen(true)}
        onCart={() => setCartOpen(true)}
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        time={time}
      />

      <main className="app">
        {scene === 'home' && (
          <Hero
            reelIndex={reel}
            onReel={(d) => setReel(r => (r + d + 3) % 3)}
            onProduct={openProduct}
          />
        )}
        {scene === 'collection' && <Collection onProduct={openProduct} />}
        {scene === 'product' && <Product id={productId} onBack={() => setScene('collection')} onAdd={addToCart} />}
        {scene === 'archive' && <Archive onLine={(n) => window.NV.whisper(n, 1800)} />}
      </main>

      {/* Hidden sigil only on hero */}
      {scene === 'home' && <div style={{ position: 'fixed', left: 0, bottom: 0, zIndex: 6 }}>
        <HiddenSigil onFound={() => setFoundOpen(true)} />
      </div>}

      <BottomBar scene={scene} reelIndex={reelIdx} reelCount={reelCount} />

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={navigate} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} onCheckout={() => window.NV.whisper("Stillness Protocol initiated · linen wrapped at dawn.", 3000)} />
      <FoundModal open={foundOpen} onClose={() => setFoundOpen(false)} />

      <div className="night-badge">
        <span className="pulse"></span>
        After-hours visuals · 21:00 — 06:00
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
