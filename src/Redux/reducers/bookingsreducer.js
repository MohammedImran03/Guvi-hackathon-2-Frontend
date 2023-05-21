const initialData ={
    bookings:[]
};

export const bookingsreducer = (state=initialData, action)=>{
    switch(action.type)
    {
        case 'GET_ALL_Bookings':{
            return{
                ...state,
                bookings : action.payload
            }
        }
        default:return state
    }
}