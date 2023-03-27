import React, { PropsWithChildren } from 'react';
import styles from '@/styles/Comic.module.css';


interface ComicDetails extends PropsWithChildren{
    title: string;
    issueNum : number;
    publishDate : string;
    creators : any;
}

export default function Details(props:ComicDetails){

    let date = new Date(props.publishDate)
    let day = props.publishDate.substring(8,10)
    let month = date.toLocaleString('default',{ month: 'long'});
    let year = date.getFullYear();

    return (
        <div className={styles.comic_details}>
            <h3 data-testid="comic-title">{props.title}</h3>
            <ul className={styles.comicDetails}>
                <li data-testid="comic-issue-number">
                    <label style={{float:'left'}}>
                        Issue:&nbsp; 
                    </label>
                    <p>{props.issueNum}</p>
                </li>
                <li>
                <label>
                    Published:
                </label>
                    <p data-testid="comic-published-date">
                    {month}&nbsp;{day}, {year}
                    </p>
                </li>
                <li>
                    <label>
                    Creators:
                    </label>
                        <p data-testid="comic-creators">
                        {props.creators.map((creator:{name:string}, i:number)=>{
                            let lastName = creator.name.split(' ').slice(-1).join(' ')
                            if(i < props.creators.length - 1){
                            return lastName + ", "
                            }else{
                            return lastName
                            }
                        })}
                    </p>
                </li>
            </ul>
        </div>
    )
}

