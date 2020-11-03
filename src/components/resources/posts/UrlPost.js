import React,{useState,useEffect} from 'react';

export default function UrlPost({ record = {}, source }){
    
    const [imgs,setImgs]=useState([]);

    useEffect(()=>{

      if(record[source]){
      if(typeof record[source] !== 'object'){
          var ar=[record[source]];
              setImgs(ar);
      }else{
          setImgs(Object.values(record[source]));
      }}   

    },[record,source]);

    return(
        <>
        {imgs.map((e,i)=>
          <div className="urlPost" key={i}><a href={e} >{i}</a></div>
        )}
        </>
    );
}
