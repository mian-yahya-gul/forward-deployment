import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 80,
          background: "#0A0A0B",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 20px",
            borderRadius: 999,
            border: "1px solid #232327",
            color: "#9A9DA5",
            fontSize: 22,
          }}
        >
          AI Forward Deployment Partner
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 76,
            fontWeight: 700,
            color: "#F5F5F6",
            lineHeight: 1.1,
          }}
        >
          DeosAI Labs
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "#9A9DA5",
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          Production-grade AI, deployed inside how your business already runs.
        </div>
      </div>
    ),
    { ...size },
  );
}
