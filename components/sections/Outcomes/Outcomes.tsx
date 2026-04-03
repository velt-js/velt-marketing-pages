import Image from "next/image";
import styles from "./Outcomes.module.css";

const tabs = [
  { label: "Boost Engagement", icon: "/images/icons/broadcast.svg", active: true },
  { label: "Boost Growth", icon: "/images/icons/chart-line.svg", active: false },
  { label: "Differentiate", icon: "/images/icons/versions.svg", active: false },
  { label: "Save Cost", icon: "/images/icons/currency-dollar.svg", active: false },
  { label: "Ship Fast", icon: "/images/icons/clock.svg", active: false },
];

export default function Outcomes() {
  return (
    <section className={styles.outcomes}>
      <div className={styles.inner}>
        {/* Tab Rail */}
        <div className={styles.tabRail}>
          {tabs.map((tab) => (
            <div
              key={tab.label}
              className={`${styles.tab} ${tab.active ? styles.tabActive : ""}`}
            >
              <Image
                className={styles.tabIcon}
                src={tab.icon}
                alt=""
                width={20}
                height={20}
                style={{ width: 20, height: 20 }}
              />
              <span className={styles.tabLabel}>{tab.label}</span>
            </div>
          ))}
        </div>

        {/* Heading */}
        <div className={styles.headingBlock}>
          <h2 className={styles.heading}>
            Drive double-digit{" "}
            <span className={styles.headingGradient}>engagement</span> in your
            product
          </h2>
          <p className={styles.subheading}>
            Users spend 10+ hours a week communicating on other platforms. Bring
            those conversations into your product!
          </p>
        </div>

        {/* Visual + Testimonial */}
        <div className={styles.contentRow}>
          <div className={styles.visualArea}>
            <Image
              className={styles.visualImage}
              src="/images/testimonials/outcomes-visual.png"
              alt="With Velt vs Without Velt comparison"
              width={868}
              height={513}
              style={{ width: "100%", height: "auto" }}
            />
            <div className={styles.visualOverlay} />
          </div>
          <div className={styles.testimonial}>
            <Image
              src="/images/testimonials/trumpet-logo.svg"
              alt="Trumpet"
              width={133}
              height={22}
              style={{ width: "auto", height: "auto", maxHeight: 22 }}
            />
            <div className={styles.testimonialContent}>
              <p className={styles.quote}>
                Engagement at Trumpet grew by 10%&quot; after adding
                collaborative features from Velt
              </p>
              <div className={styles.personInfo}>
                <Image
                  className={styles.avatar}
                  src="/images/testimonials/william-angle.png"
                  alt="William Angle"
                  width={50}
                  height={50}
                  style={{ width: 50, height: 50 }}
                />
                <div className={styles.personText}>
                  <span className={styles.personName}>William Angle</span>
                  <span className={styles.personRole}>Lead PM, Trumpet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
