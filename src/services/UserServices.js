import { types } from '@babel/core';
import UserRepository from '../repository/UserRepository';

const createNewUser = async (name, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // if(name.includes("'")){
            //     resolve('Invalid name')
            // }
            // else if(name === '')
            // {
            //     resolve('Invalid name')
            // }
            // else if(name.includes("--"))
            // {
            //     resolve('Invalid name')
            // }
            // if(password.includes("'")){
            //     resolve('Invalid password')
            // }
            // else if(password === '')
            // {
            //     resolve('Invalid password')
            // }
            // else if(password.includes("--"))
            // {
            //     resolve('Invalid password')
            // }
            const check = await UserRepository.userExists(name)
            if(check === true) {
                resolve('User already exists')
                return
            }
            const data = await UserRepository.createNewUser(name, password)
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })
}

const checkUser = (name,password) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(name.includes("'")){
                resolve('Invalid name')
                return
            }
            else if(name === '')
            {
                resolve('Invalid name')
                return
            }
            else if(name.includes("--"))
            {
                resolve('Invalid name')
                return
            }
            if(password.includes("'")){
                resolve('Invalid password')
                return
            }
            else if(password === '')
            {
                resolve('Invalid password')
                return
            }
            else if(password.includes("--"))
            {
                resolve('Invalid password')
                return
            }
            const mes = await UserRepository.checkUser(name,password)
            if(mes === true){
                resolve(true)
            }
            else
            {
                resolve(mes)
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewUser,
    checkUser
}