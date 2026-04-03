import Image from "next/image";
import styles from "./LogoBar.module.css";

interface LogoItem {
  name: string;
  src: string;
  width: number;
  height: number;
}

const row1: LogoItem[] = [
  { name: "Google", src: "/images/logos/google.svg", width: 80, height: 24 },
  { name: "Varonis", src: "/images/logos/varonis.svg", width: 100, height: 18 },
  { name: "Pendo", src: "/images/logos/pendo.svg", width: 90, height: 22 },
  { name: "HeyGen", src: "/images/logos/heygen.svg", width: 80, height: 25 },
  { name: "FLYR", src: "/images/logos/flyr.svg", width: 85, height: 22 },
  { name: "Bigtincan", src: "/images/logos/bigtincan.svg", width: 100, height: 28 },
  { name: "Runway", src: "/images/logos/runway.svg", width: 76, height: 15 },
  { name: "LambdaTest", src: "/images/logos/lambdatest.svg", width: 120, height: 22 },
];

const row2: (LogoItem | null)[] = [
  { name: "Datarails", src: "/images/logos/datarails.svg", width: 85, height: 19 },
  { name: "FireHydrant", src: "/images/logos/firehydrant.svg", width: 100, height: 22 },
  { name: "Leadpages", src: "/images/logos/leadpages.svg", width: 100, height: 22 },
  null, // center label spans 2 columns
  { name: "Vellum", src: "/images/logos/vellum.svg", width: 80, height: 22 },
  { name: "SafetyKit", src: "/images/logos/safetykit.svg", width: 90, height: 22 },
  { name: "Qloo", src: "/images/logos/qloo.png", width: 58, height: 25 },
];

const row3: LogoItem[] = [
  { name: "L-Acoustics", src: "/images/logos/lacoustics.png", width: 100, height: 22 },
  { name: "CloudFactory", src: "/images/logos/cloudfactory.svg", width: 110, height: 20 },
  { name: "Trumpet", src: "/images/logos/trumpet.svg", width: 90, height: 22 },
  { name: "Cofactr", src: "/images/logos/cofactr.svg", width: 90, height: 22 },
  { name: "Butter", src: "/images/logos/butter.png", width: 100, height: 24 },
  { name: "Colossyan", src: "/images/logos/colossyan.svg", width: 100, height: 22 },
  { name: "ClassWallet", src: "/images/logos/classwallet.png", width: 100, height: 20 },
  { name: "OpenEnvoy", src: "/images/logos/openenvoy.svg", width: 100, height: 22 },
];

const migratedLogos: LogoItem[] = [
  { name: "Pendo", src: "/images/logos/pendo.svg", width: 90, height: 22 },
  { name: "Trumpet", src: "/images/logos/trumpet.svg", width: 90, height: 22 },
  { name: "CloudFactory", src: "/images/logos/cloudfactory.svg", width: 110, height: 20 },
  { name: "Meddicc", src: "/images/logos/bigtincan.svg", width: 100, height: 28 },
  { name: "Vareto", src: "/images/logos/varonis.svg", width: 100, height: 18 },
];

function LogoCell({ logo }: { logo: LogoItem }) {
  return (
    <div className={styles.cell}>
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.width}
        height={logo.height}
        style={{ opacity: 0.5, width: "auto", height: "auto", maxHeight: 27 }}
      />
    </div>
  );
}

export default function LogoBar() {
  return (
    <section className={styles.logoBar}>
      <div className={styles.wrapper}>
        {/* Default: Logo Grid */}
        <div className={styles.grid}>
          {row1.map((logo) => (
            <LogoCell key={logo.name} logo={logo} />
          ))}

          {row2.map((logo, i) =>
            logo === null ? (
              <div key="center" className={styles.centerCell}>
                <span className={styles.centerLabel}>
                  Trusted By{" "}
                  <span className={styles.centerHighlight}>Top Teams</span>
                </span>
              </div>
            ) : (
              <LogoCell key={logo.name} logo={logo} />
            )
          )}

          {row3.map((logo, i) => (
            <LogoCell key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>

        {/* Hover: Migrated from Competitors */}
        <div className={styles.hoverPanel}>
          <p className={styles.hoverTitle}>
            Migrated From{" "}
            <span className={styles.hoverHighlight}>Competitors</span>
          </p>
          <div className={styles.hoverLogos}>
            {migratedLogos.map((logo) => (
              <div key={logo.name} className={styles.hoverLogoCell}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  style={{ opacity: 0.7, width: "auto", height: "auto", maxHeight: 27 }}
                />
              </div>
            ))}
          </div>
          <div className={styles.hoverLinks}>
            <a href="#" className={styles.hoverLink}>
              Compare Velt <span className={styles.arrow}>&rsaquo;</span>
            </a>
            <a href="#" className={styles.hoverLink}>
              Migration Guide <span className={styles.arrow}>&rsaquo;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
