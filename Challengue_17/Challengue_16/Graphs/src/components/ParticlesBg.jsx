import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBg() {
  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="particles-layer" aria-hidden="true">
      <Particles
        id="tsparticles"
        init={init}
        options={{
          background: { color: { value: "transparent" } },
          fullScreen: { enable: false },
          fpsLimit: 60,
          detectRetina: true,
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: ["#22d3ee", "#8b5cf6", "#22f39a"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, anim: { enable: false } },
            size: { value: { min: 1, max: 3 } },
            links: { enable: true, color: "#22d3ee", opacity: 0.25, distance: 140, width: 1 },
            move: { enable: true, speed: 1.1, outModes: { default: "bounce" } }
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 80, duration: 0.3 } }
          }
        }}
      />
    </div>
  );
}
