import { useCallback, useEffect, useRef, useState } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
const GRID = 20;
const CELL = 20; // px per cell
const CANVAS = GRID * CELL; // 400px
const INITIAL_SPEED = 200; // ms
const MIN_SPEED = 80;
const SPEED_DECREMENT = 10;

// Snake segment colors (cycle)
const SKINS = ["#39ff14", "#ff8c00", "#00e5ff", "#ff00ff", "#ffe600"];

type Point = { x: number; y: number };
type FoodType = "normal" | "boss";
type Food = Point & { type: FoodType };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type GamePhase = "idle" | "playing" | "over";

// ─── Map generation ──────────────────────────────────────────────────────────
function buildMaps(): Point[][] {
  const maps: Point[][] = [];
  for (let m = 0; m < 10; m++) {
    const walls: Point[] = [];
    const count = Math.floor(Math.random() * 15) + 5; // 5-20 walls
    for (let i = 0; i < count; i++) {
      walls.push({
        x: Math.floor(Math.random() * GRID) * CELL,
        y: Math.floor(Math.random() * GRID) * CELL,
      });
    }
    maps.push(walls);
  }
  return maps;
}

function randomFoodPos(
  snake: Point[],
  walls: Point[],
  existing: Point[],
): Point {
  const occupied = new Set([
    ...snake.map((p) => `${p.x},${p.y}`),
    ...walls.map((p) => `${p.x},${p.y}`),
    ...existing.map((p) => `${p.x},${p.y}`),
  ]);
  let pos: Point;
  let attempts = 0;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID) * CELL,
      y: Math.floor(Math.random() * GRID) * CELL,
    };
    attempts++;
  } while (occupied.has(`${pos.x},${pos.y}`) && attempts < 200);
  return pos;
}

function makeFood(snake: Point[], walls: Point[], existing: Point[]): Food {
  const pos = randomFoodPos(snake, walls, existing);
  return { ...pos, type: Math.random() < 0.2 ? "boss" : "normal" };
}

