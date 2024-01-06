const appConfig = require('./app/config/app-config.js');
const  express = require('express');
const app = express();
const PORT = appConfig.port;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.send('Welcome to Notes App Backend')
});

require("./app/route/routes.js")(app);

app.listen(PORT, () =>{
    console.log(`Node running on port ${PORT}`)
});