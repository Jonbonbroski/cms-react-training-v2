import Rect, { PropsWithChildren, useState, useEffect } from 'react';
import styles from '@/styles/Comic.module.css';
import Image from 'next/image';
import Button from './sub-components/Button';
import Details from './sub-components/Details';
// Comic
// wrapping element inline style for the grid
// Sub-Components
// - Image
// - Button(s)
// - Details
interface Comics extends PropsWithChildren{
    image: string;
    title: string;
    issueNum : number;
    publishDate :string;
    creators: any;
    addRemoveComic: Function;
    key: number;
    id:number;
    selected:boolean;
    favorites:Array<any>
}

const comicImageLoader = ({src}:any)=>{
    return src
}


export default function Comic(props:Comics){

    const [active, setActive] = useState(props.selected);

    useEffect(function(){
        let checkFavorites = props.favorites.find((comic:any)=>comic.id === props.id)
        if(checkFavorites === undefined){
            setActive(false);
        }else{
            setActive(true);
        }
    })

    let imageAlt = `Photo of comic book cover: ${props.title}`
    return (
            <div className={styles.comic_card}>
                <div>
                    <div className={styles.img_box}>
                        <Image
                            loader={comicImageLoader}
                            src = {(props.image !== undefined) ? props.image : "/Photo-unavailable.webp"}
                            fill={true}
                            alt={imageAlt}
                        />
                    </div>
                    <div>
                    <Button 
                        addRemoveComic={(a:any)=>{props.addRemoveComic(a)}}
                        id={props.id}
                        selected={active}>
                    </Button>
                    </div>
                </div>
                <Details 
                    title={props.title} 
                    issueNum={props.issueNum} 
                    publishDate={props.publishDate} 
                    creators={props.creators}>
                </Details>
            </div>

            )
}