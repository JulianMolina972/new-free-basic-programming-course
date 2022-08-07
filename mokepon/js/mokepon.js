
const $ = (id) => document.getElementById(id);

let mokepons = [];
let playerPetAttack;
let randomPetAttack;
let playerLives = 3;
let enemyLives = 3;
let resultGame;
let optionMokepons;
let selectHipodoge;
let selectCapipepo; 
let selectRatigueya;
let petPlayer;
let buttonFirePet;
let buttonWaterPet;
let buttonEarthPet;
let mokeponAttacks;


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
  constructor(name, photo, life) {
    this.name = name;
    this.photo = photo;
    this.life = life;
    this.attacks = []
  }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

// mokepons.push(hipodoge, capipepo, ratigueya)

hipodoge.attacks.push(
  { name: 'Water 💧', id: 'button-water-pet'},
  { name: 'Water 💧', id: 'button-water-pet'},
  { name: 'Water 💧', id: 'button-water-pet'},
  { name: 'Fire 🔥', id: 'button-fire-pet'},
  { name: 'Earth 🌱', id: 'button-earth-pet'},
)
capipepo.attacks.push(
  { name: 'Earth 🌱', id: 'button-earth-pet'},
  { name: 'Earth 🌱', id: 'button-earth-pet'},
  { name: 'Earth 🌱', id: 'button-earth-pet'},
  { name: 'Fire 🔥', id: 'button-fire-pet'},
  { name: 'Water 💧', id: 'button-water-pet'},
)
ratigueya.attacks.push(
  { name: 'Fire 🔥', id: 'button-fire-pet'},
  { name: 'Fire 🔥', id: 'button-fire-pet'},
  { name: 'Fire 🔥', id: 'button-fire-pet'},
  { name: 'Water 💧', id: 'button-water-pet'},
  { name: 'Earth 🌱', id: 'button-earth-pet'},
)
mokepons.push(hipodoge, capipepo, ratigueya)




// console.log(mokepons)


const initialPlay = () => {
  
  sectionSelectAttack.style.display = 'none';
  
  mokepons.forEach(mokepon => { 
    optionMokepons = `
    <div>
      <input  class="input-radio"  type="radio" name="pet" id=${mokepon.name} />
      <label class="select-label" for="${mokepon.name}">
        <p>${mokepon.name}</p> 
        <img src=${mokepon.photo} alt="${mokepon.name} image">
      </label>
    </div>
    `

    cardsContainer.innerHTML += optionMokepons
    
  });
  
  
  selectHipodoge = $('Hipodoge')
  selectCapipepo = $('Capipepo')
  selectRatigueya = $('Ratigueya')

  
  
  buttonReset.style.display = 'none';

  buttonSelectPet.addEventListener('click', selectPetPlayer);
  buttonSelectPet.addEventListener('click', selectPetEnemy);
  buttonReset.addEventListener('click', restartGame)
}

const random = (min, max) => {
  return Math.floor(Math.random()* (max - min + 1) + min);
}

