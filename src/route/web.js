import express from 'express';
import db from '../models/index';
import crudControllers from '../controllers/crudController';
import SongController from '../controllers/SongController';
import PlayListController from '../controllers/PlayListController';
import ArtistController from '../controllers/ArtistController';
import UserController from '../controllers/UserController';
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

    router.post('/CreateNewUser1',UserController.createNewUser)

    router.get('/login',UserController.checkUser)

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

    router.get('/getTop10Song',SongController.getTop10Song)

    router.get('/searchSong',SongController.searchSong)

    router.get('/searchPlaylist',PlayListController.searchPlayList)

    router.get('/searchArtist',ArtistController.searchArtist)

    router.get('/getPlayListImage/:id',PlayListController.getPlayListImage)

    router.get('/getArtistImage/:id',ArtistController.getArtistImage)

    router.delete('/removeSongFromPlayList',SongController.removeSongFromPlayList)

    router.delete('/removeSongFromSongFavoritesList',SongController.removeSongFromSongFavoritesList)

    router.delete('/removePlayListFavourite',PlayListController.removePlayListFavourite)

    router.delete('/removeArtistFavourite',ArtistController.removeArtistFavourite)

    router.delete('/removePlaylistCreated',PlayListController.removePlaylistCreated)

    router.get('/getArtistFavourite',ArtistController.getArtistFavourite)

    router.get('/getPlayListFavourite',PlayListController.getPlayListFavourite)

    router.get('/getSongFavourite',SongController.getSongFavourite)

    router.get('/getSongFromPlaylist',SongController.getSongFromPlaylist)

    router.get('/getPlaylistCreated',PlayListController.getPlaylistCreated)

    router.get('/getSongAdded',SongController.getSongAdded)

    router.get('/getSongAddedFavourite',SongController.getSongAddedFavourite)

    router.get('/getPlayListFavouriteAdded',PlayListController.getPlayListFavouriteAdded)

    router.get('/getArtistFavouriteAdded',ArtistController.getArtistFavouriteAdded)

    app.use('/', router);
};

export default initWebRoutes;
