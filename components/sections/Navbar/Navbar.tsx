"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

const dropdownLinks = [
  "Features",
  "Use Cases",
  "Platforms",
  "Resources",
  "Compare",
];

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => {
      // Find all sections with data-navbar-theme and determine which one we're over
      const sections = document.querySelectorAll("[data-navbar-theme]");
      let current: "dark" | "light" = "dark";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // Check if the top of the section is above the navbar (30px from top)
        if (rect.top <= 30 && rect.bottom > 30) {
          current = (section.getAttribute("data-navbar-theme") as "dark" | "light") || "dark";
        }
      }
      setTheme(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${theme === "light" ? styles.navLight : ""}`}>
      <div className={styles.links}>
        <a href="/" className={styles.logo}>
          <Image
            src="/images/logo/velt-logo.svg"
            alt="Velt"
            width={24}
            height={24}
            className={styles.logoImg}
          />
        </a>
        <div className={styles.navLinks}>
          {dropdownLinks.map((label) => (
            <div key={label} className={styles.navItem}>
              <span className={styles.navLabel}>{label}</span>
              <svg
                className={styles.chevron}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3.5 5.25L7 8.75L10.5 5.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
          <div className={styles.navItem}>
            <span className={styles.navLabel}>Pricing</span>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <a href="#" className={styles.actionBtn}>
          <svg
            className={styles.actionIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
            <path d="M20 12H7" />
            <path d="m17 9 3 3-3 3" />
          </svg>
          <span className={styles.actionLabel}>Sign In</span>
        </a>
        <a href="#" className={styles.actionBtn}>
          <svg
            className={styles.actionIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
          <span className={styles.actionLabel}>Read Docs</span>
        </a>
        <a href="#" className={styles.bookDemo}>
          <span className={styles.bookDemoLabel}>Book Demo</span>
        </a>
      </div>
    </nav>
  );
}
