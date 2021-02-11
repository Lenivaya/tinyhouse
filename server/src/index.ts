import express from 'express';
import { listings } from './listings';
import bodyParser from 'body-parser';

const app = express();
const port = 9000;

app.use(bodyParser.json())

app.get("/", (_req, res) => res.send("Hello world"));

app.get("/listings", (_req, res) => {
    return res.send(listings)
})
app.post("/delete-listing", (req, res) => {
    const id: string = req.body.id;

    for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
            return res.send(listings.splice(i, 1))
        }
    }

    return res.send("Failed to delete listing")
})


app.listen(port);

console.log(`[app]: http://localhost:${port}`);
