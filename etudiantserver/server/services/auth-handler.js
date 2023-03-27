import loginRep from './login-repository';
const { createHash } = require("crypto");


async function create(req, res) {
    res.set('Content-Type', 'application/json');
    try {
        const userBool = await loginExist(req.body.username);
        if (userBool) {
            res.send({});
        } else {
            var user = req.body;
            user.password = await hashPassword(user.password);
            await loginRep.store(user);
            res.status(200).send({ status: 200 });
        }
    } catch (e) {
        console.log(e);
        res.status(400).end();
    }
}

async function loginExist(username) {
    try {
        const result = await loginRep.getUser(username);
        return result.body.hits.total.value > 0 ? true : false;
    } catch (e) {
        console.log('error getting user', e);
        return false;
    }
}

async function tryLogin(req, res) {
    try {
        const digest = hashPassword(req.params.password);
        const result = await loginRep.getLogin(req.params.username, digest);
        result.body.hits.total.value > 0 ? res.status(200).send({ status: 200 }) : res.status(404).send({ status: 404 });
    } catch (e) {
        console.log('error getting user', e);
        return false;
    }
}


function hashPassword(input) {
    return createHash('sha256').update(input).digest('hex');
}

export default {
    create,
    tryLogin,
    loginExist,
};