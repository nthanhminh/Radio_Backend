import PlayListRepository from "../repository/PlayListRepository";

const getPlayListImage = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await PlayListRepository.getPlayListImage(id)
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

const getPlayListFavouriteAdded = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await PlayListRepository.getPlayListFavouriteAdded(userId)
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

const searchPlayList = async(searchInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            searchInput = searchInput.trim();
            if(searchInput.includes("'")){
                resolve('Invalid search input')
            }
            const data = await PlayListRepository.searchPlayList(searchInput)
            if(data) resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

const removePlayListFavourite = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await PlayListRepository.removePlayListFavourite(id)
            resolve('successfully removed playlist');
        } catch (error) {
            reject(error);
        }
    })
}

const removePlaylistCreated = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await PlayListRepository.removePlaylistCreated(id)
            resolve('successfully removed playlist');
        } catch (error) {
            reject(error);
        }
    })
}

const getPlayListFavourite = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await PlayListRepository.getPlayListFavourite(userId);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

const getPlaylistCreated = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await PlayListRepository.getPlaylistCreated(userId)
            resolve(data);
        } catch (error) {
            reject(error);
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