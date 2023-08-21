import express from "express";
//import pokeDex from "./pokedex.json" //assert {type: "json"}
import cors from "cors";

import { readFile } from 'node:fs/promises';
const fileUrl = new URL("./pokedex.json", import.meta.url);
const parsedPackageJSON = JSON.parse(await readFile(fileUrl, 'utf8'));

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.all("/", (req, res, next) => {
    res.send("Please provide /pokemon or /pokemon/id (id = 14 eg.) to the url to get some json-data")
});

app.get("/pokemon", (req, res) => {
    res.json(parsedPackageJSON); //send the whole pokedex with its hundreds of entries
});

app.get("/pokemon/:id", (req, res) => {
    const id = Number.parseInt(`${req.params.id}`, 10); //convert the params-string into integer
    const pokemon = pokeDex.find((item) => item.id === id); //get the pokemon with the right id from the pokedex-array/-json
    res.json(pokemon); 
});


app.listen(port, () => console.log(`Server listens on port ${port}`));