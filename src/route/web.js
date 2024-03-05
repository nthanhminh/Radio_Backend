import express from 'express';
import db from '../models/index';
import crudControllers from '../controllers/crudController';
import multer from 'multer';
import uploadMulter from '../multer/multerStore';
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', async (req, res) => {
        res.send("Hello")
    });

    router.get('/createSong', crudControllers.createSong)

    router.get('/getNewSong/:id', crudControllers.getNewSong)

    router.get('/getNewImage/:id', crudControllers.getNewImage)

    router.post('/createNewSong',uploadMulter.fields([{ name: 'image', maxCount: 1 }, { name: 'data', maxCount: 1 }]),crudControllers.createNewSong)

    router.post('/createNewUser',crudControllers.createNewUser)

    router.post('/createNewPlayList',crudControllers.createNewPlayList)

    router.post('/createNewPlayListByUser',crudControllers.createNewPlayListByUser)

    router.post('/addNewSongToPlayList',crudControllers.addNewSongToPlayList)

    router.post('/addPlayListFavorite',crudControllers.addPlayListFavorite)

    router.post('/addSongFavourite',crudControllers.addSongFavourite)

    router.post('/addNewArtist',crudControllers.addNewArtist)

    router.post('/addArtistFavorite',crudControllers.addArtistFavorite)

    router.get('/getNewUser',crudControllers.getNewUser)

    router.get('/getNewImageArtist/:id',crudControllers.getNewImageArtist)

    router.get('/getData',crudControllers.getData)

    app.use('/', router);
};

export default initWebRoutes;
