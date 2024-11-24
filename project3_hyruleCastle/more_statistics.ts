import Character from './Character';

function chanceCritMonster(monster: Character, player: Character): void {
  const num: number = Math.floor(Math.random() * (100 - 1) + 1);
  const tankPlayer: number = Math.floor(monster.str - monster.str * (player.def / 100));
  if (num <= monster.luck) {
    player.hp -= tankPlayer * 2;
    console.log(`\x1b[41m --monsterCrit-- \x1b[0m \x1b[31m -- monsterdealt ${tankPlayer * 2} -- \x1b[0m`);
  } else {
    player.hp -= tankPlayer;
    console.log(`\x1b[42m --monstNoCrit-- \x1b[0m \x1b[31m -- monsterdealt ${tankPlayer} -- \x1b[0m`);
  }
}

function chanceCritPlayer(monster: Character, player: Character): void {
  const num = Math.floor(Math.random() * (100 - 1) + 1);
  const tankMonster: number = Math.floor(player.str - player.str * (monster.def / 100));
  if (num <= player.luck) {
    monster.hp -= tankMonster * 2;
    console.log(`\x1b[41m --playerCrit-- \x1b[0m \x1b[31m -- playerdealt ${tankMonster * 2} -- \x1b[0m`);
  } else {
    monster.hp -= tankMonster;
    console.log(`\x1b[42m --playerNoCrit-- \x1b[0m \x1b[31m -- playerdealt ${tankMonster} -- \x1b[0m`);
  }
}

function monsterDodge(monster: Character, player: Character): void {
  let monsterSpeed: number = monster.spd - player.spd;
  if(monsterSpeed <= 0) {
    monsterSpeed = 0;
  }
  const num: number = Math.floor(Math.random() * (100 - 1) + 1);
  if (num <= monsterSpeed) {
    console.log('\n \x1b[31m --monsterDodge-- \x1b[0m \n');
  } else {
    console.log('\n \x1b[32m --monsterNoDodge-- \x1b[0m \n');
    chanceCritPlayer(monster, player);
    if (monster.hp <= 0) {
      monster.hp = 0;
    }
  }
}

function playerDodge(monster: Character, player: Character): void {
  let playerSpeed: number = player.spd - monster.spd;
  if(playerSpeed <= 0) {
    playerSpeed = 0;
  }
  const num: number = Math.floor(Math.random() * (100 - 1) + 1);
  if (num <= playerSpeed) {
    console.log('\n \x1b[31m --playerDodge-- \x1b[0m \n');
  } else {
    console.log('\n \x1b[32m --playerNoDodge-- \x1b[0m \n');
    chanceCritMonster(monster, player);
    if (monster.hp <= 0) {
      monster.hp = 0;
    }
  }
}

export default { monsterDodge, playerDodge };
