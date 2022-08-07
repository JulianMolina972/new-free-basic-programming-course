const $ = (id) => document.getElementById(id);

let resultGame;
let optionMokepons;
let selectHipodoge;
let selectCapipepo; 
let selectRatigueya;
let selectPydos;
let selectLangostelvis; 
let selectTucapalma;
let petPlayer;
let buttonFirePet;
let buttonWaterPet;
let buttonEarthPet;
let mokeponAttacks;
let selectPetEnemyRandom;
let indexPlayerAttack;
let indexEnemyAttack;
let mokepons = [];
let buttons = [];
let playerAttackSequence = [];
let enemyAttackSequence = [];
let playerVictories = 0;
let enemyVictories = 0;

const buttonSelectPet = $('button-select-pet')
const spanPlayerPet = $('player-pet')
const spanEnemyPet = $('enemy-pet')
const messages = $('result')
const playerAttack = $('player-attack')
const enemyAttack = $('enemy-attack')
const spanPlayerLives = $('player-lives')
const spanEnemyLives = $('enemy-lives')
const buttonReset = $('button-reset')
const sectionSelectAttack = $('select-attack')
const selectPet = $('select-pet')
const cardsContainer = $('cards-container')
const petAttacks = $('pet-attacks')

class Mokepon {
  constructor(name, photo, life, attacks) {
    this.name = name;
    this.photo = photo;
    this.life = life;
    this.attacks = attacks;
  }
}

const fireType = [
  { name: 'Fire 🔥', id: 'button-fire-pet'},
  { name: 'Fire 🔥', id: 'button-fire-pet'},
  { name: 'Fire 🔥', id: 'button-fire-pet'},
  { name: 'Water 💧', id: 'button-water-pet'},
  { name: 'Earth 🌱', id: 'button-earth-pet'},
]

const waterType = [
  { name: 'Water 💧', id: 'button-water-pet'},
  { name: 'Water 💧', id: 'button-water-pet'},
  { name: 'Water 💧', id: 'button-water-pet'},
  { name: 'Fire 🔥', id: 'button-fire-pet'},
  { name: 'Earth 🌱', id: 'button-earth-pet'},
]

const earthType = [
  { name: 'Earth 🌱', id: 'button-earth-pet'},
  { name: 'Earth 🌱', id: 'button-earth-pet'},
  { name: 'Earth 🌱', id: 'button-earth-pet'},
  { name: 'Fire 🔥', id: 'button-fire-pet'},
  { name: 'Water 💧', id: 'button-water-pet'},
]

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, waterType)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, earthType)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, fireType)
let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, waterType)
let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, fireType)
let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, earthType)

mokepons.push(hipodoge, ratigueya, capipepo, pydos, langostelvis, tucapalma)


const initialPlay = () => {
  
  sectionSelectAttack.style.display = 'none';
  
  mokepons.forEach(mokepon => { 
    optionMokepons = `
    <div class=${mokepon.name} >
      <input  class="input-radio"  type="radio" name="pet" id=${mokepon.name} />
      <label class="select-label" for="${mokepon.name}">
        <p>${mokepon.name}</p> 
        <img src=${mokepon.photo} alt="${mokepon.name} image">
      </label>
    </div>
    `
    cardsContainer.innerHTML += optionMokepons
  });
  
  selectPydos = $('Pydos')
  selectHipodoge = $('Hipodoge')
  selectCapipepo = $('Capipepo')
  selectRatigueya = $('Ratigueya')
  selectTucapalma = $('Tucapalma')
  selectLangostelvis = $('Langostelvis')

  buttonReset.style.display = 'none';
  buttonSelectPet.addEventListener('click', selectPetPlayer);
  buttonSelectPet.addEventListener('click', selectPetEnemy);
  buttonReset.addEventListener('click', restartGame)
}

const random = (min, max) => {
  return Math.floor(Math.random()* (max - min + 1) + min);
}

const displayStyles = () => {
  sectionSelectAttack.style.display = 'flex';
  selectPet.style.display = 'none';
}

