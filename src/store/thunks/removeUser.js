import { faker } from '@faker-js/faker';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser=createAsyncThunk('users/removeUser' ,async(user) => {
    let response='';
    try{
    response = await axios.delete(`http://localhost:3005/users/${user.id}`);
    }catch(ee){
        console.log(ee);
    }
    console.log(response.data);
    return user;
  });
export {removeUser}