// ─── Drawing ─────────────────────────────────────────────────────────────────
function drawFrame(
  ctx: CanvasRenderingContext2D,
  snake: Point[],
  foods: Food[],
  walls: Point[],
  dir: Direction,
) {
  // Background
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, CANVAS, CANVAS);

  // Subtle grid
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= GRID; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL, 0);
    ctx.lineTo(i * CELL, CANVAS);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * CELL);
    ctx.lineTo(CANVAS, i * CELL);
    ctx.stroke();
  }

  // Walls
  for (const w of walls) {
    ctx.fillStyle = "#555";
    ctx.shadowColor = "rgba(180,180,180,0.3)";
    ctx.shadowBlur = 4;
    ctx.fillRect(w.x + 1, w.y + 1, CELL - 2, CELL - 2);
  }
  ctx.shadowBlur = 0;

  // Foods
  for (const f of foods) {
    const cx = f.x + CELL / 2;
    const cy = f.y + CELL / 2;
    const r = 7;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    if (f.type === "boss") {
      ctx.fillStyle = "#cc44ff";
      ctx.shadowColor = "rgba(200,0,255,0.6)";
      ctx.shadowBlur = 14;
    } else {
      ctx.fillStyle = "#ff3333";
      ctx.shadowColor = "rgba(255,60,60,0.6)";
      ctx.shadowBlur = 12;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
    // Boss star marker
    if (f.type === "boss") {
      ctx.fillStyle = "#fff";
      ctx.font = "bold 8px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("★", cx, cy);
    }
  }

  // Snake
  for (let i = 0; i < snake.length; i++) {
    const seg = snake[i];
    const color = SKINS[i % SKINS.length];
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = i === 0 ? 12 : 4;
    ctx.globalAlpha = i === 0 ? 1 : Math.max(0.45, 1 - i / snake.length);
    ctx.beginPath();
    const radius = i === 0 ? 5 : 3;
    ctx.roundRect(seg.x + 1, seg.y + 1, CELL - 2, CELL - 2, radius);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;

  // Eyes on head
  if (snake.length > 0) {
    const h = snake[0];
    ctx.fillStyle = "#000";
    const eyeSize = 3;
    let e1: Point;
    let e2: Point;
    if (dir === "RIGHT") {
      e1 = { x: h.x + CELL - 6, y: h.y + 4 };
      e2 = { x: h.x + CELL - 6, y: h.y + CELL - 4 - eyeSize };
    } else if (dir === "LEFT") {
      e1 = { x: h.x + 3, y: h.y + 4 };
      e2 = { x: h.x + 3, y: h.y + CELL - 4 - eyeSize };
    } else if (dir === "UP") {
      e1 = { x: h.x + 4, y: h.y + 3 };
      e2 = { x: h.x + CELL - 4 - eyeSize, y: h.y + 3 };
    } else {
      e1 = { x: h.x + 4, y: h.y + CELL - 6 };
      e2 = { x: h.x + CELL - 4 - eyeSize, y: h.y + CELL - 6 };
    }
    ctx.fillRect(e1.x, e1.y, eyeSize, eyeSize);
    ctx.fillRect(e2.x, e2.y, eyeSize, eyeSize);
  }
}

function drawGameOver(ctx: CanvasRenderingContext2D, score: number) {
  ctx.fillStyle = "rgba(0,0,0,0.82)";
  ctx.fillRect(0, 0, CANVAS, CANVAS);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // GAME OVER
  ctx.font = "bold 30px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#ff3333";
  ctx.shadowColor = "rgba(255,50,50,0.8)";
  ctx.shadowBlur = 16;
  ctx.fillText("GAME OVER", CANVAS / 2, CANVAS / 2 - 28);
  ctx.shadowBlur = 0;

  // Score
  ctx.font = "14px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#39ff14";
  ctx.fillText(`SCORE: ${score}`, CANVAS / 2, CANVAS / 2 + 16);

  // Tap to restart
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillText("TAP OR CLICK TO RESTART", CANVAS / 2, CANVAS / 2 + 46);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game state stored in refs for perf (used inside loop)
  const phaseRef = useRef<GamePhase>("idle");
  const snakeRef = useRef<Point[]>([{ x: 160, y: 160 }]);
  const dirRef = useRef<Direction>("RIGHT");
  const nextDirRef = useRef<Direction>("RIGHT");
  const foodsRef = useRef<Food[]>([]);
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const mapsRef = useRef<Point[][]>(buildMaps());
  const mapIdxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speedRef = useRef(INITIAL_SPEED);

  // React state for HUD
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem("snakeHigh") || "0");
    } catch {
      return 0;
    }
  });
  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState<GamePhase>("idle");

  // ─── Draw ─────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawFrame(
      ctx,
      snakeRef.current,
      foodsRef.current,
      mapsRef.current[mapIdxRef.current],
      dirRef.current,
    );
    if (phaseRef.current === "over") {
      drawGameOver(ctx, scoreRef.current);
    }
  }, []);

  // ─── Stop loop ────────────────────────────────────────────────────────────
  const stopLoop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // ─── Game over ────────────────────────────────────────────────────────────
  const triggerGameOver = useCallback(() => {
    stopLoop();
    phaseRef.current = "over";
    setPhase("over");
    const sc = scoreRef.current;
    setHighScore((prev) => {
      const next = Math.max(prev, sc);
      try {
        localStorage.setItem("snakeHigh", String(next));
      } catch {}
      return next;
    });
    draw();
  }, [stopLoop, draw]);

  // ─── Game loop ────────────────────────────────────────────────────────────
  const loop = useCallback(() => {
    if (phaseRef.current !== "playing") return;

    // Apply direction
    dirRef.current = nextDirRef.current;
    const snake = snakeRef.current;
    const dir = dirRef.current;
    const head = snake[0];
    const deltas: Record<Direction, Point> = {
      UP: { x: 0, y: -CELL },
      DOWN: { x: 0, y: CELL },
      LEFT: { x: -CELL, y: 0 },
      RIGHT: { x: CELL, y: 0 },
    };
    const d = deltas[dir];
    const nh: Point = { x: head.x + d.x, y: head.y + d.y };

    // Boundary collision
    if (nh.x < 0 || nh.x >= CANVAS || nh.y < 0 || nh.y >= CANVAS) {
      triggerGameOver();
      return;
    }

    // Map wall collision
    const walls = mapsRef.current[mapIdxRef.current];
    if (walls.some((w) => w.x === nh.x && w.y === nh.y)) {
      triggerGameOver();
      return;
    }

    // Self collision
    if (snake.some((s) => s.x === nh.x && s.y === nh.y)) {
      triggerGameOver();
      return;
    }

    snake.unshift(nh);

    // Check food
    let ate = false;
    const newFoods = foodsRef.current.map((f, i) => {
      if (f.x === nh.x && f.y === nh.y) {
        ate = true;
        const pts = f.type === "boss" ? 5 : 1;
        scoreRef.current += pts;
        // Extra length for boss
        if (f.type === "boss") snake.push({} as Point);

        const newScore = scoreRef.current;
        const newLevel = Math.floor(newScore / 5) + 1;
        if (newLevel !== levelRef.current) {
          levelRef.current = newLevel;
          speedRef.current = Math.max(
            MIN_SPEED,
            INITIAL_SPEED - (newLevel - 1) * SPEED_DECREMENT,
          );
          setLevel(newLevel);
        }
        setScore(newScore);
        setHighScore((prev) => {
          const next = Math.max(prev, newScore);
          try {
            localStorage.setItem("snakeHigh", String(next));
          } catch {}
          return next;
        });
        // Respawn this food
        const otherFoods = foodsRef.current.filter((_, j) => j !== i);
        return makeFood(snake, walls, otherFoods);
      }
      return f;
    });
    foodsRef.current = newFoods;

    // Tail trim
    if (!ate && snake.length > scoreRef.current + 4) snake.pop();

    draw();

    timerRef.current = setTimeout(
      () => requestAnimationFrame(loop),
      speedRef.current,
    );
  }, [draw, triggerGameOver]);

  // ─── Init game ────────────────────────────────────────────────────────────
  const initGame = useCallback(() => {
    stopLoop();
    mapsRef.current = buildMaps();
    mapIdxRef.current = 0;
    const startSnake = [{ x: 160, y: 160 }];
    snakeRef.current = startSnake;
    dirRef.current = "RIGHT";
    nextDirRef.current = "RIGHT";
    scoreRef.current = 0;
    levelRef.current = 1;
    speedRef.current = INITIAL_SPEED;
    setScore(0);
    setLevel(1);

    // 3 foods
    const walls = mapsRef.current[0];
    const f1 = makeFood(startSnake, walls, []);
    const f2 = makeFood(startSnake, walls, [f1]);
    const f3 = makeFood(startSnake, walls, [f1, f2]);
    foodsRef.current = [f1, f2, f3];

    phaseRef.current = "playing";
    setPhase("playing");
    draw();
    timerRef.current = setTimeout(
      () => requestAnimationFrame(loop),
      speedRef.current,
    );
  }, [stopLoop, draw, loop]);

  // ─── Keyboard controls ────────────────────────────────────────────────────
  useEffect(() => {
    const opp: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };
    const map: Record<string, Direction> = {
      ArrowUp: "UP",
      ArrowDown: "DOWN",
      ArrowLeft: "LEFT",
      ArrowRight: "RIGHT",
      w: "UP",
      W: "UP",
      s: "DOWN",
      S: "DOWN",
      a: "LEFT",
      A: "LEFT",
      d: "RIGHT",
      D: "RIGHT",
    };
    function onKey(e: KeyboardEvent) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
        e.preventDefault();
      const dir = map[e.key];
      if (dir && dir !== opp[dirRef.current]) nextDirRef.current = dir;
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ─── Canvas click (game over restart) ────────────────────────────────────
  const handleCanvasClick = useCallback(() => {
    if (phaseRef.current === "over") initGame();
    else if (phaseRef.current === "idle") initGame();
  }, [initGame]);

  // ─── D-pad handler ────────────────────────────────────────────────────────
  const handleDpad = useCallback(
    (dir: Direction) => {
      const opp: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };
      if (dir !== opp[dirRef.current]) nextDirRef.current = dir;
      if (phaseRef.current !== "playing") initGame();
    },
    [initGame],
  );

  // ─── Initial draw on mount ────────────────────────────────────────────────
  useEffect(() => {
    draw();
    return stopLoop;
  }, [draw, stopLoop]);

  const dpadBtn = (dir: Direction, label: string, ariaLabel: string) => (
    <button
      type="button"
      data-ocid="controls.button"
      aria-label={ariaLabel}
      onPointerDown={(e) => {
        e.preventDefault();
        handleDpad(dir);
      }}
      className="w-14 h-14 flex items-center justify-center text-xl font-bold rounded-full border-2 select-none transition-all active:scale-90"
      style={{
        background: "rgba(57,255,20,0.07)",
        borderColor: "#39ff14",
        color: "#39ff14",
        boxShadow: "0 0 8px rgba(57,255,20,0.25)",
        touchAction: "none",
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 select-none"
      style={{
        background: "#111",
        color: "white",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
          zIndex: 50,
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Title */}
        <h1
          className="text-3xl font-bold tracking-widest"
          style={{
            color: "#39ff14",
            textShadow:
              "0 0 10px rgba(57,255,20,0.7), 0 0 30px rgba(57,255,20,0.3)",
          }}
        >
          🐍 ULTIMATE SNAKE
        </h1>

        {/* HUD */}
        <div
          className="flex gap-6 text-sm tracking-widest"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          <span>
            SCORE: <strong style={{ color: "#39ff14" }}>{score}</strong>
          </span>
          <span>
            HI: <strong style={{ color: "#ffe600" }}>{highScore}</strong>
          </span>
          <span>
            LVL: <strong style={{ color: "#00e5ff" }}>{level}</strong>
          </span>
        </div>

        {/* Canvas */}
        <div style={{ position: "relative" }}>
          <canvas
            ref={canvasRef}
            width={CANVAS}
            height={CANVAS}
            data-ocid="game.canvas_target"
            onKeyDown={handleCanvasClick}
            role="button"
            tabIndex={0}
            onClick={handleCanvasClick}
            style={{
              display: "block",
              background: "#000",
              border: "3px solid white",
              boxShadow:
                "0 0 20px rgba(57,255,20,0.2), 0 0 60px rgba(57,255,20,0.05)",
              cursor:
                phase === "over" || phase === "idle" ? "pointer" : "default",
              maxWidth: "100%",
              imageRendering: "pixelated",
            }}
          />
          {/* Idle overlay */}
          {phase === "idle" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.75)",
                gap: 16,
              }}
            >
              <p
                style={{
                  color: "#39ff14",
                  fontSize: 22,
                  fontWeight: "bold",
                  letterSpacing: "0.15em",
                  textShadow: "0 0 12px rgba(57,255,20,0.6)",
                }}
              >
                CLICK TO PLAY
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
                ARROW KEYS / WASD TO MOVE
              </p>
            </div>
          )}
        </div>

        {/* D-pad controls */}
        <div style={{ marginTop: 8 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            {/* Up */}
            <div>{dpadBtn("UP", "⬆", "Move up")}</div>
            {/* Middle row */}
            <div style={{ display: "flex", gap: 4 }}>
              {dpadBtn("LEFT", "⬅", "Move left")}
              <div className="w-14 h-14" />
              {dpadBtn("RIGHT", "➡", "Move right")}
            </div>
            {/* Down */}
            <div>{dpadBtn("DOWN", "⬇", "Move down")}</div>
          </div>
        </div>

        {/* Restart button */}
        <button
          type="button"
          data-ocid="game.primary_button"
          onClick={initGame}
          style={{
            marginTop: 4,
            padding: "10px 28px",
            fontSize: 14,
            fontWeight: "bold",
            letterSpacing: "0.15em",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            border: "2px solid rgba(255,255,255,0.4)",
            borderRadius: 6,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.18)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.08)";
          }}
        >
          RESTART 🔁
        </button>

        {/* Footer */}
        <footer style={{ marginTop: 8, textAlign: "center" }}>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.25)",
                textDecoration: "none",
              }}
            >
              Built with ♥ using caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
