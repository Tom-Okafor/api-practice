import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const APP = express();
const PORT = 1510;

APP.set("view engine", "ejs");
APP.set("views", `${dirname(fileURLToPath(import.meta.url))}/views/`);
APP.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public/`));

APP.get("/", async (req, res) => {
    try {
        /*const DATA = await axios.get("https://bored-api.appbrewery.com/random");*/
        res.render("index.ejs");
    } catch (e) {
        console.error("Failed to make request:", error.message);
        res.status(509).send("Failed to fetch activity. Please, try again.")
    }
});

APP.listen(PORT, err => {
    if (err) throw err;
    console.log("server is listening at http://localhost:" + PORT);
});
