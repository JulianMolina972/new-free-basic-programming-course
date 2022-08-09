const $ = (id) => document.getElementById(id);

const header = $('header');
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

let playerId = null
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
let optimumHeight;
let playerVictories = 0;
let enemyVictories = 0;
let canvasMap = map.getContext('2d');
let backgroundMap = new Image();
backgroundMap.src = './assets/mokemap.png';
let mapWidth = map.getBoundingClientRect().width - 20
const maxWidthMap = 600;

optimumHeight = mapWidth * 3 / 4 

map.width = mapWidth;
map.height = optimumHeight;

if(mapWidth > maxWidthMap) {
  mapWidth = maxWidthMap - 20
}

class Mokepon {
  constructor(name, photo, life, attacks, id = null) {
    this.id = id
    this.name = name;
    this.photo = photo;
    this.life = life;
    this.attacks = attacks;
    this.width = 60;
    this.height = 60;
    this.x = random(0, map.width - this.width);
    this.y = random(0, map.height - this.height);
    this.mapPhoto = new Image()
    this.mapPhoto.src = photo
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

const hipodogeImage = './assets/mokepons_mokepon_hipodoge_attack.png'
const capipepoImage = './assets/mokepons_mokepon_capipepo_attack.png'
const ratigueyaImage = './assets/mokepons_mokepon_ratigueya_attack.png'
const pydosImage = './assets/mokepons_mokepon_pydos_attack.png'
const langostelvisImage = './assets/mokepons_mokepon_langostelvis_attack.png'
const tucapalmaImage = './assets/mokepons_mokepon_tucapalma_attack.png'

let pydos = new Mokepon('Pydos',pydosImage , 5, waterType)
let capipepo = new Mokepon('Capipepo',capipepoImage, 5, earthType)
let hipodoge = new Mokepon('Hipodoge',hipodogeImage , 5, waterType)
let ratigueya = new Mokepon('Ratigueya', ratigueyaImage, 5, fireType)
let tucapalma = new Mokepon('Tucapalma', tucapalmaImage, 5, earthType)
let langostelvis = new Mokepon('Langostelvis',langostelvisImage , 5, fireType)

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

  joinTheGame();
}

function joinTheGame() {
  fetch('http://localhost:8080/join')
    .then((res) =>  {
      if (res.ok) {
        res.text()
          .then((response) => {
            console.log(response)
            playerId = response
          })
      }
    })
    
}

function random (min, max){
  return Math.floor(Math.random()* (max - min + 1) + min);
}

function showMap ()  {
  
  extractAttacks(petPlayer)
  sectionSeeMap.style.display = 'flex';
  header.style.display = 'none';
  initialMap();
}

function selectPetPlayer()  {
  
  if(selectHipodoge.checked == true) {
    selectPet.style.display = 'none';
    spanPlayerPet.innerHTML = selectHipodoge.id
    petPlayer = selectHipodoge.id
    showMap();
  } else if(selectCapipepo.checked == true) {
    selectPet.style.display = 'none';
    spanPlayerPet.innerHTML = selectCapipepo.id
    petPlayer = selectCapipepo.id
    showMap();
  } else if(selectRatigueya.checked == true) {
    selectPet.style.display = 'none';
    spanPlayerPet.innerHTML = selectRatigueya.id
    petPlayer = selectRatigueya.id
    showMap();
  } else if(selectPydos.checked == true) {
    selectPet.style.display = 'none';
    spanPlayerPet.innerHTML = selectPydos.id
    petPlayer = selectPydos.id
    showMap();
  } else if(selectLangostelvis.checked == true) {
    selectPet.style.display = 'none';
    spanPlayerPet.innerHTML = selectLangostelvis.id
    petPlayer = selectLangostelvis.id
    showMap();
  } else if(selectTucapalma.checked == true) {
    selectPet.style.display = 'none';
    spanPlayerPet.innerHTML = selectTucapalma.id
    petPlayer = selectTucapalma.id
    showMap();
  } else {
    alert('please select an option')
    // selectPet.style.display = 'none';
  }
  
  selectMokepon(petPlayer);
  
  
}

function selectMokepon(petPlayer) {
  // console.log(petPlayer)
  fetch(`http://localhost:8080/mokepon/${playerId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mokepon: petPlayer
    })
  })

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

function selectPetEnemy(enemy)  {
  spanEnemyPet.innerHTML = enemy.name
  selectPetEnemyRandom = enemy.attacks
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

  sendPosition(petPlayerObject.x, petPlayerObject.y);

  hipodogeEnemy.paintMokepon();
  capipepoEnemy.paintMokepon();
  ratigueyaEnemy.paintMokepon();
  pydosEnemy.paintMokepon();
  langostelvisEnemy.paintMokepon();
  tucapalmaEnemy.paintMokepon();

  if (petPlayerObject.velocityX !== 0 || petPlayerObject.velocityY !== 0) {
    checkCollision(hipodogeEnemy)
    checkCollision(capipepoEnemy)
    checkCollision(ratigueyaEnemy)
    checkCollision(pydosEnemy)
    checkCollision(langostelvisEnemy)
    checkCollision(tucapalmaEnemy)
  }
}

function  sendPosition(x, y) {
  fetch(`http://localhost:8080/mokepon/${playerId}/position`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x,
      y,
    })
  })

    .then(function (res) {
      if(res.ok) {
        res.json()
          .then (function ({ enemies }) {
            console.log(enemies)
            enemies.forEach(enemy => {
              let enemyMokepon = null;
              const nameMokepon = enemy.mokepon.name || ""
              if (nameMokepon === 'Hipodoge') {
                enemyMokepon = new Mokepon('Hipodoge', hipodogeImage, 5, waterType)
              } else if (nameMokepon === 'Capipepo') {
                enemyMokepon = new Mokepon('Capipepo', capipepoImage, 5, earthType)
              } else if (nameMokepon === 'Ratigueya') {
                enemyMokepon = new Mokepon('Ratigueya', ratigueyaImage, 5, fireType)
              } else if (nameMokepon === 'Pydos') {
                enemyMokepon = new Mokepon('Pydos', pydosImage, 5, waterType)
              } else if (nameMokepon === 'Tucapalma') {
                enemyMokepon = new Mokepon('Tucapalma', tucapalmaImage, 5, earthType)
              } else if (nameMokepon === 'Langostelvis') {
                enemyMokepon = new Mokepon('Langostelvis', langostelvisImage, 5, fireType)
              }
              enemyMokepon.x = enemy.x
              enemyMokepon.y = enemy.y
              
              enemyMokepon.paintMokepon()



            })
          })
      }
    })
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

function checkCollision (enemy) {
  const enemyUp = enemy.y
  const enemyDown = enemy.y + enemy.height
  const enemyRight = enemy.x + enemy.width
  const enemyLeft = enemy.x 

  const petUp = petPlayerObject.y
  const petDown = petPlayerObject.y + petPlayerObject.height
  const petRight = petPlayerObject.x + petPlayerObject.width
  const petLeft = petPlayerObject.x 

  if (petDown < enemyUp || 
    petUp > enemyDown || 
    petRight < enemyLeft || 
    petLeft > enemyRight) {
    return
  }

  stopMovement();
  clearInterval(interval)
  sectionSelectAttack.style.display = 'flex';
  header.style.display = 'flex';
  sectionSeeMap.style.display = 'none';
  selectPetEnemy(enemy);

}

window.addEventListener('load', initialPlay);