const $ = (id) => document.getElementById(id);

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
const sectionSeeMap = $('see-map')
const map = $('map')


let mokepons = [];
let buttons = [];
let playerAttackSequence = [];
let enemyAttackSequence = [];
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
let interval;
let petPlayerObject;
let playerVictories = 0;
let enemyVictories = 0;
let canvasMap = map.getContext('2d');
let backgroundMap = new Image();
backgroundMap.src = './assets/mokemap.png';





class Mokepon {
  constructor(name, photo, life, attacks, photoMap, x = 10, y = 10) {
    this.name = name;
    this.photo = photo;
    this.life = life;
    this.attacks = attacks;
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.mapPhoto = new Image()
    this.mapPhoto.src = photoMap
    this.velocityX = 0
    this.velocityY = 0
  }

  paintMokepon() {
    canvasMap.drawImage(
      this.mapPhoto,
      this.x,
      this.y,
      this.width,
      this.height
    )
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

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, waterType, './assets/hipodoge.webp')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, earthType, './assets/capipepo.webp')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, fireType,'./assets/ratigueya.webp')
let hipodogeEnemy = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, waterType, './assets/hipodoge.webp', 80, 120)
let capipepoEnemy = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, earthType, './assets/capipepo.webp', 150, 95)
let ratigueyaEnemy = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, fireType,'./assets/ratigueya.webp', 200, 190)
let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, waterType)
let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, fireType)
let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, earthType)

mokepons.push(hipodoge, ratigueya, capipepo, pydos, langostelvis, tucapalma)


function initialPlay()  {
  
  sectionSelectAttack.style.display = 'none';
  sectionSeeMap.style.display = 'none';
  
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

  // buttonReset.style.display = 'none';
  buttonSelectPet.addEventListener('click', selectPetPlayer);
  
  buttonReset.addEventListener('click', restartGame)
}

function random (min, max){
  return Math.floor(Math.random()* (max - min + 1) + min);
}

function displayStyles ()  {
  // sectionSelectAttack.style.display = 'flex';
}

function selectPetPlayer()  {
  
  selectPet.style.display = 'none';
  
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
  sectionSeeMap.style.display = 'flex';
  initialMap();
  selectPetEnemy()
  
}

function extractAttacks(petPlayer) {
  let attacks;

  for (let i = 0; i < mokepons.length; i++) {
    if(petPlayer === mokepons[i].name){
      attacks = mokepons[i].attacks
    }
  }
  showAttacks(attacks)  
}

function showAttacks  (attacks) {
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

function attackSequence () {
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

function selectPetEnemy()  {
  const randomPet = random(0, mokepons.length - 1);  
  spanEnemyPet.innerHTML = mokepons[randomPet].name
  selectPetEnemyRandom = mokepons[randomPet].attacks
  attackSequence();
}

function randomAttackEnemy ()  {
  selectPetEnemyRandom.forEach((attack) => enemyAttackSequence.push(attack.name))
  enemyAttackSequence.sort(() => Math.random()-0.5)
  startCombat();
} 

function startCombat ()  {
  if (playerAttackSequence.length === 5) {
    result();
  }
}

function indexBoth (player, enemy) {
  indexPlayerAttack = playerAttackSequence[player];
  indexEnemyAttack = enemyAttackSequence[enemy];
}

function result  ()  {
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

function checkLives ()  {
  if (playerVictories === enemyVictories) {
    createMessageFinal('This is a TIE')
  } else if(playerVictories > enemyVictories){
    createMessageFinal('Congratulations: YOU WON')
  } else {
    createMessageFinal('I am sorry, you lost')
  }
}

function createMessage  (resultGameFinal)  {

  let playerAttackNew = document.createElement('p');
  let enemyAttackNew = document.createElement('p');

  messages.innerHTML = resultGameFinal;
  playerAttackNew.innerHTML = indexPlayerAttack;
  enemyAttackNew.innerHTML = indexEnemyAttack;
  playerAttack.appendChild(playerAttackNew)
  enemyAttack.appendChild(enemyAttackNew)
}

function createMessageFinal (resultFinal)  {
  messages.innerText = resultFinal
  buttonReset.style.display = 'flex';
}

function restartGame()  {
  location.reload();
}

function paintCanvas() {
  
  petPlayerObject.x += petPlayerObject.velocityX
  petPlayerObject.y += petPlayerObject.velocityY
  canvasMap.clearRect(0, 0, map.width, map.height);
  canvasMap.drawImage(
    backgroundMap,
    0,
    0,
    map.width,
    map.height
  )
  petPlayerObject.paintMokepon();
  hipodogeEnemy.paintMokepon();
  capipepoEnemy.paintMokepon();
  ratigueyaEnemy.paintMokepon();
}

function moveRight  ()  {
  petPlayerObject.velocityX = 5;
}

function moveLeft  ()  {
  petPlayerObject.velocityX = -5
}

function moveUp  ()  {
  petPlayerObject.velocityY = -5
}

function moveDown  ()  {
  petPlayerObject.velocityY = 5
}

function stopMovement  ()  {
  
  petPlayerObject.velocityX = 0
  petPlayerObject.velocityY = 0
}

function keyWasPressed (e)  {

  
  switch (e.key) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
  
    default:
      break;
  }
}

function initialMap () {
  map.width = 400
  map.height = 300
  petPlayerObject = getObjectPet(petPlayer)
  interval = setInterval(paintCanvas, 50)
  window.addEventListener('keydown', keyWasPressed )
  window.addEventListener('keyup', stopMovement)
}


function getObjectPet() {
  for (let i = 0; i < mokepons.length; i++) {
    if (petPlayer === mokepons[i].name) {
      return mokepons[i]
    }
    
  }
}

window.addEventListener('load', initialPlay);