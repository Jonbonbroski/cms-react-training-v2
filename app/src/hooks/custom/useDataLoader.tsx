import react, { useState , useEffect } from 'react';


export default function useDataLoader(APIs:any, filters:any){

    const [data, setData] = useState([]);
    const [alt, setAlt] = useState([0,0]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const dataUpdate = (filters:any) =>{
        setTimeout(async()=>{
            setIsLoading(true);
            setError(false);
            let newData = await APIs(filters)
            console.log("newData",newData)
            if(newData.length === 1){
                setError(true);
                setIsLoading(false);
                setData([]);
            }else{
                setAlt([newData[1].offset, newData[1].total]);
                setData(newData[0]);
                setIsLoading(false);
            }
        },2000)
    }

    useEffect(()=>{
        dataUpdate(filters)
    },[])


    return {data, alt, isLoading, error, dataUpdate, setIsLoading}
}