const selectPetPlayer = () => {
  if(selectHipodoge.checked == true) {
    spanPlayerPet.innerHTML = selectHipodoge.id
    petPlayer = selectHipodoge.id
    displayStyles();
  } else if(selectCapipepo.checked == true) {
    spanPlayerPet.innerHTML = selectCapipepo.id
    petPlayer = selectCapipepo.id
    displayStyles();
  } else if(selectRatigueya.checked == true) {
    spanPlayerPet.innerHTML = selectRatigueya.id
    petPlayer = selectRatigueya.id
    displayStyles();
  } else if(selectPydos.checked == true) {
    spanPlayerPet.innerHTML = selectPydos.id
    petPlayer = selectPydos.id
    displayStyles();
  } else if(selectLangostelvis.checked == true) {
    spanPlayerPet.innerHTML = selectLangostelvis.id
    petPlayer = selectLangostelvis.id
    displayStyles(); 
  } else if(selectTucapalma.checked == true) {
    spanPlayerPet.innerHTML = selectTucapalma.id
    petPlayer = selectTucapalma.id
    displayStyles(); 
  } else {
    alert('please select an option')
  }
  extractAttacks(petPlayer)
}

const extractAttacks = (petPlayer) => {
  let attacks;

  for (let i = 0; i < mokepons.length; i++) {
    if(petPlayer === mokepons[i].name){
      attacks = mokepons[i].attacks
    }
  }
  showAttacks(attacks)  
}

const showAttacks = (attacks) => {
  attacks.forEach(attack => { 
    mokeponAttacks = `
    <button class="button-attack bAttacks"  id=${attack.id}>${attack.name}</button>
    `
    petAttacks.innerHTML += mokeponAttacks
  });
  buttonFirePet = $('button-fire-pet')
  buttonWaterPet = $('button-water-pet')
  buttonEarthPet = $('button-earth-pet')
  buttons = document.querySelectorAll('.bAttacks')
}

const attackSequence = () => {
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (e.target.textContent === 'Fire 🔥') {
        playerAttackSequence.push('Fire 🔥')
        button.style.background = '#112f58';
        button.disabled = true;
      } else if (e.target.textContent === 'Water 💧'){
        playerAttackSequence.push('Water 💧')
        button.style.background = '#112f58';
        button.disabled = true;
      } else {
        playerAttackSequence.push('Earth 🌱')
        button.style.background = '#112f58';
        button.disabled = true;
      }
      randomAttackEnemy();
    })
  })
}

const selectPetEnemy = () => {
  const randomPet = random(0, mokepons.length - 1);  
  spanEnemyPet.innerHTML = mokepons[randomPet].name
  selectPetEnemyRandom = mokepons[randomPet].attacks
  attackSequence();
}

const randomAttackEnemy = () => {
  selectPetEnemyRandom.forEach((attack) => enemyAttackSequence.push(attack.name))
  enemyAttackSequence.sort(() => Math.random()-0.5)
  startCombat();
} 

const startCombat = () => {
  if (playerAttackSequence.length === 5) {
    result();
  }
}

const indexBoth = (player, enemy) => {
  indexPlayerAttack = playerAttackSequence[player];
  indexEnemyAttack = enemyAttackSequence[enemy];
}

const result = () => {
  for (let i = 0; i < playerAttackSequence.length; i++) {
    if(playerAttackSequence[i] === enemyAttackSequence[i]) {
      indexBoth(i, i)
      resultGame = 'TIE';
    } else if (playerAttackSequence[i] === 'Fire 🔥' && enemyAttackSequence[i] === 'Water 💧' || 
              playerAttackSequence[i] === 'Earth 🌱' && enemyAttackSequence[i] === 'Fire 🔥'||
              playerAttackSequence[i] === 'Water 💧' && enemyAttackSequence[i] === 'Earth 🌱'){
        indexBoth(i, i)
        resultGame = 'LOST';
        enemyVictories++
        spanEnemyLives.innerText = enemyVictories;

    } else {
        indexBoth(i, i)
        resultGame = 'YOU WON!';
        playerVictories++
        spanPlayerLives.innerText = playerVictories;
    }
    createMessage(resultGame);
  }
  checkLives();


  
  // return resultGame;
}

const checkLives = () => {
  if (playerVictories === enemyVictories) {
    createMessageFinal('This is a TIE')
  } else if(playerVictories > enemyVictories){
    createMessageFinal('Congratulations: YOU WON')
  } else {
    createMessageFinal('I am sorry, you lost')
  }
}

const createMessage = (resultGameFinal) => {

  let playerAttackNew = document.createElement('p');
  let enemyAttackNew = document.createElement('p');

  messages.innerHTML = resultGameFinal;
  playerAttackNew.innerHTML = indexPlayerAttack;
  enemyAttackNew.innerHTML = indexEnemyAttack;
  playerAttack.appendChild(playerAttackNew)
  enemyAttack.appendChild(enemyAttackNew)
}

const createMessageFinal = (resultFinal) => {
  messages.innerText = resultFinal
  buttonReset.style.display = 'flex';
}

const restartGame = () => {
  location.reload();
}

window.addEventListener('load', initialPlay);