import React from 'react'
import { useFetchPhotosQuery,useAddPhotoMutation } from '../store'
import Button from './Button';
import PhotoListItem from './PhotoListItem';
import Skeleton from './Skeleton';
function PhotoList({album}) {
    const{data,error, isFetching}=useFetchPhotosQuery(album);
    console.log(data);

    const[addPhoto,addPhotoResult]=useAddPhotoMutation();

    const handleAddPhotos=()=>{
        addPhoto(album);
    }


    let content;

    if(isFetching){
         content=<Skeleton className='h-8 w-8' times={4}/>
     }
     else if(error){
         content=<div> Error in fetching...</div>
     }
     else{
          content=data.map((photo)=>{
          return <PhotoListItem key={photo.id} photo={photo}/>
     })
     }

  return (
    <div>
    <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold '>Photos In :{album.title}</h3>
        <Button primary loading={addPhotoResult.isLoading} onClick={handleAddPhotos}>
            + Add Photos
        </Button>
        </div>
        <div className='mx-8 flex flex-row flex-wrap justify-center'>
           {content}
        </div>
    
    </div>
  )
}

export default PhotoList