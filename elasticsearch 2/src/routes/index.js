import { Router } from "express";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const router = Router();


import { Client } from '@elastic/elasticsearch';
import fs from 'fs';


const client = new Client({
    node: 'https://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'YQ=5zr8h7_zmhs_f-kmO'
    },
    tls: {
        ca: fs.readFileSync(join(__dirname,'/elasticsource/elasticsearch-8.3.3/config/certs/http_ca.crt')),
        rejectUnauthorized: false
    }
});


function drugName(drug) {
    return client.search({
        index: 'drugs',
        query: {
            match: { name: drug }
        }
    });
}



router.get('/', (req,res) => {
    res.render('index');
});


router.post('/new-drug', async (req,res) => {
    try{
        // console.log(req.body.drug);
        const result = await drugName(req.body.drug);
        // console.log(result.hits.hits[0]["_source"]["definition"]);

        const fields = {name: result.hits.hits[0]["_source"]["name"].toUpperCase(),
                definition: result.hits.hits[0]["_source"]["definition"],
                CUI: result.hits.hits[0]["_source"]["CUI"],
                TUI: result.hits.hits[0]["_source"]["TUI"]
            };

        res.render('drugDetail', fields);
    }
    catch{
        res.render("noFound");
    }
});


router.get('/home', (req,res) => {
    res.redirect('/');
});



export { router };


