import React, {useState, useEffect} from 'react';
import Comic from "./Comic";
import ComicAPIs from "@/API/APIs"
import styles from "@/styles/Comic.module.css"
import {MarvelAPIRequest} from "@/API/comics/Marvel/MarvelAPI"
import useDataLoader from '@/hooks/custom/useDataLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning, faChevronCircleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// Comic
// wrapping element inline style for the grif/ 
// Sub-Components
// - Image
// - Button(s)
// - Details

interface ComicProps{
    error:boolean;
    isLoading:boolean;
    comics:Array<any>
    favorites:Array<any>
    addRemoveFromList:Function
    handleFilter: Function
    page:number;
    setPage: Function,
    total:number,
    offset:number
}


export default function ComicWrapper(props:ComicProps){


    function changePage(e:any){
        let currentPage = props.page;
        if(e === "next"){
            currentPage += 15
            props.setPage(currentPage)
            props.handleFilter(["offset",currentPage]);
        }else{
            if(currentPage > 1){
                currentPage -= 15
                if(currentPage < 0){
                    currentPage = 0
                }
            }else{
                currentPage = 0
            }
            props.setPage(currentPage)
            props.handleFilter(["offset", currentPage]);
        }
    }

    if(props.error){
        return(
        <h1>Unable to grab content at this time</h1>
        )
    }else{
  
    if(props.isLoading){
        return(
        <div style={{display:'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 3fr))', gridGap: '15px'}}>
             <h1>Loding Content...</h1>
        </div>
        )
    }else{
  
        return (
            <div>
            <div style={{display:'grid', gridTemplateColumns: 'repeat(auto-fill, 183px)', gridGap: '20px', maxWidth:'995px'}}>
                {props.comics.map((data:any, i:number)=>{

                    return <Comic 
                        title={data.title} 
                        issueNum={data.issueNumber} 
                        publishDate={data.publishDate} 
                        creators={data.creators} 
                        image={data.thumbNail}
                        addRemoveComic={(a:any)=>{props.addRemoveFromList(a)}}
                        key={i}
                        id={data.id}
                        favorites={props.favorites}
                        selected={(props.favorites.indexOf(data.issueNum) === -1) ? false : true}/>
                })}
            </div>
            <div className={styles.pager_contrainer}>
                    <button id="previous" onClick={()=>{changePage("previous")}}><FontAwesomeIcon icon={faChevronLeft} style={{width: '9px', height:"18px", font: "normal normal normal 18px/16px Font Awesome 5 Free"}}/></button>
                        <span>{(props.offset+1)}-{(props.offset+15)} of {props.total}</span>
                    <button id="next" onClick={()=>{changePage("next")}}><FontAwesomeIcon icon={faChevronRight} style={{width: '9px', height:"18px", font: "normal normal normal 18px/16px Font Awesome 5 Free"}}/></button>
                </div>
            </div>
        )
    }
  }
};

