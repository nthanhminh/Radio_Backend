import db from '../models/index';
require('dotenv').config()
const getTop10Song = async() => {
    return new Promise(async (resolve, reject) => {
        try {
            const topSongs = await db.Song.findAll({
                order: db.Sequelize.literal('RAND()'),
                limit: 10,
                attributes: ['id','name','author']
            });
            if (topSongs) {
                const data = topSongs.map((song) => {
                    return {
                        ...song.dataValues,
                        imgUrl:`${process.env.BASE_URL}/getNewImage/${song.id}`,
                        // imgUrl:`http://10.0.2.2:8090/getNewImage/${song.id}`,
                        musicUrl:`${process.env.BASE_URL}/getNewSong/${song.id}`,
                        // musicUrl:`http://10.0.2.2:8090/getNewSong/${song.id}`,
                    }
                })
                console.log(data);
                resolve(data);
            } else {
                resolve(null); // Trả về null nếu không tìm thấy bài hát
            }
        } catch (error) {
            reject(error);
        }
    });
}

const searchSong = async (searchInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let queryOptions = {
                order: db.Sequelize.literal('RAND()'),
                attributes: ['id', 'name', 'author']
            };

            if (searchInput) {
                queryOptions.where = {
                    [db.Sequelize.Op.or]: [
                        { name: { [db.Sequelize.Op.like]: `%${searchInput}%` } },
                        { author: { [db.Sequelize.Op.like]: `%${searchInput}%` } }
                    ]
                };
            }

            const topSongs = await db.Song.findAll(queryOptions);

            if (topSongs) {
                const data = topSongs.map(song => ({
                    id: song.dataValues.id,
                    name: song.dataValues.name,
                    author: song.dataValues.author,
                    imgUrl: `${process.env.BASE_URL}/getNewImage/${song.dataValues.id}`,
                    musicUrl: `${process.env.BASE_URL}/getNewSong/${song.dataValues.id}`
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

const getSongAdded = async(playlistId) => {
    return new Promise(async(resolve, reject) =>{
        try {
            const songs = await db.SongOfPlaylist.findAll({
                where: {playlistId: playlistId}
            })
            
            const data = songs.map(song => {
                return song.songId;
            })
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

const getSongAddedFavourite = async(userId) => {
    return new Promise(async(resolve, reject) =>{
        try {
            const songs = await db.SongFavourite.findAll({
                where: {userId: userId}
            })
            
            const data = songs.map(song => {
                return song.songId;
            })
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

const removeSongFromPlayList = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.SongOfPlaylist.destroy({
                where: {id: id},
            })
            resolve('Successfully removed');
        } catch (error) {
            reject(error);
        }
    })
}

const removeSongFromSongFavoritesList = async(id) => {
    return new Promise(async(resolve, reject) => {
        try{
            await db.SongFavourite.destroy(
                {where: {id: id}}
            )
            resolve('Successfully removed');
        }
        catch(error) {
            reject(error);
        }
    })
}

const getSongFavourite = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const songs = await db.SongFavourite.findAll({
                where: { userId: userId },
                attributes: ['songId', 'userId', 'id'],
                include: [{
                    model: db.Song,
                    attributes: ['id','name','author']
                }]
            });
    
            const data = songs.map(song => {
                const songDetail = song.Song; 
                return {
                    removeId: song.id,
                    id: songDetail.id,
                    name: songDetail ? songDetail.name : undefined, 
                    author: songDetail ? songDetail.author : undefined, 
                    imgUrl: `${process.env.BASE_URL}/getNewImage/${song.songId}`,
                    musicUrl: `${process.env.BASE_URL}/getNewSong/${song.songId}`
                };
            });

            resolve(data); 
        } catch (error) {
            reject(error); // An async function automatically rejects the promise on throw
        }
    })
}

const getSongFromPlaylist = (playlistId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const songs = await db.SongOfPlaylist.findAll({
                where: {playlistId: playlistId},
                include: {
                    model: db.Song,
                    attributes: ['name','author']
                }
            })

            const data = songs.map((s)=>{
                const song = s.Song
                return {
                    id: s.songId,
                    name: song.name,
                    author: song.author,
                    imgUrl: `${process.env.BASE_URL}/getNewImage/${s.songId}`,
                    musicUrl: `${process.env.BASE_URL}/getNewSong/${s.songId}`,
                    removeId: s.id
                }
            })
            resolve(data)
        } catch (error) {
            reject(error); // An async function
        }
    })
}


module.exports = {
    getTop10Song,
    searchSong,
    getSongAdded,
    removeSongFromPlayList,
    removeSongFromSongFavoritesList,
    getSongFavourite,
    getSongFromPlaylist,
    getSongAddedFavourite
}