import Head from 'next/head'
import ComicWrapper from '../components/Comic/ComicWrapper'
import styles from '@/styles/Home.module.css'
import FilterBar from '@/components/Filters/desktop/FiltersBar'
import {DropDown} from "@/components/Filters/desktop/Filters"
import {creators,characters} from '@/static/static'
import Favorites from "@/components/Common/Favorites/Favorites"
import {Header} from '@/components/Common/Header/Header'
import {Footer} from '@/components/Common/Footer/Footer'
import {DefaultTextbox} from '@/components/Common/Textbox/Textbox'
import {HeroBanner} from '@/components/Common/HeroBanner/HeroBanner' 
import {MarvelAPIRequest} from "@/API/comics/Marvel/MarvelAPI"
// import {MobileHeader} from '@/components/Mobile/Header/MobileHeader'
// import {MobileComicWrapper} from '@components/Mobile/ComicWrapper/MobileComicWrapper'
import useDataLoader from '@/hooks/custom/useDataLoader';
import useFavorites from '@/hooks/custom/useFavorites';
import {useState, useEffect} from 'react';

export default function Home(){

  const {data:comics, alt, isLoading, error, dataUpdate, setIsLoading} = useDataLoader(MarvelAPIRequest,[])
  const {list, setList, addRemoveFromList} = useFavorites([], comics);
  const [filters, updateFilters] = useState([]);
  const [page, setPage] = useState(0);
  const [mobile, setMobile] = useState(false);

  function checkMobile(){
    const resolution = window.innerWidth;
    if(resolution < 1024){
      setMobile(true);
    }else{
      setMobile(false)
    }
  }

  useEffect(function(){
    if(localStorage.getItem("favorites") === null){
      localStorage.setItem("favorites", JSON.stringify([]));
    }else{
      setList(JSON.parse(localStorage.favorites));
    }

    checkMobile();
  },[])


  function handleFilter(e:any){
    setIsLoading(true);
    let currentFilters:Array<any>
    currentFilters = filters;
    let findFilter = currentFilters.filter((filter)=>{
      return(filter[0]=== e[0])
    })
    if(e[0] !== "offset"){
      let offsetFilter  = currentFilters.filter((filter)=>{return filter[0] === "offset"});
      let offsetIndex = currentFilters.indexOf(offsetFilter[0]);
      currentFilters.splice(offsetIndex,1);
      currentFilters.push(["offset",0]);
    }

    if(findFilter.length === 0){
      console.log('adding filter')
      currentFilters.push(e);
      updateFilters(currentFilters);
      dataUpdate(filters)
    }else{
      let filterIndex = currentFilters.indexOf(findFilter[0]);
      currentFilters.splice(filterIndex,1);
      if(e[1] !== undefined){
        currentFilters.push(e);
      }
      updateFilters(currentFilters);
      console.log("filters",filters)
      dataUpdate(filters)
    }
  }


  return (
    <>
      <Head>
        <title>Comic Closet</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header style={{position:'relative',display:'grid', width:'100%', height:'500px'}}>
        <div style={{gridRow:'1', gridColumn:1,zIndex:2, width:'100%'}}>

          <Header listNumber={list.length}/>
        </div>
          <HeroBanner image='/hero-photo.png' text='Comic Closet'/>
      </header>
      <div style={{display:'block', margin:'10px'}}>
        <section>
          <DefaultTextbox 
          title="Comic Closet"
          text="Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit."
          />
        </section>
          <section className={styles.content_section}>
            <div style={{display:'flex', flexDirection:'column'}}>
              <FilterBar label="Filter By:">
                <DropDown label="Creators" key_values={creators()} onSelect={(a:any)=>{(handleFilter(a))}}/>
                <DropDown label="Characters" key_values={characters()} onSelect={(a:any)=>{(handleFilter(a))}}/>
              </FilterBar>
            <ComicWrapper 
              error={error} 
              isLoading={isLoading} 
              comics={comics} 
              favorites={list} 
              addRemoveFromList={(a:any)=>{addRemoveFromList(a)}} 
              handleFilter={(a:any)=>{(handleFilter(a))}}
              page={page}
              setPage={(a:any)=>{setPage(a)}}
              total= {alt[1]}
              offset={alt[0]}
              />
            </div>
            <Favorites label="Favorites" items={list} addRemoveFromList={(a:any)=>{addRemoveFromList(a)}}/>
          </section>
      </div>
      <Footer/>
    </>
  )
}
