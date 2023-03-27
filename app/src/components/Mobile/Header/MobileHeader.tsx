import react, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import styles from '@/styles/Comic.module.css'

interface Header{
    listNumber:number;
}


const logoImageLoader = ({src}:any)=>{
    return src
}

export function MobileHeader(props:Header){
    const [open, setOpen] = useState(false)

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
            <div> <FontAwesomeIcon icon={faBoltLightning} className={styles.btn_icon} style={{}}/><span>({props.listNumber})</span></div>
            <div style={{marginRight:'2%', marginTop:'5%', width:'50px', height: '21px'}}>
                    <FontAwesomeIcon icon={faBars} className={styles.btn_icon} style={{}}/>
            </div>
        </div>
    )
}