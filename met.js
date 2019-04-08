const request = require('request')

const metSearch = function(search, callback){
    //Url of MET API
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q='+search
    //Take first element of array, return it as json
    request({url:url, json:true}, function(error,response){
        //If response is total:0, return error 'Related object not found'
        if(error){
            callback('Service unavailable, check Internet connection',undefined)
        }else if(response.body.total==0){
            callback('Related object not found, search something else',undefined)
        }else{
            const data = response.body
            const result = {
                object: data.objectIDs[0]
            }
            callback(undefined,result)
        }
    })
}

const searchObject = function(objectID, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'+objectID
    request({url:url, json:true},function(error,response){
        if(error){
            callback('Service unavailable, check Internet connection',undefined)
        }else{
            const body = response.body
            var name=body.constituents
            if(name == null){
                name='Sin nombre de artista'
            }else{
                name=body.constituents[0].name
            }
            const info = {
                artist: name,
                title: body.title,
                year: body.objectEndDate,
                technique: body.medium,
                metUrl: body.objectURL
            }
            callback(undefined,info)
        }
    })
}

module.exports = {
    metSearch: metSearch,
    searchObject: searchObject
}