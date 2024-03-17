import ArtistServices from '../services/ArtistServices';

const getArtistImage = async(req,res) => {
    try {
        const {id} = req.params
        const data = await ArtistServices.getArtistImage(id)
        if(data)
        {
            res.setHeader('content-type', 'image/jpeg')
            res.send(data)
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const searchArtist = async(req,res) => {
    try {
        const {searchInput} = req.query
        const data = await ArtistServices.searchArtist(searchInput)
        res.send(JSON.stringify(data));
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const removeArtistFavourite = async(req,res) => {
    try {
        const {id} = req.query
        const mes = await ArtistServices.removeArtistFavourite(id)
        res.send(mes)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const getArtistFavourite = async(req, res) => {
    try {
        const {userId} = req.query
        const data = await ArtistServices.getArtistFavourite(userId)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

const getArtistFavouriteAdded = async(req, res) => {
    try {
        const {userId} = req.query
        const data = await ArtistServices.getArtistFavouriteAdded(userId)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getArtistImage,
    searchArtist,
    removeArtistFavourite,
    getArtistFavourite,
    getArtistFavouriteAdded
}