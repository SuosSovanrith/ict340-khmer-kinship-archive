"use client";

// Home page motion and states. One global style block, every selector
// prefixed "home-". Motion is opt-in: reduced-motion users get a static page.
export default function HomeStyles() {
  return (
    <style jsx global>{`
      @keyframes home-rise {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      .home-rise {
        animation: home-rise 600ms ease both;
      }

      .home-cta {
        transition: transform 160ms, box-shadow 160ms;
      }
      .home-cta:hover {
        filter: brightness(1.08);
        box-shadow: 0 8px 24px rgba(212, 175, 55, 0.25);
      }
      .home-cta:hover .home-cta-arrow {
        transform: translateX(4px);
      }
      .home-cta-arrow {
        display: inline-block;
        transition: transform 160ms;
      }
      .home-cta:focus-visible {
        outline: 3px solid #E8C870;
        outline-offset: 3px;
      }

      @media (prefers-reduced-motion: reduce) {
        .home-rise,
        .home-cta,
        .home-cta-arrow {
          animation: none;
          transition: none;
        }
      }
    `}</style>
  );
}