import Image from "next/image";
import styles from "./CustomerUI.module.css";

export default function CustomerUI() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.headerContent}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <span className={styles.titleText}>How</span>
            <div className={styles.selectedLogo}>
              <Image
                src="/images/customers/pendo-logo-fill.svg"
                alt="Pendo"
                width={146}
                height={34}
                style={{ width: "auto", height: "auto", maxHeight: 34 }}
              />
            </div>
            <span className={styles.titleText}>Integrates Velt</span>
          </div>
          <p className={styles.subtitle}>
            Pendo uses comments to enable collaboration on dashboards and
            sessions replays
          </p>
        </div>

        <div className={styles.actions}>
          <a href="#" className={styles.btnSecondary}>
            Book Demo
          </a>
          <a href="#" className={styles.btnPrimary}>
            View Customer Stories
          </a>
        </div>
      </div>

      {/* Dark Panel */}
      <div className={styles.darkPanel}>
        {/* Company Navigation */}
        <div className={styles.companyNav}>
          <Image
            className={styles.chevron}
            src="/images/customers/chevron-right.svg"
            alt="Previous"
            width={24}
            height={24}
            style={{ transform: "rotate(180deg)", width: 24, height: 24 }}
          />
          <div className={styles.companyLogos}>
            <Image
              className={`${styles.companyLogoImg} ${styles.companyLogoActive}`}
              src="/images/customers/pendo-nav-fill.svg"
              alt="Pendo"
              width={84}
              height={28}
              style={{ width: "auto", height: 16, maxHeight: 28 }}
            />
            <Image
              className={styles.companyLogoImg}
              src="/images/customers/trumpet-nav-fill.svg"
              alt="Trumpet"
              width={89}
              height={15}
              style={{ width: "auto", height: 16, maxHeight: 15 }}
            />
            <Image
              className={styles.companyLogoImg}
              src="/images/customers/runway-nav.svg"
              alt="Runway"
              width={66}
              height={13}
              style={{ width: "auto", height: 16, maxHeight: 13 }}
            />
            <Image
              className={styles.companyLogoImg}
              src="/images/customers/heygen-nav-fill.svg"
              alt="HeyGen"
              width={80}
              height={24}
              style={{ width: "auto", height: 16, maxHeight: 24 }}
            />
          </div>
          <Image
            className={styles.chevron}
            src="/images/customers/chevron-right-r.svg"
            alt="Next"
            width={24}
            height={24}
            style={{ width: 24, height: 24 }}
          />
        </div>

        {/* Screenshot Panel */}
        <div className={styles.screenshotPanel}>
          <Image
            className={styles.screenshotImage}
            src="/images/customers/product-screenshot.png"
            alt="Pendo dashboard with Velt collaboration features"
            width={1920}
            height={1021}
            priority
            style={{ width: "100%", height: "auto" }}
          />
          <div className={styles.testimonialBar}>
            <div className={styles.personInfo}>
              <Image
                className={styles.personAvatar}
                src="/images/customers/linda-avatar.png"
                alt="Linda Belcher"
                width={52}
                height={52}
                style={{ width: 52, height: 52 }}
              />
              <div className={styles.personDetails}>
                <span className={styles.personName}>Linda Belcher</span>
                <span className={styles.personRole}>
                  Product Manager @HeyGen
                </span>
              </div>
            </div>
            <p className={styles.testimonialQuote}>
              Velt got us the{" "}
              <span className={styles.quoteHighlight}>
                50% more engagement
              </span>{" "}
              at HeyGen that we needed!!!!!!!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
