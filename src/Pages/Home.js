import React, {useEffect,useState  } from "react";
import Defaultpage from "../Components/Defaultpage";
import { useSelector, useDispatch } from "react-redux";
import { getallProducts } from "../Redux/actions/productsaction";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { BsCartPlusFill } from "react-icons/bs";
import CircularIndeterminate from "../Components/Componentsloader";
import "./Pages.css";
import Avatar from '@mui/material/Avatar';
import { GoDeviceMobile } from 'react-icons/go';
import {AiOutlineLaptop} from 'react-icons/ai';
import {TbAirConditioning} from 'react-icons/tb';
import {GiSofa, GiDeliveryDrone} from 'react-icons/gi';
import {SlScreenDesktop} from 'react-icons/sl';
import {RiGamepadLine} from 'react-icons/ri'
import { getCardActionAreaUtilityClass } from "@mui/material";


export default function Homepage() {
  const { products } = useSelector((state) => state.productsreducer);
  const { loading } = useSelector((state) => state.alertsreducer);
  const dispatch = useDispatch();
  // const [input, setInput] = useState("");
  // const [filtereddata, setFiltereddata] = useState([]);

  // function getdata(value){
  //   if(value=='Mobile'){
  //     let tempdata= products.filter((data)=>data.name =='Mobile');
  //     setFiltereddata([...tempdata]);
  //   } else{
  //      setFiltereddata(products);
  //   }
  // }

  useEffect(() => {
    dispatch(getallProducts());
  
  }, []);

  return (
    <Defaultpage>
      {/* <div className="d-flex p-2 optionsicons">
        <Avatar sx={{ width: 70, height: 70, bgcolor: '#ff9100'}} className="avatarlogo"><GoDeviceMobile className="reactlogo"/></Avatar>
      <Avatar sx={{ width: 70, height: 70, bgcolor: '#ff9100' }} className="avatarlogo"><AiOutlineLaptop className="reactlogo"/></Avatar>
      <Avatar sx={{ width: 70, height: 70, bgcolor: '#ff9100' }} className="avatarlogo"><RiGamepadLine className="reactlogo"/></Avatar>
      <Avatar sx={{ width: 70, height: 70, bgcolor: '#ff9100' }} className="avatarlogo"><GiDeliveryDrone className="reactlogo"/></Avatar>
      <Avatar sx={{ width: 70, height: 70, bgcolor: '#ff9100' }} className="avatarlogo"><TbAirConditioning className="reactlogo"/></Avatar>
      <Avatar sx={{ width: 70, height: 70, bgcolor: '#ff9100' }} className="avatarlogo"><SlScreenDesktop className="reactlogo"/></Avatar>
      <Avatar sx={{ width: 70, height: 70, bgcolor: '#ff9100' }} className="avatarlogo"><GiSofa className="reactlogo"/></Avatar>
     
      
      </div> */}
      {loading === true && <CircularIndeterminate />}
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          item={true}
          sx={{ p: 4, pt: 7, justify: "Center" }}
        >
          {products.map((cards) => {
            return (
              <>
                <Grid
                  item={true}
                  className="Cardslist"
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  key={cards.id}
                >
                  <div className="Products">
                    <Card sx={{ Width: 300, height: 500, P: 2 }}>
                      <div className="productimage">
                        <CardMedia
                          sx={{ height: 250, Width: 150 }}
                          image={cards.image}
                          title="{cards.model}"
                          className="imagehover"
                        />
                      </div>
                      <CardContent>
                        <Typography className="cardmodel">
                          {cards.model}
                        </Typography>
                        <Typography variant="body2">
                          <span className="INR">INR</span> {cards.price}
                          <span className="Pricetime">/{cards.time}</span>
                        </Typography>
                        <div className="carddescription">
                          {cards.description}
                        </div>
                      </CardContent>
                      <div>
                        {Math.round(
                          ((cards.price - cards.normalprice) / cards.price) *
                            100
                        )}
                        <span className="percentage">%</span>Offer<span></span>
                      </div>
                      <div className="stocks">{cards.stocks>=1 ?<>{cards.stocks} Stocks left</>: <div></div> } </div>
                      <div className="cartbutton">

                            {cards.stocks >0 ? <Link 
                            className="anchorlink"
                            to={`/Rental/${cards._id}`}
                          ><button type="button" className="Booknowbtn1">
                            Book Now<BsCartPlusFill />
                        </button>
                          </Link> : <div className="productmessage">Currently Product Not Available  !
                          <Link className="anchorlink"  to={`/Rental/${cards._id}`}><button className="Booknowbtn2">Check Availability</button>
                          </Link>


                          </div> }
                          
                          
                      </div>
                    </Card>
                  </div>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Box>
    </Defaultpage>
  );
}
