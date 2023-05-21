import axios from 'axios';
import { message } from 'antd';

export const getallProducts=()=>async dispatch=>{
     dispatch({type: 'LOADING', payload:true})
     try {
        const response = await axios.get('https://equipme-rentalapp.onrender.com/Products')
        dispatch({type:'GET_ALL_PRODUCTS', payload:response.data})
        dispatch({type: 'LOADING', payload:false})
     } catch(error){
        console.log(error);
        dispatch({type: 'LOADING', payload:false})
     }
}

export const addProducts=(reqobj)=>async dispatch=>{
   dispatch({type: 'LOADING', payload:true})
   try {
      await axios.post('https://equipme-rentalapp.onrender.com/Products/createproduct', reqobj);
      dispatch({type: 'LOADING', payload:false});
      message.success('New Product added Successfully 👍')
      setTimeout(()=>{
         window.location.href='/adminpage';
       },500);
   } catch(error){
      console.log(error);
      dispatch({type: 'LOADING', payload:false})
   }
}

export const editProducts=(reqobj)=>async dispatch=>{
   dispatch({type: 'LOADING', payload:true})
   try {
      await axios.post('https://equipme-rentalapp.onrender.com/Products/editproduct', reqobj);
      dispatch({type: 'LOADING', payload:false});
      message.success('Prdocut details Updated Successfully 👍')
      setTimeout(()=>{
         window.location.href='/adminpage';
       },500);
   } catch(error){
      console.log(error);
      dispatch({type: 'LOADING', payload:false})
   }
}

export const deleteProduct=(reqobj)=>async dispatch=>{
   dispatch({type: 'LOADING', payload:true})
   try {
      await axios.post('https://equipme-rentalapp.onrender.com/Products/deleteproduct', reqobj);
      dispatch({type: 'LOADING', payload:false});
      message.success('Prdocut deleted Successfully 👍')
      setTimeout(()=>{
         window.location.reload()
       },500);
   } catch(error){
      console.log(error);
      dispatch({type: 'LOADING', payload:false})
   }
}