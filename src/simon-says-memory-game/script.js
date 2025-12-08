const pads = document.querySelectorAll(".pad");
const startBtn = document.getElementById("start-btn");
const statusText = document.getElementById("status");
const levelText = document.getElementById("level");
const bestScoreText = document.getElementById("best-score");
const leaderboardBody = document.querySelector("#leaderboard tbody");
const gameBoard = document.getElementById("game-board");

const difficultySelect = document.getElementById("difficulty-select");
const themeClassicBtn = document.getElementById("theme-classic");
const themePlayBtn = document.getElementById("theme-playstation");
const themeEmojiBtn = document.getElementById("theme-emoji");
const soundToggleBtn = document.getElementById("sound-toggle");
const trainingToggleBtn = document.getElementById("training-toggle");
const themeToggleBtn = document.getElementById("theme-toggle");
const langPtBtn = document.getElementById("lang-pt");
const langEnBtn = document.getElementById("lang-en");

const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlaySubtitle = document.getElementById("overlay-subtitle");
const summaryLevelEl = document.getElementById("summary-level");
const summaryScoreEl = document.getElementById("summary-score");
const summaryDifficultyEl = document.getElementById("summary-difficulty");
const summaryThemeEl = document.getElementById("summary-theme");
const overlayTrainingNote = document.getElementById("overlay-training-note");
const overlaySaveBtn = document.getElementById("overlay-save");
const overlayRestartBtn = document.getElementById("overlay-restart");
const overlayCloseBtn = document.getElementById("overlay-close");

const colors = ["green", "red", "yellow", "blue"];

const audioFiles = {
  green: "audio/green.mp3",
  red: "audio/red.mp3",
  yellow: "audio/yellow.mp3",
  blue: "audio/blue.mp3",
  error: "audio/error.mp3"
};

const difficulties = {
  normal: { padDuration: 350, gap: 500 },
  fast: { padDuration: 260, gap: 380 },
  expert: { padDuration: 220, gap: 320 }
};

const translations = {
  pt: {
    title: "Simon Says · Memory Game",
    subtitle: "Repita a sequência de cores, suba de nível e tente entrar no ranking.",
    labelLevel: "Nível",
    labelBest: "Melhor",
    labelDifficulty: "Dificuldade",
    labelTheme: "Tema",
    diffNormal: "Normal",
    diffFast: "Rápido",
    diffExpert: "Expert",
    themeClassic: "Clássico",
    themePlay: "PlayStation Mode",
    themeEmoji: "Emoji Mode",
    statusReady: "Clique em Start para começar.",
    statusWatch: "Observe a sequência.",
    statusPlay: "Sua vez: repita a sequência.",
    statusError: "Errou! Fim de jogo.",
    statusNext: "Boa! Próximo nível.",
    leaderboardTitle: "🏆 Leaderboard",
    thName: "Nome",
    thScore: "Score",
    thDifficulty: "Dificuldade",
    thDate: "Data",
    overlayTitle: "Fim de jogo",
    overlaySubtitle: "Confira o resumo da partida antes de salvar.",
    summaryLevel: "Nível alcançado",
    summaryScore: "Score",
    summaryDifficulty: "Dificuldade",
    summaryTheme: "Tema",
    overlayNoteTraining: "Modo treino ativo: esta partida não será salva no leaderboard.",
    btnSave: "Salvar no Leaderboard",
    btnRestart: "Jogar novamente",
    btnClose: "Fechar",
    promptName: "Digite seu nome para o ranking:",
    btnSoundOn: "🔊 Som",
    btnSoundOff: "🔈 Mudo",
    btnTrainingOn: "🎓 Treino: ON",
    btnTrainingOff: "🎓 Treino: OFF",
    btnThemeDark: "🌙 Dark",
    btnThemeLight: "☀️ Light"
  },
  en: {
    title: "Simon Says · Memory Game",
    subtitle: "Repeat the sequence of colors, level up and try to reach the leaderboard.",
    labelLevel: "Level",
    labelBest: "Best",
    labelDifficulty: "Difficulty",
    labelTheme: "Theme",
    diffNormal: "Normal",
    diffFast: "Fast",
    diffExpert: "Expert",
    themeClassic: "Classic",
    themePlay: "PlayStation Mode",
    themeEmoji: "Emoji Mode",
    statusReady: "Click Start to begin.",
    statusWatch: "Watch the sequence.",
    statusPlay: "Your turn: repeat the sequence.",
    statusError: "Wrong! Game over.",
    statusNext: "Nice! Next level.",
    leaderboardTitle: "🏆 Leaderboard",
    thName: "Name",
    thScore: "Score",
    thDifficulty: "Difficulty",
    thDate: "Date",
    overlayTitle: "Game Over",
    overlaySubtitle: "Check the game summary before saving.",
    summaryLevel: "Level reached",
    summaryScore: "Score",
    summaryDifficulty: "Difficulty",
    summaryTheme: "Theme",
    overlayNoteTraining: "Training mode: this run will not be saved to the leaderboard.",
    btnSave: "Save to Leaderboard",
    btnRestart: "Play again",
    btnClose: "Close",
    promptName: "Enter your name for the ranking:",
    btnSoundOn: "🔊 Sound",
    btnSoundOff: "🔈 Mute",
    btnTrainingOn: "🎓 Training: ON",
    btnTrainingOff: "🎓 Training: OFF",
    btnThemeDark: "🌙 Dark",
    btnThemeLight: "☀️ Light"
  }
};

