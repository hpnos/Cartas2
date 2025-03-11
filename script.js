// Sons para cada raridade
const sounds = {
  "images/reward1.png": new Audio("sounds/Targaryen.mp3"),  
  "images/reward2.png": new Audio("sounds/Cluber.mp3"),
  "images/reward3.png": new Audio("sounds/Drestranho.mp3"),
  "images/reward4.png": new Audio("sounds/Rolf.mp3"), 
  "images/reward5.png": new Audio("sounds/Maribella.mp3"),     
  "images/reward6.png": new Audio("sounds/Cassiel.mp3"),
  "images/reward7.png": new Audio("sounds/ironmanecap.mp3"),
  "images/reward8.png": new Audio("sounds/Mistico.mp3"),
  "images/reward9.png": new Audio("sounds/RakaneXayah.mp3"),
  "images/reward10.png": new Audio("sounds/PorinhodoMar.mp3"),
  "images/reward11.png": new Audio("sounds/Kairos.mp3"),
  "images/reward12.png": new Audio("sounds/Nicky.mp3"),
  "images/reward13.png": new Audio("sounds/Felicarujo.mp3"),
  "images/reward14.png": new Audio("sounds/MaribellaOrixa.mp3"),
  "images/reward15.png": new Audio("sounds/Dollynho.mp3"),
  "images/reward16.png": new Audio("sounds/Sylveon.mp3"),
  "images/reward17.png": new Audio("sounds/Moira.mp3"),
  "images/reward18.png": new Audio("sounds/Feraligatr.mp3"),
  "images/reward19.png": new Audio("sounds/sound_legendary.mp3"),
  "images/reward20.png": new Audio("sounds/sound_legendary.mp3"),
};

// Função para tocar o som da raridade correspondente
function playSound(image) {
  if (sounds[image]) {
    sounds[image].play();
  }
}

// Lista das recompensas com as novas chances
const rewardPool = [
  // Comuns (56% no total → 8 recompensas, cada uma com 7%)
  { image: "images/reward1.png", chance: 7 },// TARGARYEN
  { image: "images/reward6.png", chance: 7 }, // CASSIEL
  { image: "images/reward7.png", chance: 7 }, // GUERRA CIVIL
  { image: "images/reward9.png", chance: 7 }, // XAHAY E RAKAN
  { image: "images/reward10.png", chance: 7 }, // PORINHO
  { image: "images/reward12.png", chance: 7 }, // NICKY
  { image: "images/reward14.png", chance: 7 },// ORIXA
  { image: "images/reward17.png", chance: 7 }, // MOIRA

  // Incomuns (26% no total → 6 recompensas, cada uma com 4.33%)
  { image: "images/reward2.png", chance: 4.33 }, //CLUBER
  { image: "images/reward4.png", chance: 4.33 }, //ROLF
  { image: "images/reward8.png", chance: 4.33 }, // MISTICO
  { image: "images/reward15.png", chance: 4.33 }, // DOLY
  { image: "images/reward20.png", chance: 4.33 }, // OTAKINHO
  { image: "images/reward5.png", chance: 4.33 }, // MARIBELA

  // Raras (15% no total → 4 recompensas, cada uma com 3.75%)
  { image: "images/reward3.png", chance: 3.75 }, // DR ESTRANHO
  { image: "images/reward11.png", chance: 3.75 }, // KAIROS
  { image: "images/reward16.png", chance: 3.75 }, // SYLVIAD
  { image: "images/reward19.png", chance: 3.75 }, // FERA

  // Lendárias (3% no total → 2 recompensas, cada uma com 1.5%)
  { image: "images/reward13.png", chance: 2 }, // DR
  { image: "images/reward20.png", chance: 0 },
];

// Função para escolher uma recompensa com base na probabilidade
function getRandomReward() {
  const totalChance = rewardPool.reduce((sum, reward) => sum + reward.chance, 0);
  let random = Math.random() * totalChance;

  for (const reward of rewardPool) {
    if (random < reward.chance) {
      return reward;
    }
    random -= reward.chance;
  }
}

// Criando o tabuleiro do jogo
const gameBoard = document.getElementById("game-board");

for (let i = 0; i < 20; i++) {
  const card = document.createElement("div");
  card.classList.add("card");
  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-face", "back");
  cardBack.textContent = "Escolha uma carta";
  cardInner.appendChild(cardBack);
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-face", "front");
  cardInner.appendChild(cardFront);
  card.appendChild(cardInner);

  card.addEventListener("click", function handleClick() {
    if (cardInner.classList.contains("disabled")) return;
    cardInner.classList.add("disabled");
    cardInner.classList.add("flipped");

    setTimeout(() => {
      const reward = getRandomReward();
      gameBoard.style.display = "none";
      document.getElementById("reward-image").innerHTML = `<img src="${reward.image}" alt="Recompensa">`;
      document.getElementById("reward-modal").style.display = "flex";
      playSound(reward.image); // Toca o som correspondente
    }, 400);
  });

  gameBoard.appendChild(card);
}

// Fechar o modal e reiniciar o jogo
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("reward-modal").style.display = "none";
  gameBoard.style.display = "grid";
});
