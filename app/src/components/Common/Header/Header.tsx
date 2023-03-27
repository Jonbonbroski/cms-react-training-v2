import react from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import styles from '@/styles/Comic.module.css'

interface Header{
    listNumber:number;
}


const logoImageLoader = ({src}:any)=>{
    return src
}

export function Header(props:Header){

    return(
        <div  style={{display:'flex', justifyContent:'space-between'}} className={styles.comic_header}>
            <div className='logo'>
                <Image
                    loader ={logoImageLoader}
                    src = {"/logo.png"}
                    height='106'
                    width='106'
                    alt="Comic Closet Logo"
                />
            </div>
            <div style={{display:'flex', justifyContent:'space-between', margin:'auto 40px auto 10px', width:'20%'}}>
                <li>
                <div className={styles.header_link}>
                    <a>Home</a>
                </div>
                </li>
                <li>
                <div className={styles.header_link}>
                    <a>Shop</a>
                </div>
                </li>
                <li>
                <div className={styles.header_link}>
                    <a><FontAwesomeIcon icon={faBoltLightning} className={styles.btn_icon}/> Favorites <span>({props.listNumber})</span></a>
                </div>
                </li>
            </div>
        </div>
    )
}