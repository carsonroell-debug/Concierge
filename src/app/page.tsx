"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Exercise Data ─── */
interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  muscle: string;
  cue: string;
}

const exercises: Exercise[] = [
  {
    id: "kb-row",
    name: "Kettlebell Row",
    sets: "3",
    reps: "10 each side",
    muscle: "Lats & Upper Back",
    cue: "Pull your elbow past your hip, squeeze your shoulder blade back.",
  },
  {
    id: "inv-row",
    name: "Inverted Row",
    sets: "3",
    reps: "12",
    muscle: "Mid Back & Biceps",
    cue: "Keep your body straight like a plank — pull chest to the bar.",
  },
  {
    id: "kb-curl",
    name: "Kettlebell Curl",
    sets: "3",
    reps: "12",
    muscle: "Biceps",
    cue: "Pin your elbows to your sides. Slow on the way down.",
  },
  {
    id: "hammer-curl",
    name: "Hammer Curl",
    sets: "3",
    reps: "12",
    muscle: "Biceps & Forearms",
    cue: "Thumbs up grip, control the negative for 2 seconds.",
  },
  {
    id: "kb-deadlift",
    name: "Kettlebell Deadlift",
    sets: "3",
    reps: "10",
    muscle: "Hamstrings & Glutes",
    cue: "Hinge at hips, push your butt back. Flat back, chest proud.",
  },
];

