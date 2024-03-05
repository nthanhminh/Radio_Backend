import formidable from "formidable";
import multer from "multer";
import CRUDservices from "../services/CRUDservices"
import fs from 'fs'
import path from 'path';
// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
    cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

let createSong = (req,res) => {
    res.render('createSong.ejs')
}

let createNewSong = async (req,res,next) => {
    console.log(req.body, "body check")
    const name = req.body["songName"]
    const author = req.body["authorOfSong"]
    console.log(req.files)
    const image = req.files['image'][0].filename
    const imageData = fs.readFileSync(path.join(__dirname, '../uploads', image));
    const data = req.files['data'][0].filename
    const dataData = fs.readFileSync(path.join(__dirname, '../uploads', data));
    console.log(name, author, image,data, "check data" )
    let mes = await CRUDservices.createNewSong(name, author, imageData, dataData)
    res.send(mes)
}

let getNewSong = async (req,res) => {
    try {
        const songData = await CRUDservices.getNewSong(req.params.id);
        if (songData) {
            // Thiết lập header để trình duyệt biết loại dữ liệu của file
            res.setHeader('Content-Type', 'audio/mpeg'); // Định dạng của file MP3
            // Gửi nội dung của file như phản hồi
            res.send(songData);
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {
        console.error('Error sending file:', error);
        res.status(500).send('Internal Server Error');
    }

}

let getNewImage = async (req,res) => {
    try {
        const songData = await CRUDservices.getNewImage(req.params.id);
        if (songData) {
            // Thiết lập header để trình duyệt biết loại dữ liệu của file
            res.setHeader('Content-Type', 'image/jpeg'); // Định dạng của file MP3
            // Gửi nội dung của file như phản hồi
            res.send(songData);
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {
        console.error('Error sending file:', error);
        res.status(500).send('Internal Server Error');
    }

}

const createNewUser = async(req, res) => {
    try {
        const {name,password} = req.body
        const mes = await CRUDservices.createNewUser(
            name,
            password,
        )
        console.log(req.body)
        res.send(mes);
    }
    catch(e){
        console.error('Error creating new user', e);
        res.status(500).send('Internal Server Error');
    }
}

const createNewPlayList = async(req, res) => {
    try {
        const imageUrl = 'zingAvatar.jpg';
        const imageData = fs.readFileSync(path.join(__dirname, '../uploads', imageUrl));
        const {name} = req.body
        const mes = await CRUDservices.createNewPlayList(name, imageData)
        res.send(mes);
    } catch (error) {
        console.error('Error creating new play list', error)
        res.status(500).send('Internal Server Error');
    }
}

const getNewUser = (req, res) => {
    res.send('test')
}

const createNewPlayListByUser = async(req, res) => {
    try {
        const {userId} = req.query
        const {name} = req.body
        console.log(userId, name)
        const imageUrl = 'zingAvatar.jpg';
        const imageData = fs.readFileSync(path.join(__dirname, '../uploads', imageUrl));
        const mes = await CRUDservices.createNewPlayListByUser(name, imageData, userId)
        res.send(mes)   
    } catch (error) {
        console.error('Error creating new play list by user', error)
        res.status(500).send('Internal Server Error');
    }
}

const addNewSongToPlayList = async(req, res) => {
    try {
        const {playlistId, songId} = req.query
        const mes = await CRUDservices.addNewSongToPlayList(playlistId, songId)
        res.send(mes)
    } catch (error) {
        console.error('Error creating new play list', error)
        res.status(500).send('Internal Server Error')
    }
}

const getData = async(req, res) => {
    const data = {
        firstname: "API",
        lastname: "CI",
        age: 20,
        hobby: [
            "football",
            "volleyball",
            "swimming"
        ],
        address: {
            street: "ABC",
            province: "XYZ",
        },
        telephone_number: "0123456789"
    }
    res.send(JSON.stringify(data))
}

const addPlayListFavorite = async(req, res) => {
    try {
        const {playlistId,userId} = req.query
        const mes = await CRUDservices.addPlayListFavorite(playlistId,userId)
        res.send(mes)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')   
    }
}

const addSongFavourite = async(req, res) => {
    try {
        const {songId,userId} = req.query
        const mes = await CRUDservices.addSongFavourite(songId,userId)
        res.send(mes)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')   
    }
}

const addNewArtist = async(req, res) => {
    try {
        const {name} = req.body
        const imageUrl = 'Vanh.jpg';
        const imageData = fs.readFileSync(path.join(__dirname, '../uploads', imageUrl));
        const mes = await CRUDservices.addNewArtist(name, imageData)
        res.send(mes)   
    } catch (error) {
        console.error('Error creating new artist', error)
        res.status(500).send('Internal Server Error');
    }
}

const getNewImageArtist = async (req,res) => {
    try {
        const songData = await CRUDservices.getNewImageArtist(req.params.id);
        if (songData) {
            // Thiết lập header để trình duyệt biết loại dữ liệu của file
            res.setHeader('Content-Type', 'image/jpeg'); // Định dạng của file MP3
            // Gửi nội dung của file như phản hồi
            res.send(songData);
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {
        console.error('Error sending file:', error);
        res.status(500).send('Internal Server Error');
    }
}

const addArtistFavorite = async (req, res) => {
    try {
        const {artistId, userId} = req.query
        const mes = await CRUDservices.addArtistFavorite(artistId, userId)
        res.send(mes)
    } catch (error) {
        console.error('Error when add new artist favourite:', error)
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    createSong,
    createNewSong,
    getNewSong,
    getNewImage,
    createNewUser,
    getNewUser,
    createNewPlayList,
    createNewPlayListByUser,
    addNewSongToPlayList,
    getData,
    addPlayListFavorite,
    addSongFavourite,
    addNewArtist,
    getNewImageArtist,
    addArtistFavorite
}