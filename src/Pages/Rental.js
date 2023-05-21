import React, { useEffect, useState } from "react";
import Defaultpage from "../Components/Defaultpage";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getallProducts } from "../Redux/actions/productsaction";
import { getallbookings } from "../Redux/actions/bookingactions";
import Grid from "@mui/material/Grid";
import CircularIndeterminate from "../Components/Componentsloader";
import "./Pages.css";
import { DatePicker, Space } from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import Checkbox from "@mui/material/Checkbox";
import { Bookproduct } from "../Redux/actions/bookingactions";
import { Modal } from "antd";
import { BsCart4 } from "react-icons/bs";

export default function Rentalpage() {
  // const params= useParams();
  // const match = useMatch();
  const { products } = useSelector((state) => state.productsreducer);
  const { loading } = useSelector((state) => state.alertsreducer);
  const { bookings } = useSelector((state) => state.bookingsreducer);
  const [card, setCard] = useState({});
  const [bookcard, setBookcard] = useState({});
  const dispatch = useDispatch();
  var { productid } = useParams();
  var time = 0;
  var bussinessamount = 0;
  const { RangePicker } = DatePicker;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalhours, setTotalhours] = useState();
  const [delivery, setDelivery] = useState(false);
  const [totalamount, setTotalamount] = useState(1);
  const [count, setCount] = useState(1);
  const [bookingprice, setBookingprice] = useState();
  const [showmodal, setShowmodal] = useState(false);
  var user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const Rentalperiod = (dateString: [string, string] | string) => {
    setFrom(dateString[0]);
    setTo(dateString[1]);
    // setTime=(new Date(dateString[1])) - (new Date(dateString[0]));
    time = new Date(dateString[1]) - new Date(dateString[0]);
    setTotalhours(time / 60000 / 60);
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getallProducts());
    } else {
      setCard(products.find((o) => o._id === productid));
    }
  }, [products]);

  useEffect(() => {
    dispatch(getallbookings());
  }, []);

  useEffect(() => {
    setTotalamount(Math.round(totalhours * card.priceperhour * count));
  }, [totalhours, count]);

  function Completebooking() {

    var options = {
      key: "rzp_test_zh0ip9Fg2ELvay",
      amount: bussinessamount * 100,
      currency: "INR",
      name: "Equip ME",
      description: `${card.model}`,
      handler: function (response) {
        const reqobj={
          user: JSON.parse(localStorage.getItem('user'))._id,
          productid:card._id,
          stocks:count,
          totalhours,
          transactionid:response.razorpay_payment_id,
          totalamount:bussinessamount,
          delivery:delivery,
          bookedTimeSlots:{
            from,
            to
          }
        }
        dispatch(Bookproduct(reqobj)) 
      },
      image:
        "https://img.lovepik.com/free-png/20210918/lovepik-shopping-cart-png-image_400246975_wh1200.png",
      prefill: {
        name: user,
        email: "user@gmail.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  }

  return (
    <Defaultpage>
      <div className="buttonavigate">
        <button onClick={goBack} className="backbutton">
          &lt;&lt;
        </button>
      </div>
      {loading && <CircularIndeterminate />}

      <div
        className="Rentalpage d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Grid
          container
          spacing={1}
          item={true}
          sx={{ px: 2, justifyContent: "center" }}
        >
          <Grid
            item={true}
            className="Cardslist"
            xs={12}
            sm={12}
            // md={4}
            lg={6}
          >
            <img src={card.image} className="Bookingimage bs1" />
          </Grid>
          <Grid
            item={true}
            className="Cardslist"
            xs={12}
            sm={12}
            // md={4}
            lg={6}
          >
            {/* Product info */}
            <div>
              <div className="Productdescription">Product Info</div>
              <div className="text-start">
                <p style={{ textAlign: "center" }}>{card.model}</p>
                <p>
                  Price: {card.price}
                  <span> Rent Per {card.time}</span>{" "}
                </p>
                <p>
                  price per hour:
                  {Math.round(card.priceperhour)}
                  <span></span>
                </p>
                <p>Description: {card.description}</p>
                <p>
                  Offer:{" "}
                  {Math.round(
                    ((card.price - card.normalprice) / card.price) * 100
                  )}
                  %
                </p>
                <p>
                  Stocks Available:{" "}
                  {card.stocks >= 1 ? (
                    <span className="stocknumberrental">{card.stocks}</span>
                  ) : (
                    <span className="nostocks">No Stocks Left</span>
                  )}
                </p>
                <p>
                  {" "}
                  Qty:{" "}
                  <button
                    className="stockbutton"
                    onClick={() => {
                      if (count > 1) {
                        setCount(count - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <span className="stocknumber">{card.stocks ? count : 0}</span>
                  <button
                    className="stockbutton"
                    onClick={() => {
                      if (count < card.stocks) {
                        setCount(count + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </p>
                {/* <p><button onClick={decreament}>-</button>{count}<button onClick={increament(card.stocks)}>+</button></p> */}
              </div>
            </div>
            {/* Rental period  */}
            {card.stocks >= 1 ? (
              <>
                <div className="Productdescription">
                  Select Your Rental Period
                </div>
                <Space direction="vertical" size={30}>
                  <RangePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={Rentalperiod}
                  />
                </Space>
              </>
            ) : (
              <>
                <button
                  className="Booknowbtn2"
                  onClick={() => {
                    setShowmodal(true);
                  }}
                >
                  Check date
                </button>
              </>
            )}

            {from && to && (
              <div>
                <div>Rental Period</div>
                <div>
                  <p>
                    {card.time == "week" ? (
                      <p className="text-start">
                        Total week: {Math.round(totalhours / 168)}
                      </p>
                    ) : (
                      <p className="text-start">
                        Total Month: {Math.round(totalhours / 720)}
                      </p>
                    )}
                  </p>
                  <p className="text-start">
                    Total Days: {Math.round(totalhours / 24)}
                  </p>

                  <div className="text-start">
                    Home Delivery
                    <Checkbox
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDelivery(true);
                        } else {
                          setDelivery(false);
                        }
                      }}
                    />
                  </div>
                </div>

                <p className="text-start">
                  <h4>
                    Total Price:
                    {
                      (bussinessamount = Math.round(
                        totalamount + (delivery && (totalamount / 100) * 8.5)
                      ))
                    }{" "}
                    INR{" "}
                  </h4>{" "}
                </p>
                {card.stocks ? (
                  <button className="Booknowbtn" onClick={Completebooking}>
                    Book NOw
                  </button>
                ) : (
                  " "
                )}
              </div>
            )}
          </Grid>
        </Grid>
      </div>
      <Modal
        visible={showmodal}
        closable={false}
        footer={false}
        title="Product will be Available After"
      >
        {/* {bookings.filter(o=>o.productid==productid).map((booking) => {
                return (<>
                </>)}
      } 
      */}
        <button
          className="closebutton"
          onClick={() => {
            setShowmodal(false);
          }}
        >
          Close
        </button>
      </Modal>
    </Defaultpage>
  );
}
