import axios from 'axios';
import { message } from 'antd';

export const userlogin=(reqobj)=>async dispatch=>{
     dispatch({type: 'LOADING', payload:true})
     try {
        const response = await axios.post('https://rentalapp-qkk4.onrender.com/users/login', reqobj)
        localStorage.setItem('user', JSON.stringify(response.data))
        message.success('Login Sucessful😊')
        setTimeout(()=>{
         window.location.href='/';
       },500);
        dispatch({type: 'LOADING', payload:false})
     } catch(error){
        console.log(error);
        message.error('Invalid Credentials Please check your details')
        dispatch({type: 'LOADING', payload:false})
     }
}

export const userRegister=(reqobj)=>async dispatch=>{
    dispatch({type: 'LOADING', payload:true})
    try {
       await axios.post('https://rentalapp-qkk4.onrender.com/users/register', reqobj)
       message.success('Registeration Succesfull 😊Login Now')
       setTimeout(()=>{
         window.location.href='/Login';
       },500);      
       dispatch({type: 'LOADING', payload:false})      
    } catch(error){
       console.log(error)
       dispatch({type: 'LOADING', payload:false});
       message.error('Registration Failed')
    }
}
