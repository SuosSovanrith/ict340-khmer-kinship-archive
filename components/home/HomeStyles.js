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

      .home-hero-grid {
        --home-title: clamp(26px, 8vw, 72px);
        --home-title-km: clamp(22px, 6.6vw, 60px);
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
        gap: clamp(24px, 4vw, 64px);
        align-items: center;
      }
      @media (min-width: 900px) {
        .home-hero-grid {
          --home-title: clamp(30px, 3.8vw, 52px);
          --home-title-km: clamp(26px, 3.4vw, 50px);
        }
      }
      @media (max-width: 899px) {
        .home-hero-grid {
          grid-template-columns: minmax(0, 1fr);
        }
      }

      .home-visual {
        width: 100%;
        max-width: 640px;
        margin: 0 auto;
      }
      @media (max-width: 899px) {
        .home-visual {
          max-width: min(640px, 100%);
          margin-top: 40px;
        }
      }

      .home-bubble {
        --b1: #F6E3A1; --b2: #D4AF37; --glow: rgba(212,175,55,0.45);
        position: absolute;
        box-sizing: border-box;
        width: 21cqw;
        min-height: 19cqw;
        padding: 1.6cqw 1.5cqw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.7cqw;
        text-align: center;
        color: #14181F;
        font-size: 22px;
        font-size: 7.2cqw;
        line-height: 1.25;
        background: linear-gradient(155deg, var(--b1), var(--b2));
        border: 0.6cqw solid rgba(255,255,255,0.6);
        border-radius: 5cqw;
        box-shadow: 0 2.2cqw 4.5cqw rgba(0,0,0,0.45), 0 0 6cqw var(--glow), inset 0 0.6cqw 0 rgba(255,255,255,0.55);
        animation: home-pop 500ms cubic-bezier(0.2, 0.9, 0.3, 1.3) both, home-float 5s ease-in-out infinite;
      }
      .home-bubble[data-tone="emerald"] { --b1: #8CF3D3; --b2: #2EE6A8; --glow: rgba(46,230,168,0.40); }
      .home-bubble[data-tone="mint"] { --b1: #F2E3A9; --b2: #8FEFD0; --glow: rgba(143,239,208,0.35); }
      .home-bubble::after {
        content: "";
        position: absolute;
        box-sizing: border-box;
        width: 3.6cqw;
        height: 3.6cqw;
        transform: rotate(45deg);
        border: 0.6cqw solid rgba(255,255,255,0.6);
      }
      .home-bubble[data-tail="bl"]::after, .home-bubble[data-tail="br"]::after, .home-bubble[data-tail="bc"]::after {
        bottom: -2.4cqw;
        background: var(--b2);
        border-left-color: transparent;
        border-top-color: transparent;
        border-radius: 0 0 1cqw 0;
      }
      .home-bubble[data-tail="bl"]::after { left: 18%; }
      .home-bubble[data-tail="br"]::after { right: 18%; }
      .home-bubble[data-tail="bc"]::after { left: 50%; margin-left: -1.8cqw; }
      .home-bubble[data-tail="tc"]::after {
        top: -2.4cqw;
        left: 50%;
        margin-left: -1.8cqw;
        background: var(--b1);
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-radius: 1cqw 0 0 0;
      }
      .home-bubble-km {
        font-family: "Noto Serif Khmer", serif;
        font-weight: 700;
        line-height: 1.45;
      }
      .home-bubble-roman {
        font-family: ui-monospace, Menlo, Consolas, monospace;
        font-size: 0.42em;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        padding: 0.25em 0.8em;
        border-radius: 999px;
        background: rgba(20,24,31,0.16);
      }
      @keyframes home-pop {
        from {
          opacity: 0;
          transform: scale(0.6);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      @keyframes home-float {
        0%,
        100% {
          translate: 0 0;
        }
        50% {
          translate: 0 -1.2cqw;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .home-rise,
        .home-cta,
        .home-cta-arrow,
        .home-bubble {
          animation: none;
          transition: none;
        }
      }
    `}</style>
  );
}