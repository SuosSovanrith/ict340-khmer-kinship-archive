// Decorative family photo with speech bubbles. The words are real text; the
// picture itself is decorative (empty alt).
//
// left and top are percentages of the picture, so they can be nudged to sit
// above each character's head.
const BUBBLES = [
  { km: "យាយ", roman: "Yay", left: 4, top: 6, tail: "bl", delay: 700 },
  { km: "ពូ", roman: "Pou", left: 60, top: 3, tail: "br", delay: 1000 },
  { km: "អូន", roman: "Oun", left: 34, top: 66, tail: "bl", delay: 1300 },
];

export default function HeroVisual() {
  return (
    <div
      className="home-visual"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        containerType: "inline-size",
      }}
    >
      <div aria-hidden="true" className="home-visual-ring" />
      <img
        src="/images/home-family.png"
        alt=""
        width={1024}
        height={1024}
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          mixBlendMode: "screen",
        }}
      />
      {BUBBLES.map((b) => (
        <div
          key={b.km}
          className="home-bubble"
          data-tail={b.tail}
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
