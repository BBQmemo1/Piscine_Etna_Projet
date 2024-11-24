import Character from './Character';
import Characterlib from './lib';

const fs = require('fs');

const contentPlayer = fs.readFileSync('../json/players.json', 'utf-8');
const jsonPlayer: Character[] = JSON.parse(contentPlayer);

const contentEnemies = fs.readFileSync('../json/enemies.json', 'utf-8');
const jsonEnemies: Character[] = JSON.parse(contentEnemies);

const contentBosses = fs.readFileSync('../json/bosses.json', 'utf-8');
const jsonBosses: Character[] = JSON.parse(contentBosses);

let player: Character;
const randomPlayer = Characterlib.getRandom();
for (const hero of jsonPlayer) {
  if (hero.rarity === randomPlayer) {
    player = hero;
  }
}

let monster: Character;
const randomEnemies = Characterlib.getRandom();
for (const enemies of jsonEnemies) {
  if (enemies.rarity === randomEnemies) {
    monster = enemies;
  }
} 

/* let monster: Character[] = [];
for (let i = 0; i < jsonEnemies.length; i += 1) {
  monster.push(Characterlib.getCharacterRandom(jsonEnemies));
}  */

let boss: Character;
const randomBoss = Characterlib.getRandom();
for (const bosses of jsonBosses) {
  if (bosses.rarity === randomBoss) {
    boss = bosses;
  }
}

Characterlib.loopFightFloor(monster, player, boss);
