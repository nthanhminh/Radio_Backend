import PlayListServices from "../services/PlayListServices";

const getPlayListImage = async(req,res) =>{
    try {
        const {id} = req.params;
        const data = await PlayListServices.getPlayListImage(id)
        if(data) {
            res.setHeader('Content-Type', 'image/jpeg');
            res.send(data);
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const searchPlayList = async(req,res) => {
    try {
        const {searchInput} = req.query
        const data = await PlayListServices.searchPlayList(searchInput)
        res.send(JSON.stringify(data));
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const removePlayListFavourite = async(req,res) => {
    try {
        const {id} = req.query
        const mes = await PlayListServices.removePlayListFavourite(id)
        res.send(mes)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const removePlaylistCreated = async(req,res) => {
    try {
        const {id} = req.query
        const mes = await PlayListServices.removePlaylistCreated(id)
        res.send(mes)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}


const getPlayListFavourite = async(req, res) => {
    try {
        const {userId} = req.query
        const data = await PlayListServices.getPlayListFavourite(userId)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const getPlayListFavouriteAdded = async(req, res) => {
    try {
        const {userId} = req.query
        const data = await PlayListServices.getPlayListFavouriteAdded(userId)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const getPlaylistCreated = async(req, res) => {
    try {
        const {userId} = req.query
        const data = await PlayListServices.getPlaylistCreated(userId)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
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