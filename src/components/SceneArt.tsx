import { memo } from 'react'
import type { SceneId } from '../game/types'

interface Props {
  scene: SceneId
  reduceMotion: boolean
}

const rain = Array.from({ length: 26 }, (_, i) => ({
  x: 20 + ((i * 97) % 1180),
  y: (i * 53) % 320,
  h: 28 + ((i * 37) % 70),
}))

function Tree({ x = 0, y = 0, scale = 1, opacity = 1 }: { x?: number; y?: number; scale?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} fill="none" stroke="#050807" strokeLinecap="round">
      <path d="M160 720 C175 560 160 390 185 210 C190 160 220 110 260 78" strokeWidth="26" />
      <path d="M178 400 C120 330 76 300 24 278" strokeWidth="13" />
      <path d="M182 330 C236 260 280 230 332 210" strokeWidth="11" />
      <path d="M183 250 C130 200 100 174 58 156" strokeWidth="8" />
      <path d="M196 180 C240 140 290 122 338 108" strokeWidth="7" />
      <path d="M214 130 C198 88 192 48 196 12" strokeWidth="6" />
    </g>
  )
}

function Rain({ intensity = 1 }: { intensity?: number }) {
  return (
    <g className="scene-rain" opacity={0.28 * intensity}>
      {rain.map((drop, i) => (
        <line
          key={i}
          x1={drop.x}
          y1={drop.y}
          x2={drop.x - 9}
          y2={drop.y + drop.h}
          stroke="#b7c9c2"
          strokeWidth={i % 4 === 0 ? 1.5 : 0.8}
        />
      ))}
    </g>
  )
}

function Fog({ strong = false }: { strong?: boolean }) {
  return (
    <g className={strong ? 'scene-fog is-strong' : 'scene-fog'} fill="none">
      <ellipse cx="240" cy="640" rx="420" ry="78" fill="#cbd4c7" opacity="0.07" />
      <ellipse cx="880" cy="690" rx="520" ry="92" fill="#b9c8bd" opacity="0.07" />
      <ellipse cx="640" cy="570" rx="360" ry="52" fill="#c7d2c5" opacity="0.05" />
    </g>
  )
}

function BusStopSign({ label = '北新桥', faded = false, x = 900, y = 300 }: { label?: string; faded?: boolean; x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={faded ? 0.7 : 1}>
      <rect x="14" y="80" width="10" height="330" fill="#111816" />
      <rect x="-48" y="0" width="156" height="100" rx="4" fill="#20352e" stroke="#5c7569" strokeWidth="2" />
      <rect x="-38" y="10" width="136" height="80" rx="2" fill="none" stroke="#8da094" strokeWidth="1" opacity="0.35" />
      <text x="31" y="55" textAnchor="middle" fill="#d8cba5" fontSize="30" fontFamily="'Songti SC','Noto Serif CJK SC',serif" letterSpacing="4">
        {label}
      </text>
      <text x="32" y="80" textAnchor="middle" fill="#80958a" fontSize="11" letterSpacing="5">
        13 路 末 班
      </text>
      <path d="M18 405 L0 455 L38 455 Z" fill="#111816" />
    </g>
  )
}

function PaperGrain() {
  return (
    <g pointerEvents="none">
      <filter id="scene-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.10" />
        </feComponentTransfer>
      </filter>
      <rect width="1200" height="800" filter="url(#scene-grain)" opacity="0.7" />
    </g>
  )
}

