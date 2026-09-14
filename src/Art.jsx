export function GameArt({ type = "cards", className = "" }) {
  return (
    <svg className={className} viewBox="0 0 320 190" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".12">
        <circle cx="160" cy="95" r="72" />
        <circle cx="160" cy="95" r="88" />
      </g>
      {type === "cards" && (
        <g transform="translate(90 25) rotate(-12 70 70)">
          <rect x="38" y="5" width="100" height="135" rx="8" fill="#244c43" />
          <rect
            x="2"
            y="20"
            width="100"
            height="135"
            rx="8"
            fill="#f8f0d8"
            stroke="#243c35"
            strokeWidth="2"
          />
          <path d="M18 92L51 43 83 92 51 130Z" fill="#df673f" />
          <circle cx="51" cy="86" r="11" fill="#f8f0d8" />
          <path d="M16 34h15M73 139h15" stroke="#243c35" strokeWidth="3" />
        </g>
      )}
      {type === "sushi" && (
        <g>
          <ellipse cx="160" cy="130" rx="90" ry="24" fill="#355b4e" />
          <ellipse cx="160" cy="124" rx="86" ry="20" fill="#f3e9d4" />
          {[108, 160, 212].map((x, i) => (
            <g key={x}>
              <rect
                x={x - 22}
                y={72 + (i % 2) * 10}
                width="44"
                height="48"
                rx="16"
                fill="#f5f1df"
              />
              <rect
                x={x - 26}
                y={63 + (i % 2) * 10}
                width="52"
                height="26"
                rx="13"
                fill="#e18769"
              />
              <path
                d={`M${x - 10} ${67 + (i % 2) * 10}l8 18m8-18 8 18`}
                stroke="#f7c7a0"
                strokeWidth="3"
              />
            </g>
          ))}
        </g>
      )}
      {type === "pencil" && (
        <g transform="rotate(-14 160 95)">
          <rect
            x="85"
            y="30"
            width="132"
            height="135"
            rx="8"
            fill="#faf5dc"
            stroke="#4b4163"
            strokeWidth="2"
          />
          <path
            d="M109 64h60m-60 17h84m-84 17h62"
            stroke="#b4a2cc"
            strokeWidth="5"
          />
          <path d="M173 127l30-72 14 6-30 72-15 14Z" fill="#ef7655" />
          <path d="M172 147l1-20 14 6Z" fill="#344941" />
        </g>
      )}
      {type === "orbit" && (
        <g>
          <circle cx="160" cy="95" r="49" fill="#f1be6c" />
          <ellipse
            cx="160"
            cy="95"
            rx="94"
            ry="29"
            stroke="#244341"
            strokeWidth="9"
            fill="none"
            transform="rotate(-28 160 95)"
          />
          <circle cx="223" cy="43" r="13" fill="#ec7a59" />
          <path
            d="M83 37v15m-8-7h16M245 130v15m-8-7h16"
            stroke="#f7f0df"
            strokeWidth="3"
          />
        </g>
      )}
      {(type === "mountain" || type === "island") && (
        <g>
          <circle cx="207" cy="51" r="24" fill="#f6ce83" />
          <path d="M64 145l70-102 83 102Z" fill="#3b6253" />
          <path d="M135 145l54-78 72 78Z" fill="#7d9974" />
          <path d="M115 73l19-30 26 33-26-10Z" fill="#f7f0df" />
          <path d="M65 153h193M95 166h130" stroke="#d6edcb" strokeWidth="4" />
          {type === "island" && (
            <path
              d="M98 127V83m0 0c-20-32-40-7-32 2m32-2c26-31 44-4 32 2"
              stroke="#183f38"
              strokeWidth="8"
              fill="none"
            />
          )}
        </g>
      )}
      {type === "tiles" && (
        <g transform="translate(96 35) rotate(-9 65 65)">
          {Array.from({ length: 9 }, (_, i) => (
            <g
              key={i}
              transform={`translate(${(i % 3) * 44} ${Math.floor(i / 3) * 44})`}
            >
              <rect
                width="39"
                height="39"
                rx="4"
                fill={["#286570", "#fbf1d6", "#d76e4a"][i % 3]}
              />
              <path
                d="M5 19L19 5l14 14-14 14Z"
                fill={["#8dc7c2", "#ddb768", "#efb28d"][i % 3]}
              />
            </g>
          ))}
        </g>
      )}
      {type === "dial" && (
        <g>
          <path d="M70 140a90 90 0 01180 0Z" fill="#f2e7ca" />
          {["#df6444", "#eda26c", "#e5c774", "#7faba0"].map((c, i) => (
            <path
              key={c}
              d={`M${85 + i * 20} 140a${75 - i * 20} ${75 - i * 20} 0 01${150 - i * 40} 0`}
              stroke={c}
              strokeWidth="18"
              fill="none"
            />
          ))}
          <path d="M160 140l34-80" stroke="#233e37" strokeWidth="7" />
          <circle cx="160" cy="140" r="13" fill="#233e37" />
          <rect x="62" y="141" width="196" height="14" rx="7" fill="#233e37" />
        </g>
      )}
    </svg>
  );
}
export function HeroArt() {
  return (
    <svg viewBox="0 0 560 370" aria-hidden="true" className="hero-art">
      <ellipse cx="292" cy="295" rx="213" ry="28" fill="#0e201d" opacity=".5" />
      <circle
        cx="293"
        cy="179"
        r="145"
        fill="none"
        stroke="#71867b"
        strokeDasharray="4 12"
        opacity=".5"
      />
      <path d="M52 103l7-18 7 18 18 7-18 7-7 18-7-18-18-7Z" fill="#dff491" />
      <path d="M475 191l5-12 5 12 12 5-12 5-5 12-5-12-12-5Z" fill="#ee8964" />
      <g transform="rotate(15 350 165)">
        <rect
          x="298"
          y="59"
          width="141"
          height="204"
          rx="13"
          fill="#e9845e"
          stroke="#122c27"
          strokeWidth="3"
        />
        <rect
          x="309"
          y="71"
          width="119"
          height="180"
          rx="6"
          fill="none"
          stroke="#572f2a"
        />
        <path d="M368 102l39 57-39 57-39-57Z" fill="#273f34" />
        <circle cx="368" cy="159" r="18" fill="#edc59a" />
      </g>
      <g transform="rotate(-17 210 192)">
        <rect
          x="116"
          y="102"
          width="167"
          height="190"
          rx="13"
          fill="#efe9d3"
          stroke="#172e2b"
          strokeWidth="3"
        />
        <path d="M138 126h31m-31 10h19" stroke="#38554a" strokeWidth="4" />
        <circle cx="201" cy="197" r="48" fill="#9ebaaa" />
        <path d="M167 224l34-65 34 65Z" fill="#254a3d" />
        <path d="M183 194l18-35 18 35-18-10Z" fill="#eff0d2" />
        <path d="M241 259h21" stroke="#38554a" strokeWidth="4" />
      </g>
      <g transform="rotate(12 357 278)">
        <rect
          x="301"
          y="235"
          width="92"
          height="86"
          rx="18"
          fill="#bed578"
          stroke="#172e2b"
          strokeWidth="3"
        />
        {[
          [325, 256],
          [370, 256],
          [347, 278],
          [325, 300],
          [370, 300],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="6" fill="#2c4a35" />
        ))}
      </g>
      <circle
        cx="115"
        cy="278"
        r="24"
        fill="#d88658"
        stroke="#172e2b"
        strokeWidth="3"
      />
      <circle cx="115" cy="278" r="16" fill="none" stroke="#713f2d" />
      <path
        d="M483 74q-42-26-72-1m0 0 13-1m-13 1 5-12"
        stroke="#b6c5b1"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
