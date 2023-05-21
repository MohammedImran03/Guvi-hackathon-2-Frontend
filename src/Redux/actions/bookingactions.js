import axios from 'axios';
import { message } from 'antd';
// import { API } from "../global";


export const getallbookings=()=>async dispatch=>{
   dispatch({type: 'LOADING', payload:true})
   try {
      const response = await axios.get('https://rentalapp-qkk4.onrender.com/bookings/getallbookings')
      dispatch({type:'GET_ALL_Bookings', payload:response.data})
      dispatch({type: 'LOADING', payload:false})
   } catch(error){
      console.log(error);
      dispatch({type: 'LOADING', payload:false})
   }
}


export const Bookproduct=(reqobj)=>async dispatch=>{
     dispatch({type: 'LOADING', payload:true})
     try {
        await axios.post('https://rentalapp-qkk4.onrender.com/bookings/bookproduct', reqobj);
        message.success('Your Item Booked Successfully');
        setTimeout(()=>{
         window.location.href='/userbookings';
        },500);
        
        dispatch({type: 'LOADING', payload:false})
     } catch(error){
        console.log(error);
        dispatch({type: 'LOADING', payload:false})
        message.error('Something Went Wrong, Please try again Later')
     }
}

