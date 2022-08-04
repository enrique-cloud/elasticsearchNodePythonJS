import express from 'express';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { router } from './routes/index.js';



const app = express();



// settings
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', join(__dirname,'views'));
app.set('view engine', 'ejs');


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));


// routes
app.use(router);


// static files
app.use(express.static(join(__dirname,'public')));



app.listen(3000);
console.log("listening port", 3000);



