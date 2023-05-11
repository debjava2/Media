import React from 'react'
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import { GoTrashcan } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import PhotoList from './PhotoList';

function AlbumListItem({album}) {
    const [removeAlbum,result]=useRemoveAlbumMutation();

    const handleRemoveAlbum=()=>{
        removeAlbum(album);
    }

    const header = <>
        <Button onClick={handleRemoveAlbum} loading={result.isLoading}>
            <GoTrashcan/>
        </Button>
        {album.title}</>;

    return (
      <ExpandablePanel key={album.id} header={header}>
       <PhotoList album={album}/>
      </ExpandablePanel>
    );
}

export default AlbumListItem
