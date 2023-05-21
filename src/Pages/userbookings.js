import React, { useEffect, useState } from "react";
import Defaultpage from "../Components/Defaultpage";
import { useSelector, useDispatch } from "react-redux";
import { getallbookings } from "../Redux/actions/bookingactions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularIndeterminate from "../Components/Componentsloader";
import { useNavigate } from "react-router-dom";

export default function Userbookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsreducer);
  const { loading } = useSelector((state) => state.alertsreducer);
  const user= JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const gohome = () => {
      navigate('/');
  }
  useEffect(() => {
    dispatch(getallbookings());
  }, []);
  return (
    <Defaultpage>
        <div className="buttonavigate"><button onClick={gohome} className="backbutton">Home</button></div>
        {loading && <CircularIndeterminate/>}
      <h1>MY Bookings</h1>
      <h3 className="myorder text-start">My Orders</h3>
      {/* <Box sx={{ flexGrow: 1 }}> */}
        <Grid
          container
          spacing={2}
          item={true}
          sx={{ p:2, pt: 2, justify: "Center" }}
        className='bottomgrid'>
            <Grid item={true} xs={12} sm={12} lg={8}>           
              {bookings.filter(o=>o.user==user._id).map((booking) => {
                return (
                    <Grid
                    container
                    spacing={0.5}
                    item={true}
                    sx={{ p:1, m:1,justify: "Center" }}
                   className="topgrid bs2 m-20 text-start">
                    <Grid item={true} xs={12} sm={4} lg={3} className='bookingsgrid'>
                      <p>
                        <b>{booking.productid.model}</b>
                      </p>
                      <p>
                        <b>Rent Amount:</b> {booking.productid.price}
                        {booking.productid.time == "week" ? (
                          <span>
                            <b>/Week</b>
                          </span>
                        ) : (
                          <span>
                            <b>/Month</b>
                          </span>
                        )}
                      </p>
                      <p>
                        <b>Total Days:</b> {Math.round(booking.totalhours / 24)}days
                      </p>
                      <p>
                        <b>Amount Paid:</b> {Math.round(booking.totalamount)} INR
                      </p>
                      <p>
                        <b>Total stocks:</b> {booking.stocks}
                      </p>
                    </Grid>
                    <Grid item={true} xs={12} sm={4} lg={6} className='bookingsgrid'>
                      <p><b>FROM:</b> <span> Date:</span>{booking.bookedTimeSlots.from.split('T')[0]} <span> Time:</span>{booking.bookedTimeSlots.from.split('T')[1].split('.')[0]}</p>
                      <p><b>TO:</b> <span> Date:</span>{booking.bookedTimeSlots.to.split('T')[0]} <span> Time:</span>{booking.bookedTimeSlots.to.split('T')[1].split('.')[0]}</p>  
                      <p><b>Order Placed:</b>  <span> Date:</span>{booking.createdAt.split('T')[0]}
                      <span> Time:</span>{booking.createdAt.split('T')[1].split('.')[0]}</p>
                      <p><b>Transaction id:</b>{booking.transactionid}</p>
                    </Grid>
                    <Grid item={true} xs={12} sm={4} lg={3}>
                        <span><img src={booking.productid.image} height='140' width='90%' style={{borderRadius:3}} className="bookingsimage p-2"></img></span>
                    </Grid>

                  </Grid>
                );
              })}
              </Grid>
        </Grid>
      {/* </Box> */}
    </Defaultpage>
  );
}
