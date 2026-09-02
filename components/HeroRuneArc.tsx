"use client";

const runeItems = [
  { rune: "ᚠ", color: "#8b5cf6", begin: "0s" },
  { rune: "ᚱ", color: "#9d5cff", begin: "-6s" },
  { rune: "ᚨ", color: "#a855f7", begin: "-12s" },
  { rune: "ᚲ", color: "#b45cff", begin: "-18s" },
  { rune: "ᛏ", color: "#c084fc", begin: "-24s" },
  { rune: "ᚾ", color: "#d08cff", begin: "-30s" },
  { rune: "ᛃ", color: "#c084fc", begin: "-36s" },
  { rune: "ᛇ", color: "#a855f7", begin: "-42s" },
];

export default function HeroRuneArc() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 8%, black 82%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 8%, black 82%, transparent 100%)",
      }}
    >
      <svg
        className="absolute right-[0%] top-[-8%] h-[115%] w-[58%]"
        viewBox="0 0 600 760"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="hero-rune-arc"
            d="M140 -60 C140 140, 170 300, 235 445 C300 590, 405 680, 550 740"
          />
        </defs>

        {runeItems.map((item, index) => (
          <g key={`${item.rune}-${index}`}>
            <circle
              cx="0"
              cy="0"
              r="22"
              fill={item.color}
              opacity="0.07"
              style={{
                filter: "blur(10px)",
              }}
            />
            
            <text
              x="-14"
              y="14"
              fontSize="65"
              fontFamily="serif"
              fontWeight="500"
              fill={item.color}
              opacity="1"
              style={{
                filter: `
                  drop-shadow(0 0 5px ${item.color})
                  drop-shadow(0 0 12px ${item.color})
                  drop-shadow(0 0 30px ${item.color})
                `,
              }}
            >
              {item.rune}
            </text>

            <animateMotion
              dur="48s"
              begin={item.begin}
              repeatCount="indefinite"
              rotate="0"
            >
              <mpath href="#hero-rune-arc" />
            </animateMotion>
          </g>
        ))}
      </svg>
    </div>
  );
}