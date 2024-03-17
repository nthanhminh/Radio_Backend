import db from '../models/index';
require('dotenv').config()

const getArtistImage = async(id) =>
{
    return new Promise(async(resolve, reject) =>{
        try {
            const artist = await db.Artist.findOne({
                where: {id: id},
                attributes: ['image']
            })
            if(artist)
            {
                resolve(artist.image)
            }
        } catch (error) {
            reject(error);
        }
    })
}

const getArtistFavouriteAdded = async(userId) => {
    try {
        const artistFavourites = await db.ArtistFavourite.findAll({
            where: { userId: userId },
            attributes: ['artistId', 'userId'],
        });

        // If the association is properly set, each artistFavourite should have an Artist included
        const data = artistFavourites.map(artistFavourite => {
            return artistFavourite.artistId
        });

        return data; // Since we're in an async function, this is effectively `resolve(data)`
    } catch (error) {
        throw error; // This is effectively `reject(error)` in an async function
    }
}

const searchArtist = async (searchInput) => {
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
                    ]
                };
            }

            const topArtists = await db.Artist.findAll(queryOptions);

            if (topArtists) {
                const data = topArtists.map(artist => ({
                    id: artist.dataValues.id,
                    name: artist.dataValues.name,
                    imgUrl: `${process.env.BASE_URL}/getArtistImage/${artist.dataValues.id}`,
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

const removeArtistFavourite = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.ArtistFavourite.destroy({
                where: {id: id},
            })
            resolve('successfully removed');
        } catch (error) {
            reject(error);
        }
    })
}

// const getArtistFavourite = async(userId) => {
//     return new Promise(async(resolve, reject) => {
//         try {
//             const artists = await db.ArtistFavourite.findAll({
//                 where: {userId: userId},
//                 attributes: ['artistId','userId'],
//             })

//             const data = artists.map(async(artist) => {
//                 let tmp = await db.Artist.findOne({
//                     where: {id: artist.dataValues.artistId},
//                     attributes: ['name']
//                 })
//                 const name = tmp.name
//                 return {
//                     artistId: artist.dataValues.artistId,
//                     name: name,
//                     artistImage: `${process.env.BASE_URL}/getArtistImage/${artist.dataValues.artistId}`
//                 }
//             })

//             resolve(data)

//         } catch (error) {
//             reject(error);
//         }
//     })
// }

const getArtistFavourite = async (userId) => {
    try {
        const artistFavourites = await db.ArtistFavourite.findAll({
            where: { userId: userId },
            attributes: ['artistId', 'userId', 'id'],
            include: [{ // Assuming association is set
                model: db.Artist,
                attributes: ['id','name']
            }]
        });

        // If the association is properly set, each artistFavourite should have an Artist included
        const data = artistFavourites.map(artistFavourite => {
            const artist = artistFavourite.Artist; // Access the included Artist data
            return {
                id: artist.id,
                name: artist ? artist.name : undefined, // Check if artist data is available
                imgUrl: `${process.env.BASE_URL}/getArtistImage/${artistFavourite.artistId}`,
                removeId: artistFavourite.id
            };
        });

        return data; // Since we're in an async function, this is effectively `resolve(data)`
    } catch (error) {
        throw error; // This is effectively `reject(error)` in an async function
    }
};

module.exports = {
    getArtistImage,
    searchArtist,
    removeArtistFavourite,
    getArtistFavourite,
    getArtistFavouriteAdded
}