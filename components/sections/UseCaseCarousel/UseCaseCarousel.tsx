import Image from "next/image";
import styles from "./UseCaseCarousel.module.css";

const cards = [
  {
    title: "Canvas Comments\nlike in Figma",
    logo: "/images/use-cases/figma-logo.png",
    logoAlt: "Figma",
    image: "/images/use-cases/canvas-comments.png",
  },
  {
    title: "Cell Comments\nlike in Google Sheets",
    logo: "/images/use-cases/google-sheets-logo.png",
    logoAlt: "Google Sheets",
    image: "/images/use-cases/cell-comments.png",
  },
  {
    title: "Video Comments\nlike Frame.io",
    logo: "/images/use-cases/frameio-logo.svg",
    logoAlt: "Frame.io",
    image: "/images/use-cases/video-comments.png",
  },
];

export default function UseCaseCarousel() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>
            Steal Features from Popular Products
          </h2>
          <p className={styles.subtitle}>
            Our components have different modes to match your product needs
          </p>
        </div>

        <div className={styles.actions}>
          <a href="#" className={styles.btnSecondary}>
            <svg
              className={styles.btnIcon}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.5C3 3.67157 3.67157 3 4.5 3H8.25V15H4.5C3.67157 15 3 14.3284 3 13.5V4.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 3H13.5C14.3284 3 15 3.67157 15 4.5V13.5C15 14.3284 14.3284 15 13.5 15H8.25V3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            View Docs
          </a>
          <a href="#" className={styles.btnPrimary}>
            View Examples
          </a>
        </div>
      </div>

      {/* Cards */}
      <div className={styles.cards}>
        {cards.map((card, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardImage}>
              <Image
                src={card.image}
                alt={card.title.replace("\n", " ")}
                width={400}
                height={260}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardLogo}>
                <Image
                  src={card.logo}
                  alt={card.logoAlt}
                  width={40}
                  height={44}
                  style={{ width: "auto", height: "auto", maxHeight: 38 }}
                />
              </div>
              <h3 className={styles.cardTitle}>
                {card.title.split("\n").map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < card.title.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
