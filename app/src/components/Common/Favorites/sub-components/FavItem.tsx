import react from 'react';
import Image from 'next/image';
import styles from '../../../../styles/Comic.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface FavItem{
    image:string;
    id:number;
    title:string;
    addRemoveComic: Function;
    issueNum: number;
}


const comicImageLoader = ({src}:any)=>{
    return src
}


export default function FavItem(props:FavItem){
    return(
        <div style={{display:'flex', justifyContent:"space-evenly", left:"-20px", marginBottom:"15px"}}>
        <div>    
            <button onClick={()=>{props.addRemoveComic(props.id)}} className={styles.favorite_remove_btn}><FontAwesomeIcon icon={faXmark} style={{height:'10px', width:'10px'}}/></button>
            <Image
                loader={comicImageLoader}
                src = {(props.image !== undefined) ? props.image : "/Photo-unavailable.webp"}
                width= {50}
                height= {75}
                alt={"imageAlt"}
            />
        </div>
        <div>
            <ul>
                <li>
                    <p>{props.title}</p>
                </li>
                <li>
                    <p>Issue: {props.issueNum}</p>
                </li>
            </ul>
        </div>
    </div>
    )
}