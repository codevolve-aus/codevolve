export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-violet-700/15 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <p className="text-xs uppercase tracking-widest text-violet-400 font-medium mb-4">Get in touch</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
          Interested in what we&apos;re building?
        </h2>
        <p className="text-white/45 mb-10 max-w-xl mx-auto leading-relaxed">
          Whether you&apos;re an engineer, investor, or potential partner — we&apos;d love to hear from you. Reach out
          and let&apos;s start a conversation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="mailto:hello@codevolve.ai"
            className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium text-sm hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg shadow-violet-900/30"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 4l6 5 6-5M2 4h12v9H2V4z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            hello@codevolve.ai
          </a>

          <a
            href="https://linkedin.com/company/codevolve"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-medium text-sm transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
              <path
                d="M5 7v4M5 5.5v.01M8 11V8.5a1.5 1.5 0 013 0V11"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            LinkedIn
          </a>
        </div>

        {/* Decorative divider */}
        <div className="mt-16 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/25 text-sm">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1.5C4 1.5 1.5 4 1.5 7S4 12.5 7 12.5 12.5 10 12.5 7 10 1.5 7 1.5z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path d="M7 4.5v3l2 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Based in Australia
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 3h10v8H2zM2 3l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Shipping globally
          </div>
        </div>
      </div>
    </section>
  );
}
