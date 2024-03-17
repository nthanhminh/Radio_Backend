import SongRepository from '../repository/SongRepository';
const getTop10Song = async() => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await SongRepository.getTop10Song();
            if(data)
            {
                resolve(data);
            }
            else
            {
                resolve('Can not fetch data from server ---- Have some issues');
            }
        } catch (error) {
            reject(error)
        }   
    })
}

const searchSong = async(searchInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            searchInput = searchInput.trim()
            if(searchInput.includes("'")){
                resolve('Invalid search input')
            }
            const data = await SongRepository.searchSong(searchInput)
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })

}

const getSongAdded = async(playlistId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await SongRepository.getSongAdded(playlistId)
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })
}

const getSongAddedFavourite = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await SongRepository.getSongAddedFavourite(userId)
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })
}

const removeSongFromPlayList = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const mes = await SongRepository.removeSongFromPlayList(id)
            resolve(mes)
        } catch (error) {
            reject(error);
        }
    })
}

const removeSongFromSongFavoritesList = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const mes = await SongRepository.removeSongFromSongFavoritesList(id)
            resolve(mes)
        } catch (error) {
            reject(error);
        }
    })
}

const getSongFavourite = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await SongRepository.getSongFavourite(userId)
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })
}

const getSongFromPlaylist = async(playlistId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await SongRepository.getSongFromPlaylist(playlistId)
            resolve(data)
        } catch (error) {
            reject(error);
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