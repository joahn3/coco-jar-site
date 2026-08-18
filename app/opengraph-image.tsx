import { ImageResponse } from "next/og";

export const alt = "Coco Jar Bistro | Restaurant de pui la jar în Popești-Leordeni";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(130deg, #1b1b1d 0%, #2c1f14 45%, #f8a84f 100%)",
          color: "#f6f4ee",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 26, margin: 0, letterSpacing: "0.02em" }}>Coco Jar Bistro</p>
          <p style={{ fontSize: 18, margin: 0, opacity: 0.9 }}>Restaurant Premium • Popești-Leordeni</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 800, margin: "0 0 18px 0" }}>
            Meniu proaspăt. Ambianță autentică. Rezervări rapide.
          </p>
          <p style={{ fontSize: 30, margin: 0, maxWidth: "88%", lineHeight: 1.35, opacity: 0.95 }}>
            Pui la jar, atmosferă caldă și experiențe premium pentru seri memorabile.
          </p>
        </div>
        <p style={{ margin: 0, fontSize: 20, opacity: 0.85 }}>coco-jar-site.vercel.app</p>
      </div>
    ),
    {
      ...size,
    }
  );
}
