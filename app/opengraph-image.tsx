import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card that shows up when the site is shared. Generated at build time
 * from the same profile content as the page, so it can never go stale.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fcfbf8",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6e6a62",
            }}
          >
            {profile.role}
          </div>

          <div
            style={{
              fontSize: 92,
              lineHeight: 1.05,
              letterSpacing: -3,
              color: "#191817",
              marginTop: 28,
            }}
          >
            {profile.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid #e5e1d8",
            paddingTop: 32,
          }}
        >
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              color: "#6e6a62",
              maxWidth: 760,
            }}
          >
            {profile.tagline}
          </div>

          <div style={{ display: "flex", width: 16, height: 16, backgroundColor: "#9a3412", borderRadius: 8 }} />
        </div>
      </div>
    ),
    size,
  );
}