function Street({ title = false }: { title?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id="street-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={title ? '#111917' : '#0a1110'} />
          <stop offset="0.55" stopColor="#1b2925" />
          <stop offset="1" stopColor="#354039" />
        </linearGradient>
        <linearGradient id="street-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c2926" />
          <stop offset="1" stopColor="#070b0a" />
        </linearGradient>
        <radialGradient id="lamp-glow">
          <stop offset="0" stopColor="#e9d89d" stopOpacity="0.8" />
          <stop offset="0.35" stopColor="#bca769" stopOpacity="0.24" />
          <stop offset="1" stopColor="#8b7d4a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#street-sky)" />
      <circle cx="880" cy="165" r="72" fill="#d8d1ae" opacity="0.14" />
      <circle cx="880" cy="165" r="45" fill="#e0d9b7" opacity="0.19" />
      <g fill="#0a100e" opacity="0.95">
        <path d="M0 445 L0 320 L90 318 L128 275 L205 273 L246 320 L340 322 L374 290 L468 290 L500 328 L620 330 L668 285 L756 284 L794 324 L910 325 L948 270 L1048 269 L1092 323 L1200 325 L1200 510 L0 510 Z" />
      </g>
      <g fill="#131b18" opacity="0.9">
        <path d="M50 448 L50 380 L104 380 L118 350 L166 350 L181 382 L240 382 L240 452 Z" />
        <path d="M322 452 L322 390 L380 390 L398 362 L448 362 L461 392 L520 392 L520 452 Z" />
        <path d="M760 448 L760 370 L816 370 L834 342 L890 342 L904 374 L966 374 L966 450 Z" />
      </g>
      <g stroke="#c7b67b" strokeWidth="2">
        <rect x="91" y="405" width="32" height="31" fill="#b79e5e" opacity="0.13" />
        <rect x="360" y="409" width="30" height="29" fill="#b79e5e" opacity="0.1" />
        <rect x="835" y="402" width="28" height="30" fill="#b79e5e" opacity="0.08" />
      </g>
      <path d="M0 480 C220 464 350 494 620 484 C840 476 1050 462 1200 480 L1200 800 L0 800 Z" fill="url(#street-road)" />
      <path d="M0 504 C320 488 460 520 680 510 C910 500 1060 486 1200 505" stroke="#849184" strokeWidth="1" opacity="0.16" fill="none" />
      <ellipse cx="860" cy="610" rx="310" ry="130" fill="#b49d61" opacity="0.045" />
      <Tree x={-120} y={110} scale={1.02} opacity={0.95} />
      <Tree x={950} y={135} scale={0.7} opacity={0.65} />
      <BusStopSign label="北新桥" faded />
      <g opacity="0.8">
        <rect x="240" y="510" width="4" height="138" fill="#0a0e0d" />
        <path d="M214 510 Q242 483 270 510 Z" fill="#111815" stroke="#52645b" strokeWidth="1" />
        <ellipse cx="242" cy="508" rx="100" ry="60" fill="url(#lamp-glow)" />
        <circle cx="242" cy="508" r="5" fill="#eadca7" opacity="0.8" />
      </g>
      <g className="scene-bus" opacity={title ? 0.82 : 0.5}>
        <path d="M520 490 L780 490 L832 545 L468 545 Z" fill="#080b0a" />
        <rect x="518" y="430" width="266" height="100" rx="16" fill="#0b100e" stroke="#37443e" strokeWidth="1.5" />
        <rect x="542" y="445" width="216" height="48" rx="4" fill="#24322d" opacity="0.6" />
        <rect x="550" y="451" width="44" height="35" fill="#a99058" opacity="0.13" />
        <rect x="604" y="451" width="44" height="35" fill="#a99058" opacity="0.08" />
        <rect x="658" y="451" width="44" height="35" fill="#a99058" opacity="0.1" />
        <circle cx="520" cy="518" r="15" fill="#050807" />
        <circle cx="784" cy="518" r="15" fill="#050807" />
        <rect x="760" y="444" width="14" height="16" rx="3" fill="#9f3e31" opacity="0.65" />
        <path d="M760 465 L646 482" stroke="#b39d65" strokeWidth="1" opacity="0.2" />
      </g>
      {title ? null : <Rain />}
      <Fog strong />
      <PaperGrain />
      {title ? (
        <g>
          <path d="M240 740 C370 690 500 700 620 730" stroke="#d97b65" strokeWidth="1.5" opacity="0.25" fill="none" />
          <circle cx="614" cy="731" r="4" fill="#b34b3c" opacity="0.55" />
        </g>
      ) : null}
    </>
  )
}

