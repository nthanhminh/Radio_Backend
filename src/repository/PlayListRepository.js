import db from '../models/index';
import playlist from '../models/playlist';
require('dotenv').config()
const getPlayListImage = async(id) =>
{
    return new Promise(async(resolve, reject) =>{
        try {
            const playLists = await db.Playlist.findOne({
                where: {id: id},
                attributes: ['image']
            })
            if(playLists)
            {
                resolve(playLists.image)
            }
        } catch (error) {
            reject(error);
        }
    })
}

const searchPlayList = async (searchInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let queryOptions = {
                order: db.Sequelize.literal('RAND()'),
                attributes: ['id', 'name']
            };

            if (searchInput) {
                queryOptions.where = {
                    [db.Sequelize.Op.or]: [
                        { name: { [db.Sequelize.Op.like]: `%${searchInput}%` } },
                    ],
                    id: {
                        [db.Sequelize.Op.notIn]: db.sequelize.literal('(SELECT playlistId FROM playlistcreateds)')
                    }
                };
            }

            const topPlayLists = await db.Playlist.findAll(queryOptions);

            if (topPlayLists) {
                const data = topPlayLists.map(playlist => ({
                    id: playlist.dataValues.id,
                    name: playlist.dataValues.name,
                    imgUrl: `${process.env.BASE_URL}/getPlayListImage/${playlist.dataValues.id}`,
                }));
                resolve(data);
            } else {
                resolve(null); 
            }
        } catch (error) {
            reject(error);
        }
    });
}

const removePlayListFavourite = async (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.PlaylistFavourite.destroy({
                where: {id: id},
            })
            resolve('successfully removed');
        } catch (error) {
            reject(error);
        }
    })
}

const removePlaylistCreated = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.PlaylistCreated.destroy({
                where: {id: id},
            })
            resolve('successfully removed');
        } catch (error) {
            reject(error);
        }
    })
}

const getPlayListFavourite = async (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const playLists = await db.PlaylistFavourite.findAll({
                where: { userId: userId },
                attributes: ['playlistId', 'userId'],
                include: [{
                    model: db.Playlist,
                    attributes: ['id','name']
                }]
            });
    
            const data = playLists.map(playlist => {
                const pl = playlist.Playlist; 
                return {
                    id: pl.id,
                    name: pl ? pl.name : undefined, 
                    imgUrl: `${process.env.BASE_URL}/getPlayListImage/${playlist.playlistId}`
                };
            });
    
            resolve(data); 
        } catch (error) {
            reject(error); // An async function automatically rejects the promise on throw
        }
    })
}

const getPlayListFavouriteAdded = async(userId) =>{
    return new Promise(async(resolve, reject) => {
        try {
            const playLists = await db.PlaylistFavourite.findAll({
                where: { userId: userId },
                attributes: ['playlistId', 'userId'],
                include: [{
                    model: db.Playlist,
                    attributes: ['id','name']
                }]
            });
    
            const data = playLists.map(playlist => {
                const pl = playlist.Playlist; 
                return pl.id
            });
    
            resolve(data); 
        } catch (error) {
            reject(error); // An async function automatically rejects the promise on throw
        }
    })
}

const getPlaylistCreated = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const playLists = await db.PlaylistCreated.findAll({
                where: { userId: userId },
                attributes: ['playlistId', 'userId'],
                include: [{
                    model: db.Playlist,
                    attributes: ['id','name']
                }]
            });
    
            const data = playLists.map(playlist => {
                const pl = playlist.Playlist; 
                return {
                    id: pl.id,
                    name: pl ? pl.name : undefined, 
                    imgUrl: `${process.env.BASE_URL}/getPlayListImage/${playlist.playlistId}`
                };
            });
    
            resolve(data);
        } catch (error) {
            reject(error); //
        }
    })
}

module.exports = {
    getPlayListImage,
    searchPlayList,
    removePlayListFavourite,
    removePlaylistCreated,
    getPlayListFavourite,
    getPlaylistCreated,
    getPlayListFavouriteAdded
}