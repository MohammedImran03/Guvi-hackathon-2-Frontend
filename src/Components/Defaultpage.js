import React from "react";
import "./Defaultpage.css";
import Avatar from "@mui/material/Avatar";
import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap";
import {Link} from 'react-router-dom';
import {HiOutlineLogout} from 'react-icons/hi';
import {BsJournalBookmarkFill} from 'react-icons/bs';
import {GrUserAdmin} from 'react-icons/gr';

export default function Defaultpage(props) {


    const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="header">
      <div className="headercontent d-flex justify-content-between">
          

      {/* <Grid  container spacing={1.5} item={true} sx={{p: 5, justify:"Center"}}>
      <Grid item={true} sx={{p: 2}}  className="Cardslist justify-Center" xs={12} sm={12} md={8} lg={10} > */}

      <h1 className="headercontenth1"><Link to='/' className="anchorlinkhead"><img src="https://img.lovepik.com/free-png/20210918/lovepik-shopping-cart-png-image_400246975_wh1200.png" className='defaultlogoimage'></img>Equip Me</Link></h1>
       <div className="Avatar">
        <UncontrolledDropdown setActiveFromChild>
          <DropdownToggle className="nav-link" tag="a">
          <Avatar sx={{ width: 56, height: 56 }}>{
         (user.userName)[0].toUpperCase()
          }</Avatar>
          </DropdownToggle>
          <DropdownMenu className="Dropdownlist">
          <DropdownItem href="#" tag="a">
              {user.userName}
            </DropdownItem>
            <Link to='/userbookings' className="anchorlinkbooking"><DropdownItem href="#" tag="a">
              My Bookings <BsJournalBookmarkFill className="userpageicos"/>
            </DropdownItem></Link>
            <Link to='/adminpage' className="anchorlinkbooking"><DropdownItem href="#" tag="a">
              Admin <GrUserAdmin className="userpageicos"/>
            </DropdownItem></Link>
            <DropdownItem className="anchorlinkbooking" onClick={()=>{
                localStorage.removeItem('user');
                window.location.href='/Login';
            }}>
              Log out <HiOutlineLogout className="userpageicos"/>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        </div>

      {/* </Grid>
      </Grid> */}
        
       
      </div>
      <div className="Content">{props.children}</div>
    </div>
  );
}
