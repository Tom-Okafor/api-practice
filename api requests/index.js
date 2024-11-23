import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const APP = express();
const PORT = 1510;

APP.set("view engine", "ejs");
APP.set("views", `${dirname(fileURLToPath(import.meta.url))}/views/`);
APP.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public/`));
APP.use(express.urlencoded({ extended: true }));
APP.get("/", async (req, res) => {
    try {
        const DATA = await axios.get("https://bored-api.appbrewery.com/random");
        res.render("index.ejs", { singleActivity: DATA.data });
    } catch (err) {
        console.error("Failed to make request:", err.message);
        res.status(500).render("index.ejs", {
            error: "Failed to fetch activity. Please, try again. 🌧️⛈️🌧️🌩️"
        });
    }
});

APP.post("/activity", async (req, res) => {
    try {
        const SELECTIONS = req.body;
        let url;
        let doesRequestReturnArray = true;
        if (SELECTIONS.type === "random" && SELECTIONS.participants === "any") {
            url = "https://bored-api.appbrewery.com/random";
            doesRequestReturnArray = false;
        } else if (
            SELECTIONS.type !== "random" &&
            SELECTIONS.participants === "any"
        ) {
            url = `https://bored-api.appbrewery.com/filter?type=${SELECTIONS.type}`;
        } else if (
            SELECTIONS.type === "random" &&
            SELECTIONS.participants !== "any"
        ) {
            url = `https://bored-api.appbrewery.com/filter?participants=${SELECTIONS.participants}`;
        } else {
            url = `https://bored-api.appbrewery.com/filter?type=${SELECTIONS.type}&participants=${SELECTIONS.participants}`;
        }

        if (doesRequestReturnArray) {
            const DATA = await axios.get(url);
            res.render("index.ejs", { activity: DATA.data });
        } else {
           const DATA = await axios.get(url);
        res.render("index.ejs", { singleActivity: DATA.data });
        }
    } catch (err) {
        console.error("Failed to make request: ", err.message);
        res.status(404).render("index.ejs", {
            error: "Failed to fetch activity. Please, try again. 🌧️⛈️🌧️🌩️"
        });
    }
});

APP.listen(PORT, err => {
    if (err) throw err;
    console.log("server is listening at http://localhost:" + PORT);
});
