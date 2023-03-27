import react, { useState , useEffect } from 'react';


export default function useFavorites([], data:any){

    const [list, setList] = useState([]);

    //Code here to check local storage
    function checkList(){
        setList([]);
    }

    function addRemoveFromList(item:any){
        //check if limit 10 has been reached
        let selectedItem = data.find((comic:any)=> comic.id === item)
        
            let currentStorage = JSON.parse(localStorage.favorites);
            let favoritesCheck = currentStorage.find((comic:any)=> comic.id === item);
            if(favoritesCheck === undefined){
                if(list.length < 10){
                    currentStorage.push(selectedItem);
                }else{
                    alert("You have reach the maximum number of favorites.")
                }
            }else{
                let removeItem = currentStorage.indexOf(favoritesCheck);
                currentStorage.splice(removeItem,1);
            }
            localStorage.setItem("favorites", JSON.stringify(currentStorage))
            setList(currentStorage);

    }

    return {list, setList, checkList, addRemoveFromList}
}