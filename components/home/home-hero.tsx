'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language';

/**
 * Animated hero column for the home page.
 *
 * Behaviour:
 *  - Main greeting types out character-by-character (typewriter effect).
 *  - Tagline, description, socials, personal chips, and buttons fade in
 *    sequentially after the title finishes.
 *  - When the user has `prefers-reduced-motion: reduce` set, all text is shown
 *    instantly — no animation at all.
 *  - When the language toggles the greeting resets and re-types automatically.
 */
export function HomeHero() {
  const { t } = useLanguage();
  const h = t.home;
  const fullTitle = h.greeting;

  // Typewriter state
  const [typed, setTyped] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Staggered-reveal state for subsequent elements
  const [showTagline, setShowTagline] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showPersonal, setShowPersonal] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Reduced-motion: show everything instantly ──────────────────────────
    if (prefersReduced) {
      setTyped(fullTitle);
      setCursorVisible(false);
      setShowTagline(true);
      setShowDesc(true);
      setShowSocials(true);
      setShowButtons(true);
      setShowPersonal(true);
      return;
    }

    // ── Reset for fresh animation (language change or first mount) ─────────
    setTyped('');
    setCursorVisible(true);
    setShowTagline(false);
    setShowDesc(false);
    setShowSocials(false);
    setShowButtons(false);
    setShowPersonal(false);

    let charIndex = 0;
    const pendingTimers: ReturnType<typeof setTimeout>[] = [];

    const tick = setInterval(() => {
      charIndex++;
      setTyped(fullTitle.slice(0, charIndex));

      if (charIndex >= fullTitle.length) {
        clearInterval(tick);

        // Staggered fade-in after typing completes
        pendingTimers.push(setTimeout(() => setShowTagline(true), 180));
        pendingTimers.push(setTimeout(() => setShowDesc(true), 380));
        pendingTimers.push(setTimeout(() => setShowSocials(true), 560));
        pendingTimers.push(setTimeout(() => setShowButtons(true), 680));
        pendingTimers.push(setTimeout(() => setShowPersonal(true), 820));
        pendingTimers.push(setTimeout(() => setCursorVisible(false), 900));
      }
    }, 35); // ~35 ms per character — fast but readable

    return () => {
      clearInterval(tick);
      pendingTimers.forEach(clearTimeout);
    };
  }, [fullTitle]); // re-run when language changes

  /** Tailwind classes to fade an element in or keep it hidden. */
  const fade = (visible: boolean) =>
    `transition-all duration-500 ease-out ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
    }`;

  /**
   * Split "💻 Hybrid work enjoyer · 🌍 Remote-friendly · …" into individual
   * chip strings. Works for both EN and TH translation strings.
   */
  const chips = h.personalLine.split(' · ');

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        {/*
         * Title: the visible text is typed character by character.
         * aria-label exposes the full string to assistive technology immediately
         * so screen-reader users are not subjected to letter-by-letter reading.
         */}
        <h1
          aria-label={fullTitle}
          className="min-h-[2.25rem] text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:min-h-[3rem] sm:text-4xl md:text-5xl"
        >
          <span aria-hidden="true">
            {typed}
            {cursorVisible && (
              <span className="ml-[2px] inline-block h-[0.85em] w-[2px] translate-y-[0.08em] animate-pulse rounded-sm bg-slate-900 align-middle dark:bg-slate-100" />
            )}
          </span>
        </h1>

        <p className={`text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8 ${fade(showTagline)}`}>
          {h.tagline}
        </p>

        <p className={`text-sm leading-7 text-slate-500 dark:text-slate-500 sm:text-base ${fade(showDesc)}`}>
          {h.description}
        </p>
      </div>

      {/* Social links */}
      <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${fade(showSocials)}`}>
        <a
          href="https://github.com/poppbsfs4za"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <FaGithub className="h-4 w-4" />
          {h.github}
        </a>
        <a
          href="https://www.linkedin.com/in/kraiwit-wongpiapn-wongpiapn-95279123b"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <FaLinkedin className="h-4 w-4" />
          {h.linkedin}
        </a>
        <a
          href="mailto:kraiwit.w2542@gmail.com"
          className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <FaEnvelope className="h-4 w-4" />
          {h.email}
        </a>
      </div>

      {/* Personal lifestyle chips — wraps cleanly on mobile */}
      <div className={`flex flex-wrap gap-2 ${fade(showPersonal)}`}>
        {chips.map((chip, i) => (
          <span
            key={i}
            className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400"
          >
            {chip}
          </span>
        ))}
      </div>

      {/* CTA buttons */}
      <div className={`flex flex-wrap gap-3 ${fade(showButtons)}`}>
        <Link href="/portfolio">
          <Button>{h.viewPortfolio}</Button>
        </Link>
        <Link href="/blog">
          <Button variant="secondary">{h.readBlog}</Button>
        </Link>
      </div>
    </div>
  );
}
