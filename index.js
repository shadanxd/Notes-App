const appConfig = require('./app/config/app-config.js');
const  express = require('express');
const app = express();
const PORT = appConfig.port;
const sequelize = require('./app/model/db.js')
const session = require('express-session');


app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(
    session({
      secret: appConfig.SESSION_KEY,
      resave: true,
      saveUninitialized: true
    })
  );


app.get('/', (req, res) =>{
    res.send('Welcome to Notes App Backend')
});

require("./app/route/routes.js")(app);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database and tables synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.listen(PORT, () =>{
    console.log(`Node running on port ${PORT}`)
});