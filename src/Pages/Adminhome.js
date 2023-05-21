import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm } from "antd";
import Defaultpage from "../Components/Defaultpage";
import { useSelector, useDispatch } from "react-redux";
import { getallProducts } from "../Redux/actions/productsaction";
import {deleteProduct} from '../Redux/actions/productsaction';
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
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function Adminhomepage() {
  const { products } = useSelector((state) => state.productsreducer);
  const { loading } = useSelector((state) => state.alertsreducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallProducts());
  }, []);

  return (
    <Defaultpage>
      {loading === true && <CircularIndeterminate />}
      <h3 className="Adminpage text-start">Admin Page</h3>
      <div>
        <Link className="anchorlink" to="/addproduct">
          <button className="newproductbutton">Add New Product</button>
        </Link>
      </div>
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
                        <span className="pricelist">
                          <b>Seasoned Price: </b>
                        </span>
                        <b>{cards.price}</b>
                      </div>
                      <div>
                        <span className="pricelist">
                          <b>Normal Price: </b>
                        </span>
                        <b>{cards.normalprice}</b>
                      </div>
                      <div className="stocks">
                        <span className="pricelist">
                          <b>Stocks: </b>
                        </span>
                        <b>{cards.stocks}</b>
                      </div>
                      <div>
                        <Link to={`/editproduct/${cards._id}`}>
                          <button className="eitanddeletebutton mr-3">
                            <AiFillEdit className="editicon" />
                          </button>
                        </Link>

                        <Popconfirm
                          title="Delete this Product"
                          description="Are you sure to delete this Product?"
                          onConfirm={()=>{dispatch(deleteProduct({Productid:cards._id}))}}
                          okText="Yes"
                          cancelText="No"
                 
                        >
                          <button className="eitanddeletebutton mr-3"><AiFillDelete className="deleteicon"/></button>
                        </Popconfirm>
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
