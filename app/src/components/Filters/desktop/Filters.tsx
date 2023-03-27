import react, {useState} from 'react';

interface FilterProps{
  label?:string
  key_values: Array<Array<string>>
  onSelect:any;
}


export function DropDown(props:FilterProps){

    const dropDownSelect =(e:string)=>{
      let filter:Array<any> = [];
      let option = props.key_values.filter((item)=>{
        return item[1] === e
      })
      if(option.length !== 0){
        filter = [props.label?.toLowerCase(),e]
      }else{
        filter = [props.label?.toLowerCase(), undefined]
      }
      props.onSelect(filter);
    }

    return (
        <div style={{marginRight:'15px'}}>
            <select 
              name={props.label} 
              id={props.label} 
              style={{color:'white', backgroundColor:'black', borderColor:'white', borderRadius:".5", height:'30px', width:'250px'}} 
              defaultValue={props.label}
              onChange={(e)=>{dropDownSelect(e.target.value)}}>
                <option value={props.label}>{props.label}</option>
                {props.key_values?.map(([key,value])=>{
                  return(
                    <option value={value} key={key}>{key}</option>
                  )
                })}
            </select>
        </div>
    );

}