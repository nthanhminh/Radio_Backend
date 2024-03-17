import UserServices from '../services/UserServices';

const createNewUser = async (req, res) => {
    try {
        const {name,password} = req.body;
        console.log(req.body, name, password);
        const mes = await UserServices.createNewUser(name, password);
        if(mes === 'User already exists')
        {
            res.status(400).send(mes)
            return
        }
        res.status(200).send(mes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const checkUser = async (req, res) => {
    try {
        const {name,password} = req.query;
        const mes = await UserServices.checkUser(name, password)
        if(mes === 'Invalid name' || mes === 'Invalid password')
        {
            res.status(400).send(mes)
        }
        else
        {
            res.send(JSON.stringify(mes))
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    createNewUser,checkUser
}