const selectPetPlayer = () => {
  if(selectHipodoge.checked == true) {
    spanPlayerPet.innerHTML = selectHipodoge.id
    petPlayer = selectHipodoge.id
    sectionSelectAttack.style.display = 'flex';
    selectPet.style.display = 'none';
  } else if(selectCapipepo.checked == true) {
    spanPlayerPet.innerHTML = selectCapipepo.id
    petPlayer = selectCapipepo.id
    sectionSelectAttack.style.display = 'flex';
    selectPet.style.display = 'none';
  } else if(selectRatigueya.checked == true) {
    spanPlayerPet.innerHTML = selectRatigueya.id
    petPlayer = selectRatigueya.id
    sectionSelectAttack.style.display = 'flex';
    selectPet.style.display = 'none';
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
    <button class="button-attack" id=${attack.id}>${attack.name}</button>
    `
    petAttacks.innerHTML += mokeponAttacks
  });

  

  buttonFirePet = $('button-fire-pet')
  buttonWaterPet = $('button-water-pet')
  buttonEarthPet = $('button-earth-pet')

  buttonFirePet.addEventListener('click', fireAttack);
  buttonWaterPet.addEventListener('click', waterAttack);
  buttonEarthPet.addEventListener('click', earthAttack);
}

const selectPetEnemy = () => {
  const randomPet = random(0, mokepons.length - 1);  
  let selectPetEnemyRandom = mokepons[randomPet].name
  spanEnemyPet.innerHTML = selectPetEnemyRandom
  return selectPetEnemyRandom;

}

const randomAttackEnemy = () => {


  // randomPetAttack = random(0, mokepons[0].attacks.length - 1);
  // let petEnemyRandom = selectPetEnemy();
  // for (let i = 0; i < mokepons.length; i++) {
  // if (petEnemyRandom === mokepons[i].name){
  //   for (let j = 0; j < mokepons[i].attacks.length; j++) {
  //     console.log(mokepons[i].attacks[0].name);
  //     randomPetAttack = mokepons[i].attacks[0].name
  //   }
  //   }
  // }
  // return randomPetAttack;
  // if (mokepons[])
  // for (let i = 0; i < array.length; i++) {
  //   const element = array[i];
    
  // }
  // console.log(randomPetAttack) 
  // randomPetAttack = random(1, 3);
  // if(randomPetAttack === 1) {
  //   randomPetAttack = 'Fire🔥'
  //   // petAttackEnemy.innerHTML = 'FIRE🔥'
  // } else if(randomPetAttack == 2) {
  //   randomPetAttack = 'Water💧'
  //   // petAttackEnemy.innerHTML = 'Water💧'
  // } else if(randomPetAttack == 3) {
  //   randomPetAttack = 'Earth🌱'
  //   // petAttackEnemy.innerHTML = 'Earth🌱'
  // }
  
  // return randomPetAttack;
} 

const fireAttack = () => {
  playerPetAttack = 'Fire🔥'
  // petAttackPlayer.innerHTML = playerPetAttack;
  randomAttackEnemy();
  result();
}

const waterAttack = () => {
  playerPetAttack = 'Water💧'
  // petAttackPlayer.innerHTML = playerPetAttack;
  randomAttackEnemy();
  result();
}

const earthAttack = () => {
  playerPetAttack = 'Earth🌱'
  // petAttackPlayer.innerHTML = playerPetAttack;
  randomAttackEnemy();
  result();
}

const result = () => {
  if (playerPetAttack === randomPetAttack){
    resultGame = 'TIE';
  } else if (playerPetAttack === 'Fire🔥' && randomPetAttack === 'Water💧' || 
              playerPetAttack === 'Earth🌱' && randomPetAttack === 'Fire🔥'||
              playerPetAttack === 'Water💧' && randomPetAttack === 'Earth🌱'){
    resultGame = 'LOST';
    playerLives--
    spanPlayerLives.innerText = playerLives;
  } else {
    resultGame = 'YOU WON!';
    enemyLives--
    spanEnemyLives.innerText = enemyLives;
  }
  createMessage(resultGame);

  checkLives();


  
  // return resultGame;
}

const checkLives = () => {
  if (enemyLives === 0) {
    createMessageFinal('Congratulations: YOU WON')
  } else if(playerLives === 0){
    createMessageFinal('I am sorry, you lost')
  }

}

const createMessage = (resultGameFinal) => {

  let playerAttackNew = document.createElement('p');
  let enemyAttackNew = document.createElement('p');

  messages.innerHTML = resultGameFinal;
  playerAttackNew.innerHTML = playerPetAttack;
  enemyAttackNew.innerHTML = randomPetAttack;
  // let paragraph = document.createElement('p');
  // paragraph.innerText = `Your pet attacking with ${playerPetAttack}, enemy's pet attacking with ${randomPetAttack} - ${resultGame}`

  playerAttack.appendChild(playerAttackNew)
  enemyAttack.appendChild(enemyAttackNew)
}

const createMessageFinal = (resultFinal) => {
  messages.innerText = resultFinal

  buttonFirePet.disabled = true;
  buttonWaterPet.disabled = true;
  buttonEarthPet.disabled = true;

  buttonReset.style.display = 'flex';
}

const restartGame = () => {
  location.reload();
}






window.addEventListener('load', initialPlay);