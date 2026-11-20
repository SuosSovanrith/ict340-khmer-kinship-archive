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
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
        gap: clamp(24px, 4vw, 64px);
        align-items: center;
      }
      @media (max-width: 899px) {
        .home-hero-grid {
          grid-template-columns: minmax(0, 1fr);
        }
      }

      .home-visual {
        max-width: 520px;
        margin: 0 auto;
        width: 100%;
      }
      @media (max-width: 899px) {
        .home-visual {
          max-width: min(380px, 92%);
          margin-top: 40px;
        }
      }
      @media (max-width: 400px) {
        .home-visual {
          max-width: 300px;
        }
      }

      .home-bubble {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2.2cqw 4cqw;
        background: #E8EDF2;
        color: #14181F;
        border-radius: 4.5cqw;
        box-shadow: 0 1.2cqw 3cqw rgba(0, 0, 0, 0.35);
        font-size: 22px;
        font-size: 7.2cqw;
        line-height: 1.25;
        animation: home-pop 500ms cubic-bezier(0.2, 0.9, 0.3, 1.3) both, home-float 5s ease-in-out infinite;
      }
      .home-bubble::after {
        content: "";
        position: absolute;
        bottom: -1.4cqw;
        width: 3cqw;
        height: 3cqw;
        background: inherit;
        transform: rotate(45deg);
      }
      .home-bubble[data-tail="bl"]::after {
        left: 22%;
      }
      .home-bubble[data-tail="br"]::after {
        right: 22%;
      }
      .home-bubble-km {
        font-family: "Noto Serif Khmer", serif;
        font-weight: 700;
        line-height: 1.5;
      }
      .home-bubble-roman {
        font-family: ui-monospace, Menlo, Consolas, monospace;
        font-size: 0.45em;
        color: #5A6373;
        letter-spacing: 0.5px;
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