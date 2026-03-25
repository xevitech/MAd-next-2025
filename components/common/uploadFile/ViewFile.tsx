import PopoverSlider from '@/components/miniSite/PopoverSlider';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import _ from 'lodash';
const ViewFile = (props:any) => {
    const {fileName,fileOriginalName,files}=props;
    const [imageSrc, setImageSrc] = useState<any>("");
    const [viewImage, setViewImage] = useState<any>(false);

    useEffect(()=>{
      if(typeof fileOriginalName === "object" && fileOriginalName !== null ){
        if( fileOriginalName?.id){
          setImageSrc(fileOriginalName?.source)
      }else if(fileOriginalName?.file_original_name){
        setImageSrc(fileOriginalName?.file_original_name)
      }else{   
          const reader = new FileReader();
          reader.onload = (e) => {
            setImageSrc(e.target.result);
          };
          reader?.readAsDataURL(fileOriginalName);
      }
      }      
    },[files])


  return (<>
    {viewImage && (
        <PopoverSlider
          open={viewImage}
          handleClose={() => setViewImage(false)}
          activedata={{ images: [{source:imageSrc}] }}
          rowData={[]}
        />
      )}   
            {imageSrc && <Image alt="Image" src={imageSrc} width={20} height={20} style={{marginTop:"7px",cursor:"pointer"}} onClick={()=>setViewImage(true)} />} 
    </>
  )
}

export default ViewFile