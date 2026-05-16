/// <reference types="vite/client" />
import { type ComponentType, type ReactNode, type ChangeEvent, type FormEvent } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, Mail, User,
  Phone, CheckCircle, ArrowRight, Loader2, X, Building2, MessageSquare,
} from 'lucide-react';

import { timeSlots } from './data/bookingOptions';

/* ─────────────────────────────────────────────────────────────────
   TypeScript declarations
───────────────────────────────────────────────────────────────────── */
declare global {
  interface Window {
    grecaptcha?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        theme: string;
        callback: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
      }) => number;
      reset: (widgetId?: number) => void;
    };
    __onRecaptchaLoad?: () => void;
  }
}

/* ─────────────────────────────────────────────────────────────────
   reCAPTCHA v2
───────────────────────────────────────────────────────────────────── */
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '';
const SITEKEY_MISSING = !RECAPTCHA_SITE_KEY || RECAPTCHA_SITE_KEY.trim() === '';

function loadRecaptchaScript() {
  if (document.getElementById('recaptcha-script')) return;
  const script = document.createElement('script');
  script.id = 'recaptcha-script';
  script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=__onRecaptchaLoad';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

interface RecaptchaBlockProps {
  onVerified: (token: string) => void;
  onExpired?: () => void;
  resetSignal: number;
}

function RecaptchaBlock({ onVerified, onExpired, resetSignal }: RecaptchaBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  const renderWidget = useCallback((): void => {
    if (!containerRef.current) return;
    if (widgetIdRef.current !== null) return;
    if (!window.grecaptcha?.render) return;
    if (SITEKEY_MISSING) return;
    try {
      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        theme: 'dark',
        callback: (token) => { onVerified(token); },
        'expired-callback': () => { onExpired?.(); },
        'error-callback': () => { onExpired?.(); },
      });
      setReady(true);
    } catch (err) {
      console.error('reCAPTCHA render error:', err);
    }
  }, [onVerified, onExpired]);

  useEffect(() => {
    if (SITEKEY_MISSING) return;
    if (window.grecaptcha?.render) {
      renderWidget();
    } else {
      window.__onRecaptchaLoad = () => renderWidget();
      loadRecaptchaScript();
      const poll = setInterval(() => {
        if (window.grecaptcha?.render) { clearInterval(poll); renderWidget(); }
      }, 300);
      return () => clearInterval(poll);
    }
  }, [renderWidget]);

  useEffect(() => {
    if (resetSignal > 0 && widgetIdRef.current !== null && window.grecaptcha?.reset) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  if (SITEKEY_MISSING) {
    return (
      <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-amber-400 text-xs font-inter">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <strong className="block mb-0.5">reCAPTCHA not configured</strong>
          <p className="text-amber-600 leading-relaxed">
            Add <code className="bg-amber-500/15 rounded px-1">VITE_RECAPTCHA_SITE_KEY=your_site_key</code> to your{' '}
            <code className="bg-amber-500/15 rounded px-1">.env</code> file, then restart.{' '}
            <a href="https://www.google.com/recaptcha/admin" target="_blank" rel="noreferrer" className="text-amber-400 underline">
              Get a free key →
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!ready && (
        <div className="flex items-center gap-4 w-[304px] h-[78px] bg-[#1a2235] border border-white/10 rounded-sm px-4 overflow-hidden relative">
          <div className="w-6 h-6 border-2 border-white/20 rounded-sm bg-white/5 flex-shrink-0" />
          <span className="flex-1 text-sm text-white/30 font-sans">I'm not a robot</span>
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="w-8 h-8 rounded-full border-[3px] border-transparent border-t-blue-500/50 border-r-green-500/40 border-b-red-500/40 animate-spin" />
            <span className="text-[9px] text-white/25">reCAPTCHA</span>
          </div>
        </div>
      )}
      <div ref={containerRef} style={{ display: ready ? 'block' : 'none' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FORM FIELD COMPONENT
───────────────────────────────────────────────────────────────────── */
interface FieldProps {
  label: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  required?: boolean;
  children: ReactNode;
}

function Field({ label, icon: Icon, required = false, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/50 font-inter flex items-center gap-1.5">
        {Icon && <Icon size={12} className="text-primary" />}
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full px-3 py-2.5 bg-[#0d1424] border border-white/10 rounded-lg text-white placeholder:text-white/20 ' +
  'focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all font-inter text-sm';

/* ─────────────────────────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────────────────────────────── */
const INITIAL_FORM = {
  firstName: '',
  middleName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  preferred_date: '',
  preferred_time: '',
  message: '',
};

/* ─────────────────────────────────────────────────────────────────
   DIVIDER
───────────────────────────────────────────────────────────────────── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px bg-white/5" />
      <span className="text-[10px] font-medium text-white/20 font-inter uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────────────────── */
export default function BookingPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [resetSignal, setResetSignal] = useState(0);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const convertTo24Hour = (timeStr: string): string => {
    const [time, meridiem] = timeStr.split(' ');
    let [h, m] = time.split(':').map(Number);
    if (meridiem === 'PM' && h !== 12) h += 12;
    if (meridiem === 'AM' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!SITEKEY_MISSING && !recaptchaToken) {
      setError("Please tick \"I'm not a robot\" before submitting.");
      document.getElementById('recaptcha-section')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const fullName = [form.firstName, form.middleName, form.lastName]
        .filter(Boolean)
        .join(' ')
        .trim();

      const payload = {
        full_name: fullName,
        company: form.company.trim() || null,
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        preferred_date: form.preferred_date,
        preferred_time: convertTo24Hour(form.preferred_time),
        message: form.message.trim() || null,
        recaptcha_token: recaptchaToken || null,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/appointments/book`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const text = await res.text();
      let result: Record<string, unknown> = {};
      try { result = text ? JSON.parse(text) : {}; } catch { /* empty */ }

      if (!res.ok) {
        throw new Error(
          (result.error as string) ||
          (result.message as string) ||
          text ||
          `Server error: ${res.status}`
        );
      }

      setSubmittedName(form.firstName);
      setSubmittedEmail(form.email.trim());
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setRecaptchaToken('');
      setResetSignal((s) => s + 1);
    } catch (err) {
      console.error('Booking error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to submit booking. Please try again.'
      );
      setRecaptchaToken('');
      setResetSignal((s) => s + 1);
    } finally {
      setLoading(false);
    }
  };

  const captchaBlocking = !SITEKEY_MISSING && !recaptchaToken;

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-md w-full"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-emerald-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-1 font-playfair">
              You're all set{submittedName ? `, ${submittedName}` : ''}!
            </h2>
            <p className="text-white/40 text-xs font-inter mb-5">Appointment request received</p>

            {/* Confirmation card */}
            <div className="bg-[#0f1626] border border-white/8 rounded-2xl p-5 mb-6 text-left space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-white/40 text-[11px] font-inter mb-0.5">Confirmation sent to</p>
                  <p className="text-white text-sm font-inter font-medium">{submittedEmail}</p>
                </div>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={14} className="text-white/40" />
                </div>
                <div>
                  <p className="text-white/40 text-[11px] font-inter mb-0.5">Next steps</p>
                  <p className="text-white/60 text-xs font-inter leading-relaxed">
                    Our team will review your request and reach out to confirm your appointment details.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 bg-primary text-[#070b14] font-bold rounded-lg hover:bg-primary/90 transition-colors font-inter text-sm"
            >
              Book another appointment
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  /* ── Form page ── */
  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center px-4 py-10">
      <AnimatePresence mode="wait">
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0f1626] border border-white/8 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar size={16} className="text-primary" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white font-playfair leading-tight">
                  Book an Appointment
                </h2>
                <p className="text-white/35 text-xs font-inter mt-0.5">
                  Fill out the form and we'll confirm via email
                </p>
              </div>
            </div>
          </div>

          {/* Form body */}
          <div className="max-h-[82vh]">
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

              <SectionDivider label="Your Information" />

              {/* Name row */}
              <div className="grid grid-cols-3 gap-3">
                <Field label="First Name" icon={User} required>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className={inputCls}
                    placeholder="Juan"
                  />
                </Field>
                <Field label="Middle Name">
                  <input
                    type="text"
                    name="middleName"
                    value={form.middleName}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="M."
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className={inputCls}
                    placeholder="dela Cruz"
                  />
                </Field>
              </div>

              {/* Company */}
              <Field label="Company / Organization" icon={Building2}>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Acme Corporation"
                />
              </Field>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Email Address" icon={Mail} required>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputCls}
                    placeholder="you@company.com"
                  />
                </Field>
                <Field label="Phone Number" icon={Phone}>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="+63 912 345 6789"
                  />
                </Field>
              </div>

              <SectionDivider label="Appointment Details" />

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Preferred Date" icon={Calendar} required>
                  <input
                    type="date"
                    name="preferred_date"
                    value={form.preferred_date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className={`${inputCls} [color-scheme:dark]`}
                  />
                </Field>
                <Field label="Preferred Time" icon={Clock} required>
                  <select
                    name="preferred_time"
                    value={form.preferred_time}
                    onChange={handleChange}
                    required
                    className={`${inputCls} appearance-none cursor-pointer`}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((slot: string) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Message */}
              <Field label="Message / Notes" icon={MessageSquare}>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder="Briefly describe the purpose of your appointment or any special requests…"
                />
              </Field>

              <SectionDivider label="Verification" />

              {/* reCAPTCHA */}
              <div id="recaptcha-section">
                <RecaptchaBlock
                  onVerified={(token) => { setRecaptchaToken(token); setError(''); }}
                  onExpired={() => setRecaptchaToken('')}
                  resetSignal={resetSignal}
                />
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2.5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-inter"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <div className="pt-1 pb-2">
                <button
                  type="submit"
                  disabled={loading || captchaBlocking}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-[#070b14] font-bold rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed font-inter text-sm tracking-wide"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Request Appointment
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>

                {captchaBlocking && !loading && (
                  <p className="mt-2 text-center text-xs text-white/25 font-inter">
                    Complete the verification above to enable submission.
                  </p>
                )}

                <p className="mt-3 text-center text-xs text-white/20 font-inter">
                  A confirmation email will be sent once your appointment is approved.
                </p>
              </div>

            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}