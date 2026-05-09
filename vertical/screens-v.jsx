/* Vertical hero override — replaces window.NVScreens.Hero only */
{
  const { useState, useEffect, useRef } = React;
  const { Reveal } = window.NVUI;

  const FRAMES = [
    {
      film: 'film-1',
      eyebrow: 'Archive 01 · Stillness Protocol',
      h1a: 'Your presence speaks',
      h1b: 'before you do.',
      tag: 'A wearable archive · 6 pieces',
    },
    {
      film: 'film-2',
      eyebrow: 'Film I · Underleaf',
      h1a: 'A garment is',
      h1b: 'a private weather.',
      tag: 'Cathedral Jacket · in the rain',
    },
    {
      film: 'film-3',
      eyebrow: 'Film II · Cathedral',
      h1a: 'Worn like',
      h1b: 'a held breath.',
      tag: 'Etheric Tee · NV/01',
    },
  ];

  function HeroVertical({ reelIndex, onReel }) {
    const containerRef  = useRef(null);
    const wrapperRefs   = useRef([]);
    const currentIdxRef = useRef(reelIndex);
    const [activeFrame, setActiveFrame] = useState(0);

    // Keep ref current without re-running the observer effect
    useEffect(() => { currentIdxRef.current = reelIndex; }, [reelIndex]);

    // IntersectionObserver — fires when a frame fully snaps into view
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observers = wrapperRefs.current.map((el, i) => {
        if (!el) return null;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveFrame(i);                          // re-triggers copy animation
              const delta = i - currentIdxRef.current;
              if (delta !== 0) onReel(delta);             // syncs bottom bar pills
            }
          },
          { threshold: 0.6, root: container }
        );
        obs.observe(el);
        return obs;
      });

      return () => observers.forEach(o => o && o.disconnect());
    }, []);

    return (
      <section className="hero-vert-section page" data-screen-label="01 Hero">
        <div ref={containerRef} className="hero-vert-scroll">
          {FRAMES.map((frame, i) => (
            <div
              key={i}
              className="hero-vert-wrapper"
              ref={el => wrapperRefs.current[i] = el}
            >
              {/* Film background */}
              <div className="hero-vert-frame">
                <div className={`film ${frame.film}`}>
                  <div className="film-shape"></div>
                </div>
              </div>

              {/* Copy — remounts on each snap so Reveal re-animates */}
              <div
                className="hero-copy"
                key={activeFrame === i ? `${i}-visible` : `${i}-hidden`}
              >
                <span className="eyebrow">{frame.eyebrow}</span>
                <h1>
                  <Reveal stagger={0.05}>{frame.h1a}</Reveal><br />
                  <em><Reveal delay={0.25} stagger={0.05}>{frame.h1b}</Reveal></em>
                </h1>
                <span className="tag">
                  <span className="dash"></span> {frame.tag}
                </span>
              </div>

              {/* Scroll hint on frames 1 and 2 */}
              {i < FRAMES.length - 1 && (
                <div className="hero-scroll-hint" aria-hidden="true">
                  <svg viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                    <line x1="6" y1="1" x2="6" y2="14" />
                    <polyline points="2,10 6,15 10,10" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Replace Hero in the shared NVScreens registry
  window.NVScreens.Hero = HeroVertical;
}
