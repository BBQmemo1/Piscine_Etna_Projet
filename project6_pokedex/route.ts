import mysql from 'mysql2/promise';

import dotenv from "dotenv";
dotenv.config();

const access = mysql.createPool ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSW,
  database: process.env.DATA,
});


export async function getPokemon() {
  const [rows] = await access.query("SELECT * FROM pokemon")
  return rows;
}

export async function getPoke(id: string) {
  const [rows] = await access.query(`
    SELECT *
    FROM pokemon
    WHERE identifier = ?
    `,[id])
    return rows
}

export async function getTypeAll() {
  const [rows] = await access.query("SELECT types.identifier FROM types")
  return rows;
}

export async function getPokeType(type:string) {
  const [rows] = await access.query(`
    SELECT pokemon.id, pokemon.identifier, pokemon.species_id, pokemon.weight, pokemon.base_experience, pokemon.order, pokemon.is_default
    FROM pokemon
    JOIN pokemon_types ON pokemon.id = pokemon_types.pokemon_id
    JOIN types ON pokemon_types.type_id = types.id
    WHERE types.identifier = ?` ,[type]
    )
    return rows
}