"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./ss-contact.module.css";

const EMAIL = "contact@s-soumyakanta.com";
const STATUS_RESET_MS = 3000;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/s-soumyakanta" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/s-soumyakanta" },
  { label: "X", href: "https://twitter.com/s_soumyakanta" },
  { label: "Bluesky", href: "https://bsky.app/profile/s-soumyakanta.com" },
  { label: "YouTube", href: "https://youtube.com/@s-soumyakanta" },
];

// Caps mirror the server schema in /api/send so a message that would be
// rejected there fails here first, with a readable message instead of a 400.
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("This field is required")
    .min(1, "Minimum 1 character")
    .max(MAX_NAME, `Maximum ${MAX_NAME} characters`),
  email: yup
    .string()
    .required("This field is required")
    .email("Invalid email format")
    .max(MAX_EMAIL, `Maximum ${MAX_EMAIL} characters`),
  message: yup
    .string()
    .required("This field is required")
    .min(1, "Minimum 1 character")
    .max(MAX_MESSAGE, `Maximum ${MAX_MESSAGE} characters`),
  // Honeypot — kept out of view via CSS, not in the tab order. A real
  // visitor never touches it; a bot filling every field in the DOM does.
  company: yup.string().optional(),
});

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
}

type Status = "idle" | "success" | "error";

const DEFAULT_ERROR_MESSAGE = "Something went wrong — please try again, or email me directly.";
const RATE_LIMIT_MESSAGE = "You're sending messages too quickly. Please wait a bit and try again.";

export default function SSContact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR_MESSAGE);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [name, email, message] = watch(["name", "email", "message"]);
  const isFilled = Boolean(name?.trim() && email?.trim() && message?.trim());

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const settleStatus = (next: Status, message?: string) => {
    setStatus(next);
    if (next === "error") setErrorMessage(message ?? DEFAULT_ERROR_MESSAGE);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    if (next !== "idle") {
      resetTimer.current = setTimeout(() => setStatus("idle"), STATUS_RESET_MS);
    }
  };

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    // The honeypot field is registered so a bot filling every input in the
    // DOM populates it, but it's never rendered where a person can reach it.
    if (data.company) {
      reset();
      settleStatus("success");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        settleStatus("success");
      } else if (response.status === 429) {
        settleStatus("error", RATE_LIMIT_MESSAGE);
      } else {
        settleStatus("error");
      }
    } catch {
      settleStatus("error");
    } finally {
      setLoading(false);
    }
  };

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
          <span className={styles.crumb}>Contact</span>
        </div>

        <div className={styles.body}>
          <h1 className={styles.title}>Contact</h1>

          <div className={styles.cols}>
            <div className={styles.formCol}>
              {status === "success" ? (
                <div className={styles.thanks} role="status" aria-live="polite">
                  <p className={styles.thanksEyebrow}>Message sent</p>
                  <p className={styles.thanksText}>
                    Thank you — I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("company")}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      maxLength={MAX_NAME}
                      autoComplete="name"
                      aria-invalid={errors.name ? "true" : "false"}
                      className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className={styles.error}>{errors.name.message}</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      maxLength={MAX_EMAIL}
                      autoComplete="email"
                      aria-invalid={errors.email ? "true" : "false"}
                      className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className={styles.error}>{errors.email.message}</span>
                    )}
                  </div>

                  <div className={`${styles.field} ${styles.messageField}`}>
                    <label className={styles.label} htmlFor="message">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      maxLength={MAX_MESSAGE}
                      aria-invalid={errors.message ? "true" : "false"}
                      className={`${styles.textarea} ${errors.message ? styles.invalid : ""}`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <span className={styles.error}>{errors.message.message}</span>
                    )}
                  </div>

                  <div className={styles.actions}>
                    <button
                      type="submit"
                      className={`${styles.submit} ${isFilled ? styles.active : ""}`}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send message"}
                    </button>

                    {status === "error" && (
                      <span className={styles.formError} role="alert">
                        {errorMessage}
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>

            <div className={styles.aside}>
              <div>
                <span className={styles.label}>Email</span>
                <a className={styles.value} href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>

              <div>
                <span className={styles.label}>Socials</span>
                <ul className={styles.socials}>
                  {SOCIALS.map((social) => (
                    <li key={social.href} className={styles.socialItem}>
                      <a
                        className={styles.socialLink}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.label}
                        <span className={styles.arrow} aria-hidden="true">
                          &#8599;
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
