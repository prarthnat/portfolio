import React, { useState } from "react";
import axios from "axios";
import { PROFILE } from "../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const BUDDIES = [
  { name: "email me", value: PROFILE.email, href: `mailto:${PROFILE.email}`, status: "online" },
  { name: "github.com/prarthnat", value: "@prarthnat", href: PROFILE.github, status: "online" },
  { name: "linkedin", value: "prarthna-tiwari", href: PROFILE.linkedin, status: "away" },
  { name: "behance", value: "/prarthna", href: PROFILE.behance, status: "online" },
  { name: "ring me", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}`, status: "busy" },
];

export default function ContactWidget() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setErrorMsg("fill in all 3 fields, bestie ♡");
      return;
    }
    setStatus("sending");
    try {
      await axios.post(`${API}/contact`, form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setStatus("error");
      setErrorMsg(typeof detail === "string" ? detail : "could not send — try again in a sec");
    }
  };

  const statusColor = (s) =>
    s === "online" ? "#39ff14" : s === "away" ? "#ffd700" : "#ff69b4";

  return (
    <div className="p-4 sm:p-6 font-vt text-lg bg-[#ffd1dc] min-h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Buddy list */}
        <div className="bg-white border-[3px] border-black pp-shadow">
          <div className="titlebar h-8 flex items-center px-2 font-silk text-[11px]">
            ♡ buddy list — prarthna.exe
          </div>
          <div className="p-3 space-y-2">
            {BUDDIES.map((b) => (
              <a
                key={b.name}
                data-testid={`buddy-${b.name.replace(/\s+/g, "-")}`}
                href={b.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-2 bg-[#fff5fa] border-2 border-black px-2 py-1 hover:bg-[#ff69b4]"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 border-2 border-black"
                    style={{ background: statusColor(b.status) }}
                  />
                  <span className="font-silk text-[10px]">{b.name}</span>
                </span>
                <span className="text-[#444] truncate max-w-[60%]">{b.value}</span>
              </a>
            ))}
          </div>
          <div className="p-3 border-t-2 border-dashed border-black bg-[#fffdd0]">
            <div className="font-silk text-[10px]">★ status message</div>
            <div className="mt-1">brb building something cute · taking on small contracts ♡</div>
          </div>
        </div>

        {/* Send a message */}
        <form
          onSubmit={submit}
          className="bg-white border-[3px] border-black pp-shadow flex flex-col"
          data-testid="contact-form"
        >
          <div className="titlebar h-8 flex items-center px-2 font-silk text-[11px]">
            ✉ send prarthna a note
          </div>
          <div className="p-3 space-y-2 flex-1">
            <div>
              <label className="font-silk text-[10px]">your nickname</label>
              <input
                data-testid="contact-name"
                className="pp-input w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="xX_recruiter_2026_Xx"
              />
            </div>
            <div>
              <label className="font-silk text-[10px]">your email</label>
              <input
                data-testid="contact-email"
                className="pp-input w-full"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="font-silk text-[10px]">your message</label>
              <textarea
                data-testid="contact-message"
                rows={4}
                className="pp-input w-full"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="hi prarthna, we want to hire you because…"
              />
            </div>
            {status === "error" && (
              <div data-testid="contact-error" className="text-red-700 font-silk text-[10px]">
                ✗ {errorMsg}
              </div>
            )}
            {status === "sent" && (
              <div data-testid="contact-success" className="text-black font-silk text-[10px] bg-[#39ff14] border-2 border-black px-2 py-1 inline-block">
                ★ message delivered! check your inbox for the reply ♡
              </div>
            )}
          </div>
          <div className="p-3 border-t-2 border-black flex items-center justify-between bg-[#ffd1dc]">
            <span className="font-silk text-[10px]">
              {status === "sending" ? "sending..." : "secure pixel mail"}
            </span>
            <button
              data-testid="contact-submit"
              className="pp-btn"
              disabled={status === "sending"}
              type="submit"
            >
              {status === "sending" ? "..." : "send →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
