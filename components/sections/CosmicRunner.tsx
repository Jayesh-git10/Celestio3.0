"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpaceSound } from "@/hooks/use-space-sound";

type GameState = "menu" | "playing" | "gameover";
type CharacterCode = "Xavier" | "Alakh";
const faces = {
  Xavier: "/face/xavier_face.png",
  Alakh: "/face/alakh_face.png"
};

// Constants for game physics (desktop)
const GRAVITY_DESKTOP = 1.6;
const GRAVITY_MOBILE  = 1.0;
const JUMP_DESKTOP    = -20;
const JUMP_MOBILE     = -13;
const GROUND_Y = 0;

interface Obstacle {
  id: number;
  x: number;
  type: string;
}

export default function CosmicRunner() {
  const { playClick } = useSpaceSound();
  
  const [gameState, setGameState] = useState<GameState>("menu");
  const [character, setCharacter] = useState<CharacterCode>("Xavier");
  const [finalScore, setFinalScore] = useState(0);

  const playerRef    = useRef<HTMLDivElement>(null);
  const obstaclesRef = useRef<HTMLDivElement>(null);
  const scoreRef     = useRef<HTMLSpanElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null); // For dynamic width

  const physics = useRef({
    y: GROUND_Y,
    velocity: 0,
    isJumping: false,
    score: 0,
    speed: 6,
    frameCount: 0,
    obstacles: [] as Obstacle[],
    obstacleIdCounter: 0,
    nextSpawnFrame: 0,
  });

  const requestRef = useRef<number | undefined>(undefined);

  // Get container width dynamically — works on every screen size
  const getContainerWidth = useCallback(() => {
    return gameContainerRef.current?.offsetWidth ?? 800;
  }, []);

  const jump = useCallback(() => {
    if (gameState !== "playing") return;
    if (!physics.current.isJumping) {
      const isMobile = (gameContainerRef.current?.offsetWidth ?? 800) < 500;
      physics.current.velocity = isMobile ? JUMP_MOBILE : JUMP_DESKTOP;
      physics.current.isJumping = true;
      playClick();
    }
  }, [gameState, playClick]);

  const startGame = (char: CharacterCode) => {
    setCharacter(char);
    setGameState("playing");
    const isMobile = (gameContainerRef.current?.offsetWidth ?? 800) < 500;
    physics.current = {
      y: GROUND_Y,
      velocity: 0,
      isJumping: false,
      score: 0,
      speed: isMobile ? 3.5 : 6, // Slower initial speed on mobile
      frameCount: 0,
      obstacles: [],
      obstacleIdCounter: 0,
      nextSpawnFrame: 0,
    };
    if (scoreRef.current) scoreRef.current.innerText = "00000";
    if (obstaclesRef.current) obstaclesRef.current.innerHTML = "";
    playClick();
  };

  const gameOver = useCallback(() => {
    setGameState("gameover");
    setFinalScore(Math.floor(physics.current.score));
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  }, []);

  const gameLoop = useCallback(() => {
    if (gameState !== "playing") return;
    const p = physics.current;

    // 1. Player Physics
    const isMobilePhysics = getContainerWidth() < 500;
    p.velocity += isMobilePhysics ? GRAVITY_MOBILE : GRAVITY_DESKTOP;
    p.y -= p.velocity;
    if (p.y <= GROUND_Y) {
      p.y = GROUND_Y;
      p.velocity = 0;
      p.isJumping = false;
    }
    if (playerRef.current) {
      playerRef.current.style.bottom = `${p.y}px`;
    }

    // 2. Continuous acceleration & dynamic spawning
    p.frameCount++;
    const isMobile = getContainerWidth() < 500;
    p.speed += isMobile ? 0.004 : 0.01; // Gentler acceleration on mobile

    if (p.frameCount >= p.nextSpawnFrame) {
      const gapFrames = Math.floor(400 / p.speed) + Math.floor(Math.random() * 40);
      p.nextSpawnFrame = p.frameCount + gapFrames;

      const types = ["austranaut", "ufo"];
      p.obstacles.push({
        id: p.obstacleIdCounter++,
        x: getContainerWidth() + 20, // Spawn just past right edge of container
        type: types[Math.floor(Math.random() * types.length)],
      });

      if (obstaclesRef.current) {
        const obsType = p.obstacles[p.obstacles.length - 1].type;
        const el = document.createElement("div");
        el.id = `obs-${p.obstacleIdCounter - 1}`;
        el.className = "absolute z-20";

        const imgSrc   = obsType === "austranaut" ? "/austranaut.png" : "/ufo.png";
        // On small screens the UFO bottom is 50px, on larger 80px
        const isSmall  = getContainerWidth() < 500;
        const bottomCss = obsType === "austranaut" ? "0px" : (isSmall ? "50px" : "80px");

        el.style.bottom = bottomCss;
        el.style.left   = `${getContainerWidth() + 20}px`;
        el.innerHTML    = `<img src="${imgSrc}" style="width:${isSmall ? 36 : 48}px;height:${isSmall ? 36 : 48}px;object-fit:contain;" />`;
        obstaclesRef.current.appendChild(el);
      }
    }

    // 3. Update Obstacles & Collision
    for (let i = p.obstacles.length - 1; i >= 0; i--) {
      const obs = p.obstacles[i];
      obs.x -= p.speed;
      const el = document.getElementById(`obs-${obs.id}`);
      if (el) el.style.left = `${obs.x}px`;

      // AABB collision
      const playerX    = 50;
      const hitBoxW    = 32;

      if (obs.x < playerX + hitBoxW && obs.x + hitBoxW > playerX) {
        if (obs.type === "austranaut") {
          if (p.y < 40) { gameOver(); return; }
        } else if (obs.type === "ufo") {
          if (p.y > 30) { gameOver(); return; }
        }
      }

      if (obs.x < -100) {
        p.obstacles.splice(i, 1);
        if (el) el.remove();
      }
    }

    // 4. Score
    p.score += 0.1;
    if (scoreRef.current) {
      scoreRef.current.innerText = Math.floor(p.score).toString().padStart(5, "0");
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, gameOver, getContainerWidth]);

  // ── Keyboard ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (gameState === "playing") jump();
        else if (gameState === "gameover") setGameState("menu");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gameState, jump]);

  // ── Touch (mobile: tap anywhere on screen to jump) ──
  useEffect(() => {
    const onTouch = (e: TouchEvent) => {
      if (gameState === "playing") {
        e.preventDefault();
        jump();
      }
    };
    document.addEventListener("touchstart", onTouch, { passive: false });
    return () => document.removeEventListener("touchstart", onTouch);
  }, [gameState, jump]);

  // ── Game Loop ──
  useEffect(() => {
    if (gameState === "playing") {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, gameLoop]);

  return (
    <section id="runner" className="py-16 md:py-24 relative z-10 w-full overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-6 md:mb-8">
          <span className="text-starlight-cyan font-logo text-xs tracking-[0.4em] uppercase mb-2 block">
            ✦ System Breach
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter uppercase mb-2">
            Cosmic <span className="text-gradient">Runner</span>
          </h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest hidden md:block">
            Jump over Astronauts · Stay grounded under UFOs
          </p>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest md:hidden">
            Tap to jump · Stay low under UFOs
          </p>
        </div>

        {/* Game Container */}
        <div
          ref={gameContainerRef}
          className="relative w-full h-[220px] sm:h-[280px] md:h-[350px] bg-[#030014]/60 border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_0_50px_rgba(121,40,202,0.2)] overflow-hidden cursor-pointer select-none"
          onClick={jump}
        >
          {/* Score */}
          <div className="absolute top-3 right-4 md:top-4 md:right-6 text-starlight-cyan font-mono text-base md:text-2xl font-black tracking-widest z-20 opacity-80">
            HI <span ref={scoreRef}>00000</span>
          </div>

          <AnimatePresence>
            {/* Menu */}
            {gameState === "menu" && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
              >
                <p className="text-white font-heading text-base md:text-xl uppercase tracking-widest">
                  Select Your Runner
                </p>
                <div className="flex gap-8">
                  <button
                    onClick={(e) => { e.stopPropagation(); startGame("Xavier"); }}
                    onTouchStart={(e) => { e.stopPropagation(); startGame("Xavier"); }}
                    className="hover:scale-110 active:scale-95 transition-transform"
                  >
                    <img src={faces.Xavier} alt="Xavier" className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-[0_0_12px_#00FFFF]" />
                    <p className="text-[10px] text-starlight-cyan text-center mt-1 tracking-widest uppercase">Xavier</p>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); startGame("Alakh"); }}
                    onTouchStart={(e) => { e.stopPropagation(); startGame("Alakh"); }}
                    className="hover:scale-110 active:scale-95 transition-transform"
                  >
                    <img src={faces.Alakh} alt="Alakh" className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-[0_0_12px_#FF00FF]" />
                    <p className="text-[10px] text-pink-400 text-center mt-1 tracking-widest uppercase">Alakh</p>
                  </button>
                </div>
                <p className="text-gray-400 text-[10px] tracking-widest uppercase animate-pulse mt-2">
                  Tap screen or press Space to jump
                </p>
              </motion.div>
            )}

            {/* Game Over */}
            {gameState === "gameover" && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 bg-red-900/20 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
              >
                <h3 className="text-2xl md:text-5xl font-heading font-black text-white tracking-widest text-gradient">
                  SYSTEM FAILURE
                </h3>
                <p className="text-starlight-cyan font-mono text-lg">SCORE: {finalScore}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setGameState("menu"); }}
                  className="px-6 py-2.5 glass-panel rounded-full text-white font-bold tracking-widest text-xs uppercase hover:bg-white/10 hover:border-starlight-cyan transition-colors"
                >
                  Restart Mission
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game World */}
          <div className="absolute inset-0 z-10" style={{ display: gameState === "playing" ? "block" : "none" }}>
            {/* Neon Ground */}
            <div className="absolute bottom-0 w-[200%] h-[2px] bg-starlight-cyan/50 shadow-[0_0_20px_#00FFFF]" />

            {/* Player */}
            <div
              ref={playerRef}
              className="absolute left-[50px] filter drop-shadow-[0_0_12px_#ffffff]"
              style={{ bottom: "0px" }}
            >
              <img
                src={faces[character]}
                alt="Runner"
                className="w-10 h-10 md:w-14 md:h-14 object-contain"
              />
            </div>

            {/* Obstacles */}
            <div ref={obstaclesRef} className="absolute inset-0 pointer-events-none" />
          </div>
        </div>

        {/* Mobile hint */}
        <p className="text-center text-gray-600 text-[9px] tracking-widest uppercase mt-3 md:hidden">
          ☄️ Jump over Astronauts · 🛸 Stay low under UFOs
        </p>
      </div>
    </section>
  );
}
