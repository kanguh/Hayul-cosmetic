"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import Magnetic from "../motion/Magnetic";
import SplitText from "../motion/SplitText";

export default function Newsletter() {
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/45 blur-[100px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <p className="text-xs tracking-[0.35em] text-clay uppercase">(05) Letters</p>
        <h2 className="mt-6 font-display text-6xl leading-[0.95] md:text-8xl">
          <SplitText text={"Seasonal notes,\nonce a month."} />
        </h2>
        <p className="mx-auto mt-6 max-w-md font-serif leading-8 text-ink-soft">
          계절마다 바뀌는 원료 이야기와 피부 관리법을 한 달에 한 번 보내드려요.
        </p>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.p
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 font-display text-3xl italic"
            >
              Thank you — 첫 편지를 곧 보내드릴게요. (샘플 사이트)
            </motion.p>
          ) : (
            <motion.form
              key="form"
              exit={{ opacity: 0, y: -20 }}
              onSubmit={submit}
              className="mx-auto mt-12 flex max-w-lg flex-col items-center gap-6 sm:flex-row"
            >
              <label className="w-full flex-1">
                <span className="sr-only">이메일</span>
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border-b border-ink/40 bg-transparent py-3 text-center font-display text-2xl outline-none placeholder:text-ink/30 focus:border-ink sm:text-left"
                />
              </label>
              <Magnetic>
                <button className="grid h-24 w-24 place-items-center rounded-full bg-ink text-xs tracking-[0.2em] text-cream uppercase transition-colors hover:bg-clay">
                  Join
                </button>
              </Magnetic>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
