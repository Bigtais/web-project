import express from 'express';
import usersRouter from "./services/users-routage";
import authRouter from './services/auth-routage';

const app = express();

app.use(express.json());

app.use(express.static('./app/etudiants'));
app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.use('/auth', authRouter);

app.use('/users', usersRouter);

app.listen(8080);
