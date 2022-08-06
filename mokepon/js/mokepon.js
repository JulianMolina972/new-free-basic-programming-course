
const $ = (id) => document.getElementById(id);

let playerPetAttack;
let randomPetAttack;
let playerLives = 3;
let enemyLives = 3;
let resultGame;



let buttonSelectPet = $('button-select-pet')
let hipodoge = $('hipodoge');
let capipepo = $('capipepo');
let ratigueya = $('ratigueya');
let spanPlayerPet = $('player-pet')
let spanEnemyPet = $('enemy-pet')
let buttonFirePet = $('button-fire-pet')
let buttonWaterPet = $('button-water-pet')
let buttonEarthPet = $('button-earth-pet')
let messages = $('messages')
let spanPlayerLives = $('player-lives')
let spanEnemyLives = $('enemy-lives')
let buttonReset = $('button-reset');
let sectionSelectAttack = $('select-attack')
let selectPet = $('select-pet');


sectionSelectAttack.style.display = 'none';
buttonReset.style.display = 'none';


const random = (min, max) => {
  return Math.floor(Math.random()* (max - min + 1) + min);
}


const selectPetPlayer = () => {
  if(hipodoge.checked == true) {
    spanPlayerPet.innerHTML = 'Hipodoge'
    sectionSelectAttack.style.display = 'block';
    selectPet.style.display = 'none';
  } else if(capipepo.checked == true) {
    spanPlayerPet.innerHTML = 'Capipepo'
    sectionSelectAttack.style.display = 'block';
    selectPet.style.display = 'none';
  } else if(ratigueya.checked == true) {
    spanPlayerPet.innerHTML = 'Ratigueya'
    sectionSelectAttack.style.display = 'block';
    selectPet.style.display = 'none';
  } else {
    alert('please select an option')
  }
  
}

const selectPetEnemy = () => {
  const randomPet = random(1,3);
  if(randomPet == 1) {
    spanEnemyPet.innerHTML = 'Hipodoge'
  } else if(randomPet == 2) {
    spanEnemyPet.innerHTML = 'Capipepo'
  } else if(randomPet == 3) {
    spanEnemyPet.innerHTML = 'Ratigueya'
  }
}

const randomAttackEnemy = () => {
  randomPetAttack = random(1,3);
  if(randomPetAttack == 1) {
    randomPetAttack = 'Fire🔥'
    // petAttackEnemy.innerHTML = 'FIRE🔥'
  } else if(randomPetAttack == 2) {
    randomPetAttack = 'Water💧'
    // petAttackEnemy.innerHTML = 'Water💧'
  } else if(randomPetAttack == 3) {
    randomPetAttack = 'Earth🌱'
    // petAttackEnemy.innerHTML = 'Earth🌱'
  }
  
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
    resultGame = 'TIE'
  } else if (playerPetAttack === 'Fire🔥' && randomPetAttack === 'Water💧' || 
              playerPetAttack === 'Earth🌱' && randomPetAttack === 'Fire🔥'||
              playerPetAttack === 'Water💧' && randomPetAttack === 'Earth🌱'){
    resultGame = 'LOST'
    playerLives--
    spanPlayerLives.innerText = playerLives;
  } else {
    resultGame = 'YOU WON!'
    enemyLives--
    spanEnemyLives.innerText = enemyLives;
  }
  createMessage();

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


const createMessage = () => {
  let paragraph = document.createElement('p');
  paragraph.innerText = `Your pet attacking with ${playerPetAttack}, enemy's pet attacking with ${randomPetAttack} - ${resultGame}`
  messages.appendChild(paragraph)
}

const createMessageFinal = (resultFinal) => {
  let paragraph = document.createElement('h2');
  paragraph.innerText = resultFinal
  messages.appendChild(paragraph)

  buttonFirePet.disabled = true;
  buttonWaterPet.disabled = true;
  buttonEarthPet.disabled = true;

  buttonReset.style.display = 'block';
}

const restartGame = () => {
  location.reload();
}

buttonSelectPet.addEventListener('click', selectPetPlayer);
buttonSelectPet.addEventListener('click', selectPetEnemy);
buttonFirePet.addEventListener('click', fireAttack);
buttonWaterPet.addEventListener('click', waterAttack);
buttonEarthPet.addEventListener('click', earthAttack);
buttonReset.addEventListener('click', restartGame)




// window.addEventListener('load', initialPlay);