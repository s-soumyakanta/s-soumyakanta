"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import styles from "./ss-contact.module.css";

const EMAIL = "contact@s-soumyakanta.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/s-soumyakanta" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/s-soumyakanta" },
  { label: "X", href: "https://twitter.com/s_soumyakanta" },
  { label: "Bluesky", href: "https://bsky.app/profile/s-soumyakanta.com" },
  { label: "YouTube", href: "https://youtube.com/@s-soumyakanta" },
];

const schema = yup.object().shape({
  name: yup.string().required("This field is required").min(1, "Minimum 1 character"),
  email: yup.string().required("This field is required").email("Invalid email format"),
  message: yup.string().required("This field is required").min(1, "Minimum 1 character"),
});

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function SSContact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
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
        toast({
          description: "Your message has been sent.",
        });
        reset();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to send message.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `An error occurred. ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.wrap}>
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.lede}>
          Want to discuss a tech project or need a full-stack developer to create a
          website for you? Let me know.
        </p>

        <div className={styles.rule} aria-hidden="true" />

        <div className={styles.cols}>
          <div className={styles.aside}>
            <div>
              <span className={styles.label}>Email</span>
              <a className={styles.value} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>

            <div>
              <span className={styles.label}>Elsewhere</span>
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

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Your name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Jane Doe"
                aria-invalid={errors.name ? "true" : "false"}
                className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
                {...register("name")}
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="jane@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
                {...register("email")}
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">
                Your message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Tell me about the project."
                aria-invalid={errors.message ? "true" : "false"}
                className={`${styles.textarea} ${errors.message ? styles.invalid : ""}`}
                {...register("message")}
              />
              {errors.message && (
                <span className={styles.error}>{errors.message.message}</span>
              )}
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
