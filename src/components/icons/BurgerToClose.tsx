"use client";

/**
 * Burger 44×44 (closed = exact design). Open = morph to centered X (translate + rotate).
 */
export function BurgerToCloseIcon({
  open,
  className,
  size = 44,
}: {
  open: boolean;
  className?: string;
  size?: number;
}) {
  const vb = 44;
  const stroke = 2;
  const center = 22;

  // Closed burger — підлаштовуй координати
  const top = { x1: 20.168, y1: 12.8333, x2: 34.8346, y2: 12.8333 };
  const mid = { x1: 9.16797, y1: 22, x2: 34.8346, y2: 22 };
  const bot = { x1: 9.16797, y1: 31.1667, x2: 23.8346, y2: 31.1667 };

  // X: центри ліній у (22,22), потім rotate + scale
  const topCenterX = (top.x1 + top.x2) / 2;
  const topCenterY = top.y1;
  const botCenterX = (bot.x1 + bot.x2) / 2;
  const botCenterY = bot.y1;
  const topTx = center - topCenterX;
  const topTy = center - topCenterY;
  const botTx = center - botCenterX;
  const botTy = center - botCenterY;
  const openScale = 1.35;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${vb} ${vb}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g
        stroke="#141414"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Top line → diagonal of X (scale для більшого хреста) */}
        <line
          x1={top.x1}
          y1={top.y1}
          x2={top.x2}
          y2={top.y2}
          style={{
            transformOrigin: `${center}px ${center}px`,
            transform: open ? `translate(${topTx}px, ${topTy}px) rotate(45deg) scale(${openScale})` : "none",
            transition: "transform 0.3s ease-out",
          }}
        />
        {/* Middle → fade out and hide when open (avoids stray segment) */}
        <line
          x1={mid.x1}
          y1={mid.y1}
          x2={mid.x2}
          y2={mid.y2}
          style={{
            opacity: open ? 0 : 1,
            visibility: open ? "hidden" : "visible",
            transition: "opacity 0.2s ease-out",
          }}
        />
        {/* Bottom line → second diagonal of X (scale для більшого хреста) */}
        <line
          x1={bot.x1}
          y1={bot.y1}
          x2={bot.x2}
          y2={bot.y2}
          style={{
            transformOrigin: `${center}px ${center}px`,
            transform: open ? `translate(${botTx}px, ${botTy}px) rotate(-45deg) scale(${openScale})` : "none",
            transition: "transform 0.3s ease-out",
          }}
        />
      </g>
    </svg>
  );
}
