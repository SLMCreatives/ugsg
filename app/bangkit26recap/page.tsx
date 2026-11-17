"use client";

import { useEffect, useRef, useState } from "react";
import {
  BANGKIT_QUESTIONS as QUESTIONS,
  BANGKIT_SECTIONS,
  validateBangkit,
  wantsToSpeak
} from "@/lib/bangkit-survey";
import "./bangkit.css";

type Answers = Record<string, string | string[] | boolean>;

const emptyAnswers = (): Answers =>
  Object.fromEntries(QUESTIONS.map((q) => [q.id, q.type === "multi" ? [] : ""]));

export default function BangkitSurveyPage() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [responseId, setResponseId] = useState("");
  const [consent, setConsent] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setResponseId(crypto.randomUUID());
  }, []);

  useEffect(() => {
    if (step >= 0 || done) headingRef.current?.focus();
    window.scrollTo({ top: 0 });
  }, [step, done]);

  const q = QUESTIONS[step];
  const speaker = wantsToSpeak(answers);

  function set(id: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setError("");
  }

  const isEmpty = (v: unknown) => !v || (Array.isArray(v) && v.length === 0);

  function next() {
    if (q?.required && isEmpty(answers[q.id])) {
      setError("Please choose an answer to continue.");
      return;
    }
    setError("");
    setStep(step + 1);
  }

  async function submit() {
    const payload = { ...answers, consent };
    const invalid = validateBangkit(payload);
    if (invalid) {
      setError(invalid);
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/bangkit-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: responseId, answers: payload })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const str = (id: string) => (typeof answers[id] === "string" ? (answers[id] as string) : "");
  const arr = (id: string) => (Array.isArray(answers[id]) ? (answers[id] as string[]) : []);

  return (
    <div className="bk">
      <header className="bk-header">
        <button
          type="button"
          className="bk-brand"
          aria-label="Bangkit survey start"
          onClick={() => {
            if (!done) setStep(-1);
          }}
        >
          <span>
            Bangkit Series
            <span className="bk-brand-sub">2026 Recap, 2027 Reset</span>
          </span>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bk-logo" src="/logo_unitar_wordmark.png" alt="UNITAR International University" />
      </header>

      {done ? (
        <main className="bk-thanks">
          <div className="bk-success">✓</div>
          <span className="bk-eyebrow">YOUR RESPONSE IS SAVED</span>
          <h1 ref={headingRef} tabIndex={-1}>
            You’re part of
            <br />
            <em>what comes next.</em>
          </h1>
          <p>Thank you for helping us shape Bangkit Series: 2026 Recap, 2027 Reset.</p>
          <p>
            Watch for SST’s announcement through your student email and WhatsApp. The final
            session date and time will be confirmed later.
          </p>
          {speaker && (
            <div className="bk-callout">
              Interested in sharing? SST may contact you using the email you provided.
            </div>
          )}
          <a href="mailto:sst@unitar.my" className="bk-text-link">
            Have a question? Contact SST →
          </a>
        </main>
      ) : step === -1 ? (
        <main className="bk-welcome">
          <div className="bk-intro">
            <span className="bk-eyebrow">
              <i /> UG STUDENT SURVEY
            </span>
            <h1>
              Bangkit Series:
              <br />
              <span>2026 Recap,</span>
              <br />
              <em>2027 Reset.</em>
            </h1>
            <p className="bk-lead">
              Every student has a story.
              <br />
              We’d love to hear yours.
            </p>
            <p className="bk-intro-copy">
              Small wins. Real challenges. Fresh starts. Help the Student Success Team shape an
              online sharing session that puts your experiences first. Every journey
              matters—including yours.
            </p>
            <button className="bk-primary" onClick={() => setStep(0)}>
              Let’s shape it together <span>→</span>
            </button>
            <div className="bk-meta">
              <span>◷ 8 questions · About 3–5 minutes</span>
              <span>✧ Personal stories optional</span>
            </div>
          </div>

          <div className="bk-visual" aria-hidden="true">
            <div className="bk-sun" />
            <div className="bk-orbit" />
            <div className="bk-orbit bk-orbit-two" />
            <div className="bk-year bk-old">
              2026<span>LOOK BACK</span>
            </div>
            <div className="bk-rise">
              <svg viewBox="0 0 120 120">
                <path d="M15 105L105 15M20 15h85v85" fill="none" stroke="currentColor" strokeWidth="12" />
              </svg>
            </div>
            <div className="bk-year bk-new">
              2027<span>MOVE FORWARD</span>
            </div>
            <div className="bk-note-card">
              <span className="bk-little-star">✳</span>
              <p>
                You don’t need a perfect story.
                <br />
                <strong>Just your own.</strong>
              </p>
            </div>
            <span className="bk-visual-caption">REFLECT · CONNECT · BEGIN AGAIN</span>
          </div>

          <section className="bk-about">
            <div>
              <span className="bk-eyebrow">WHAT’S THIS ABOUT?</span>
              <h2>
                Your journey.
                <br />
                Our inspiration.
              </h2>
            </div>
            <div>
              <p>
                SST is planning an online student sharing session in <strong>December 2026</strong>.
                We’ll reflect on your year, hear fellow students’ experiences and explore realistic
                goals for 2027.
              </p>
              <p>
                Your answers will help us choose a suitable time, meaningful topics and activities
                you’ll enjoy. Join as a speaker, take part in the chat, or simply listen—you belong
                here. Take a few minutes to complete this survey and help us create a session that
                matters to you.
              </p>
              <span className="bk-pill">Online session</span>
              <span className="bk-pill">Date &amp; time to be confirmed</span>
            </div>
          </section>
        </main>
      ) : (
        <main className="bk-survey">
          <aside className="bk-aside">
            <span className="bk-eyebrow">BANGKIT SERIES</span>
            <h2>
              Little reflections.
              <br />
              <em>Big beginnings.</em>
            </h2>
            <p>2026 Recap, 2027 Reset</p>
            <div className="bk-sections">
              {BANGKIT_SECTIONS.map((s, i) => (
                <div key={s} className={q?.section === s || (!q && i === 3) ? "active" : ""}>
                  <span>0{i + 1}</span>
                  {s}
                </div>
              ))}
            </div>
            <div className="bk-aside-note">
              ✳<p>Share as much or as little as you feel comfortable with.</p>
            </div>
          </aside>

          <section className="bk-panel">
            <div className="bk-progress-label">
              <span>{q?.section || "Almost there"}</span>
              <span>{q ? `${step + 1} of ${QUESTIONS.length}` : "Review & send"}</span>
            </div>
            <div className="bk-progress">
              <div style={{ width: `${Math.min(((step + 1) / QUESTIONS.length) * 100, 100)}%` }} />
            </div>

            {q ? (
              <div className="bk-question" key={q.id}>
                <span className="bk-eyebrow">
                  QUESTION {String(step + 1).padStart(2, "0")}{" "}
                  <span className="bk-required">{q.required ? "REQUIRED" : "OPTIONAL"}</span>
                </span>
                <h1 tabIndex={-1} ref={headingRef}>
                  {q.title}
                </h1>
                {q.hint && <p className="bk-hint">{q.hint}</p>}

                {q.type === "text" ? (
                  <>
                    <textarea
                      aria-label={q.title}
                      maxLength={2000}
                      value={str(q.id)}
                      placeholder="Your words, your way…"
                      onChange={(e) => set(q.id, e.target.value)}
                    />
                    <span className="bk-char-count">{str(q.id).length} / 2,000</span>
                  </>
                ) : (
                  <div
                    className="bk-options"
                    role={q.type === "single" ? "radiogroup" : "group"}
                    aria-label={q.title}
                  >
                    {q.options?.map((opt, i) => {
                      const selected = q.type === "multi" ? arr(q.id).includes(opt) : str(q.id) === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          role={q.type === "single" ? "radio" : "checkbox"}
                          aria-checked={selected}
                          className={"bk-option" + (selected ? " selected" : "")}
                          onClick={() => {
                            if (q.type === "single") set(q.id, opt);
                            else if (selected) set(q.id, arr(q.id).filter((x) => x !== opt));
                            else set(q.id, [...arr(q.id), opt]);
                          }}
                        >
                          <span className="bk-option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{opt}</span>
                          <span className="bk-choice-mark">
                            {selected ? "✓" : q.type === "multi" ? "+" : "○"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {error && (
                  <p role="alert" className="bk-error">
                    {error}
                  </p>
                )}
                <div className="bk-nav">
                  <button
                    className="bk-back"
                    onClick={() => {
                      setStep(step - 1);
                      setError("");
                    }}
                  >
                    ← Back
                  </button>
                  <button className="bk-primary" onClick={next}>
                    {!q.required && isEmpty(answers[q.id]) ? "Skip" : "Continue"} <span>→</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bk-question">
                <span className="bk-eyebrow">ONE LAST LOOK</span>
                <h1 ref={headingRef} tabIndex={-1}>
                  Ready to share
                  <br />
                  your perspective?
                </h1>
                <p className="bk-hint">
                  Review your answers below. You can change anything before sending.
                </p>

                <div className="bk-box">
                  <h3>A little about you</h3>
                  <p>Please enter your full name and matric number before finishing.</p>
                  <label>
                    Full name (required)
                    <input
                      required
                      maxLength={120}
                      autoComplete="name"
                      placeholder="Your full name"
                      value={str("name")}
                      onChange={(e) => set("name", e.target.value)}
                    />
                  </label>
                  <label>
                    Matric number (required)
                    <input
                      required
                      maxLength={40}
                      autoComplete="off"
                      placeholder="e.g. MC261012345"
                      value={str("matric")}
                      onChange={(e) => set("matric", e.target.value)}
                    />
                  </label>
                  {speaker && (
                    <label>
                      Email address (for speaker follow-up)
                      <input
                        required
                        type="email"
                        maxLength={254}
                        autoComplete="email"
                        value={str("email")}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    </label>
                  )}
                </div>

                <details>
                  <summary>Review my answers</summary>
                  {QUESTIONS.map((qq, i) => (
                    <div className="bk-review-row" key={qq.id}>
                      <strong>{qq.title}</strong>
                      <p>
                        {Array.isArray(answers[qq.id])
                          ? arr(qq.id).join(", ") || "Skipped"
                          : str(qq.id) || "Skipped"}
                      </p>
                      <button className="bk-text-link" onClick={() => setStep(i)}>
                        Edit answer
                      </button>
                    </div>
                  ))}
                </details>

                <div className="bk-box">
                  <h3>Your answers, handled with care.</h3>
                  <p>
                    SST will use your responses to plan this session and understand students’ needs.
                    Stories will be shared without your name only if you selected “Yes”. Your full
                    name and matric number identify your response to SST. Your email is requested
                    only if you are interested in speaking, so SST can follow up.
                  </p>
                  <p>
                    Questions about your response? Email{" "}
                    <a href="mailto:sst@unitar.my">sst@unitar.my</a>.
                  </p>
                  <label className="bk-consent">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setError("");
                      }}
                    />
                    <span>
                      I understand how SST will use my responses and agree to submit this survey.
                    </span>
                  </label>
                </div>

                {error && (
                  <p role="alert" className="bk-error">
                    {error}
                  </p>
                )}
                <div className="bk-nav">
                  <button className="bk-back" onClick={() => setStep(step - 1)}>
                    ← Back
                  </button>
                  <button disabled={saving} className="bk-primary" onClick={submit}>
                    {saving ? "Saving…" : "Send my response"} <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>
      )}

      <footer className="bk-footer">
        <span>Made for your next chapter.</span>
        <a href="mailto:sst@unitar.my">sst@unitar.my</a>
      </footer>
    </div>
  );
}
