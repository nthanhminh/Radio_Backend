import db from "../models/index"
import Song from "../models/song"

const createNewSong = async (name,author,image,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Song.create({
                name: name,
                author: author,
                image: image,
                data: data
        })
        resolve('Successfully created')
        } catch (error) {
            reject(error)
        }
    })
}

const getNewSong = async(id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const songData = await db.Song.findOne({
                where: { id: id},
                attributes: ['data']
            });
            if (songData) {
                resolve(songData.data);
            } else {
                resolve(null); // Trả về null nếu không tìm thấy bài hát
            }
        } catch (error) {
            reject(error);
        }
    });

}

const getTop10Song = async(id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const songData = await db.Song.findOne({
                where: { id: id},
                attributes: ['data']
            });
            if (songData) {
                resolve(songData.data);
            } else {
                resolve(null); // Trả về null nếu không tìm thấy bài hát
            }
        } catch (error) {
            reject(error);
        }
    });
}


const getNewImage = async(id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const songData = await db.Song.findOne({
                where: { id: id},
                attributes: ['image']
            });
            if (songData) {
                resolve(songData.image);
            } else {
                resolve(null); // Trả về null nếu không tìm thấy bài hát
            }
        } catch (error) {
            reject(error);
        }
    });

}

const createNewUser = async(name, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.create({ 
                name: name,
                password: password
            })
            resolve('Successfully created a new user')
        } catch (error) {
            reject(error);
        }
    })
}

const createNewPlayList = async(name, image) => {
    return new Promise(async (resolve, reject) => {
        try{
        await db.Playlist.create({
                name: name,
                image: image
            })
            resolve('Successfully created a new playlist')
        }
        catch (error) {
            reject(error);
        }
    })
}

const createNewPlayListByUser = async(name, image, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Playlist.create({
                name: name,
                image: image,
            })
            const playlist = await db.Playlist.findOne({
                order: [['id', 'DESC']],
                attributes: ['id']
              });
              
              let playlistId = null
              if (playlist) {
                playlistId = playlist.id;
                console.log(playlistId);
              } else {
                // Handle the case where no playlist was found
                console.log('No playlist found')
              }
            
            console.log(playlistId)

            await db.PlaylistCreated.create({
                playlistId: playlistId,
                userId: userId,
            })

            resolve('Successfully create new playlist by id')

        } catch (error) {
            reject(error);
        }
    })
}

const addNewSongToPlayList = async(playlistId, songId) => {
    return new Promise(
        async(resolve,reject) => {
            try{
            await db.SongOfPlaylist.create({
                    playlistId,
                    songId
                })
                resolve('Suucessfully add new song to playlist')
            }
            catch(error) {
                reject(error);       
            }
        }
    )
}

const addPlayListFavorite = async(playlistId,userId) => {
    return new Promise(async(resolve,reject) => {
        try {
            await db.PlaylistFavourite.create({
                playlistId,
                userId
            })
            resolve('successfully add new playlist favourite')
        } catch (error) {
            reject(error); 
        }
    })
}

const addSongFavourite = async(songId,userId) => {
    return new Promise(async(resolve,reject)=>{
        try {
            await db.SongFavourite.create({
                songId,
                userId
            })
    
            resolve('successfully add new favourite song')   
        } catch (error) {
            reject(error); 
        }
    })
}

const addNewArtist = async(name,image) => {
    return new Promise(async(resolve,reject)=>{
        try {
            await db.Artist.create({
                name,
                image
            })
            resolve('successfully add new artist')    
        } catch (error) {
            reject(error); 
        }
    })
}


const getNewImageArtist = async(id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const songData = await db.Artist.findOne({
                where: { id: id},
                attributes: ['image']
            });
            if (songData) {
                resolve(songData.image);
            } else {
                resolve(null); // Trả về null nếu không tìm thấy bài hát
            }
        } catch (error) {
            reject(error);
        }
    });

}

const addArtistFavorite = async(artistId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.ArtistFavourite.create({
                artistId,
                userId
            })
            resolve('successfully add new artist favorite')
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewSong,
    getNewSong,
    getNewImage,
    createNewUser,
    createNewPlayList,
    createNewPlayListByUser,
    addNewSongToPlayList,
    addPlayListFavorite,
    addSongFavourite,
    addNewArtist,
    getNewImageArtist,
    addArtistFavorite
}