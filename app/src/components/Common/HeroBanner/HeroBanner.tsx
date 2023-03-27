import react from 'react';
import Image from 'next/image'



interface HeroBanner{
    image:string;
    text?:string
}

const heroImageLoader = ({src}:any)=>{
    return src
}


export function HeroBanner(props:HeroBanner){

    return(
        <div style={{position:'relative', height:'100%',gridRow:'1', gridColumn:1, zIndex:1, width:'100%',display:'grid'}}>
            <Image
                src = {props.image}
                loader={heroImageLoader}
                fill={true}
                alt="Comic Closet Banner"
            ></Image>
            <div style={{gridRow:'1', gridColumn:1, zIndex:5, color:'#F8F8F2', margin:'auto', backgroundColor: '#C24868E6'}}>
                <h1 style={{font:'normal normal 900 3.5rem/2.3em Montserrat', paddingLeft:'1em', paddingRight:'1em',textShadow:"3px 3px 0px #000000"}}>{props.text}</h1>
            </div>
        </div>
    )

}