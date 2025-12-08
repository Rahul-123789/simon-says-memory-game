# 🎮 Simon Says · Memory Game

<!-- Ícones do projeto (opcional, se quiser adicionar depois) -->
<!-- <p align="center">
  <img src="assets/icon-simon.png" alt="Simon Says Icon" width="120">
</p> -->

---

![STATUS](https://img.shields.io/badge/STATUS-ACTIVE-22c55e?style=for-the-badge)
![PROJECT TYPE](https://img.shields.io/badge/PROJECT%20TYPE-GAME-6366f1?style=for-the-badge)
![TECH STACK](https://img.shields.io/badge/TECH%20STACK-HTML%20%7C%20CSS%20%7C%20JAVASCRIPT-0ea5e9?style=for-the-badge)
![DEPENDENCIES](https://img.shields.io/badge/DEPENDENCIES-NONE-6b7280?style=for-the-badge)
![FEATURES](https://img.shields.io/badge/FEATURES-LEADERBOARD%20%7C%20THEMES%20%7C%20AUDIO-14b8a6?style=for-the-badge)
![LICENSE](https://img.shields.io/badge/LICENSE-MIT-facc15?style=for-the-badge)
![VERSION](https://img.shields.io/badge/VERSION-1.0.0-f97316?style=for-the-badge)
[![AUTHOR](https://img.shields.io/badge/AUTHOR-JO%C3%83O%20ALBERO-111827?style=for-the-badge)](https://github.com/Joaolbero)
![LAST COMMIT](https://img.shields.io/github/last-commit/Joaolbero/simon-says-memory-game?style=for-the-badge)

---

## 📌 Visão Geral · Overview

| 🇧🇷 PT-BR | 🇺🇸 EN |
| --- | --- |
| **Simon Says · Memory Game** é uma recriação moderna do clássico jogo de sequência de cores (tipo Genius). O objetivo é repetir corretamente a sequência apresentada, subir de nível, testar a memória e tentar entrar no leaderboard local. | **Simon Says · Memory Game** is a modern take on the classic color sequence game (similar to Simon). Your goal is to correctly repeat the sequence, level up, test your memory and try to reach the local leaderboard. |

---

## 🧠 Principais Funcionalidades · Main Features

| 🇧🇷 PT-BR | 🇺🇸 EN |
| --- | --- |
| ✅ Sequência de cores estilo Simon (Genius). | ✅ Simon-style color sequence logic. |
| 🎚️ **Três dificuldades:** Normal, Rápido e Expert (muda tempo de destaque e intervalo entre cores). | 🎚️ **Three difficulty modes:** Normal, Fast and Expert (changes highlight time and sequence pace). |
| 🎨 **Temas visuais:** Clássico, PlayStation Mode (símbolos do controle) e Emoji Mode (emojis nos pads). | 🎨 **Visual themes:** Classic, PlayStation Mode (controller symbols) and Emoji Mode (emojis on the pads). |
| 🔊 **Áudio por pad + som de erro**, com botão de ligar/desligar som. | 🔊 **Per-pad audio + error sound**, with sound on/off toggle. |
| 🌓 **Dark / Light mode** por botão. | 🌓 **Dark / Light mode** toggle button. |
| 🧪 **Modo Treino:** em vez de game over, a sequência é repetida após o erro. | 🧪 **Training Mode:** instead of game over, the sequence is replayed after a mistake. |
| 📊 **Leaderboard local** com nome, score, dificuldade e data (armazenado em `localStorage`). | 📊 **Local leaderboard** with name, score, difficulty and date (stored in `localStorage`). |
| 🪪 **Resumo da partida em overlay** antes de salvar no ranking. | 🪪 **Game summary overlay** before saving to the ranking. |
| ✨ Feedback visual avançado: shake no tabuleiro ao errar e efeito de “level up” quando passa de fase. | ✨ Advanced visual feedback: board shaking on error and “level up” glow when advancing. |

---

## 🕹️ Como Jogar · How to Play

| 🇧🇷 PT-BR | 🇺🇸 EN |
| --- | --- |
| 1. Escolha a **dificuldade** no seletor (Normal / Rápido / Expert).<br>2. Opcional: escolha um **tema visual** (Clássico, PlayStation ou Emoji).<br>3. Defina se quer usar **Modo Treino** e se o **som** estará ligado ou não.<br>4. Clique em **Start** para começar.<br>5. Observe a sequência de cores/ícones piscando e, em seguida, repita clicando nos pads na mesma ordem.<br>6. A cada nível, uma nova cor é adicionada à sequência.<br>7. Se errar:<br>&nbsp;&nbsp;• Modo normal → aparece tela de “Game Over” com resumo da partida.<br>&nbsp;&nbsp;• Modo treino → o tabuleiro treme, toca o som de erro e a sequência é repetida para você tentar de novo. | 1. Choose a **difficulty** from the selector (Normal / Fast / Expert).<br>2. Optionally choose a **visual theme** (Classic, PlayStation or Emoji).<br>3. Decide if you want **Training Mode** enabled and whether **sound** is on or off.<br>4. Click **Start** to begin.<br>5. Watch the sequence of colors/icons blinking and then repeat it by clicking the pads in the same order.<br>6. Each new level adds one more color to the sequence.<br>7. If you make a mistake:<br>&nbsp;&nbsp;• Normal mode → a “Game Over” screen appears with a summary of the run.<br>&nbsp;&nbsp;• Training mode → the board shakes, the error sound is played and the sequence is replayed so you can try again. |

---

## 💾 Leaderboard & Persistência · Persistence

| 🇧🇷 PT-BR | 🇺🇸 EN |
| --- | --- |
| O leaderboard é salvo usando **`localStorage`** do navegador.<br><br>Chaves utilizadas:<br>• `simonLeaderboard` → lista de `{ name, score, difficulty, date }`<br>• `simonBestScore` → melhor score atingido<br>• `simonLastName` → último nome digitado para o ranking<br><br>Mesmo recarregando a página, os dados permanecem até você limpar o `localStorage`. Para resetar manualmente tudo pelo console do navegador:<br><br>```js<br>localStorage.removeItem("simonLeaderboard");<br>localStorage.removeItem("simonBestScore");<br>localStorage.removeItem("simonLastName");<br>``` | The leaderboard is persisted using the browser’s **`localStorage`**.<br><br>Used keys:<br>• `simonLeaderboard` → list of `{ name, score, difficulty, date }`<br>• `simonBestScore` → best score reached<br>• `simonLastName` → last name typed for the ranking<br><br>Even after reloading the page, data is kept until you clear `localStorage`. To reset everything via browser console:<br><br>```js<br>localStorage.removeItem("simonLeaderboard");<br>localStorage.removeItem("simonBestScore");<br>localStorage.removeItem("simonLastName");<br>``` |

---

## 🛠️ Tecnologias · Tech Stack

| 🇧🇷 PT-BR | 🇺🇸 EN |
| --- | --- |
| - **HTML5** para estrutura da página.<br>- **CSS3** com layout responsivo, dark/light mode e temas visuais.<br>- **JavaScript (vanilla)** para lógica do jogo, controle de estado, animações simples, áudio e integração com `localStorage`.<br>- Nenhuma biblioteca ou framework externo: projeto 100% **vanilla JS**. | - **HTML5** for page structure.<br>- **CSS3** with responsive layout, dark/light mode and visual themes.<br>- **Vanilla JavaScript** for game logic, state management, simple animations, audio and `localStorage` integration.<br>- No external libraries or frameworks: 100% **vanilla JS** project. |

---

## 📂 Estrutura de Pastas · Folder Structure

| 🇧🇷 PT-BR                                                                                                                                                                                                                                                                                                                                                                                                                               | 🇺🇸 EN                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Clone o repositório:<br>`bash<br>git clone https://github.com/Joaolbero/simon-says-memory-game.git<br>`<br><br>2. Entre na pasta do projeto:<br>`bash<br>cd simon-says-memory-game/src/simon-says-memory-game<br>`<br><br>3. Abra o arquivo `index.html` diretamente no navegador **ou** utilize a extensão **Live Server** no VS Code.<br><br>4. Verifique se as pastas `assets/` e `audio/` possuem os arquivos PNG e MP3 corretos. | 1. Clone the repository:<br>`bash<br>git clone https://github.com/Joaolbero/simon-says-memory-game.git<br>`<br><br>2. Enter the project folder:<br>`bash<br>cd simon-says-memory-game/src/simon-says-memory-game<br>`<br><br>3. Open the `index.html` file directly in your browser **or** use the **Live Server** extension in VS Code.<br><br>4. Ensure the `assets/` and `audio/` folders contain the correct PNG and MP3 files. |