/* ─── Helper: lerp ─── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ─── Canvas Stick Figure Animator ─── */
function StickFigure({ exerciseId }: { exerciseId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef = useRef(0);
  const rafRef = useRef<number>(0);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number) => {
      const w = 280;
      const h = 360;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "#c8a96e";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.fillStyle = "rgba(200,169,110,0.25)";

      const line = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      };
      const circle = (cx: number, cy: number, r: number, fill = false) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        if (fill) ctx.fill();
        ctx.stroke();
      };
      const ground = () => {
        ctx.globalAlpha = 0.2;
        line(50, 340, 230, 340);
        ctx.globalAlpha = 1;
      };

      switch (exerciseId) {
        case "kb-row": {
          // Bent-over row: torso angled, one arm rows up/down
          const armY = lerp(195, 120, t);
          circle(140, 72, 16); // head
          line(140, 88, 115, 180); // torso bent
          line(115, 180, 85, 260); // back leg upper
          line(85, 260, 80, 335); // back leg lower
          line(115, 180, 150, 260); // front leg upper
          line(150, 260, 155, 335); // front leg lower
          line(128, 115, 140, 165); // support arm
          line(128, 115, 120, armY); // rowing arm
          ctx.fillStyle = "rgba(200,169,110,0.3)";
          circle(120, armY + 8, 10, true); // kettlebell
          ctx.fillStyle = "rgba(200,169,110,0.25)";
          ground();
          break;
        }
        case "inv-row": {
          // Inverted row: body pulls up to bar
          const bodyY = lerp(0, -45, t); // body raises
          ctx.globalAlpha = 0.5;
          ctx.lineWidth = 5;
          line(40, 50, 240, 50); // bar
          ctx.lineWidth = 4;
          ctx.globalAlpha = 1;
          // Hands
          ctx.fillStyle = "#c8a96e";
          circle(110, 50, 4, true);
          circle(170, 50, 4, true);
          ctx.fillStyle = "rgba(200,169,110,0.25)";
          // Arms
          line(110, 50, 115, 130 + bodyY);
          line(170, 50, 165, 130 + bodyY);
          // Head
          circle(140, 148 + bodyY, 16);
          // Torso
          line(140, 164 + bodyY, 140, 250 + bodyY);
          // Legs (straight, feet on ground)
          line(140, 250 + bodyY, 115, 310 + bodyY * 0.3);
          line(115, 310 + bodyY * 0.3, 95, 335);
          line(140, 250 + bodyY, 165, 310 + bodyY * 0.3);
          line(165, 310 + bodyY * 0.3, 185, 335);
          ground();
          break;
        }
        case "kb-curl": {
          // Standing curl: both forearms curl up
          const forearmY = lerp(195, 115, t);
          circle(140, 58, 16); // head
          line(140, 74, 140, 190); // torso
          line(140, 190, 115, 270); // left upper leg
          line(115, 270, 112, 335); // left lower leg
          line(140, 190, 165, 270); // right upper leg
          line(165, 270, 168, 335); // right lower leg
          // Upper arms pinned
          line(140, 105, 115, 128);
          line(140, 105, 165, 128);
          // Forearms curl
          line(115, 128, 112, forearmY);
          line(165, 128, 168, forearmY);
          // Kettlebells
          ctx.fillStyle = "rgba(200,169,110,0.3)";
          circle(112, forearmY + 10, 9, true);
          circle(168, forearmY + 10, 9, true);
          ctx.fillStyle = "rgba(200,169,110,0.25)";
          ground();
          break;
        }
        case "hammer-curl": {
          // Hammer curl: similar to curl but with vertical dumbbell indicators
          const forearmY = lerp(195, 115, t);
          circle(140, 58, 16); // head
          line(140, 74, 140, 190); // torso
          line(140, 190, 118, 270); // left upper leg
          line(118, 270, 116, 335); // left lower leg
          line(140, 190, 162, 270); // right upper leg
          line(162, 270, 164, 335); // right lower leg
          // Upper arms
          line(140, 105, 112, 128);
          line(140, 105, 168, 128);
          // Forearms
          line(112, 128, 110, forearmY);
          line(168, 128, 170, forearmY);
          // Dumbbells (vertical bars)
          ctx.lineWidth = 6;
          ctx.globalAlpha = 0.4;
          line(110, forearmY - 5, 110, forearmY + 22);
          line(170, forearmY - 5, 170, forearmY + 22);
          ctx.lineWidth = 4;
          ctx.globalAlpha = 1;
          ground();
          break;
        }
        case "kb-deadlift": {
          // Deadlift: standing up to hip hinge
          const hingeT = t; // 0 = standing, 1 = hinged
          const headY = lerp(58, 105, hingeT);
          const headX = lerp(140, 115, hingeT);
          const torsoEndX = lerp(140, 120, hingeT);
          const torsoEndY = lerp(190, 195, hingeT);
          const armEndY = lerp(175, 235, hingeT);
          const armEndX = lerp(140, 118, hingeT);
          const kneeY = lerp(270, 258, hingeT);

          circle(headX, headY, 16); // head
          line(headX, headY + 16, torsoEndX, torsoEndY); // torso
          line(torsoEndX, torsoEndY, 115, kneeY); // left upper leg
          line(115, kneeY, 112, 335); // left lower leg
          line(torsoEndX, torsoEndY, 165, kneeY); // right upper leg
          line(165, kneeY, 168, 335); // right lower leg
          // Arms hanging down
          const shoulderX = lerp(140, 118, hingeT);
          const shoulderY = lerp(100, 130, hingeT);
          line(shoulderX, shoulderY, armEndX - 5, armEndY);
          line(shoulderX, shoulderY, armEndX + 5, armEndY);
          // Kettlebell
          ctx.fillStyle = "rgba(200,169,110,0.3)";
          circle(armEndX, armEndY + 12, 12, true);
          ctx.fillStyle = "rgba(200,169,110,0.25)";
          ground();
          break;
        }
      }
    },
    [exerciseId]
  );

  useEffect(() => {
    tRef.current = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      tRef.current += 0.015;
      const t = (Math.sin(tRef.current * 2.5) + 1) / 2;
      draw(ctx, t);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [exerciseId, draw]);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={360}
      className="w-full max-w-[280px] mx-auto"
      style={{ filter: "drop-shadow(0 0 20px rgba(200,169,110,0.15))" }}
    />
  );
}