function BusInterior({ lost = false }: { lost?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id="bus-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={lost ? '#060a09' : '#111816'} />
          <stop offset="0.65" stopColor={lost ? '#0b100e' : '#28332d'} />
          <stop offset="1" stopColor={lost ? '#040706' : '#151c19'} />
        </linearGradient>
        <linearGradient id="bus-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={lost ? '#0b100e' : '#202924'} />
          <stop offset="1" stopColor="#050807" />
        </linearGradient>
        <linearGradient id="bus-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#253630" />
          <stop offset="0.55" stopColor={lost ? '#111b18' : '#3d5147'} />
          <stop offset="1" stopColor="#0b100e" />
        </linearGradient>
        <radialGradient id="bus-light">
          <stop offset="0" stopColor="#e3d7a9" stopOpacity={lost ? 0.12 : 0.34} />
          <stop offset="1" stopColor="#c1b484" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bus-wall)" />
      <path d="M0 0 L1200 0 L910 210 L290 210 Z" fill="#080c0b" />
      <path d="M0 610 L238 472 L962 472 L1200 610 L1200 800 L0 800 Z" fill="url(#bus-floor)" />
      <path d="M290 210 L910 210 L962 472 L238 472 Z" fill="none" stroke="#45554d" strokeWidth="2" opacity="0.25" />
      <path d="M0 190 L238 250 L238 430 L0 480 Z" fill="#0b110f" opacity="0.85" />
      <path d="M1200 190 L962 250 L962 430 L1200 480 Z" fill="#0b110f" opacity="0.85" />
      <g>
        <path d="M70 245 L230 276 L230 407 L70 445 Z" fill="url(#bus-window)" stroke="#6b7e71" strokeWidth="2" opacity={lost ? 0.55 : 0.8} />
        <path d="M270 210 L415 220 L415 454 L270 466 Z" fill="url(#bus-window)" stroke="#6b7e71" strokeWidth="2" opacity={lost ? 0.6 : 0.9} />
        <path d="M450 212 L555 212 L555 460 L450 460 Z" fill="url(#bus-window)" stroke="#6b7e71" strokeWidth="2" opacity={lost ? 0.55 : 0.9} />
        <path d="M590 212 L695 212 L695 460 L590 460 Z" fill="url(#bus-window)" stroke="#6b7e71" strokeWidth="2" opacity={lost ? 0.55 : 0.9} />
        <path d="M730 212 L845 212 L845 460 L730 460 Z" fill="url(#bus-window)" stroke="#6b7e71" strokeWidth="2" opacity={lost ? 0.55 : 0.9} />
        <path d="M885 214 L1020 214 L1020 448 L885 448 Z" fill="url(#bus-window)" stroke="#6b7e71" strokeWidth="2" opacity={lost ? 0.55 : 0.9} />
      </g>
      <g opacity="0.55" fill="#a99867">
        <rect x="340" y="297" width="14" height="22" rx="2" />
        <rect x="386" y="314" width="9" height="31" rx="1" />
        <rect x="480" y="306" width="18" height="16" rx="2" />
        <rect x="738" y="300" width="13" height="18" rx="2" />
        <rect x="788" y="320" width="24" height="14" rx="2" />
        <rect x="920" y="304" width="15" height="18" rx="2" />
      </g>
      <g stroke="#8b9c90" strokeWidth="4" opacity="0.35" fill="none">
        <path d="M250 250 L250 460" />
        <path d="M955 250 L955 460" />
        <path d="M330 250 L330 390" />
        <path d="M870 250 L870 390" />
        <path d="M420 270 L782 270" strokeWidth="2" />
      </g>
      <g opacity="0.65">
        {[365, 445, 525, 605, 685, 765].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 270 L${x} 335`} stroke="#9b8f6d" strokeWidth="1.4" />
            <path d={`M${x - 19} 350 Q${x} 320 ${x + 19} 350`} fill="none" stroke="#a59b7d" strokeWidth="3" />
            {lost && i === 3 ? <circle cx={x} cy="352" r="2" fill="#a84335" /> : null}
          </g>
        ))}
      </g>
      <g>
        {[130, 260, 390, 520, 650, 780, 910, 1040].map((x, i) => (
          <g key={x} opacity={lost ? 0.78 : 0.9}>
            <rect x={x - 55} y={500 + Math.abs(i - 3.5) * 8} width="108" height="78" rx="12" fill={lost ? '#19201c' : '#303b34'} />
            <rect x={x - 50} y={492 + Math.abs(i - 3.5) * 8} width="98" height="20" rx="8" fill={lost ? '#202923' : '#3d4941'} />
            <rect x={x - 52} y={560 + Math.abs(i - 3.5) * 8} width="102" height="16" rx="4" fill="#111714" />
          </g>
        ))}
      </g>
      <ellipse cx="600" cy="390" rx="460" ry="250" fill="url(#bus-light)" />
      {lost ? (
        <g opacity="0.85">
          <circle cx="610" cy="570" r="5" fill="#7c342c" opacity="0.6" />
          <path d="M616 572 C680 540 770 530 850 548" stroke="#8d3a31" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M622 577 C560 620 480 640 390 628" stroke="#8d3a31" strokeWidth="1" fill="none" opacity="0.35" />
        </g>
      ) : (
        <g opacity="0.8">
          <path d="M1010 500 C980 522 950 534 916 540" stroke="#8f3d32" strokeWidth="1.3" fill="none" />
          <circle cx="1018" cy="498" r="4" fill="#9c4638" />
          <path d="M128 512 C174 520 206 540 224 566" stroke="#7e3930" strokeWidth="1" fill="none" opacity="0.7" />
        </g>
      )}
      <rect y="762" width="1200" height="38" fill="#050807" opacity="0.85" />
      <Fog />
      <PaperGrain />
    </>
  )
}

function GhostStop() {
  return (
    <>
      <defs>
        <linearGradient id="ghost-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1513" />
          <stop offset="0.6" stopColor="#26342e" />
          <stop offset="1" stopColor="#18231f" />
        </linearGradient>
        <radialGradient id="ghost-lamp">
          <stop offset="0" stopColor="#eadba6" stopOpacity="0.7" />
          <stop offset="0.4" stopColor="#b6a46b" stopOpacity="0.18" />
          <stop offset="1" stopColor="#8b7e50" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#ghost-sky)" />
      <g fill="#0a0f0d">
        <path d="M0 500 L0 334 L150 330 L195 280 L300 280 L340 330 L470 332 L508 290 L610 290 L650 332 L780 334 L820 286 L930 286 L970 334 L1100 334 L1140 290 L1200 290 L1200 520 Z" />
      </g>
      <g fill="#1b2621" opacity="0.9">
        <rect x="60" y="386" width="200" height="160" />
        <rect x="320" y="360" width="260" height="186" />
        <rect x="640" y="380" width="250" height="166" />
        <rect x="950" y="378" width="190" height="168" />
      </g>
      <g fill="#0a0f0d">
        <path d="M285 550 L285 380 L335 380 L335 550 Z" />
        <path d="M635 550 L635 402 L680 402 L680 550 Z" />
        <path d="M730 550 L730 365 L786 365 L786 550 Z" />
      </g>
      <rect x="345" y="438" width="34" height="41" fill="#b8a265" opacity="0.14" />
      <rect x="932" y="420" width="28" height="36" fill="#b8a265" opacity="0.1" />
      <path d="M0 550 C230 535 400 555 600 546 C820 536 1030 544 1200 530 L1200 800 L0 800 Z" fill="#0c1210" />
      <path d="M0 585 C250 568 520 592 740 578 C980 562 1080 572 1200 560" stroke="#65766b" strokeWidth="1" opacity="0.2" fill="none" />
      <Tree x={420} y={110} scale={1.2} opacity={0.96} />
      <Tree x={-80} y={80} scale={0.8} opacity={0.6} />
      <g transform="translate(820 300)">
        <rect x="10" y="92" width="8" height="340" fill="#111815" />
        <rect x="-46" y="8" width="124" height="82" rx="3" fill="#293b33" stroke="#5e7468" strokeWidth="2" />
        <text x="16" y="44" textAnchor="middle" fill="#d1c49e" fontSize="26" fontFamily="'Songti SC',serif" letterSpacing="3">井儿</text>
        <text x="16" y="70" textAnchor="middle" fill="#8da093" fontSize="11" letterSpacing="3">胡 同</text>
        <path d="M14 432 L-2 480 L30 480 Z" fill="#111815" />
      </g>
      <g>
        <rect x="242" y="334" width="5" height="225" fill="#101511" />
        <path d="M214 334 Q244 300 276 334 Z" fill="#121a16" stroke="#5a6c60" strokeWidth="1" />
        <ellipse cx="246" cy="326" rx="125" ry="80" fill="url(#ghost-lamp)" />
        <circle cx="246" cy="326" r="4" fill="#eee2b1" opacity="0.78" />
      </g>
      <g className="scene-red-thread">
        <path d="M492 596 C560 580 630 618 706 592 C756 575 798 570 845 585" stroke="#8f352d" strokeWidth="1.6" fill="none" opacity="0.55" />
        <path d="M845 585 C870 560 900 540 930 545" stroke="#8f352d" strokeWidth="1" fill="none" opacity="0.35" />
      </g>
      <g opacity="0.8">
        <path d="M450 520 C448 560 452 600 448 640" stroke="#0b0f0d" strokeWidth="18" />
        <path d="M436 646 C440 628 462 630 468 648 L468 670 L434 670 Z" fill="#0a0e0c" />
      </g>
      <Rain intensity={0.65} />
      <Fog strong />
      <PaperGrain />
    </>
  )
}

function Alley({ returnView = false }: { returnView?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id="alley-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a100e" />
          <stop offset="1" stopColor="#25342e" />
        </linearGradient>
        <linearGradient id="alley-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d2823" />
          <stop offset="1" stopColor="#080c0a" />
        </linearGradient>
        <radialGradient id="alley-lamp">
          <stop offset="0" stopColor="#e9d9a1" stopOpacity="0.74" />
          <stop offset="0.4" stopColor="#b29d62" stopOpacity="0.18" />
          <stop offset="1" stopColor="#988a54" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#alley-sky)" />
      <path d="M0 0 L420 250 L420 600 L0 800 Z" fill="#1a241f" />
      <path d="M1200 0 L780 250 L780 600 L1200 800 Z" fill="#151e1a" />
      <path d="M420 250 L780 250 L780 600 L420 600 Z" fill="#0a100d" />
      <path d="M0 540 L420 600 L780 600 L1200 530 L1200 800 L0 800 Z" fill="url(#alley-ground)" />
      <g fill="#0b110e">
        <path d="M180 430 L180 270 L310 270 L310 320 L260 320 L260 430 Z" />
        <path d="M920 430 L920 270 L1030 270 L1030 320 L985 320 L985 430 Z" />
      </g>
      <g stroke="#405147" strokeWidth="2" opacity="0.4" fill="none">
        <path d="M0 480 L420 540" />
        <path d="M1200 470 L780 540" />
        <path d="M300 340 L300 520" />
        <path d="M850 340 L850 520" />
        <path d="M420 250 L420 600" />
        <path d="M780 250 L780 600" />
      </g>
      <g transform="translate(255 345)">
        <rect x="0" y="0" width="150" height="250" fill="#121814" stroke="#33423a" strokeWidth="3" />
        <rect x="18" y="22" width="114" height="204" fill="#1d2620" stroke="#4b5b50" strokeWidth="2" />
        <circle cx="112" cy="128" r="5" fill="#8f825a" opacity="0.55" />
        <rect x="42" y="70" width="68" height="4" fill="#5c695b" opacity="0.5" />
        <rect x="42" y="78" width="54" height="3" fill="#5c695b" opacity="0.35" />
        <text x="78" y="43" textAnchor="middle" fill="#9e9270" fontSize="11" letterSpacing="3">槐荫里 13</text>
      </g>
      <g transform="translate(892 358)">
        <rect x="0" y="0" width="140" height="236" fill="#111713" stroke="#334139" strokeWidth="3" />
        <rect x="18" y="20" width="104" height="192" fill="#1c241f" stroke="#4b5b50" strokeWidth="2" />
        <circle cx="98" cy="120" r="5" fill="#8f825a" opacity="0.45" />
        <path d="M0 236 L-16 250 L156 250 L140 236 Z" fill="#3b443b" />
      </g>
      <g>
        <rect x="386" y="520" width="68" height="80" fill="#5a6254" />
        <path d="M386 520 L420 492 L454 520 Z" fill="#313c34" />
        <path d="M386 545 L454 545" stroke="#7b8170" strokeWidth="2" opacity="0.4" />
      </g>
      <g transform="translate(650 570)">
        <rect x="0" y="0" width="84" height="34" rx="12" fill="#5e6759" />
        <path d="M12 2 L30 -62 L82 -62 L70 2 Z" fill="#39443b" />
        <circle cx="43" cy="34" r="19" fill="#171d19" stroke="#6d7666" strokeWidth="2" />
        <circle cx="43" cy="34" r="8" fill="#8d957f" opacity="0.5" />
        <circle cx="88" cy="18" r="15" fill="#151b17" stroke="#6d7666" strokeWidth="2" />
      </g>
      <g transform="translate(500 408)">
        <rect x="0" y="0" width="86" height="38" fill="#0a0f0c" />
        <path d="M0 38 C4 78 60 80 86 38" stroke="#39463e" strokeWidth="21" fill="none" />
        <path d="M18 38 L18 0" stroke="#39463e" strokeWidth="4" />
        <path d="M68 38 L68 0" stroke="#39463e" strokeWidth="4" />
        <circle cx="18" cy="38" r="13" fill="#252d26" />
        <circle cx="68" cy="38" r="13" fill="#252d26" />
      </g>
      <g className="scene-red-thread">
        <path d="M500 510 C570 544 640 528 700 492 C756 458 790 466 830 500" stroke="#8e352c" strokeWidth="1.4" fill="none" opacity="0.55" />
        <path d="M830 500 C854 522 872 544 866 572" stroke="#8e352c" strokeWidth="1" fill="none" opacity="0.36" />
      </g>
      <g>
        <rect x="1006" y="270" width="4" height="255" fill="#0c110e" />
        <path d="M978 270 Q1008 242 1038 270 Z" fill="#151c17" stroke="#59695e" strokeWidth="1" />
        <ellipse cx="1008" cy="268" rx="150" ry="100" fill="url(#alley-lamp)" />
        <circle cx="1008" cy="268" r="4" fill="#eddfab" opacity="0.82" />
      </g>
      {returnView ? (
        <g className="scene-bus-return">
          <rect x="236" y="350" width="200" height="120" rx="14" fill="#080c0a" stroke="#3d4d44" strokeWidth="2" />
          <rect x="270" y="368" width="132" height="38" rx="4" fill="#574e35" opacity="0.32" />
          <circle cx="270" cy="468" r="14" fill="#050807" />
          <circle cx="404" cy="468" r="14" fill="#050807" />
          <rect x="360" y="454" width="72" height="10" fill="#8f3b30" opacity="0.5" />
          <path d="M436 410 C470 422 488 440 500 465" stroke="#e0cf95" strokeWidth="2" opacity="0.24" fill="none" />
        </g>
      ) : null}
      <Fog strong />
      <PaperGrain />
    </>
  )
}

function Courtyard() {
  return (
    <>
      <defs>
        <linearGradient id="gate-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a100e" />
          <stop offset="1" stopColor="#26332d" />
        </linearGradient>
        <radialGradient id="gate-lamp">
          <stop offset="0" stopColor="#e5c98a" stopOpacity="0.66" />
          <stop offset="0.5" stopColor="#aa824d" stopOpacity="0.16" />
          <stop offset="1" stopColor="#806a40" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#gate-sky)" />
      <g fill="#0d1310">
        <path d="M0 560 L0 250 L1200 250 L1200 560 Z" />
      </g>
      <path d="M0 295 C130 270 260 290 390 278 C560 260 720 286 870 276 C1000 268 1100 284 1200 270 L1200 330 C1040 346 890 324 710 338 C520 352 320 334 0 356 Z" fill="#1b2420" />
      <g>
        <rect x="250" y="300" width="700" height="260" fill="#202a25" />
        <rect x="300" y="360" width="600" height="200" fill="#141c18" />
        <path d="M250 300 L600 240 L950 300 Z" fill="#0b110e" />
        <path d="M250 300 L250 560 L210 580 L210 315 Z" fill="#111713" />
        <path d="M950 300 L950 560 L990 580 L990 315 Z" fill="#111713" />
        <path d="M250 300 C360 280 470 290 600 286 C730 282 840 292 950 300 L950 330 C800 320 680 330 600 328 C500 326 380 338 250 330 Z" fill="#39463c" />
      </g>
      <g transform="translate(354 380)">
        <rect x="0" y="0" width="170" height="180" fill="#0a0f0d" stroke="#3a4a40" strokeWidth="6" />
        <rect x="-24" y="-10" width="218" height="21" fill="#2f3a32" />
        <line x1="85" y1="11" x2="85" y2="180" stroke="#0a0f0d" strokeWidth="4" />
        <circle cx="140" cy="95" r="7" fill="#8d7d53" opacity="0.6" />
        <path d="M0 0 L170 0" stroke="#5e6d5d" strokeWidth="2" />
      </g>
      <g transform="translate(690 390)">
        <rect x="0" y="0" width="158" height="170" fill="#070b09" stroke="#38483e" strokeWidth="6" />
        <rect x="-20" y="-12" width="198" height="22" fill="#2c382f" />
        <path d="M0 0 L158 0" stroke="#5b6a5b" strokeWidth="2" opacity="0.5" />
        <circle cx="120" cy="90" r="6" fill="#8a7b51" opacity="0.5" />
      </g>
      <g fill="#2a352d" stroke="#5a685a" strokeWidth="2">
        <rect x="290" y="540" width="64" height="72" />
        <rect x="860" y="540" width="64" height="72" />
      </g>
      <g>
        <path d="M194 520 C194 475 232 458 262 470 C294 483 292 526 282 561 L192 561 C190 547 191 532 194 520 Z" fill="#5d6658" />
        <path d="M210 566 L208 632 L286 632 L276 566 Z" fill="#3b453b" />
        <path d="M214 540 C238 552 262 550 280 536" stroke="#89917d" strokeWidth="2" opacity="0.4" fill="none" />
        <path d="M206 586 C240 594 264 590 286 582" stroke="#89917d" strokeWidth="1.5" opacity="0.25" fill="none" />
        <text x="238" y="604" fill="#a9ad95" fontSize="10" fontFamily="'Songti SC',serif" letterSpacing="2">小满 九岁</text>
      </g>
      <g>
        <rect x="980" y="292" width="4" height="260" fill="#0b100d" />
        <path d="M950 292 Q982 258 1014 292 Z" fill="#131a15" stroke="#59685c" strokeWidth="1" />
        <ellipse cx="982" cy="290" rx="155" ry="110" fill="url(#gate-lamp)" />
        <circle cx="982" cy="290" r="4" fill="#e7d7a3" opacity="0.8" />
      </g>
      <g className="scene-red-thread">
        <path d="M250 560 C360 582 460 540 570 574 C680 608 790 570 880 590 C970 610 1030 584 1090 600" stroke="#8d342c" strokeWidth="1.4" fill="none" opacity="0.5" />
      </g>
      <path d="M0 640 C300 620 520 650 760 638 C940 628 1090 638 1200 624 L1200 800 L0 800 Z" fill="#0a100d" />
      <Fog strong />
      <PaperGrain />
    </>
  )
}

function Well() {
  return (
    <>
      <defs>
        <linearGradient id="well-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#08100d" />
          <stop offset="0.55" stopColor="#1d2d27" />
          <stop offset="1" stopColor="#263a32" />
        </linearGradient>
        <radialGradient id="well-glow">
          <stop offset="0" stopColor="#b6d6c3" stopOpacity="0.44" />
          <stop offset="0.35" stopColor="#6b9181" stopOpacity="0.12" />
          <stop offset="1" stopColor="#4f7063" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="well-stone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4c544a" />
          <stop offset="0.55" stopColor="#2d352e" />
          <stop offset="1" stopColor="#121813" />
        </linearGradient>
        <filter id="well-blur">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      <rect width="1200" height="800" fill="url(#well-sky)" />
      <circle cx="940" cy="140" r="48" fill="#bdccb6" opacity="0.12" />
      <g fill="#0b110e">
        <path d="M0 500 L0 220 L1200 220 L1200 520 Z" />
      </g>
      <path d="M0 310 C170 292 330 304 500 292 C730 276 960 300 1200 284 L1200 350 C1000 364 820 344 620 354 C400 364 200 346 0 360 Z" fill="#1c2822" />
      <g stroke="#3e4e44" strokeWidth="2" opacity="0.3">
        <path d="M0 430 L1200 430" />
        <path d="M170 320 L170 520" />
        <path d="M1030 320 L1030 520" />
      </g>
      <path d="M0 590 C200 570 400 600 600 586 C800 572 1020 596 1200 574 L1200 800 L0 800 Z" fill="#070b09" />
      <Tree x={60} y={90} scale={1.4} opacity={0.92} />
      <g transform="translate(360 420)">
        <ellipse cx="240" cy="215" rx="300" ry="46" fill="#060a08" opacity="0.7" filter="url(#well-blur)" />
        <ellipse cx="240" cy="156" rx="228" ry="56" fill="#1a231d" stroke="#59665a" strokeWidth="3" />
        <ellipse cx="240" cy="140" rx="228" ry="56" fill="url(#well-stone)" />
        <ellipse cx="240" cy="140" rx="160" ry="35" fill="#3a463c" />
        <ellipse cx="240" cy="140" rx="100" ry="20" fill="#8a9b89" opacity="0.14" />
        <ellipse cx="240" cy="140" rx="78" ry="13" fill="#0a100c" />
        <rect x="160" y="240" width="160" height="8" fill="#2c362d" />
        <text x="240" y="278" textAnchor="middle" fill="#797f6b" fontSize="11" letterSpacing="4">封 井</text>
        <path d="M110 182 L370 182" stroke="#737d6d" strokeWidth="1" opacity="0.2" />
      </g>
      <ellipse cx="600" cy="560" rx="380" ry="190" fill="url(#well-glow)" />
      <g stroke="#77836f" strokeWidth="1.4" fill="none" opacity="0.4">
        <path d="M140 600 C240 540 320 530 420 548 C500 562 560 594 620 580" />
        <path d="M710 590 C780 552 850 544 930 566 C1000 586 1080 580 1160 556" />
        <path d="M620 580 C650 610 690 626 744 636" />
      </g>
      <g transform="translate(758 480) rotate(-7)">
        <path d="M0 0 C40 -18 100 -10 120 26 L108 100 C80 128 32 130 4 96 Z" fill="#7f322b" />
        <path d="M14 24 C46 8 84 12 106 34" stroke="#a54b3e" strokeWidth="2" fill="none" opacity="0.55" />
        <path d="M18 52 C48 42 80 44 106 62" stroke="#9f4438" strokeWidth="2" fill="none" opacity="0.4" />
        <path d="M34 112 L50 160" stroke="#a54b3e" strokeWidth="2" fill="none" />
        <path d="M50 160 C70 188 62 226 38 250" stroke="#a54b3e" strokeWidth="1.6" fill="none" opacity="0.55" />
        <path d="M20 40 L22 112" stroke="#6e2b26" strokeWidth="1.4" />
        <path d="M96 38 L98 110" stroke="#6e2b26" strokeWidth="1.4" />
      </g>
      <g opacity="0.55">
        <circle cx="306" cy="560" r="2" fill="#9a3e32" />
        <circle cx="410" cy="610" r="1.5" fill="#9a3e32" />
        <circle cx="860" cy="600" r="2" fill="#9a3e32" />
      </g>
      <Fog strong />
      <PaperGrain />
    </>
  )
}

function Dawn({ truth = false }: { truth?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id="dawn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={truth ? '#7e8e82' : '#3e4d47'} />
          <stop offset="0.42" stopColor={truth ? '#c2bc99' : '#7d7d69'} />
          <stop offset="0.75" stopColor={truth ? '#d4c7a1' : '#9a8c6d'} />
          <stop offset="1" stopColor={truth ? '#a79c7e' : '#5b5d50'} />
        </linearGradient>
        <linearGradient id="dawn-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#687064" />
          <stop offset="1" stopColor="#212a25" />
        </linearGradient>
        <radialGradient id="dawn-sun">
          <stop offset="0" stopColor="#f3e7b8" stopOpacity="0.6" />
          <stop offset="0.55" stopColor="#e7d498" stopOpacity="0.15" />
          <stop offset="1" stopColor="#d7c38a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#dawn-sky)" />
      <ellipse cx="860" cy="260" rx="340" ry="220" fill="url(#dawn-sun)" />
      <circle cx="860" cy="254" r="66" fill="#eee2b8" opacity={truth ? 0.4 : 0.22} />
      <g fill="#121a16" opacity="0.92">
        <path d="M0 500 L0 340 L120 338 L155 300 L250 300 L286 340 L390 342 L425 290 L530 290 L562 338 L670 340 L710 295 L820 295 L858 340 L980 342 L1020 300 L1110 300 L1140 342 L1200 342 L1200 520 Z" />
        <path d="M160 360 L160 500 L230 500 L230 380 L200 380 L200 360 Z" />
        <path d="M760 350 L760 500 L900 500 L900 370 L840 370 L840 350 Z" />
      </g>
      <g fill="#0a100d" opacity="0.75">
        <path d="M280 500 L280 410 L390 410 L390 500 Z" />
        <path d="M620 500 L620 430 L730 430 L730 500 Z" />
      </g>
      <path d="M0 520 C250 505 410 528 640 516 C870 505 1050 520 1200 504 L1200 800 L0 800 Z" fill="url(#dawn-ground)" />
      <path d="M0 590 C300 570 500 600 740 586 C950 574 1080 584 1200 568" stroke="#c7c0a2" strokeWidth="1" opacity="0.25" fill="none" />
      <Tree x={-120} y={100} scale={1.04} opacity={0.6} />
      <Tree x={990} y={130} scale={0.78} opacity={0.45} />
      {truth ? (
        <g>
          <ellipse cx="590" cy="595" rx="250" ry="86" fill="#0c120e" opacity="0.45" />
          <ellipse cx="590" cy="575" rx="162" ry="42" fill="#30392f" stroke="#7d836f" strokeWidth="2" />
          <ellipse cx="590" cy="560" rx="118" ry="29" fill="#899078" opacity="0.28" />
          <path d="M470 620 C540 600 630 602 710 624" stroke="#d2c6a0" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M620 520 C700 500 780 470 850 430" stroke="#a64335" strokeWidth="1.4" fill="none" opacity="0.45" />
          <circle cx="854" cy="429" r="4" fill="#9e3a2e" opacity="0.6" />
        </g>
      ) : (
        <g>
          <rect x="868" y="340" width="7" height="180" fill="#111711" />
          <rect x="805" y="330" width="128" height="76" rx="3" fill="#20322b" stroke="#5f7467" strokeWidth="2" transform="rotate(-2 869 368)" />
          <text x="869" y="368" textAnchor="middle" fill="#c9bd98" fontSize="24" fontFamily="'Songti SC',serif" letterSpacing="2" transform="rotate(-2 869 368)">北新桥</text>
          <path d="M868 520 L842 560 L894 560 Z" fill="#111711" />
          <path d="M0 650 C240 635 470 660 700 646 C900 634 1070 648 1200 636" stroke="#8c4438" strokeWidth="1.2" fill="none" opacity="0.28" />
          <circle cx="409" cy="673" r="18" fill="#9a3d31" opacity="0.35" />
          <path d="M397 676 C404 661 414 661 421 676" stroke="#b35444" strokeWidth="3" fill="none" opacity="0.5" />
        </g>
      )}
      <Fog />
      <PaperGrain />
    </>
  )
}

function SceneArt({ scene, reduceMotion }: Props) {
  let art: React.ReactNode
  switch (scene) {
    case 'title':
      art = <Street title />
      break
    case 'street':
      art = <Street />
      break
    case 'bus':
    case 'lost-bus':
      art = <BusInterior lost={scene === 'lost-bus'} />
      break
    case 'ghost-stop':
      art = <GhostStop />
      break
    case 'alley':
      art = <Alley />
      break
    case 'courtyard':
      art = <Courtyard />
      break
    case 'well':
      art = <Well />
      break
    case 'return':
      art = <Alley returnView />
      break
    case 'dawn':
      art = <Dawn />
      break
    case 'truth':
      art = <Dawn truth />
      break
    default:
      art = <Street />
  }

  return (
    <div className={`scene-art scene-${scene}${reduceMotion ? ' reduce-motion' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {art}
      </svg>
      <div className="scene-vignette" />
      <div className="scene-grain" />
      <div className="scene-fog-layer" />
      <div className="scene-light-leak" />
    </div>
  )
}

export default memo(SceneArt)
