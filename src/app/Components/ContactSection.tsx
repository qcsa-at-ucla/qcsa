"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "sending" | "success" | "error" | "ratelimit";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      if (res.status === 429) {
        setStatus("ratelimit");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF]">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-[#234285] text-center mb-4 font-kantumruy"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>
        <motion.p
          className="text-center text-[#234285] mb-10 font-kantumruy text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Have a question? Send us a message and we&apos;ll get back to you.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          noValidate
        >
          <div>
            <label htmlFor="contact-name" className="block text-sm font-semibold text-[#234285] mb-2 font-kantumruy">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#234285] focus:border-transparent transition font-kantumruy"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-semibold text-[#234285] mb-2 font-kantumruy">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#234285] focus:border-transparent transition font-kantumruy"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-semibold text-[#234285] mb-2 font-kantumruy">
              Message
            </label>
            <textarea
              id="contact-message"
              required
              maxLength={2000}
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What would you like to know?"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#234285] focus:border-transparent transition resize-none font-kantumruy"
            />
            <p className="text-xs text-gray-400 text-right mt-1 font-kantumruy">{message.length}/2000</p>
          </div>

          {status === "success" && (
            <p className="text-green-600 text-sm font-semibold font-kantumruy" role="status">
              Message sent! We&apos;ll be in touch soon.
            </p>
          )}
          {status === "ratelimit" && (
            <p className="text-amber-600 text-sm font-semibold font-kantumruy" role="alert">
              You&apos;ve sent too many messages. Please wait a few minutes and try again.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm font-semibold font-kantumruy" role="alert">
              Something went wrong. Please try again.
            </p>
          )}

          <motion.button
            type="submit"
            disabled={status === "sending" || status === "ratelimit"}
            className="w-full bg-[#234285] text-white py-3 rounded-lg font-semibold text-lg font-kantumruy hover:bg-blue-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
