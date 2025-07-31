 document.addEventListener("DOMContentLoaded", () => {
      // BODY STYLING
      document.body.style.margin = "0";
      document.body.style.overflow = "hidden";
      document.body.style.fontFamily = "Segoe UI, sans-serif";
      document.body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
      document.body.style.color = "#fff";
      document.body.style.display = "flex";
      document.body.style.flexDirection = "column";
      document.body.style.alignItems = "center";
      document.body.style.height = "100vh";

      // HEADER (score + timer)
      const header = document.createElement("div");
      header.style.display = "flex";
      header.style.justifyContent = "center";
      header.style.gap = "30px";
      header.style.marginTop = "20px";
      header.style.fontSize = "1.2rem";

      const scoreBox = document.createElement("div");
      scoreBox.id = "score";
      scoreBox.textContent = "Score: 0";
      scoreBox.style.background = "rgba(255,255,255,0.1)";
      scoreBox.style.padding = "10px 20px";
      scoreBox.style.borderRadius = "8px";
      scoreBox.style.boxShadow = "0 0 5px rgba(255,255,255,0.2)";

      const timerBox = document.createElement("div");
      timerBox.id = "timer";
      timerBox.textContent = "Time: 30s";
      timerBox.style.background = scoreBox.style.background;
      timerBox.style.padding = scoreBox.style.padding;
      timerBox.style.borderRadius = scoreBox.style.borderRadius;
      timerBox.style.boxShadow = scoreBox.style.boxShadow;

      header.appendChild(scoreBox);
      header.appendChild(timerBox);
      document.body.appendChild(header);

      // START BUTTON
      const startBtn = document.createElement("button");
      startBtn.textContent = "Start Game";
      startBtn.style.margin = "20px";
      startBtn.style.padding = "12px 24px";
      startBtn.style.fontSize = "1rem";
      startBtn.style.fontWeight = "bold";
      startBtn.style.border = "none";
      startBtn.style.borderRadius = "30px";
      startBtn.style.cursor = "pointer";
      startBtn.style.background = "linear-gradient(45deg, #0072ff, #00c6ff)";
      startBtn.style.color = "white";
      startBtn.style.transition = "transform 0.2s, box-shadow 0.2s";

      startBtn.onmouseover = () => {
        startBtn.style.transform = "scale(1.05)";
        startBtn.style.boxShadow = "0 0 10px #00c6ff";
      };
      startBtn.onmouseout = () => {
        startBtn.style.transform = "scale(1)";
        startBtn.style.boxShadow = "none";
      };

      document.body.appendChild(startBtn);

      // GAME AREA
      const gameArea = document.createElement("div");
      gameArea.id = "game-area";
      gameArea.style.flexGrow = "1";
      gameArea.style.width = "100%";
      gameArea.style.position = "relative";
      gameArea.style.borderTop = "2px solid rgba(255,255,255,0.2)";
      gameArea.style.overflow = "hidden";
      document.body.appendChild(gameArea);

      // GAME LOGIC
      let score = 0;
      let timeLeft = 30;
      let gameInterval, timerInterval;

      function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

      function createCircle() {
        const circle = document.createElement("div");
        const size = random(40, 100);
        const x = random(0, window.innerWidth - size);
        const y = random(0, window.innerHeight - size - 100); // reserve top area

        // Circle style
        circle.style.width = circle.style.height = size + "px";
        circle.style.position = "absolute";
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        circle.style.borderRadius = "50%";
        circle.style.background = `radial-gradient(circle at 30% 30%, hsl(${random(0,360)}, 100%, 60%), hsl(${random(0,360)}, 70%, 40%))`;
        circle.style.boxShadow = "0 0 15px rgba(255,255,255,0.4)";
        circle.style.cursor = "pointer";
        circle.style.animation = "fadeIn 0.3s ease-in";
        circle.style.transition = "transform 0.2s";

        // Hover effect
        circle.onmouseover = () => circle.style.transform = "scale(1.1)";
        circle.onmouseout = () => circle.style.transform = "scale(1)";

        circle.addEventListener("click", () => {
          score++;
          scoreBox.textContent = "Score: " + score;
          gameArea.removeChild(circle);
        });

        gameArea.appendChild(circle);

        setTimeout(() => {
          if (gameArea.contains(circle)) {
            gameArea.removeChild(circle);
          }
        }, 2000);
      }

      function startGame() {
        score = 0;
        timeLeft = 30;
        scoreBox.textContent = "Score: 0";
        timerBox.textContent = "Time: 30s";
        startBtn.disabled = true;
        startBtn.style.background = "gray";
        gameArea.innerHTML = "";

        gameInterval = setInterval(createCircle, 700);
        timerInterval = setInterval(() => {
          timeLeft--;
          timerBox.textContent = "Time: " + timeLeft + "s";
          if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            startBtn.disabled = false;
            startBtn.style.background = "linear-gradient(45deg, #0072ff, #00c6ff)";
            alert("Time's up! You scored: " + score);
          }
        }, 1000);
      }

      startBtn.addEventListener("click", startGame);

      // Inject CSS keyframe animation
      const styleTag = document.createElement("style");
      styleTag.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
      `;
      document.head.appendChild(styleTag);
    });