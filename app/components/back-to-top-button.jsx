"use client";

import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 260);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? "back-to-top--visible" : ""}`}
      onClick={handleClick}
      aria-label="Înapoi sus"
      title="Înapoi sus"
      data-analytics="click|navigation|back_to_top|source_page=global|journey_stage=utility|lead_type=site"
    >
      <span className="back-to-top__icon" aria-hidden="true">
        ↑
      </span>
      <span className="back-to-top__label hidden sm:block">Top</span>
    </button>
  );
}
