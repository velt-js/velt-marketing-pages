import Image from "next/image";
import styles from "./Features.module.css";

const featureTabs = [
  { label: "Async", active: true },
  { label: "Realtime", active: false },
  { label: "AI", active: false },
];

/* ─── Comments Mockup ─── */
function CommentsMockup() {
  return (
    <div className={styles.commentsMockup}>
      {/* Comment Pin */}
      <div className={styles.commentPin}>
        <div className={styles.commentPinCircle}>
          <Image
            src="/images/features/comment-avatar.png"
            alt="Chris avatar"
            width={32}
            height={32}
            className={styles.commentPinAvatar}
          />
        </div>
        <div className={styles.commentPinTail} />
      </div>

      {/* Comment Bubble */}
      <div className={styles.commentBubble}>
        {/* Top bar: Open badge + flag + action icons */}
        <div className={styles.commentBubbleTopBar}>
          <div className={styles.commentBubbleTopLeft}>
            <span className={styles.commentStatusBadge}>Open</span>
            <Image
              src="/images/features/shape-flag1.svg"
              alt="Flag"
              width={16}
              height={16}
              className={styles.commentFlagIcon}
            />
          </div>
          <div className={styles.commentBubbleTopRight}>
            <Image
              src="/images/features/dots-more.svg"
              alt="More"
              width={16}
              height={16}
              className={styles.commentActionIcon}
            />
            <Image
              src="/images/features/copy-icon.svg"
              alt="Copy"
              width={16}
              height={16}
              className={styles.commentActionIcon}
            />
            <Image
              src="/images/features/check-icon.svg"
              alt="Resolve"
              width={16}
              height={16}
              className={styles.commentActionIcon}
            />
          </div>
        </div>

        {/* User row + message */}
        <div className={styles.commentBody}>
          <div className={styles.commentUserRow}>
            <Image
              src="/images/features/comment-avatar.png"
              alt="Chris avatar"
              width={24}
              height={24}
              className={styles.commentSmallAvatar}
            />
            <span className={styles.commentUserName}>Chris</span>
            <span className={styles.commentTime}>2w</span>
            <Image
              src="/images/features/checks-icon.svg"
              alt="Read"
              width={14}
              height={14}
              className={styles.commentChecksIcon}
            />
          </div>
          <p className={styles.commentText}>
            Can we tone this down{" "}
            <span className={styles.commentMention}>@Mark</span>
          </p>
        </div>

        {/* Footer */}
        <div className={styles.commentFooter}>
          <Image
            src="/images/features/reply-icon.svg"
            alt="Reply"
            width={14}
            height={14}
            className={styles.commentReplyIcon}
          />
          <span className={styles.commentReplyCount}>1 Reply</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Recording Mockup ─── */
function RecordingMockup() {
  return (
    <div className={styles.recordingMockup}>
      {/* Recording Bar */}
      <div className={styles.recordingBar}>
        <div className={styles.recordingBarLeft}>
          <div className={styles.recordingScreenShareCircle}>
            <Image
              src="/images/features/screen-share-icon.svg"
              alt="Screen share"
              width={18}
              height={18}
            />
          </div>
          <span className={styles.recordingTimer}>00:42</span>
        </div>
        <div className={styles.recordingDivider} />
        <div className={styles.recordingBarRight}>
          <button className={styles.recordingBtn} aria-label="Pause">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="1" width="3.5" height="12" rx="1" fill="white" />
              <rect
                x="8.5"
                y="1"
                width="3.5"
                height="12"
                rx="1"
                fill="white"
              />
            </svg>
          </button>
          <button className={styles.recordingBtn} aria-label="Stop">
            <Image
              src="/images/features/stop-circle.svg"
              alt="Stop"
              width={16}
              height={16}
            />
          </button>
          <button className={styles.recordingBtn} aria-label="Close">
            <Image
              src="/images/features/x-icon.svg"
              alt="Close"
              width={14}
              height={14}
            />
          </button>
        </div>
      </div>

      {/* Webcam Preview */}
      <div className={styles.webcamContainer}>
        <Image
          src="/images/features/recording-ring.svg"
          alt=""
          width={182}
          height={182}
          className={styles.webcamRing}
        />
        <Image
          src="/images/features/recording-face.png"
          alt="Webcam preview"
          width={162}
          height={162}
          className={styles.webcamFace}
        />
        <div className={styles.webcamControls}>
          <button className={styles.webcamControlBtn} aria-label="Microphone">
            <Image
              src="/images/features/mic-icon.svg"
              alt="Mic"
              width={16}
              height={16}
            />
          </button>
          <button className={styles.webcamControlBtn} aria-label="Camera">
            <Image
              src="/images/features/video-icon.svg"
              alt="Camera"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── View Analytics Mockup ─── */
function AnalyticsMockup() {
  return (
    <div className={styles.analyticsMockup}>
      <div className={styles.analyticsCardArea}>
        {/* Purple stats card */}
        <div className={styles.analyticsCard}>
          <div className={styles.analyticsStatMain}>
            <span className={styles.analyticsNumber}>32</span>
            <div className={styles.analyticsLabelRow}>
              <Image
                src="/images/features/eye-icon.svg"
                alt="Views"
                width={14}
                height={14}
                className={styles.analyticsEyeIcon}
              />
              <span className={styles.analyticsLabel}>TOTAL VIEWS</span>
            </div>
          </div>
        </div>

        {/* Views today text */}
        <div className={styles.analyticsViewsToday}>
          <span className={styles.analyticsViewsTodayText}>0 VIEWS TODAY</span>
        </div>

        {/* User list */}
        <div className={styles.analyticsUsers}>
          <div className={styles.analyticsUserRow}>
            <div className={`${styles.analyticsAvatar} ${styles.avatarRed}`}>
              M
            </div>
            <span className={styles.analyticsUserName}>Miri</span>
            <span className={styles.analyticsUserTime}>2h ago</span>
          </div>
          <div className={styles.analyticsUserRow}>
            <div className={`${styles.analyticsAvatar} ${styles.avatarGreen}`}>
              S
            </div>
            <span className={styles.analyticsUserName}>Sinclair</span>
            <span className={styles.analyticsUserTime}>5h ago</span>
          </div>
          <div className={styles.analyticsUserRow}>
            <div className={`${styles.analyticsAvatar} ${styles.avatarBlue}`}>
              Y
            </div>
            <span className={styles.analyticsUserName}>Yoen</span>
            <span className={styles.analyticsUserTime}>1d ago</span>
          </div>
        </div>
      </div>
      {/* White gradient overlay at bottom */}
      <div className={styles.analyticsGradient} />
    </div>
  );
}

/* ─── Notifications Mockup ─── */
function NotificationsMockup() {
  return (
    <div className={styles.notifMockup}>
      {/* Bell icon */}
      <div className={styles.notifBellWrap}>
        <Image
          src="/images/features/bell-icon.svg"
          alt="Notifications"
          width={20}
          height={20}
        />
      </div>

      {/* Notification popover */}
      <div className={styles.notifPanel}>
        {/* Panel Header */}
        <div className={styles.notifHeader}>
          <span className={styles.notifTitle}>Notifications</span>
          <div className={styles.notifHeaderIcons}>
            <Image
              src="/images/features/checks-notif.svg"
              alt="Mark all read"
              width={16}
              height={16}
            />
            <Image
              src="/images/features/settings-icon.svg"
              alt="Settings"
              width={16}
              height={16}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.notifTabsWrap}>
          <div className={styles.notifTabs}>
            <span className={`${styles.notifTab} ${styles.notifTabActive}`}>
              For You
            </span>
            <span className={styles.notifTab}>Documents</span>
            <span className={styles.notifTab}>All</span>
          </div>
        </div>

        {/* Notification Items */}
        <div className={styles.notifList}>
          <div className={styles.notifItem}>
            <div className={styles.notifAvatarWrap}>
              <Image
                src="/images/features/avatar-mihir.png"
                alt="Mihir"
                width={32}
                height={32}
                className={styles.notifAvatar}
              />
              <Image
                src="/images/features/notification-dot.svg"
                alt=""
                width={10}
                height={10}
                className={styles.notifDot}
              />
            </div>
            <div className={styles.notifContent}>
              <p className={styles.notifText}>
                <strong>Mihir</strong> commented on your document
              </p>
              <span className={styles.notifTime}>2m ago</span>
            </div>
          </div>
          <div className={styles.notifItem}>
            <div className={styles.notifAvatarWrap}>
              <Image
                src="/images/features/avatar-rakesh.png"
                alt="Rakesh"
                width={32}
                height={32}
                className={styles.notifAvatar}
              />
              <Image
                src="/images/features/notification-dot.svg"
                alt=""
                width={10}
                height={10}
                className={styles.notifDot}
              />
            </div>
            <div className={styles.notifContent}>
              <p className={styles.notifText}>
                <strong>Rakesh</strong> replied to your comment
              </p>
              <span className={styles.notifTime}>15m ago</span>
            </div>
          </div>
          <div className={styles.notifItem}>
            <div className={styles.notifAvatarWrap}>
              <Image
                src="/images/features/avatar-vivek.png"
                alt="Vivek"
                width={32}
                height={32}
                className={styles.notifAvatar}
              />
            </div>
            <div className={styles.notifContent}>
              <p className={styles.notifText}>
                <strong>Vivek</strong> mentioned you
              </p>
              <span className={styles.notifTime}>1h ago</span>
            </div>
          </div>
        </div>
      </div>
      {/* White gradient overlay at bottom */}
      <div className={styles.notifGradient} />
    </div>
  );
}

export default function Features() {
  return (
    <section className={styles.section}>
      {/* Content */}
      <div className={styles.contentContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Collaborative Features
              <br />
              for Any Scenario
            </h2>
            <p className={styles.subtitle}>
              A full suite of features that let your users collaborate and drive
              engagement
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

        {/* Feature Grid */}
        <div className={styles.featureGrid}>
          {/* Tab Rail */}
          <div className={styles.tabRail}>
            <div className={styles.tabs}>
              {featureTabs.map((tab, i) => (
                <span
                  key={i}
                  className={`${styles.tab} ${tab.active ? styles.tabActive : ""}`}
                >
                  {tab.label}
                </span>
              ))}
            </div>
          </div>

          {/* Comments Cell — left column top */}
          <div className={`${styles.featureCell} ${styles.cellComments}`}>
            <div className={styles.featurePreview}>
              <CommentsMockup />
            </div>
            <div className={styles.featureCellInfo}>
              <h3 className={styles.featureName}>Comments</h3>
              <p className={styles.featureDesc}>
                Your users can comment on specific elements, sections, or
                documents.
              </p>
            </div>
          </div>

          {/* Recording Cell — right column top */}
          <div className={`${styles.featureCell} ${styles.cellRecording}`}>
            <div className={styles.featurePreview}>
              <RecordingMockup />
            </div>
            <div className={styles.featureCellInfo}>
              <h3 className={styles.featureName}>Recording</h3>
              <p className={styles.featureDesc}>
                Enable Loom-style recording. Your users can record their screen,
                camera or audio
              </p>
            </div>
          </div>

          {/* View Analytics Cell — left column bottom */}
          <div className={`${styles.featureCell} ${styles.cellAnalytics}`}>
            <div className={styles.featurePreview}>
              <AnalyticsMockup />
            </div>
            <div className={styles.featureCellInfo}>
              <h3 className={styles.featureName}>View Analytics</h3>
              <p className={styles.featureDesc}>
                Track users view activity
              </p>
            </div>
          </div>

          {/* Notifications Cell — right column bottom */}
          <div className={`${styles.featureCell} ${styles.cellNotifications}`}>
            <div className={styles.featurePreview}>
              <NotificationsMockup />
            </div>
            <div className={styles.featureCellInfo}>
              <h3 className={styles.featureName}>Notifications</h3>
              <p className={styles.featureDesc}>
                Get collaboration notifications or push your own
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className={styles.testimonial}>
        <div className={styles.personInfo}>
          <Image
            src="/images/features/linda-belcher.png"
            alt="Linda Belcher"
            width={52}
            height={52}
            className={styles.personAvatar}
          />
          <div className={styles.personDetails}>
            <span className={styles.personName}>Linda Belcher</span>
            <span className={styles.personRole}>
              Product Manager @HeyGen
            </span>
          </div>
        </div>
        <p className={styles.testimonialQuote}>
          Velt hosts all collaboration functionalities needed to{" "}
          <span className={styles.testimonialHighlight}>boost engagement</span>{" "}
          at HeyGen
        </p>
      </div>
    </section>
  );
}
