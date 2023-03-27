import {useState, useEffect} from 'react';
import axios from 'axios';
import md5 from 'md5';

const endpoints = {
    base: process.env.NEXT_PUBLIC_MARVEL_API,
    public: "/v1/public",
    comics: "/comics",
}

async function MarvelAPIQuery(url:string, parameters:Array<Array<string>>){

    const params = new URLSearchParams(parameters);

    return await axios.get(url,{params})
                    .then((response)=>{
                        console.log("response",response)
                        return response;
                    })
                    .catch(function(error){
                        console.log(error);
                        return "error";
                    });
}

const setParameters = (filters:Array<Array<string>>) => {

    let apikeyPrivate = process.env.NEXT_PUBLIC_MARVEL_API_PRIVATE_KEY
    let apikeyPublic = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY
    let ts = new Date().toISOString();
    let hash = md5(ts + apikeyPrivate + apikeyPublic);

    let parameters = [
        ["apikey",apikeyPublic],
        ["ts",ts],
        ["hash",hash],
        ["limit", 15]
    ]

    filters.map(([key,value])=>{
        parameters.push([key,value])
    })

    return parameters;

}

const assembleURL = () => {

    return `${process.env.NEXT_PUBLIC_MARVEL_API}${endpoints.public}${endpoints.comics}`
}

interface DataObject {
    id:string,
    title:string,
    creators:{items:Array<string>},
    issueNumber:number,
    thumbnail:any,
    dates:any,
    images:any
}

const dataHandler = (response:any) => {
    let data:Array<any>;
    let alt:any
    if(response.status === 200){
        data = response.data.data.results.map((item:DataObject)=>{
        return({
            id:item.id,
            title:item.title,
            creators:item.creators.items,
            issueNumber:item.issueNumber,
            thumbNail: (item.images.length !== 0) ? item.thumbnail.path + "." + item.thumbnail.extension : undefined,
            publishDate:item.dates[0].date
        })
    })
    alt = {
        total:response.data.data.total,
        offset:response.data.data.offset

    }
    }else{
            data = [{
            status: response.status,
            message: response.message,
        }]
    }
    return [data, alt];
}


export async function MarvelAPIRequest(filters:Array<Array<string>>){

    let response = await MarvelAPIQuery(assembleURL(),setParameters(filters));

    let data = dataHandler(response);

    return data;
    
}
