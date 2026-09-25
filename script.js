/* =========================================================
   BIRTHDAY WEBSITE - JAVASCRIPT
   ✏️ THIS IS THE MAIN PLACE TO PERSONALIZE THE WEBSITE.
   ========================================================= */

/* =========================================================
   ✏️ 1. CHANGE THESE SETTINGS
   ========================================================= */

const SETTINGS = {
  // ✏️ Put the name here
  name: "Shreesti",

  // ✏️ Choose a 4-digit secret code
  passcode: "2026",

  // ✏️ Change the final birthday message here
  finalMessage:
    "Happy Birthday! I hope your day is filled with laughter, happiness, wonderful memories, and everything that makes you smile. Keep being amazing and enjoy your special day! 🎂✨ dagabazi krna chor do  lovee u muaahhhh"
};


/* =========================================================
   You normally don't need to edit anything below this line.
   ========================================================= */

document.getElementById("name1").textContent = SETTINGS.name;
document.getElementById("name2").textContent = SETTINGS.name;
document.getElementById("finalMessage").textContent = SETTINGS.finalMessage;

let entered = "";

const screens = document.querySelectorAll(".screen");

function showScreen(number) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById("screen" + number).classList.add("active");

  if (number === 6) {
    launchConfetti();
  }
}

/* ---------------- PIN ---------------- */

const pinDisplay = document.querySelectorAll("#pinDisplay span");
const pinError = document.getElementById("pinError");

function updatePin() {
  pinDisplay.forEach((dot, i) => {
    dot.classList.toggle("filled", i < entered.length);
  });
}

document.querySelectorAll(".keypad button").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.key;

    if (key === "clear") {
      entered = "";
    } else if (key === "back") {
      entered = entered.slice(0, -1);
    } else if (entered.length < 4) {
      entered += key;
    }

    pinError.textContent = "";
    updatePin();
  });
});

document.getElementById("unlockBtn").addEventListener("click", () => {
  if (entered === SETTINGS.passcode) {
    entered = "";
    updatePin();
    showScreen(2);
  } else {
    pinError.textContent = "That code isn't right — try again 💗";
    entered = "";
    updatePin();
  }
});

/* ---------------- NEXT BUTTONS ---------------- */

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(Number(button.dataset.next));
  });
});

/* ---------------- BALLOONS ---------------- */

let popped = 0;

const balloons = document.querySelectorAll(".interactive-balloons .balloon");
const progressDots = document.querySelectorAll("#balloonProgress span");
const balloonMessage = document.getElementById("balloonMessage");
const balloonNext = document.getElementById("balloonNext");

balloons.forEach((balloon, index) => {

  balloon.addEventListener("click", () => {

    if (balloon.classList.contains("popping")) {
      return;
    }

    popped++;

    /* Add pop animation */
    balloon.classList.add("popping");

    /* Update progress */
    if (progressDots[index]) {
      progressDots[index].classList.add("popped");
    }

    /* Show message */
    balloonMessage.textContent =
      balloon.dataset.message;

    balloonMessage.classList.remove("message-pop");

    void balloonMessage.offsetWidth;

    balloonMessage.classList.add("message-pop");

    /* Create little hearts */
    createPopHearts(balloon);

    /* After all balloons */
    if (popped === balloons.length) {

      setTimeout(() => {

        balloonMessage.textContent =
          "You popped them all! 🎉 Now there's one more surprise waiting...";

        balloonNext.classList.remove("hidden");

      }, 450);
    }
  });

});


/* Little hearts released when balloon pops */

