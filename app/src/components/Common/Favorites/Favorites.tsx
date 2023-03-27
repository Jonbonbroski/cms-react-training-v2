import react from 'react'
import styles from '@/styles/Comic.module.css';
import FavItem from "./sub-components/FavItem"


interface Favorites{
    label:string;
    items:Array<any>;
    addRemoveFromList:Function;
}


export default function Favorites(props:Favorites){

    return(
        <div className={styles.favorites_list}>
            <h2>{props.label}</h2>
            <div style={{color:'white', display:'flex', position:'relative', width:'100%', justifyContent:"space-evenly", flexDirection:"column"}}>
            {props.items.map((data:any, i:number)=>{

                return <FavItem 
                    title={data.title} 
                    id={data.id} 
                    image={data.thumbNail}
                    addRemoveComic={(a:any)=>{props.addRemoveFromList(a)}}
                    issueNum={data.issueNumber}
                    key={i}
                    />
            })}
            </div>
        </div>
        )
}