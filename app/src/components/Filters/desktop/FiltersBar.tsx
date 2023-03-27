import react from 'react';
import styles from '@/styles/Comic.module.css';


interface FilterProps{
    children?: JSX.Element|JSX.Element[];
    label:string
}


export default function FilterBar(props:FilterProps){

    return(
        <div className={styles.filter_bar}>
            <h5 style={{marginRight:'15px'}}>{props.label}</h5>
            {props.children}
        </div>
    )

}