const langElements = {
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  labelLevel: document.getElementById("label-level"),
  labelBest: document.getElementById("label-best"),
  labelDifficulty: document.getElementById("label-difficulty"),
  labelTheme: document.getElementById("label-theme"),
  leaderboardTitle: document.getElementById("leaderboard-title"),
  thName: document.getElementById("th-name"),
  thScore: document.getElementById("th-score"),
  thDifficulty: document.getElementById("th-difficulty"),
  thDate: document.getElementById("th-date"),
  overlayTitle,
  overlaySubtitle,
  summaryLabelLevel: document.getElementById("summary-label-level"),
  summaryLabelScore: document.getElementById("summary-label-score"),
  summaryLabelDifficulty: document.getElementById("summary-label-difficulty"),
  summaryLabelTheme: document.getElementById("summary-label-theme")
};

const state = {
  sequence: [],
  playerIndex: 0,
  level: 0,
  score: 0,
  acceptingInput: false,
  soundEnabled: true,
  trainingMode: false,
  theme: "classic",
  language: "pt",
  darkMode: true
};

const audioCache = {};

function loadAudio(key) {
  if (audioCache[key]) {
    return audioCache[key];
  }
  const src = audioFiles[key];
  if (!src) {
    return null;
  }
  const audio = new Audio(src);
  audioCache[key] = audio;
  return audio;
}

