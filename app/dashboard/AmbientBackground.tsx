type Block = {
  width: number;
  height: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  rotate: number;
  opacity: number;
};

const TOP_RIGHT_CLUSTER: Block[] = [
  { width: 260, height: 200, top: -20, right: 260, rotate: -4, opacity: 0.09 },
  { width: 190, height: 150, top: 40, right: 60, rotate: 9, opacity: 0.13 },
  { width: 140, height: 140, top: 130, right: 300, rotate: -12, opacity: 0.16 },
  { width: 110, height: 110, top: 10, right: 20, rotate: 6, opacity: 0.19 },
];

function BlockShape({ block }: { block: Block }) {
  return (
    <div
      style={{
        position: "absolute",
        top: block.top,
        bottom: block.bottom,
        left: block.left,
        right: block.right,
        width: block.width,
        height: block.height,
        borderRadius: 32,
        background: `rgba(10,46,138,${block.opacity})`,
        border: `1px solid rgba(10,46,138,${block.opacity * 1.6})`,
        transform: `rotate(${block.rotate}deg)`,
        boxShadow: "0 30px 60px -20px rgba(16,32,78,0.08)",
      }}
    />
  );
}

/**
 * A soft cluster of layered, slightly rotated rounded blocks behind the
 * dashboard shell — depth suggested through overlap and offset rather than
 * true 3D perspective. Fixed to the viewport, kept low-opacity throughout
 * so content on top stays perfectly legible.
 */
export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "#fbfbfd",
      }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: 520, height: 420 }}>
        {TOP_RIGHT_CLUSTER.map((b, i) => (
          <BlockShape key={i} block={b} />
        ))}
      </div>
    </div>
  );
}
