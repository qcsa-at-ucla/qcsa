"use client";

import { useMemo, useState } from "react";

const GOOGLE_FORM_BASE =
  "https://docs.google.com/forms/d/e/1FAIpQLSex5EiOsnk4ZjP1nlZ8PyTZXm8qywiuZfG4M0zJNfn7H4L9Kg/viewform";

const ENTRY = {
  name: "entry.1730109360",
  email: "entry.796533582",
  university: "entry.286495262",
  education: "entry.1415855565",
  gradDate: "entry.661513204",
  experience: "entry.1148357698",
  track: "entry.1837997093",
  role: "entry.872592013",
  linkedin: "entry.1504672551",
};

function setOtherAware(params, entryId, value, otherText) {
  if (value === "__other__") {
    params.set(entryId, "__other_option__");
    params.set(`${entryId}.other_option_response`, otherText || "");
  } else {
    params.set(entryId, value);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegistrationSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    university: "UCLA",
    universityOther: "",
    education: "Undergraduate",
    educationOther: "",
    gradDate: "",
    experience: "3",
    track: "Software Stack: (Compilers, Pulse Control, Cloud Infrastructure)",
    role: "Summer Internship (2026)",
    linkedin: "",
  });

  const [error, setError] = useState("");

  const universityOptions = useMemo(
    () => ["UCLA", "UCSD", "Caltech", "USC", "UCSB", "Chapman", "UCI", "__other__"],
    []
  );

  const educationOptions = useMemo(
    () => ["Undergraduate", "Masters", "PhD", "Postdoc", "__other__"],
    []
  );

  const trackOptions = useMemo(
    () => [
      "Hardware / Experiment: (Fab, Optics, Cryogenics, Electronics, RF)",
      "Theory / Simulation: (QEC, Algorithm Design, Quantum Information)",
      "Software Stack: (Compilers, Pulse Control, Cloud Infrastructure)",
      "Classical Engineering: (FPGA, ASIC, Mechanical Design)",
    ],
    []
  );

  const roleOptions = useMemo(
    () => ["Summer Internship (2026)", "Co-op (Fall/Spring)", "Full-Time (New Grad)", "Postdoc", "Other:"],
    []
  );

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function buildPrefilledUrl() {
    const params = new URLSearchParams();
    params.set("usp", "pp_url");

    params.set(ENTRY.name, form.name.trim());
    params.set(ENTRY.email, form.email.trim());

    setOtherAware(params, ENTRY.university, form.university, form.universityOther.trim());
    setOtherAware(params, ENTRY.education, form.education, form.educationOther.trim());

    params.set(ENTRY.gradDate, form.gradDate.trim());
    params.set(ENTRY.experience, String(form.experience));
    params.set(ENTRY.track, form.track);
    params.set(ENTRY.role, form.role);

    if (form.linkedin.trim()) params.set(ENTRY.linkedin, form.linkedin.trim());

    return `${GOOGLE_FORM_BASE}?${params.toString()}`;
  }

  function onContinue(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Please enter your full name.");
    if (!form.email.trim()) return setError("Please enter your email.");
    if (!isValidEmail(form.email.trim())) return setError("Please enter a valid email.");
    if (form.university === "__other__" && !form.universityOther.trim())
      return setError("Please specify your university.");
    if (form.education === "__other__" && !form.educationOther.trim())
      return setError("Please specify your education program.");
    if (!form.gradDate.trim()) return setError("Please enter graduation date.");

    window.location.href = buildPrefilledUrl();
  }

  return (
    <section className="rego-section">
      <div className="rego-card">

        <div className="rego-header">
          <h2>Quantum Career Fair Registration</h2>
          <p>Step 1 of 2 — You will upload your CV on the next page</p>
        </div>

        <form onSubmit={onContinue} className="rego-form">

          <input
            className="input"
            placeholder="First and Last Name *"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />

          <input
            className="input"
            placeholder="Email Address *"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />

          <div className="full">
            <label>University / Affiliation *</label>
            <select
              className="input"
              value={form.university}
              onChange={(e) => update("university", e.target.value)}
            >
              {universityOptions.map((o) => (
                <option key={o} value={o}>
                  {o === "__other__" ? "Other" : o}
                </option>
              ))}
            </select>

            {form.university === "__other__" && (
              <input
                className="input"
                style={{ marginTop: 8 }}
                placeholder="Type your university"
                value={form.universityOther}
                onChange={(e) => update("universityOther", e.target.value)}
              />
            )}
          </div>

          <div className="full">
            <label>Level of Education *</label>
            <select
              className="input"
              value={form.education}
              onChange={(e) => update("education", e.target.value)}
            >
              {educationOptions.map((o) => (
                <option key={o} value={o}>
                  {o === "__other__" ? "Other" : o}
                </option>
              ))}
            </select>

            {form.education === "__other__" && (
              <input
                className="input"
                style={{ marginTop: 8 }}
                placeholder="Type your program"
                value={form.educationOther}
                onChange={(e) => update("educationOther", e.target.value)}
              />
            )}
          </div>

          <input
            className="input"
            placeholder="Graduation Date (MM/YYYY) *"
            value={form.gradDate}
            onChange={(e) => update("gradDate", e.target.value)}
          />

          <div>
            <label>Quantum Experience (1–5)</label>
            <select
              className="input"
              value={form.experience}
              onChange={(e) => update("experience", e.target.value)}
            >
              {[1,2,3,4,5].map(n => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="full">
            <label>Primary Track *</label>
            <select
              className="input"
              value={form.track}
              onChange={(e) => update("track", e.target.value)}
            >
              {trackOptions.map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="full">
            <label>Desired Role *</label>
            <select
              className="input"
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
            >
              {roleOptions.map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <input
            className="input full"
            placeholder="LinkedIn / Google Scholar (optional)"
            value={form.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
          />

          <button type="submit" className="submit-btn">
            Continue to CV Upload →
          </button>

          {error && <div className="error-box"> {error}</div>}

        </form>
      </div>

      {/* CSS Styles Currently Being Used - Can be ported to another separate css file if necessary */}
      <style jsx>{`
        .rego-section {
          padding: 3rem 1rem;
          display: flex;
          justify-content: center;
        }

        .rego-card {
          background: white;
          max-width: 860px;
          width: 100%;
          border-radius: 20px;
          padding: 2.5rem 2.2rem;
          box-shadow: 0 25px 60px rgba(0,0,0,0.08);
        }

        .rego-header h2 {
          margin: 0;
          font-size: 1.9rem;
          color: #0f172a;
        }

        .rego-header p {
          margin-top: 6px;
          color: #64748b;
          font-size: 0.95rem;
        }

        .rego-form {
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .full {
          grid-column: 1 / -1;
        }

        label {
          font-size: 0.85rem;
          font-weight: 500;
          color: #475569;
          margin-bottom: 6px;
          display: block;
        }

        .input {
          width: 100%;
          padding: 0.8rem 0.95rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          background: white;
        }

        .input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .input:hover {
          border-color: #cbd5f5;
        }

        .submit-btn {
          grid-column: 1 / -1;
          margin-top: 10px;
          padding: 0.95rem;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(37,99,235,0.25);
        }

        .submit-btn:active {
          transform: translateY(0px);
          box-shadow: none;
        }

        .error-box {
          grid-column: 1 / -1;
          margin-top: 8px;
          padding: 0.75rem;
          border-radius: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }

        @media (max-width: 700px) {
          .rego-form {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
