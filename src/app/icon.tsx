import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          background: "#0d0c0a",
          borderRadius: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <svg
          width="320"
          height="360"
          viewBox="0 0 320 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="160"
            cy="60"
            r="32"
            stroke="#c8a96e"
            strokeWidth="12"
          />
          <line
            x1="160"
            y1="92"
            x2="160"
            y2="210"
            stroke="#c8a96e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <line
            x1="160"
            y1="210"
            x2="115"
            y2="310"
            stroke="#c8a96e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <line
            x1="160"
            y1="210"
            x2="205"
            y2="310"
            stroke="#c8a96e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <line
            x1="160"
            y1="130"
            x2="110"
            y2="175"
            stroke="#c8a96e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <line
            x1="160"
            y1="130"
            x2="210"
            y2="175"
            stroke="#c8a96e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <line
            x1="110"
            y1="175"
            x2="105"
            y2="120"
            stroke="#c8a96e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <line
            x1="210"
            y1="175"
            x2="215"
            y2="120"
            stroke="#c8a96e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <circle cx="105" cy="110" r="12" fill="#c8a96e" opacity="0.5" />
          <circle cx="215" cy="110" r="12" fill="#c8a96e" opacity="0.5" />
        </svg>
        <div
          style={{
            color: "#c8a96e",
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: 8,
            marginTop: -10,
          }}
        >
          PULL
        </div>
      </div>
    ),
    { ...size }
  );
}
