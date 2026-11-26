import { ImageResponse } from "next/og";

export const alt = "Nairobi Chapel Ngong Road. Sundays 9:00 and 11:30 AM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph image: logo diamond + name on brand purple. */
export default function OpengraphImage() {
  const q = 92;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#5B2A9E",
          color: "#FFFFFF",
          padding: "0 88px",
          gap: 72,
        }}
      >
        <div style={{ display: "flex", width: 280, height: 280, alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", width: q * 2 + 8, height: q * 2 + 8, gap: 8, transform: "rotate(45deg)" }}>
            <div style={{ width: q, height: q, background: "#7440C4" }} />
            <div style={{ width: q, height: q, background: "#16121F" }} />
            <div style={{ width: q, height: q, background: "#8C8794" }} />
            <div style={{ width: q, height: q, background: "#F5C518" }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Nairobi Chapel</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Ngong Road</div>
          <div style={{ fontSize: 34, marginTop: 28, color: "#F4EFFB" }}>Sundays 9:00 & 11:30 AM · Nairobi, Kenya</div>
        </div>
      </div>
    ),
    size,
  );
}
