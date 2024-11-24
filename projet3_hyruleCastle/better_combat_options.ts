import Character from './Character';
import more_statistics from './more_statistics';

function playerTurn(monster: Character, player: Character): void {
  more_statistics.monsterDodge(monster, player);
}

function monsterTurn(monster: Character, player: Character): void {
  more_statistics.playerDodge(monster, player);
}

function turnOrder(monster: Character, player: Character): void {
  if (player.spd > monster.spd) {
    console.log('\n-----Hero start first------');
    playerTurn(monster, player);
    if(monster.hp > 0) {
      monsterTurn(monster, player);
    }
    
  } else {
    console.log('\n------Monster start first-------');
    monsterTurn(monster, player);
    if(player.hp > 0) {
      playerTurn(monster, player);
    }
  }
}

function protectPlayer(monster: Character, player: Character): void {
  const tankPlayer: number = Math.floor((monster.str - monster.str * (player.def / 100)) / 2);
  player.hp -= tankPlayer;
  console.log(`\n \x1b[43m Protected monster deal ${tankPlayer} \x1b[0m`);
}

export default { turnOrder, protectPlayer };