function playSound(key) {
  if (!state.soundEnabled) {
    return;
  }
  const audio = loadAudio(key);
  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getDifficultyConfig() {
  const value = difficultySelect.value || "normal";
  return difficulties[value] || difficulties.normal;
}

function setStatus(textKey) {
  const t = translations[state.language];
  statusText.textContent = t[textKey];
}

function activatePad(color, duration) {
  const pad = document.querySelector(`.pad[data-color="${color}"]`);
  if (!pad) {
    return;
  }
  pad.classList.add("active");
  playSound(color);
  setTimeout(() => {
    pad.classList.remove("active");
  }, duration * 0.75);
}

async function playSequence() {
  state.acceptingInput = false;
  setStatus("statusWatch");
  const config = getDifficultyConfig();
  await sleep(600);
  for (const color of state.sequence) {
    activatePad(color, config.padDuration);
    await sleep(config.gap);
  }
  state.playerIndex = 0;
  state.acceptingInput = true;
  setStatus("statusPlay");
}

function updateBestScore() {
  const currentBest = parseInt(localStorage.getItem("simonBestScore") || "0", 10);
  if (state.score > currentBest) {
    localStorage.setItem("simonBestScore", String(state.score));
    bestScoreText.textContent = String(state.score);
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

function translateDifficultyCode(code) {
  const t = translations[state.language];
  if (code === "fast") {
    return t.diffFast;
  }
  if (code === "expert") {
    return t.diffExpert;
  }
  return t.diffNormal;
}

function renderLeaderboard() {
  const list = getLeaderboard();
  leaderboardBody.innerHTML = "";
  list.forEach((entry, index) => {
    const diffLabel = translateDifficultyCode(entry.difficulty || "normal");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${index + 1}</td><td>${entry.name}</td><td>${entry.score}</td><td>${diffLabel}</td><td>${entry.date}</td>`;
    leaderboardBody.appendChild(tr);
  });
}

function addScoreToLeaderboard(finalLevel, finalScore) {
  if (finalLevel <= 0) {
    return;
  }
  const t = translations[state.language];
  const lastName = localStorage.getItem("simonLastName") || "Player";
  const name = window.prompt(t.promptName, lastName);
  if (!name) {
    return;
  }
  localStorage.setItem("simonLastName", name);
  const entry = {
    name,
    score: finalScore,
    difficulty: difficultySelect.value || "normal",
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
  state.sequence = [];
  state.playerIndex = 0;
  state.level = 0;
  state.score = 0;
  levelText.textContent = "0";
}

function shakeBoard() {
  gameBoard.classList.add("shake");
  setTimeout(() => {
    gameBoard.classList.remove("shake");
  }, 260);
}

function levelUpEffect() {
  gameBoard.classList.add("level-up");
  setTimeout(() => {
    gameBoard.classList.remove("level-up");
  }, 350);
}

function startGame() {
  resetState();
  setStatus("statusWatch");
  nextRound();
}

function nextRound() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  state.sequence.push(randomColor);
  state.level = state.sequence.length;
  levelText.textContent = String(state.level);
  levelUpEffect();
  playSequence();
}

function handleError() {
  playSound("error");
  setStatus("statusError");
  state.acceptingInput = false;
  shakeBoard();

  if (state.trainingMode) {
    setTimeout(() => {
      setStatus("statusWatch");
      playSequence();
    }, 700);
    return;
  }

  const t = translations[state.language];

  summaryLevelEl.textContent = String(state.level - 1);
  summaryScoreEl.textContent = String(state.score);

  const diffValue = difficultySelect.value || "normal";
  const diffLabel = translateDifficultyCode(diffValue);
  summaryDifficultyEl.textContent = diffLabel;

  if (state.theme === "classic") {
    summaryThemeEl.textContent = t.themeClassic;
  } else if (state.theme === "playstation") {
    summaryThemeEl.textContent = t.themePlay;
  } else {
    summaryThemeEl.textContent = t.themeEmoji;
  }

  overlayTitle.textContent = t.overlayTitle;
  overlaySubtitle.textContent = t.overlaySubtitle;
  overlayTrainingNote.textContent = t.overlayNoteTraining;

  overlayTrainingNote.classList.add("hidden");
  overlaySaveBtn.style.display = "inline-flex";

  overlay.classList.remove("hidden");
}

function handlePlayerInput(color) {
  if (!state.acceptingInput) {
    return;
  }
  const expected = state.sequence[state.playerIndex];
  activatePad(color, 260);
  if (color !== expected) {
    handleError();
    return;
  }
  state.playerIndex += 1;
  state.score += 1;
  updateBestScore();
  if (state.playerIndex === state.sequence.length) {
    state.acceptingInput = false;
    setStatus("statusNext");
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
  overlay.classList.add("hidden");
  startGame();
});

overlayRestartBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
  startGame();
});

overlayCloseBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

overlaySaveBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
  const finalLevel = state.level - 1;
  const finalScore = state.score;
  addScoreToLeaderboard(finalLevel, finalScore);
});

function setTheme(theme) {
  state.theme = theme;
  gameBoard.classList.remove("theme-classic", "theme-playstation", "theme-emoji");
  if (theme === "classic") {
    gameBoard.classList.add("theme-classic");
  } else if (theme === "playstation") {
    gameBoard.classList.add("theme-playstation");
  } else if (theme === "emoji") {
    gameBoard.classList.add("theme-emoji");
  }
  themeClassicBtn.classList.remove("active");
  themePlayBtn.classList.remove("active");
  themeEmojiBtn.classList.remove("active");
  if (theme === "classic") {
    themeClassicBtn.classList.add("active");
  } else if (theme === "playstation") {
    themePlayBtn.classList.add("active");
  } else if (theme === "emoji") {
    themeEmojiBtn.classList.add("active");
  }
}

themeClassicBtn.addEventListener("click", () => setTheme("classic"));
themePlayBtn.addEventListener("click", () => setTheme("playstation"));
themeEmojiBtn.addEventListener("click", () => setTheme("emoji"));

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  const t = translations[state.language];
  soundToggleBtn.textContent = state.soundEnabled ? t.btnSoundOn : t.btnSoundOff;
}

function toggleTraining() {
  state.trainingMode = !state.trainingMode;
  const t = translations[state.language];
  trainingToggleBtn.textContent = state.trainingMode ? t.btnTrainingOn : t.btnTrainingOff;
}

function toggleThemeMode() {
  state.darkMode = !state.darkMode;
  const t = translations[state.language];
  document.body.setAttribute("data-theme", state.darkMode ? "dark" : "light");
  themeToggleBtn.textContent = state.darkMode ? t.btnThemeDark : t.btnThemeLight;
}

soundToggleBtn.addEventListener("click", toggleSound);
trainingToggleBtn.addEventListener("click", toggleTraining);
themeToggleBtn.addEventListener("click", toggleThemeMode);

function applyLanguageTexts() {
  const t = translations[state.language];
  langElements.title.textContent = t.title;
  langElements.subtitle.textContent = t.subtitle;
  langElements.labelLevel.textContent = t.labelLevel;
  langElements.labelBest.textContent = t.labelBest;
  langElements.labelDifficulty.textContent = t.labelDifficulty;
  langElements.labelTheme.textContent = t.labelTheme;
  langElements.leaderboardTitle.textContent = t.leaderboardTitle;
  langElements.thName.textContent = t.thName;
  langElements.thScore.textContent = t.thScore;
  langElements.thDifficulty.textContent = t.thDifficulty;
  langElements.thDate.textContent = t.thDate;
  langElements.overlayTitle.textContent = t.overlayTitle;
  langElements.overlaySubtitle.textContent = t.overlaySubtitle;
  langElements.summaryLabelLevel.textContent = t.summaryLevel;
  langElements.summaryLabelScore.textContent = t.summaryScore;
  langElements.summaryLabelDifficulty.textContent = t.summaryDifficulty;
  langElements.summaryLabelTheme.textContent = t.summaryTheme;

  difficultySelect.options[0].textContent = t.diffNormal;
  difficultySelect.options[1].textContent = t.diffFast;
  difficultySelect.options[2].textContent = t.diffExpert;

  themeClassicBtn.textContent = t.themeClassic;
  themePlayBtn.textContent = t.themePlay;
  themeEmojiBtn.textContent = t.themeEmoji;

  soundToggleBtn.textContent = state.soundEnabled ? t.btnSoundOn : t.btnSoundOff;
  trainingToggleBtn.textContent = state.trainingMode ? t.btnTrainingOn : t.btnTrainingOff;
  themeToggleBtn.textContent = state.darkMode ? t.btnThemeDark : t.btnThemeLight;

  setStatus("statusReady");
}

function setLanguage(lang) {
  state.language = lang;
  if (lang === "pt") {
    langPtBtn.classList.add("active");
    langEnBtn.classList.remove("active");
  } else {
    langEnBtn.classList.add("active");
    langPtBtn.classList.remove("active");
  }
  applyLanguageTexts();
  renderLeaderboard();
}

langPtBtn.addEventListener("click", () => setLanguage("pt"));
langEnBtn.addEventListener("click", () => setLanguage("en"));

window.addEventListener("load", () => {
  document.body.setAttribute("data-theme", "dark");
  setTheme("classic");
  loadBestScore();
  renderLeaderboard();
  setLanguage("pt");
});