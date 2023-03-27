import react from 'react'
import {MarvelAPIRequest} from "./comics/Marvel/MarvelAPI"

const ComicAPIs = (arg:any) => {
    return {
        marvel: MarvelAPIRequest(arg)
    }
} 

export default ComicAPIs