import React from 'react'
import { GoTrashcan } from 'react-icons/go'
import Button from './Button'
import { removeUser } from '../store'
import { useThunk } from '../hooks/useThunk'
import ExpandabelPanel from './ExpandabelPanel'
import AlbumList from './AlbumList'

function UsersListItem({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);
  
    const handleClick = () => {
      doRemoveUser(user);
    };
  
    const header = (
      <>
        <Button className="mr-3" loading={isLoading} onClick={handleClick}>
          <GoTrashcan />
        </Button>
        {error && <div>Error deleting user.</div>}
        {user.name}
      </>
    );
  
    return <ExpandabelPanel header={header}>
        <AlbumList user={user}/>
    </ExpandabelPanel>;
  }
  
  export default UsersListItem;