/* ─── Rest Timer ─── */
function RestTimer() {
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setRunning(false);
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              navigator.vibrate([200, 100, 200]);
            }
            try {
              const ctx = new AudioContext();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.value = 660;
              gain.gain.value = 0.15;
              osc.start();
              gain.gain.exponentialRampToValueAtTime(
                0.001,
                ctx.currentTime + 0.5
              );
              osc.stop(ctx.currentTime + 0.5);
            } catch {
              /* audio not available */
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, seconds]);

  const toggle = () => {
    if (!running && seconds === 0) {
      setSeconds(60);
      setRunning(true);
    } else {
      setRunning(!running);
    }
  };

  const reset = () => {
    setRunning(false);
    setSeconds(60);
  };

  const pct = seconds / 60;
  const circumference = 2 * Math.PI * 36;
  const dashoffset = circumference * (1 - pct);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={toggle}
        className="relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer"
        style={{ background: "rgba(200,169,110,0.08)" }}
      >
        <svg
          viewBox="0 0 80 80"
          className="absolute inset-0 w-full h-full -rotate-90"
        >
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="rgba(200,169,110,0.15)"
            strokeWidth="3"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#c8a96e"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        <span className="text-2xl font-mono" style={{ color: "#c8a96e" }}>
          {seconds}s
        </span>
      </button>
      <div className="flex gap-3 text-xs" style={{ color: "#8a8070" }}>
        <span className="cursor-pointer hover:underline" onClick={toggle}>
          {running ? "Pause" : seconds === 0 ? "Restart" : "Start"}
        </span>
        <span className="cursor-pointer hover:underline" onClick={reset}>
          Reset
        </span>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [active, setActive] = useState(0);
  const ex = exercises[active];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6">
        <h1
          className="text-2xl font-bold tracking-wider uppercase"
          style={{ color: "#c8a96e" }}
        >
          Morning Pull
        </h1>

        <div
          className="w-full max-w-xs rounded-2xl p-6"
          style={{ background: "#1a1814" }}
        >
          <StickFigure exerciseId={ex.id} />
        </div>

        <div className="text-center max-w-sm space-y-2">
          <h2 className="text-xl font-semibold" style={{ color: "#c8a96e" }}>
            {ex.name}
          </h2>
          <div
            className="flex justify-center gap-4 text-sm"
            style={{ color: "#8a8070" }}
          >
            <span>{ex.sets} sets</span>
            <span>&times;</span>
            <span>{ex.reps}</span>
          </div>
          <p className="text-sm" style={{ color: "#a0854a" }}>
            Target: {ex.muscle}
          </p>
          <p className="text-sm italic pt-2" style={{ color: "#8a8070" }}>
            &ldquo;{ex.cue}&rdquo;
          </p>
        </div>

        <div className="pt-4">
          <p
            className="text-xs text-center mb-2"
            style={{ color: "#8a8070" }}
          >
            REST TIMER
          </p>
          <RestTimer />
        </div>
      </main>

      {/* Bottom tabs (mobile) / Sidebar (desktop) */}
      <nav
        className="md:w-56 md:min-h-screen md:border-l md:border-r-0 border-t flex md:flex-col md:py-6 overflow-x-auto"
        style={{
          background: "#14130f",
          borderColor: "rgba(200,169,110,0.12)",
        }}
      >
        {exercises.map((e, i) => (
          <button
            key={e.id}
            onClick={() => setActive(i)}
            className={`flex-1 md:flex-none px-4 py-3 md:py-3 text-xs md:text-sm text-center md:text-left transition-colors whitespace-nowrap cursor-pointer ${
              i === active ? "font-semibold" : ""
            }`}
            style={{
              color: i === active ? "#c8a96e" : "#8a8070",
              background:
                i === active ? "rgba(200,169,110,0.08)" : "transparent",
            }}
          >
            {e.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
