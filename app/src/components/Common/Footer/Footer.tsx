import react from 'react';
import styles from '@/styles/Comic.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const logoImageLoader = ({src}:any)=>{
    return src
}


export function Footer(){

    return(
        <div className={styles.footer}>
            <div className='logo'>
                <Image
                    loader ={logoImageLoader}
                    src = {"/logo.png"}
                    height='106'
                    width='106'
                    alt="Comic Closet Logo"
                />
            </div>
            <div>
                <a href='#'>Privacy Policy</a><span> | </span><a href='#'>Terms of Service</a>
            </div>
            <div>
                <span>Copyright 2022. Comic Closet, LLC. All rights reserved.</span>
            </div>
        </div>
    )

}