const bcrypt = require('bcrypt');
import db from '../models/index';

const createNewUser = async (name, password) => {
  return new Promise(async (resolve, reject) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // Băm mật khẩu
    
        // Tạo người dùng mới
        await db.User.create({
          name: name,
          password: hashedPassword,
        });
    
        resolve("User created successfully:")
      } catch (error) {
        reject(error);
      }
  })
};

const userExists = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUser = await db.User.findOne({ where: { name } });
            resolve(existingUser !== null); // Trả về true nếu người dùng tồn tại, false nếu không tồn tại
        } catch (error) {
            reject(error);
        }
    });
};

const checkUser = (name,password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { name } });

            if(!user){
                resolve('Invalid username')
                return
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(!isPasswordValid) {
                resolve('Invalid password')
                return
            }

            resolve(user.id);

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewUser,
    userExists,checkUser
}