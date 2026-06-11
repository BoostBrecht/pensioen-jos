import { useEffect, useState } from "react";
import "./App.css";

const TARGET_DATE = new Date("2027-06-30T17:00:00+02:00").getTime();
// const TARGET_DATE = new Date("2026-06-11T16:21:00+02:00").getTime();
const CELEBRATION_COLORS = [
  "#f97316",
  "#fb7185",
  "#facc15",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
];

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdownParts(): CountdownParts {
  const now = Date.now();
  const difference = Math.max(TARGET_DATE - now, 0);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function App() {
  const [countdown, setCountdown] = useState<CountdownParts>(getCountdownParts);
  const isComplete =
    countdown.days === 0 &&
    countdown.hours === 0 &&
    countdown.minutes === 0 &&
    countdown.seconds === 0;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdownParts());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const countdownItems = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fff7ed_0%,#fde68a_35%,#fb7185_100%)] text-slate-900">
      <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.3),transparent_45%,rgba(15,23,42,0.08))]" />
        {isComplete ? (
          <>
            <div aria-hidden="true" className="confetti-layer">
              {Array.from({ length: 24 }).map((_, index) => (
                <span
                  key={`confetti-${index}`}
                  className="confetti-piece"
                  style={{
                    left: `${(index * 4.15) % 100}%`,
                    backgroundColor:
                      CELEBRATION_COLORS[index % CELEBRATION_COLORS.length],
                    animationDelay: `${(index % 6) * 0.22}s`,
                    animationDuration: `${4.5 + (index % 5) * 0.35}s`,
                  }}
                />
              ))}
            </div>

            <div aria-hidden="true" className="balloon-layer">
              {Array.from({ length: 8 }).map((_, index) => (
                <span
                  key={`balloon-${index}`}
                  className="balloon"
                  style={{
                    left: `${8 + index * 11}%`,
                    backgroundColor:
                      CELEBRATION_COLORS[
                        (index + 2) % CELEBRATION_COLORS.length
                      ],
                    animationDelay: `${index * 0.4}s`,
                    animationDuration: `${7 + (index % 3)}s`,
                  }}
                />
              ))}
            </div>
          </>
        ) : null}

        <section className="relative w-full max-w-4xl rounded-4xl border border-white/50 bg-white/50 px-8 py-12 text-center shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur">
          {/* <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-600">
            One simple answer
          </p> */}

          {/* <h1 className="mt-6 text-4xl font-black tracking-tight text-balance sm:text-6xl">
            Is Jos al met pensioen?
          </h1> */}

          <div
            className={`mt-8 text-[clamp(5rem,18vw,10rem)] font-black uppercase leading-none tracking-tight drop-shadow-[0_10px_25px_rgba(225,29,72,0.28)] ${
              isComplete ? "celebrate-yes text-emerald-600" : "text-rose-600"
            }`}
          >
            {isComplete ? "JA" : "NEE"}
          </div>

          {/* <p className="mt-4 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
            {isComplete
              ? "Jawel. Tijd voor taart, slingers en pensioen."
              : "Jos telt af naar 17:00 op 30 juni 2027."}
          </p> */}

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {countdownItems.map((item) => (
              <div
                key={item.label}
                className={`rounded-3xl border border-white/70 px-4 py-6 text-white shadow-[0_14px_30px_rgba(15,23,42,0.2)] ${
                  isComplete ? "bg-emerald-600" : "bg-slate-950"
                }`}
              >
                <div className="text-3xl font-black tabular-nums sm:text-5xl">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
