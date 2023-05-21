import React, {useEffect,useState  } from "react";
import Defaultpage from "../Components/Defaultpage";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useDispatch,useSelector } from "react-redux";
import {editProducts} from '../Redux/actions/productsaction';
import { getallProducts } from "../Redux/actions/productsaction";
import CircularIndeterminate from "../Components/Componentsloader";
import { useParams,useNavigate } from "react-router-dom";

export default function EditProduct(){
    const {products} = useSelector((state) => state.productsreducer);
    const {loading} = useSelector((state)=>state.alertsreducer);
    var { productid } = useParams();
    const [form, setForm] = useState({});
    const [card, setCard] = useState({});
    const[totalproducts, setTotalproducts] = useState([]);
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const goBack = () => {
      navigate(-1);
    };
   

    useEffect(() => { 
        if (products.length === 0 ) {
            dispatch(getallProducts());
          } else {
            setTotalproducts(products)
            setCard(products.find((o) => o._id === productid));
            // console.log(card)
          }
      }, [products]);

  function handleInput(e) {
    if (e) {
      const formCopy = {
        ...form,
        [e.target.id]: e.target.value,
      };
      setForm(formCopy);
    }
  }

  function validatetextboxes(){
    form._id = card._id
    dispatch(editProducts(form))
    // console.log(form);
  }
         return(
            <Defaultpage>
                <div className="buttonavigate">
        <button onClick={goBack} className="backbutton">
          &lt;&lt;
        </button>
      </div>
                {loading && <CircularIndeterminate/>}
                <h3 className="createproduct text-start">ADD New Product</h3>
                <Grid
          container
          spacing={2}
          item={true}
          sx={{mt:4,justify: "Center" }}
        className='text-center'>
            <Grid item={true} xs={12} sm={12} lg={12} sx={{justify: "Center" }}>
               {totalproducts.length>0 && (<div className='producttextfield text-center'> 
            <Grid
                    container
                    spacing={1}
                    item={true}
                    sx={{p:3,justify: "Center" }}
                   className="bs2 m-20 text-start">
                        
            <Grid item={true} xs={12} sm={6} lg={6} className="addnewproducttocart" sx={{boxShadow: 3,borderRadius: '5px' }}>
             
                    <div className="">  
                    <TextField
                name="productid"
                id="productid"
                label="Product Label Id"
                variant="outlined"
                defaultValue={card.productid}
                sx={{ width: "100%", display: "flex", color: "black", my: 4 }}
                value={form && form["productid"]}
                onChange={handleInput}
              />
              <label for="name">Select Product Category </label>
  <select  name="name"
                id="name" value={form && form["name"]} onChange={handleInput}>
    <option value={card.name}>{card.name}</option>                
    <option value="Air Conditioner">Air Conditioner</option>
    <option value="Washing Machine">Washing Machine</option>
    <option value="Dish Washer">Dish Washer</option>
    <option value="Refridgerator">Refridgerator</option>
    <option value="Laptop">Laptop</option>
    <option value="Mobile Phone">Mobile Phone</option>
    <option value="Play Station">Play Station</option>
  </select>
              <TextField
                name="model"
                id="model"
                label="Product Name with model Number"
                variant="outlined"
                defaultValue={card.model}
                sx={{ width: "100%", display: "flex", color: "black", my: 4 }}
                value={form && form["model"]}
                onChange={handleInput}
              />
               <TextField
                name="description"
                id="description"
                label="Product Description"
                defaultValue={card.description}
                variant="outlined"
                sx={{ width: "100%", display: "flex", color: "black", my: 4 }}
                value={form && form["description"]}
                onChange={handleInput}
              />
               <TextField
                name="price"
                id="price"
                type="number"
                label="Seasoned Price in Rs."
                defaultValue={card.price}
                variant="outlined"
                sx={{ width: "100%", display: "flex", color: "black", my: 4 }}
                value={form && form["price"]}
                onChange={handleInput}
              />
             
                      </div> 
                    </Grid>

                    <Grid item={true} xs={12} sm={6} lg={6} className="addnewproducttocart" sx={{ boxShadow: 3,borderRadius: '5px' }}>  
                    <div className="">  
                    <TextField
                name="normalprice"
                id="normalprice"
                type="number"
                label="Normal Price in Rs."
                defaultValue={card.normalprice}
                variant="outlined"
                sx={{ width: "100%", display: "flex", color: "black", my: 4 }}
                value={form && form["normalprice"]}
                onChange={handleInput}
              />
              <label for="time">Select Duration</label>
  <select name="time" id="time" value={form && form["time"]} onChange={handleInput}>
  <option value={card.time}>{card.time}</option>    
    <option value="month">Month</option>
    <option value="week">Week</option>
  </select>
  <TextField
                name="image"
                id="image"
                label="Image URL"
                defaultValue={card.image}
                variant="outlined"
                sx={{ width: "100%", display: "flex", color: "black", my: 4 }}
                value={form && form["image"]}
                onChange={handleInput}
              />
               <TextField
                name="priceperhour"
                id="priceperhour"
                type="number"
                label="Enter Nominal Price Per Hour"
                defaultValue={(card.priceperhour).toFixed(2)}
                variant="outlined"
                sx={{ width: "100%", display: "flex", color: "black", my: 4 }}
                value={form && form["priceperhour"]}
                onChange={handleInput}
              />
              <TextField
                name="stocks"
                id="stocks"
                type="number"
                label="Enter Availbale Stocks"
                variant="outlined"
                defaultValue={card.stocks}
                sx={{ width: "100%", display: "flex", color: "black", my: 4 }}
                value={form && form["stocks"]}
                onChange={handleInput}
              />
                      </div> 
                    </Grid>
                    </Grid>
                    <div><button className="createproductbutton"  onClick={validatetextboxes}>Edit Product</button></div>
                    </div>)}  
                    </Grid>
                    </Grid>
            </Defaultpage>
         )
}