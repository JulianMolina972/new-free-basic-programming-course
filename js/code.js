//1 is rock, 2 is paper, 3 is scissors

const random = (min, max) => {
  return Math.floor(Math.random()* (max - min + 1) + min);
}

const choice = (play) => {
  let result = '';
  if (play == 1) {
    result = 'rock'
  } else if (play == 2) {
    result = 'paper'
  } else if (play == 3) {
    result = 'scissors'
  } else {
    result = 'Elige una opción válida';
  }

  return result;

}

let player = 0;
let min = 1;
let max = 3;
let pc = 0;
let triunfos = 0;
let perdidas = 0; 

const rockPaperScissors = (pc, player) => {
  if(pc == player){
    alert('Empate');
  } else if(pc == 1 && player == 2 || pc == 2 && player == 3 || pc == 3 && player == 1){
    alert('Ganaste');
    triunfos += 1
  } else {
    alert('Perdiste');
    perdidas +=1
  }
}

while(triunfos < 3 && perdidas < 3) {
  pc = random(min, max);

  player = prompt('Elige una opción: 1-Piedra, 2-Papel, 3-Tijera');
  //alert('Elegiste: ' + player);

  alert(`Elegiste ${choice(player)}`)
  alert(`pc elige ${choice(pc)}`)

  rockPaperScissors(pc, player);

  alert('ganaste: ' + triunfos);
  alert('perdiste:' + perdidas)

}