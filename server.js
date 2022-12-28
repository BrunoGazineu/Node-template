require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("Connected to database");
        app.emit('connected')
    })
    .catch(e => console.log(`Error: ${e}`))

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path')
const { csrfErrorMiddleware, csrfMiddleware } = require('./src/middleware/middlewares');

const helmet = require('helmet');
const csrf = require('csurf')

app.use(helmet());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'topSecret',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(csrfErrorMiddleware);
app.use(csrfMiddleware);
app.use(routes);

const PORT = 3000
app.on('connected', () => {
    app.listen(PORT, () => {
        console.log('Acessar http://localhost:' + PORT);
        console.log('Servidor executando na porta ' + PORT);
    });
})
