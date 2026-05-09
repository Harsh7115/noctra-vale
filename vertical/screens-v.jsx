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
    const wrapperRefs = useRef([]);
    const currentIdxRef = useRef(reelIndex);

    // Keep ref in sync without triggering the effect again
    useEffect(() => { currentIdxRef.current = reelIndex; }, [reelIndex]);

    // IntersectionObserver — updates reel pills in the bottom bar
    useEffect(() => {
      const app = document.querySelector('.app');
      if (!app) return;

      const observers = wrapperRefs.current.map((el, i) => {
        if (!el) return null;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              const delta = i - currentIdxRef.current;
              if (delta !== 0) onReel(delta);
            }
          },
          { threshold: 0.55, root: app }
        );
        obs.observe(el);
        return obs;
      });

      return () => observers.forEach(o => o && o.disconnect());
    }, []);

    return (
      <section className="hero-vert-section page" data-screen-label="01 Hero">
        {FRAMES.map((frame, i) => (
          <div
            key={i}
            className="hero-vert-wrapper"
            ref={el => wrapperRefs.current[i] = el}
          >
            <div className="hero-vert-frame">
              {/* Film background */}
              <div className={`film ${frame.film}`}>
                <div className="film-shape"></div>
              </div>

              {/* Copy — re-animates each time it enters the viewport */}
              <div className="hero-copy" key={`copy-${i}`}>
                <span className="eyebrow">{frame.eyebrow}</span>
                <h1>
                  <Reveal stagger={0.05}>{frame.h1a}</Reveal><br />
                  <em><Reveal delay={0.25} stagger={0.05}>{frame.h1b}</Reveal></em>
                </h1>
                <span className="tag">
                  <span className="dash"></span> {frame.tag}
                </span>
              </div>

              {/* Scroll hint on all but the last frame */}
              {i < FRAMES.length - 1 && (
                <div className="hero-scroll-hint" aria-hidden="true">
                  <svg viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                    <line x1="6" y1="1" x2="6" y2="14" />
                    <polyline points="2,10 6,15 10,10" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    );
  }

  // Replace Hero in the shared NVScreens registry
  window.NVScreens.Hero = HeroVertical;
}
