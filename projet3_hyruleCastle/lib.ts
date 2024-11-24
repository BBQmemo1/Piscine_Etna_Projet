import Character from './Character';
import better_combat_options from './better_combat_options';
import more_statistics from "./more_statistics";
const readline = require('readline-sync');

let floor: number = 1;

// show game
function displayGame(monster: Character, player: Character): void {
  console.log(`\n ===== FLOOR ${floor} =====`);
  console.log(`\x1b[41m ${monster.name}  HP: ${monster.hp}/${monster.maxhp} \x1b[0m`);
  console.log(`\x1b[42m ${player.name} HP: ${player.hp}/${player.maxhp} \x1b[0m\n`);
}
// show dead
function deadCharacter(monster: Character, player: Character): void {
  if (monster.hp <= 0) {
    console.log(`\x1b[32m ${monster.name}  died! \x1b[0m`);
  }
  if (player.hp <= 0) {
    console.log(`\x1b[41m GAME OVER ${player.name} \x1b[0m`);
  }
}
// main fight
function fightMonster(monster: Character, player: Character) {
  let turn: number = 0;
  while (monster.hp > 0 && player.hp > 0) {
    turn += 1;
    const answer1 = readline.question('---Option--- : \n 1.Attack 2.Skills 3.Escape 4.Protect \n choix: ');
    const ans = answer1.toLowerCase();

    if (ans === '1.attack') {
      better_combat_options.turnOrder(monster, player);
      displayGame(monster, player);
      deadCharacter(monster, player);
    }

    if (ans === '2.skills') {
      const answer2 = readline.question('---Option Skills--- : \n 1.CheatHeal 2.CheatRestore 3.CheatFireball 4.classSkills \n choix: ');
      if (answer2 === '1') {
        player.hp += (player.maxhp / 2);
        console.log('you use heal\n');
        if (player.hp > player.maxhp) {
          player.hp = player.maxhp;
        }
        //more_statistics.playerDodge(monster, player);
        displayGame(monster, player);
      }
    }
    if (ans === '3.escape') {
      console.log('\n \x1b[41m fleeing \x1b[0m');
      return;
    }
    if (ans === '4.protect') {
      better_combat_options.protectPlayer(monster, player);
      displayGame(monster, player);
      if (player.hp <= 0) {
        player.hp = 0;
        console.log(`\x1b[41m GAME OVER ${player.name} \x1b[0m`);
        return;
      }
    }
    console.log(` Round : ${turn} `);
  }
}

// show each floor
function loopFightFloor(monster: Character, player: Character, boss: Character): void {
  monster.maxhp = monster.hp;
  player.maxhp = player.hp;
  boss.maxhp = boss.hp;

  for (floor; floor <= 10; floor += 1) {
    monster.hp = monster.maxhp;

    if (floor === 10) {
      displayGame(boss, player);
      console.log(`\x1b[31m You encounter a ${boss.name} \x1b[0m \n`);
      fightMonster(boss, player);
      if (boss.hp <= 0) {
        console.log('Good Game !');
      }
    } else {
      displayGame(monster, player);
      console.log(`\x1b[32m You encounter a ${monster.name} \x1b[0m \n`);
      fightMonster(monster, player);
    }
    if (player.hp <= 0) {
      break;
    }
  }
}
// random intervall 1 100
function getRandom(): number {
  const num = Math.floor(Math.random() * (100 - 1) + 1);
  if (num <= 50) {
    return 1;
  } if (num > 50 && num <= 80) {
    return 2;
  } if (num > 80 && num <= 95) {
    return 3;
  } if (num > 95 && num <= 99) {
    return 4;
  }
  return 5;
}

/* function getCharacterRandom(characterList: Character[]){
  let randomPlayer = getRandom();
  for (const character of characterList) {
    if (character.rarity === randomPlayer) {
      return character;
    }
  }
}  */

export default { loopFightFloor, getRandom };
