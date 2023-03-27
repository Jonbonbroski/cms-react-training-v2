import react from 'react';
import styles from '@/styles/Comic.module.css';


interface Textbox{
    title:string;
    text: string;
}

export function DefaultTextbox(props:Textbox){

    return(
        <div className={styles.textbox}>
            <div>
                <h1>{props.title}</h1>
            </div>
            <div>
                <p>{props.text}</p>
            </div>
        </div>
    )

}