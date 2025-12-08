const pads = document.querySelectorAll(".pad");
const startBtn = document.getElementById("start-btn");
const statusText = document.getElementById("status");
const levelText = document.getElementById("level");
const bestScoreText = document.getElementById("best-score");
const leaderboardBody = document.querySelector("#leaderboard tbody");

const colors = ["green", "red", "yellow", "blue"];
const colorFrequencies = {
  green: 329.63,
  red: 261.63,
  yellow: 392.0,
  blue: 493.88
};

let audioCtx = null;
let sequence = [];
let playerIndex = 0;
let level = 0;
let acceptingInput = false;
let score = 0;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playTone(color, duration) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const frequency = colorFrequencies[color] || 440;

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  const now = ctx.currentTime;
  gainNode.gain.setValueAtTime(0.001, now);
  gainNode.gain.exponentialRampToValueAtTime(0.4, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);

  oscillator.start(now);
  oscillator.stop(now + duration / 1000);
}

function playPad(color, duration) {
  const pad = document.querySelector(`.pad[data-color="${color}"]`);
  if (!pad) {
    return;
  }
  pad.classList.add("active");
  playTone(color, duration);
  setTimeout(() => {
    pad.classList.remove("active");
  }, duration * 0.75);
}

async function playSequence() {
  acceptingInput = false;
  statusText.textContent = "Observe a sequência / Watch the sequence";
  await sleep(600);
  for (const color of sequence) {
    playPad(color, 350);
    await sleep(500);
  }
  playerIndex = 0;
  acceptingInput = true;
  statusText.textContent = "Sua vez / Your turn";
}

function updateBestScore() {
  const currentBest = parseInt(localStorage.getItem("simonBestScore") || "0", 10);
  if (score > currentBest) {
    localStorage.setItem("simonBestScore", String(score));
    bestScoreText.textContent = String(score);
  }
}

function loadBestScore() {
  const currentBest = parseInt(localStorage.getItem("simonBestScore") || "0", 10);
  bestScoreText.textContent = String(currentBest);
}

function getLeaderboard() {
  const raw = localStorage.getItem("simonLeaderboard");
  if (!raw) {
    return [];
  }
  try {
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (error) {
    return [];
  }
}

function saveLeaderboard(list) {
  localStorage.setItem("simonLeaderboard", JSON.stringify(list));
}

function renderLeaderboard() {
  const list = getLeaderboard();
  leaderboardBody.innerHTML = "";
  list.forEach((entry, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${index + 1}</td><td>${entry.name}</td><td>${entry.score}</td><td>${entry.date}</td>`;
    leaderboardBody.appendChild(tr);
  });
}

function addScoreToLeaderboard(finalLevel) {
  if (finalLevel <= 0) {
    return;
  }
  const lastName = localStorage.getItem("simonLastName") || "Player";
  const name = window.prompt("Digite seu nome para o ranking / Enter your name:", lastName);
  if (!name) {
    return;
  }
  localStorage.setItem("simonLastName", name);
  const entry = {
    name,
    score: finalLevel,
    date: new Date().toISOString().split("T")[0]
  };
  const list = getLeaderboard();
  list.push(entry);
  list.sort((a, b) => b.score - a.score);
  const trimmed = list.slice(0, 10);
  saveLeaderboard(trimmed);
  renderLeaderboard();
}

function resetState() {
  sequence = [];
  playerIndex = 0;
  level = 0;
  score = 0;
  levelText.textContent = "0";
}

function startGame() {
  resetState();
  statusText.textContent = "Observe a sequência / Watch the sequence";
  nextRound();
}

function nextRound() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);
  level = sequence.length;
  levelText.textContent = String(level);
  playSequence();
}

function handlePlayerInput(color) {
  if (!acceptingInput) {
    return;
  }
  const expected = sequence[playerIndex];
  playPad(color, 260);
  if (color !== expected) {
    const completedLevel = level - 1;
    statusText.textContent = "Errou! Fim de jogo / Wrong! Game over";
    acceptingInput = false;
    addScoreToLeaderboard(completedLevel);
    return;
  }
  playerIndex += 1;
  score += 1;
  updateBestScore();
  if (playerIndex === sequence.length) {
    acceptingInput = false;
    statusText.textContent = "Boa! Próximo nível / Nice! Next level";
    setTimeout(() => {
      nextRound();
    }, 800);
  }
}

pads.forEach(pad => {
  pad.addEventListener("click", () => {
    handlePlayerInput(pad.dataset.color);
  });
});

startBtn.addEventListener("click", () => {
  startGame();
});

window.addEventListener("load", () => {
  loadBestScore();
  renderLeaderboard();
});