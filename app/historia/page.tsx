// app/historia/page.tsx
import WeddingAccessGate from "../../components/WeddingAccessGate";
import Historia from "../sections/Historia";

export default function Page() {
  return (
    <WeddingAccessGate>
    <section
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
          borderRadius: 18,
          padding: 22,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            letterSpacing: -0.3,
          }}
        >
          Nossa História
        </h1>

        <div style={{ marginTop: 18 }}>
          <Historia />
        </div>
      </div>
    </section>
    </WeddingAccessGate>
  );
}
