import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addUser, fetchUsers,removeUser } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import UserListItem from './UserListItem';
import { useThunk } from '../hooks/useThunk';

// function useThunk(thunk){
//   const[isLoading,setIsLoading]=useState(false);
//   const[error,setError]=useState(null);
//   const dispatch = useDispatch();

//   const runThunk=useCallback(()=>{
//     setIsLoading(true);
//     dispatch(thunk())
//     .unwrap()
//     .catch(err=>setError(err))
//     .finally(()=>setIsLoading(false))
//   },[dispatch,thunk])
// return[runThunk,isLoading,error];
// }


function UsersList() {
  const dispatch = useDispatch();
  const[doFetchUsers,isLoadingUsers,loadingUsersError]=useThunk(fetchUsers);
  const[doAddUsers,isLoadingAddedUser,addedUsersError]=useThunk(addUser);

  // const[isCreatingUser,setIsCreatingUser]=useState(false);
  // const[creatingUsersError,setCreatingUsersError]=useState(null);

  // const {data,isLoading,error}=useSelector((state)=>{
  //   console.log(state.users);
  //   return state.users
  // })

  const {data}=useSelector((state)=>{
    console.log(state.users);
    return state.users
  })

  useEffect(() => {

    doFetchUsers();
    // setIsLoadingUsers(true);
    // dispatch(fetchUsers())
    //   .unwrap()
    //   .catch((err) => setLoadingUsersError(err))
    //   .finally(() => setIsLoadingUsers(false));
  }, [dispatch]);

const handleClick=()=>{
  doAddUsers();
  // setIsCreatingUser(true);
  // dispatch(addUser())
  //   .unwrap()
  //   .catch((err) => setCreatingUsersError(err))
  //   .finally(() => setIsCreatingUser(false));
}
const handleDeleteUser=(user)=>{
  dispatch(removeUser(user))
}
let content;
  if(isLoadingUsers){
    content = <Skeleton times={6} className="h-10 w-full"/>
  }
  else if(loadingUsersError){
    content = <div>....Error</div>
  }
  else{
    content=data.map((user)=>{
      return <UserListItem key={user.id} user={user}/>
      
      // <div key={user.id} className='mb-2 border rounded'>
      //       <div className='flex p-2 justify-between items-center cursor-pointer'>
      //         <AiFillDelete onClick={()=>handleDeleteUser(user)}/>
      //         {user.name}
      //       </div>
      // </div>
    })
  }

  

  return <div>
    <div className='flex flex-row justify-between m-3'>
      <h1 className='m-2 text-xl'>Users</h1>
        <Button onClick={handleClick} loading={isLoadingAddedUser}>
          + ADD
        </Button>
     
        {
          addedUsersError && 'Error Creating User.....'
        }
      
    </div>
    {content}
  </div>;
}

export default UsersList;
