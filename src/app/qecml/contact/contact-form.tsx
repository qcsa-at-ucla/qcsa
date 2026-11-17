"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:border-[#990000] focus:outline-none focus:ring-1 focus:ring-[#990000]";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/qecml/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Failed to send message");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-sm font-semibold">
        Name
        <input name="name" type="text" required maxLength={100} className={inputClass} />
      </label>
      <label className="block text-sm font-semibold">
        Email
        <input name="email" type="email" required maxLength={254} className={inputClass} />
      </label>
      <label className="block text-sm font-semibold">
        Title
        <input name="title" type="text" required maxLength={200} className={inputClass} />
      </label>
      <label className="block text-sm font-semibold">
        Message
        <textarea name="message" required maxLength={5000} rows={7} className={inputClass} />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-[#990000] px-6 py-2.5 font-bold text-white transition hover:bg-[#7a0000] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" && (
        <p role="status" className="text-sm font-semibold text-green-700">
          Thanks! Your message has been sent.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </form>
  );
}
