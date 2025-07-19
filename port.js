// ===== Theme Toggle =====
function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.getAttribute("data-theme") === "light";
  html.setAttribute("data-theme", isLight ? "dark" : "light");
  localStorage.setItem("theme", isLight ? "dark" : "light");
}

// ===== Load Saved Theme =====
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }

  initTyping();
});

// ===== Typing Effect =====
const phrases = ["Web Developer", "Frontend Enthusiast", "Creative Coder"];
let i = 0, j = 0, currentPhrase = [], isDeleting = false, isEnd = false;

function initTyping() {
  const typedText = document.querySelector(".typed-text");
  const cursor = document.querySelector(".cursor");

  function loop() {
    isEnd = false;
    typedText.innerHTML = currentPhrase.join("");

    if (i < phrases.length) {
      if (!isDeleting && j <= phrases[i].length) {
        currentPhrase.push(phrases[i][j]);
        j++;
        typedText.innerHTML = currentPhrase.join("");
      }

      if (isDeleting && j <= phrases[i].length) {
        currentPhrase.pop();
        j--;
        typedText.innerHTML = currentPhrase.join("");
      }

      if (j === phrases[i].length) {
        isEnd = true;
        isDeleting = true;
        cursor.classList.add("blinking");
      }

      if (isDeleting && j === 0) {
        currentPhrase = [];
        isDeleting = false;
        i++;
        if (i === phrases.length) i = 0;
        cursor.classList.remove("blinking");
      }
    }
    const typingSpeed = isEnd ? 2000 : isDeleting ? 50 : 100;
    setTimeout(loop, typingSpeed);
  }

  loop();
}

// ===== Download CV =====
function downloadCV() {
  const link = document.createElement("a");
  link.href = "./Cv.kruti.pdf"; // Update with your actual CV path
  link.download = "Cv.kruti.pdf";
  link.click();
}
