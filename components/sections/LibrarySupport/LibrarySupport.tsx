import Image from "next/image";
import styles from "./LibrarySupport.module.css";

export default function LibrarySupport() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>
            Works seamlessly with your libraries
          </h2>
          <p className={styles.subtitle}>
            Use 8+ Purpose-built Library or Integrate it yourself
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
            View All Examples
          </a>
        </div>
      </div>

      {/* Library Grid */}
      <div className={styles.libraryGrid}>
        {/* Top Row - Two tall cards */}
        <div className={styles.topRow}>
          {/* Text Editors Card */}
          <div className={`${styles.libraryCard} ${styles.libraryCardTall}`}>
            <div className={styles.logoArea}>
              <div className={styles.textEditorLogos}>
                <div className={styles.logoItem}>
                  <Image
                    src="/images/libraries/tiptap.svg"
                    alt="Tiptap"
                    width={28}
                    height={33}
                    style={{ width: "auto", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/images/libraries/codemirror.svg"
                    alt="CodeMirror"
                    width={144}
                    height={24}
                    style={{ width: "auto", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/images/libraries/lexical.png"
                    alt="Lexical"
                    width={144}
                    height={36}
                    style={{ width: "auto", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/images/libraries/blocknote.svg"
                    alt="BlockNote"
                    width={176}
                    height={33}
                    style={{ width: "auto", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/images/libraries/slatejs.svg"
                    alt="Slate"
                    width={109}
                    height={26}
                    style={{ width: "auto", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/images/libraries/slate-text.svg"
                    alt="Slate Text"
                    width={99}
                    height={16}
                    style={{ width: "auto", height: "auto", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Text Editors</h3>
              <span className={styles.cardLink}>View Docs</span>
            </div>
          </div>

          {/* Chart Libraries Card */}
          <div className={`${styles.libraryCard} ${styles.libraryCardTall}`}>
            <div className={styles.logoArea}>
              <div className={styles.chartLogos}>
                <div className={styles.logoItem}>
                  <Image
                    src="/images/libraries/chartjs.svg"
                    alt="Chart.js"
                    width={44}
                    height={44}
                    style={{ width: "auto", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div className={styles.highchartsLogo}>
                  <Image
                    src="/images/libraries/highcharts-symbol.svg"
                    alt="Highcharts Symbol"
                    width={37}
                    height={35}
                    style={{ width: "auto", height: "auto", objectFit: "contain" }}
                  />
                  <Image
                    src="/images/libraries/highcharts-text.svg"
                    alt="Highcharts"
                    width={157}
                    height={15}
                    style={{ width: "auto", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/images/libraries/nivo.png"
                    alt="Nivo"
                    width={105}
                    height={33}
                    style={{ width: "auto", height: "auto", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Chart Libraries</h3>
              <span className={styles.cardLink}>View Docs</span>
            </div>
          </div>
        </div>

        {/* Bottom Row - Wide card */}
        <div className={`${styles.libraryCard} ${styles.libraryCardWide}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Canvas</h3>
            <span className={styles.cardLink}>View Docs</span>
          </div>
          <div className={styles.canvasLogoArea}>
            <div className={styles.reactFlowLogo}>
              <Image
                src="/images/libraries/reactflow.svg"
                alt="React Flow"
                width={31}
                height={31}
                style={{ width: "auto", height: "auto", objectFit: "contain" }}
              />
              <span className={styles.reactFlowText}>React Flow</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