function createPopHearts(balloon) {

  const rect = balloon.getBoundingClientRect();

  for (let i = 0; i < 7; i++) {

    const heart = document.createElement("span");

    heart.textContent =
      Math.random() > .5 ? "♥" : "♡";

    heart.style.position = "fixed";

    heart.style.left =
      rect.left + rect.width / 2 + "px";

    heart.style.top =
      rect.top + rect.height / 2 + "px";

    heart.style.zIndex = "100";

    heart.style.pointerEvents = "none";

    heart.style.color = "#a83f63";

    heart.style.fontSize =
      (12 + Math.random() * 10) + "px";

    heart.style.transition =
      "transform .8s ease, opacity .8s ease";

    document.body.appendChild(heart);

    requestAnimationFrame(() => {

      heart.style.transform =
        `translate(
          ${(Math.random() - .5) * 120}px,
          ${-40 - Math.random() * 80}px
        ) rotate(${Math.random() * 180}deg)`;

      heart.style.opacity = "0";

    });

    setTimeout(() => {
      heart.remove();
    }, 900);
  }
}


balloonNext.addEventListener("click", () => {
  showScreen(4);
});

/* ---------------- CAKE ---------------- */

const flame = document.getElementById("flame");
const cakeMessage = document.getElementById("cakeMessage");
const cakeNext = document.getElementById("cakeNext");

flame.addEventListener("click", () => {

  /* Stop another click */
  if (flame.classList.contains("off")) {
    return;
  }

  /* Blow out flame */
  flame.classList.add("off");

  /* Show birthday wish */
  cakeMessage.textContent =
    "Wish made! ✨ May all your little wishes come true.";

  cakeMessage.classList.add("wish-show");

  /* Create sparkles */
  createWishSparkles();

  /* Unlock final button */
  setTimeout(() => {
    cakeNext.classList.remove("hidden");
  }, 900);

});


/* Sparkles when candle goes out */

function createWishSparkles() {

  const scene = document.querySelector(".cake-scene");

  for (let i = 0; i < 14; i++) {

    const sparkle = document.createElement("span");

    sparkle.textContent =
      Math.random() > .5 ? "✦" : "♡";

    sparkle.style.position = "absolute";

    sparkle.style.left =
      (35 + Math.random() * 30) + "%";

    sparkle.style.top =
      (20 + Math.random() * 35) + "%";

    sparkle.style.zIndex = "20";

    sparkle.style.pointerEvents = "none";

    sparkle.style.color = "#fff";

    sparkle.style.fontSize =
      (10 + Math.random() * 12) + "px";

    sparkle.style.transition =
      "transform 1s ease, opacity 1s ease";

    scene.appendChild(sparkle);

    requestAnimationFrame(() => {

      sparkle.style.transform =
        `translate(
          ${(Math.random() - .5) * 180}px,
          ${-40 - Math.random() * 90}px
        ) scale(${.7 + Math.random() * .8})`;

      sparkle.style.opacity = "0";

    });

    setTimeout(() => {
      sparkle.remove();
    }, 1100);
  }
}


cakeNext.addEventListener("click", () => {
  showScreen(6);
});

/* ---------------- FLOATING HEARTS ---------------- */

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = Math.random() > .5 ? "♡" : "♥";

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (12 + Math.random() * 22) + "px";
  heart.style.animationDuration = (5 + Math.random() * 6) + "s";

  document.querySelector(".floating-hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 12000);
}

setInterval(createHeart, 850);

/* ---------------- FINAL CONFETTI ---------------- */

function launchConfetti() {
  const container = document.getElementById("confetti");
  container.innerHTML = "";

  const pieces = ["💗", "✨", "🎉", "♡", "💕", "⭐"];

  for (let i = 0; i < 45; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];

    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDelay = Math.random() * 1.5 + "s";
    piece.style.fontSize = (12 + Math.random() * 16) + "px";

    container.appendChild(piece);
  }
}

/* ---------------- RESTART ---------------- */

document.getElementById("restart").addEventListener("click", () => {
  location.reload();
});
/* =========================================================
   🎉 FINAL SCREEN
   ========================================================= */

const replayBtn = document.getElementById("replayBtn");

if (replayBtn) {

  replayBtn.addEventListener("click", () => {

    location.reload();

  });

}