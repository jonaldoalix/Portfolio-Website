import { useState, type FormEvent } from "react";
import { useContent } from "../useContent";

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const { contact, profile } = useContent();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const formEndpoint = `https://formsubmit.co/ajax/${profile.email}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "Inquiry").trim();
    const message = String(data.get("message") || "").trim();

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: subject,
          _template: "table",
          _replyto: email,
        }),
      });

      if (!response.ok) {
        throw new Error("Send failed");
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(
        `Could not send. Email ${profile.email} directly, or fix the form endpoint.`,
      );
    }
  }

  return (
    <section className="section section--contact" id="contact">
      <div className="contact-grid">
        <div className="contact-copy reveal">
          <div className="contact-copy__main">
            <p className="eyebrow">Contact</p>
            <h2>{contact.title}</h2>
            <p className="section__lede">{contact.lede}</p>
            <ul className="contact-direct">
              <li>
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <span>Phone</span>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                  {profile.phoneDisplay}
                </a>
              </li>
              <li>
                <span>LinkedIn</span>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <span>GitHub</span>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div className="contact-copy__foot">
            <div className="contact-expect">
              <p className="hero__panel-label">Response time</p>
              <p>TODO: set expectations for how fast you reply.</p>
            </div>
            <p className="resume-note">
              {contact.resumeNote}{" "}
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>

        <form className="contact-form reveal reveal--delay" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Subject
            <input name="subject" type="text" defaultValue="Hello" />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows={6}
              required
              placeholder="Write your message here."
            />
          </label>
          <button
            className="btn btn--primary"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "Sending…"
              : status === "sent"
                ? "Sent"
                : "Send"}
          </button>
          {status === "sent" ? (
            <p className="form-hint form-hint--ok">
              Message sent. Replace this confirmation copy if you want.
            </p>
          ) : error ? (
            <p className="form-hint form-hint--err">{error}</p>
          ) : (
            <p className="form-hint">
              Wire this form to your mail provider, then update this helper text.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
