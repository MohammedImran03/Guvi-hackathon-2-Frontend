import React, { useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import "./Pages.css";
import { useDispatch, useSelector } from "react-redux";
import { userlogin } from "../Redux/actions/userActions";
import CircularIndeterminate from "../Components/Componentsloader";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

export default function Loginpage() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsreducer);

  function handleloginInput(e) {
    if (e) {
      const formCopy = {
        ...form,
        [e.target.id]: e.target.value,
      };
      setForm(formCopy);
    }
  }
  // console.log(form);

  function validatetextboxes() {
    // console.log(form);
    dispatch(userlogin(form));
  }
  return (
    <>
      <div className="loginscreen">
        {loading && <CircularIndeterminate />}
        <Grid container spacing={1.5} sx={{ p: 5, justify: "Center" }}>
          <Grid
            item={true}
            sx={{ p: 2, position: "relative" }}
            className="Cardslist"
            xs={12}
            sm={6}
            md={8}
            lg={8}
          >
            <span>
              <img
                data-aos="slide-down"
                data-aos-duration="2000"
                className="loginimage"
                src="https://us.123rf.com/450wm/normaals/normaals2208/normaals220800082/190819352-utilities-and-energy-consumption-for-home-water-and-heating-outline-concept.jpg?ver=6"
                alt="Designlogo"
              ></img>
            </span>
            <h1 className="loginlogo">Equip me</h1>
          </Grid>
          <Grid
            item={true}
            sx={{ p: 2 }}
            className="form Loginpage"
            xs={12}
            sm={6}
            md={4}
            lg={4}
          >
            <span>Log in</span>
            <hr></hr>
            <div className="textfields">
              <TextField
                required
                id="userName"
                label="Username"
                variant="outlined"
                sx={{ width: "100%", display: "flex", color: "black", my: 4 }}
                value={form && form["userName"]}
                onChange={handleloginInput}
              />

              <TextField
                required
                id="password"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                sx={{
                  display: "flex",
                  width: "100%",
                  my: 4,
                }}
                value={form && form["password"]}
                onChange={handleloginInput}
              />
              <span className="Submitbutton">
                <button
                  onClick={validatetextboxes}
                  disabled={!form["userName"] || !form["password"]}
                >
                  Log in
                </button>
              </span>
            </div>
            <Link className="anchorlink" to="/Register">
              <span className="anchorlinkname">New user Create Account</span>
              Register...
            </Link>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
