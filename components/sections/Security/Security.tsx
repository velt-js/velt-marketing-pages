import Image from "next/image";
import HipaaBadge from "@/components/ui/HipaaBadge/HipaaBadge";
import styles from "./Security.module.css";

const regions = [
  { name: "AMSTERDAM", color: "rgb(98, 93, 245)", x: "48%", y: "10%" },
  { name: "TOKYO", color: "rgb(235, 96, 226)", x: "72%", y: "45%" },
  { name: "TEXAS", color: "rgb(255, 109, 79)", x: "18%", y: "52%" },
];

export default function Security() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Enterprise Level Security</h2>
          <p className={styles.subtitle}>
            We security at each touchpoint to ensure privacy for our users
          </p>
        </div>

        <div className={styles.actions}>
          <a href="#" className={styles.btnSecondary}>
            Trust Centre
          </a>
          <a href="#" className={styles.btnPrimary}>
            Learn More
          </a>
        </div>
      </div>

      {/* Info Grid */}
      <div className={styles.infoGrid}>
        {/* Top Row */}
        <div className={styles.row}>
          {/* Multi Region Hosting */}
          <div className={`${styles.securityCard} ${styles.securityCardTall}`}>
            <div className={styles.visualArea}>
              <div className={styles.mapArea}>
                {regions.map((region) => (
                  <div
                    key={region.name}
                    className={styles.regionGroup}
                    style={{ left: region.x, top: region.y }}
                  >
                    <div className={styles.cloudIcon}>
                      <svg
                        width="60"
                        height="40"
                        viewBox="0 0 60 40"
                        fill="none"
                      >
                        <path
                          d="M15 35h30c8-2 12-8 10-15-1-6-7-11-13-11-2-7-9-12-17-9-6 2-10 7-11 13C6 14 0 20 2 28c1 5 6 7 13 7z"
                          fill={region.color}
                          opacity="0.3"
                        />
                        <rect x="12" y="12" width="4" height="4" fill={region.color} />
                        <rect x="18" y="12" width="4" height="4" fill={region.color} />
                        <rect x="24" y="12" width="4" height="4" fill={region.color} />
                        <rect x="12" y="18" width="4" height="4" fill={region.color} />
                        <rect x="18" y="18" width="4" height="4" fill={region.color} />
                        <rect x="24" y="18" width="4" height="4" fill={region.color} />
                        <rect x="30" y="18" width="4" height="4" fill={region.color} />
                        <rect x="36" y="18" width="4" height="4" fill={region.color} />
                        <rect x="18" y="24" width="4" height="4" fill={region.color} />
                        <rect x="24" y="24" width="4" height="4" fill={region.color} />
                        <rect x="30" y="24" width="4" height="4" fill={region.color} />
                        <rect x="36" y="24" width="4" height="4" fill={region.color} />
                        <rect x="42" y="24" width="4" height="4" fill={region.color} />
                      </svg>
                    </div>
                    <span
                      className={styles.regionLabel}
                      style={{ color: region.color }}
                    >
                      {region.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Multi Region Hosting</h3>
              <p className={styles.cardDesc}>
                Host your data where you need it
              </p>
            </div>
          </div>

          {/* Isolated Server */}
          <div className={`${styles.securityCard} ${styles.securityCardTall}`}>
            <div className={styles.visualArea}>
              <div className={styles.serverVisual}>
                <div className={styles.serverDiagram}>
                  {/* Dashed border container */}
                  <div className={styles.dashedBox}>
                    <div className={styles.serverIconGroup}>
                      <div className={`${styles.dbIcon} ${styles.dbIconSmall}`} />
                      <div className={`${styles.dbIcon} ${styles.dbIconMedium}`} />
                      <div className={`${styles.dbIcon} ${styles.dbIconLarge}`} />
                      <div className={`${styles.dbIcon} ${styles.dbIconMedium}`} />
                      <div className={`${styles.dbIcon} ${styles.dbIconSmall}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                Isolated Server
                <br />
                and Data Storage
              </h3>
              <p className={styles.cardDesc}>
                Enable Loom-style recording. Your users can record their screen,
                camera or audio
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row - Security Certification */}
        <div className={`${styles.securityCard} ${styles.securityCardWide}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Security Certification</h3>
            <p className={styles.cardDesc}>SOC2 Type, HIPAA with BAA</p>
          </div>
          <div className={styles.certArea}>
            <Image
              src="/images/security/soc2-badge.png"
              alt="SOC 2 Type II Certification"
              width={128}
              height={128}
              style={{ width: "auto", height: "auto", maxHeight: 128 }}
            />
            <HipaaBadge size={128} basePath="/images/security" />
          </div>
        </div>
      </div>
    </section>
  );
}
