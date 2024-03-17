import ArtistRepository from "../repository/ArtistRepository";

const getArtistImage = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await ArtistRepository.getArtistImage(id)
            if(data)
            {
                resolve(data)
            }
        } catch (error) {
            reject(error);
        }
    })
}

const searchArtist = async(searchInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            searchInput = searchInput.trim();
            if(searchInput.includes("'")){
                resolve('Invalid search input')
            }
            const data = await ArtistRepository.searchArtist(searchInput)
            if(data) resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

const removeArtistFavourite = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const mes = await ArtistRepository.removeArtistFavourite(id)
            resolve(mes)
        } catch (error) {
            reject(error);
        }
    })
}

const getArtistFavourite = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await ArtistRepository.getArtistFavourite(userId)
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })
}

const getArtistFavouriteAdded = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await ArtistRepository.getArtistFavouriteAdded(userId)
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    getArtistImage,
    searchArtist,
    removeArtistFavourite,
    getArtistFavourite,
    getArtistFavouriteAdded,
}