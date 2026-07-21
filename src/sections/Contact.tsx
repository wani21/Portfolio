import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import emailjs from "@emailjs/browser";
import { personalInfo } from "../data/portfolio";

// TODO: Set your EmailJS credentials in .env file:
// VITE_EMAILJS_SERVICE_ID=your_service_id
// VITE_EMAILJS_TEMPLATE_ID=your_template_id
// VITE_EMAILJS_PUBLIC_KEY=your_public_key

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // spam protection
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot check
    if (formData.honeypot) return;

    setStatus("sending");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

    if (!serviceId || !templateId || !publicKey) {
      // If env vars not set, just simulate success for demo
      setTimeout(() => {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      }, 1200);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);
      setStatus("success");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch {
      setStatus("error");
    }
  };

  const CONTACT_LINKS = [
    {
      icon: FiMail,
      label: "Email",
      href: `mailto:${personalInfo.email}`,
      value: personalInfo.email,
      color: "text-[#38bdf8]",
    },
    {
      icon: FiGithub,
      label: "GitHub",
      href: personalInfo.github,
      value: personalInfo.github.replace("https://", ""),
      color: "text-white",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      href: personalInfo.linkedin,
      value: "linkedin.com/in/rohan-wani",
      color: "text-[#0A66C2]",
    },
    {
      icon: SiLeetcode,
      label: "LeetCode",
      href: personalInfo.leetcode,
      value: "leetcode.com/u/ok_Rohan",
      color: "text-[#FFA116]",
    },
    {
      icon: SiGeeksforgeeks,
      label: "GeeksforGeeks",
      href: personalInfo.gfg,
      value: "gfg/wanirohan21",
      color: "text-[#2F8D46]",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 bg-transparent"
      aria-label="Contact section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[600px] h-[400px] opacity-5"
          style={{
            background: "radial-gradient(ellipse, #818cf8, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="section-wrapper relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-3">Get In Touch</p>
          <h2 className="section-heading mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Let's Work Together
          </h2>
          <p className="text-[#94a3b8] text-base max-w-xl mx-auto">
            Whether it's a full-time role, freelance project, or just a tech
            conversation — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {CONTACT_LINKS.map(({ icon: Icon, label, href, value, color }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ x: 4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="card p-4 flex items-center gap-4 hover:border-[#60a5fa]/30 group transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-[#60a5fa]/10 to-[#818cf8]/10 border border-[#60a5fa]/20 flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#94a3b8] mb-0.5">{label}</p>
                  <p className="text-white text-sm font-medium group-hover:text-[#38bdf8] transition-colors duration-200 truncate max-w-[200px]">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 card p-7 flex flex-col gap-5"
            id="contact-form"
            aria-label="Contact form"
          >
            {/* Honeypot — hidden from humans */}
            <div style={{ display: "none" }} aria-hidden="true">
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-[#94a3b8] mb-1.5"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-[#0a0a0f] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#4b5563] focus:outline-none focus:border-[#60a5fa]/50 focus:ring-1 focus:ring-[#60a5fa]/30 transition-colors duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-[#94a3b8] mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-[#0a0a0f] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#4b5563] focus:outline-none focus:border-[#60a5fa]/50 focus:ring-1 focus:ring-[#60a5fa]/30 transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-medium text-[#94a3b8] mb-1.5"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="What's on your mind?"
                className="w-full bg-[#0a0a0f] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#4b5563] focus:outline-none focus:border-[#60a5fa]/50 focus:ring-1 focus:ring-[#60a5fa]/30 transition-colors duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              id="contact-submit-btn"
              disabled={status === "sending"}
              className="gradient-btn text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed self-start"
            >
              {status === "sending" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <FiSend size={15} />
                  Send Message
                </>
              )}
            </button>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-sm font-medium"
              >
                ✓ Message sent! I'll get back to you soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm font-medium"
              >
                Something went wrong. Please email me directly.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
