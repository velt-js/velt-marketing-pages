import styles from "./HipaaBadge.module.css";

interface HipaaBadgeProps {
  size: number;
  basePath?: string;
}

export default function HipaaBadge({
  size,
  basePath = "/images/footer",
}: HipaaBadgeProps) {
  return (
    <div className={styles.badge} style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${styles.layer} ${styles.circle}`}
        src={`${basePath}/hipaa-circle.svg`}
        alt=""
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${styles.layer} ${styles.ring}`}
        src={`${basePath}/hipaa-ring.svg`}
        alt=""
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${styles.layer} ${styles.caduceus}`}
        src={`${basePath}/hipaa-caduceus.svg`}
        alt=""
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${styles.layer} ${styles.cross}`}
        src={`${basePath}/hipaa-cross.svg`}
        alt=""
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${styles.layer} ${styles.text}`}
        src={`${basePath}/hipaa-text.svg`}
        alt="HIPAA"
      />
      <div className={styles.whiteOverlay} />
    </div>
  );
}
