import Image from "next/image";
import styles from "./GetStarted.module.css";

export default function GetStarted() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>
            Get Started in <span className={styles.titleGradient}>3 Steps</span>
          </h2>
          <p className={styles.subtitle}>
            All features take less than 5 minutes to get started
          </p>
        </div>
        <div className={styles.ctaRow}>
          <a href="#" className={styles.ctaOutline}>
            <Image
              src="/images/get-started/book-icon.svg"
              width={18}
              height={18}
              alt=""
              className={styles.ctaOutlineIcon}
            />
            View Docs
          </a>
          <a href="#" className={styles.ctaFilled}>Try for Free</a>
        </div>
      </div>

      {/* Card Container */}
      <div className={styles.cardContainer}>
        {/* Steps Row */}
        <div className={styles.stepsRow}>
          {/* Step 1: Initialize Velt */}
          <div className={`${styles.step} ${styles.stepFixed}`}>
            <div className={styles.stepHeader}>
              <h3 className={styles.stepTitle}>1. Initialize Velt</h3>
              <p className={styles.stepDescription}>
                Setting up velt takes 2 minutes
              </p>
            </div>
            <div className={styles.terminal}>
              <div className={styles.terminalChrome}>
                <div className={styles.terminalDots}>
                  <span
                    className={`${styles.terminalDot} ${styles.terminalDotRed}`}
                  />
                  <span
                    className={`${styles.terminalDot} ${styles.terminalDotYellow}`}
                  />
                  <span
                    className={`${styles.terminalDot} ${styles.terminalDotGreen}`}
                  />
                </div>
              </div>
              <div className={styles.terminalLines}>
                <p className={styles.terminalLine}>
                  <span className={styles.terminalPrompt}>app &gt;&nbsp;</span>
                  <span className={styles.terminalText}>npm i </span>
                  <span className={styles.terminalHighlight}>
                    @veltdev/client
                  </span>
                </p>
                <p className={styles.terminalLine}>
                  <span className={styles.terminalPrompt}>app &gt;&nbsp;</span>
                  <span className={styles.terminalText}>
                    Enter your API Key:
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.stepFadeRight} />
          </div>

          {/* Step 2: Add Component */}
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <h3 className={styles.stepTitle}>2. Add Component</h3>
              <p className={styles.stepDescription}>
                Copy paste from 15+ components
              </p>
            </div>
            <div className={styles.codeBlock}>
              <p className={styles.codeLine}>
                <span className={styles.codeBracket}>&lt;</span>
                <span className={styles.codeTag}>VeltComments</span>
                <span className={styles.codeBracket}>&gt;</span>
              </p>
              <div className={styles.commentPreview}>
                <div className={styles.commentAvatarRow}>
                  <div className={styles.commentAvatar} />
                  <div className={styles.commentMeta}>
                    <div className={styles.commentNameBar} />
                    <div className={styles.commentTimeBar} />
                  </div>
                </div>
                <div className={styles.commentBodyBars}>
                  <div className={styles.commentBarLong} />
                  <div className={styles.commentBarMed} />
                  <div className={styles.commentBarShort} />
                </div>
              </div>
              <p className={styles.codeLine}>
                <span className={styles.codeBracket}>&lt;/</span>
                <span className={styles.codeTag}>VeltComments</span>
                <span className={styles.codeBracket}>&gt;</span>
              </p>
            </div>
            <div className={styles.stepFadeRight} />
          </div>

          {/* Step 3: Style Your Components */}
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <h3 className={styles.stepTitle}>3. Style Your Components</h3>
              <p className={styles.stepDescription}>
                Match your UI language with CSS
              </p>
            </div>
            <div className={styles.stylePreview}>
              <div className={styles.styleWidget}>
                <div className={styles.styleWidgetTop}>
                  <div className={styles.statusBadge}>Open</div>
                  <div className={styles.priorityBadge}>
                    <span className={styles.priorityDot} />
                    P0
                  </div>
                </div>
                <div className={styles.styleWidgetBody}>
                  <div className={styles.styleWidgetAvatar}>Me</div>
                  <div className={styles.styleWidgetInput} />
                  <div className={styles.styleWidgetSend} />
                </div>
                <div className={styles.styleWidgetDots}>
                  <Image
                    src="/images/get-started/dots-icon.svg"
                    width={20}
                    height={4}
                    alt=""
                  />
                </div>
              </div>
              <div className={styles.chips}>
                <div className={`${styles.chip} ${styles.chipCorner}`}>
                  <span
                    className={`${styles.chipIcon} ${styles.chipIconCorner}`}
                  >
                    <Image
                      src="/images/get-started/corner-ios.svg"
                      width={12}
                      height={12}
                      alt=""
                    />
                  </span>
                  <span className={styles.chipLabel}>16px</span>
                </div>
                <div className={`${styles.chip} ${styles.chipFont}`}>
                  <span className={`${styles.chipIcon} ${styles.chipIconFont}`}>
                    Tt
                  </span>
                  <span className={styles.chipLabel}>Poppins</span>
                </div>
                <div className={`${styles.chip} ${styles.chipColor}`}>
                  <span
                    className={`${styles.chipIcon} ${styles.chipIconColor}`}
                  />
                  <span className={styles.chipLabel}>Primary / 6</span>
                </div>
              </div>
            </div>
            <div className={styles.stepFadeRight} />
          </div>
        </div>

        {/* Testimonial Strip */}
        <div className={styles.testimonialStrip}>
          <div className={styles.testimonialAuthor}>
            <div className={styles.testimonialAvatar}>
              <Image
                src="/images/get-started/linda-avatar.png"
                width={52}
                height={52}
                alt="Linda Belcher"
                className={styles.testimonialAvatarImg}
              />
            </div>
            <div className={styles.testimonialInfo}>
              <span className={styles.testimonialName}>Linda Belcher</span>
              <span className={styles.testimonialRole}>
                Product Manager @HeyGen
              </span>
            </div>
          </div>
          <p className={styles.testimonialQuote}>
            Velt hosts all collaboration functionalities needed to{" "}
            <span className={styles.testimonialHighlight}>
              boost engagement
            </span>{" "}
            at HeyGen
          </p>
        </div>
      </div>
    </section>
  );
}
