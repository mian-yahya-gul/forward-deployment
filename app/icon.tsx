import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Same brand blue as the "Ai" in the real logo wordmark.
          background: "#004AAD",
          borderRadius: 5,
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Ai
      </div>
    ),
    { ...size },
  );
}
