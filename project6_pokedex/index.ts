import express, { Express, query, Request, Response, Router } from "express";
import Logger from "./logger";
import { getPokemon, getPoke, getTypeAll, getPokeType } from "./route";


const app: Express = express();
const port = process.env.PORT;



app.get("/", (req: Request, res: Response) => {
  Logger.info("Serveur démarré sur le port 8080");
  res.send("hello");
});

app.get("/pokemon", async (req: Request, res: Response) => {
  try {
    Logger.info("Connexion réussie à la base de données MySQL");
    const allPokemon = await getPokemon();
    res.send(allPokemon);
  } catch(err) {
    console.error(err);
    res.status(500).send('Serveur error')
  }
});

app.get("/pokemon/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const aPokemon = await getPoke(id);
    res.send(aPokemon);
  } catch(err) {
    console.error(err);
    res.status(500).send('Serveur error')
  }
});

app.get("/type", async (req: Request, res: Response) => {
  try {
    const allType = await getTypeAll();
    res.send(allType);
  } catch(err) {
    console.error(err);
    res.status(500).send('Serveur error')
  }
});

app.get("/type/:type", async (req: Request, res: Response) => {
  try {
    const type = req.params.type
    const typePokemon = await getPokeType(type);
    res.send(typePokemon);
  } catch(err) {
    console.error(err);
    res.status(500).send('Serveur error')
  }
});



app.listen(port, () => {
  Logger.debug(`Server is up and running @ http://localhost:${port}`);
});
