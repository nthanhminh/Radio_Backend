import SongServices from '../services/SongServices';

const getTop10Song = async(req, res) => {
    try {
        const data = await SongServices.getTop10Song()
        res.send(JSON.stringify(data))
    } catch (error) {
        console.error('Error when fetching data from server:', error)
        res.status(500).send('Internal Server Error')
    }
}

const searchSong = async(req, res) => {
    try {
        const {searchInput} = req.query
        const data = await SongServices.searchSong(searchInput)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.error('Error when fetching data from server:', error)
        res.status(500).send('Internal Server Error')
    }
}



const removeSongFromPlayList = async(req, res) => {
    try {
        const {id} = req.query
        const mes = await SongServices.removeSongFromPlayList(id)
        res.send(mes)
    } catch (error) {
        console.error('Error when removing',error)
        res.status(500).send('Internal Server Error')
    }
}

const removeSongFromSongFavoritesList = async(req, res) => {
    try {
        const {id} = req.query
        const mes = await SongServices.removeSongFromSongFavoritesList(id)
        res.send(mes)
    } catch (error) {
        console.error('Error when removing',error)
        res.status(500).send('Internal Server Error')
    }
}

const getSongFavourite = async (req, res) => {
    try {
        const {userId} = req.query
        const data = await SongServices.getSongFavourite(userId)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const getSongFromPlaylist = async (req, res) => {
    try {
        const {playlistId} = req.query
        const data = await SongServices.getSongFromPlaylist(playlistId)
        res.send(JSON.stringify(data))
        console.log(JSON.stringify(data))
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const getSongAdded = async (req, res) => {
    try {
        const {playlistId} = req.query
        const data = await SongServices.getSongAdded(playlistId)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}

const getSongAddedFavourite = async (req, res) => {
    try {
        const {userId} = req.query
        const data = await SongServices.getSongAddedFavourite(userId)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getTop10Song: getTop10Song,
    searchSong: searchSong,
    removeSongFromPlayList,
    removeSongFromSongFavoritesList,
    getSongFavourite,
    getSongFromPlaylist,
    getSongAdded,
    getSongAddedFavourite
}