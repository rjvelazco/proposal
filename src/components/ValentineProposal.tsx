import { useState, useRef, useEffect } from "react";
import { Fireworks } from "@fireworks-js/react";
import CloudsBackground from "./CloudsBackground";
import "./ValentineProposal.css";

const getRandomPosition = (button: HTMLButtonElement) => {
  // Get the dimensions of the viewport
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Get the dimensions of the button itself
  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  // Calculate the maximum possible 'left' position so the button doesn't leave the screen
  const maxLeft = screenWidth - buttonWidth;

  // Calculate the maximum possible 'top' position
  const maxTop = screenHeight - buttonHeight;

  // Generate random values within the calculated boundaries
  const randomLeft = Math.floor(Math.random() * maxLeft);
  const randomTop = Math.floor(Math.random() * maxTop);
  return { x: randomLeft, y: randomTop };
};

const ValentineProposal = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [noBtnInit, setNoBtnInit] = useState(false);
  const [noBtnMoving, setNoBtnMoving] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Set audio volume to 80% when the popup is shown
  useEffect(() => {
    if (showPopup && audioRef.current) {
      audioRef.current.volume = 0.8;
    }
  }, [showPopup]);

  const handleNoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const { x, y } = getRandomPosition(button);
    setNoBtnPos({ x, y });
    setNoBtnInit(true);
    setNoBtnMoving(true);
    setTimeout(() => setNoBtnMoving(false), 0); // allow re-render
  };

  const handleYesClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="valentine-bg full-viewport">
      <CloudsBackground />
      <div className="valentine-container">
        <h1>¿Te quedarías a mi lado en todos mis sueños?</h1>
        <div className="buttons-container">
          <button className="yes-button" onClick={handleYesClick}>
            Sí
          </button>
          {/* Placeholder No button to preserve layout */}
          <button
            className="no-button"
            style={{ visibility: noBtnInit ? "hidden" : "visible" }}
            ref={noBtnRef}
            onClick={handleNoClick}
            tabIndex={noBtnInit ? -1 : 0}
          >
            No
          </button>
        </div>
        {showPopup && (
          <div className="popup">
            {/* Fireworks behind the popup */}
            <div className="fireworks-wrapper">
              <Fireworks
                options={{
                  hue: { min: 0, max: 360 },
                  rocketsPoint: { min: 0, max: 100 },
                  intensity: 30,
                  explosion: 6,
                  traceLength: 3,
                  traceSpeed: 10,
                  brightness: { min: 50, max: 80 },
                  decay: { min: 0.015, max: 0.03 },
                  mouse: { click: false, move: false, max: 0 },
                  sound: {
                    enabled: false,
                  },
                }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
            </div>
            {/* Play the song while the modal is open */}
            <audio
              ref={audioRef}
              src="/music/ed-sheeran-perfect.mp3"
              autoPlay
              loop
            />
            <div className="popup-content">
              <span className="popup-message">
                ¡Acabas de hacerme el hombre más feliz del mundo! ❤️
              </span>
              <button onClick={handleClose}>
                Te amo
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Absolutely positioned No button when moving */}
      {noBtnInit && (
        <button
          className="no-button"
          style={{
            position: "absolute",
            left: noBtnPos.x,
            top: noBtnPos.y,
            zIndex: 10,
            visibility: noBtnMoving ? "visible" : "visible",
          }}
          onClick={handleNoClick}
        >
          No
        </button>
      )}
    </div>
  );
};

export default ValentineProposal;
