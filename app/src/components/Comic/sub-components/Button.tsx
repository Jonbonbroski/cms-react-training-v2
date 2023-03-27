import React, {useState, useEffect, PropsWithChildren, DetailedHTMLProps, HTMLProps, MouseEventHandler} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/Comic.module.css';

interface Button extends PropsWithChildren{
    addRemoveComic: Function;
    id: number;
    selected: boolean;
}

export default function Button(props:Button){

    return (
        <div className={styles.btn_container}>
            <button className={(props.selected) ? styles.btn_selected : styles.btn_notselected} value={props.id} onClick={()=>{props.addRemoveComic(props.id)}}><FontAwesomeIcon icon={faBoltLightning} className={styles.btn_icon}/></button>
        </div>
    )
}

