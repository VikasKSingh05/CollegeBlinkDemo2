import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <div className="glass-card mx-auto mb-12 max-w-5xl overflow-hidden rounded-2xl border border-border/60 p-6 lg:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200">
            Stay Ahead
          </div>
          <h3 className="font-heading text-2xl font-semibold text-gray-900 lg:text-3xl dark:text-white">
            Admissions, deadlines, and scholarships in one signal-rich inbox.
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Join students using CollegeBlink to track applications, discover
            better-fit colleges, and keep up with every important milestone.
          </p>
        </div>
        <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-12 flex-1 rounded-full border border-border/70 bg-white/75 px-5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800/75 dark:text-white"
          />
          <button
            type="submit"
            className="group inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-400 hover:to-cyan-300 hover:scale-105 hover:shadow-cyan-500/30"
          >
            Subscribe
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
