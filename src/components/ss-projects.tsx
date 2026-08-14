import Link from "next/link";
import styles from "./ss-projects.module.css";

const PROJECT_URL = "https://touchtyping.online";

export default function SSProjects() {
  return (
    <div className={styles.root}>
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.stage}>
        <span className={`${styles.tick} ${styles.tl}`} aria-hidden="true" />
        <span className={`${styles.tick} ${styles.tr}`} aria-hidden="true" />
        <span className={`${styles.tick} ${styles.bl}`} aria-hidden="true" />
        <span className={`${styles.tick} ${styles.br}`} aria-hidden="true" />

        <div className={styles.head}>
          <Link className={styles.brand} href="/">
            S Soumyakanta
          </Link>
          <span className={styles.crumb}>Projects</span>
        </div>

        <div className={styles.body}>
          <div>
            <h1 className={styles.title}>Projects</h1>
            <p className={styles.intro}>
              Things I&apos;ve built and maintain. Currently one project,
              running in production for aspirants preparing for Indian
              government exams.
            </p>
          </div>

          <article className={styles.project}>
            <div className={styles.projectInfo}>
              <p className={styles.projectEyebrow}>01 — Web platform</p>
              <h2 className={styles.projectName}>Touch Typing Online</h2>

              <ul className={styles.badges}>
                <li className={styles.badge}>180+ free SSC CGL tests</li>
                <li className={styles.badge}>Free certificate</li>
                <li className={styles.badge}>SSC CHSL &amp; RRB NTPC</li>
              </ul>

              <p className={styles.desc}>
                A typing speed test platform built for Indian government
                exam aspirants — SSC CGL, SSC CHSL, and RRB NTPC. Practice
                against real exam-format passages, track words-per-minute
                and accuracy against official thresholds, and download a
                free typing certificate once you clear a test.
              </p>

              <a
                className={styles.cta}
                href={PROJECT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit touchtyping.online
                <span className={styles.arrow} aria-hidden="true">
                  &#8599;
                </span>
              </a>
            </div>

            <div className={styles.certWrap}>
              <p className={styles.certLabel}>Free certificate</p>
              <div className={styles.certFrame}>
                <CertificatePreview />
              </div>
            </div>
          </article>

          <div className={styles.back}>
            <Link className={styles.backLink} href="/">
              &larr; Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Placeholder certificate, drawn in the site's own hairline/mono language
   rather than a screenshot — swap for a real exported certificate image
   from touchtyping.online when you have one (see note below the file). */
function CertificatePreview() {
  return (
    <svg
      viewBox="0 0 420 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sample typing speed certificate from Touch Typing Online, showing words per minute and accuracy score"
    >
      <rect
        x="1"
        y="1"
        width="418"
        height="298"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
      />
      <rect
        x="14"
        y="14"
        width="392"
        height="272"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
      />

      <text
        x="210"
        y="52"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="3"
        fill="rgba(255,255,255,0.5)"
      >
        TOUCH TYPING ONLINE
      </text>

      <text
        x="210"
        y="90"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="20"
        fontWeight="600"
        letterSpacing="-0.5"
        fill="#ededed"
      >
        Certificate of Completion
      </text>

      <line x1="90" y1="112" x2="330" y2="112" stroke="rgba(255,255,255,0.14)" />

      <text
        x="210"
        y="140"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="8"
        letterSpacing="2"
        fill="rgba(255,255,255,0.4)"
      >
        THIS CERTIFIES THAT
      </text>

      <text
        x="210"
        y="166"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
        fill="#ededed"
      >
        Your Name Here
      </text>

      <text
        x="210"
        y="190"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="10.5"
        fill="rgba(255,255,255,0.55)"
      >
        completed the SSC CGL typing test
      </text>

      {/* stat pair: WPM / Accuracy */}
      <line x1="150" y1="218" x2="150" y2="252" stroke="rgba(255,255,255,0.12)" />
      <text
        x="118"
        y="234"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="18"
        fontWeight="600"
        fill="#ededed"
      >
        42
      </text>
      <text
        x="118"
        y="248"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="7"
        letterSpacing="1.5"
        fill="rgba(255,255,255,0.4)"
      >
        WPM
      </text>

      <text
        x="270"
        y="234"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="18"
        fontWeight="600"
        fill="#ededed"
      >
        98%
      </text>
      <text
        x="270"
        y="248"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="7"
        letterSpacing="1.5"
        fill="rgba(255,255,255,0.4)"
      >
        ACCURACY
      </text>

      <line x1="60" y1="266" x2="360" y2="266" stroke="rgba(255,255,255,0.1)" />
      <text
        x="210"
        y="280"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="7"
        letterSpacing="2"
        fill="rgba(255,255,255,0.35)"
      >
        TOUCHTYPING.ONLINE
      </text>
    </svg>
  );
}
