// Decorative family photo with speech bubbles. The words are real text; the
// picture itself is decorative (empty alt).
//
// IMAGE places the photo inside the wrapper. left and top are percentages of
// the wrapper; width is a zoom on the figures. If it looks off, nudge these
// three numbers.
const IMAGE = { width: 120, left: -10.9, top: 1.1 };

// Bubbles sit above each speaker. left and top are percentages of the wrapper,
// so they can be nudged to sit above each character's head. Bubbles have a
// fixed width, so left = centre - 10.5.
const BUBBLES = [
  { km: "យាយ", roman: "Yay", left: 7.5, top: 5.4, tail: "br", tone: "gold", delay: 700 },
  { km: "ពូ", roman: "Pou", left: 62.4, top: 1.7, tail: "bc", tone: "emerald", delay: 1000 },
  { km: "អូន", roman: "Oun", left: 37.5, top: 84.8, tail: "tc", tone: "mint", delay: 1300 },
];

export default function HeroVisual() {
  return (
    <div
      className="home-visual"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1.32",
        containerType: "inline-size",
      }}
    >
      <img
        src="/images/home-family.png"
        alt=""
        width={1024}
        height={1024}
        decoding="async"
        style={{
          position: "absolute",
          width: `${IMAGE.width}%`,
          height: "auto",
          aspectRatio: "1 / 1",
          left: `${IMAGE.left}%`,
          top: `${IMAGE.top}%`,
          maxWidth: "none",
          mixBlendMode: "screen",
        }}
      />
      {BUBBLES.map((b) => (
        <div
          key={b.km}
          className="home-bubble"
          data-tail={b.tail}
          data-tone={b.tone}
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            animationDelay: `${b.delay}ms, ${b.delay + 600}ms`,
          }}
        >
          <span lang="km" className="home-bubble-km">
            {b.km}
          </span>
          <span className="home-bubble-roman">{b.roman}</span>
        </div>
      ))}
    </div>
  );
}
