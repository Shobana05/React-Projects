import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate,useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../App.css"
import logo from "./Ford-Logo.png";


function SideMenuBar() {
  const location = useLocation()
  const[activeTab,setActiveTab] = useState(location.pathname);
 const navigate=useNavigate();
 const handleNavigation=(path)=>{
  if(path !='/Tab'){
    setActiveTab(path);
  }
  else{
    setActiveTab('Team')
  }
  // setActiveTab(path?path:'/Team');
  console.log(activeTab,"activetab")
  navigate(path);
 }


  return (
    <div id="app" style={{ height: "100vh", display: "flex" }}>
      <Sidebar id="sidebar" style={{ height: "100vh"}}>
        <Menu>
         

          <div style={{ fontSize: "20px" }}>

          <img
              style={{
                width: "150px",
                marginLeft: "50px",
              }}
              src={logo}
              alt={"logo"}
            />
            <MenuItem
             className={`menuItem ${activeTab ==='/Home'?'active':''}`}
            
            icon={<HomeIcon />}  onClick={(e) => handleNavigation('/Home')}>
              Home
            </MenuItem>
            <MenuItem icon={<PersonIcon />} className={`menuItem ${activeTab==='/User'?'active':''}`} onClick={() => handleNavigation("/User")}>
              User
            </MenuItem>
            <MenuItem className={`menuItem ${activeTab==='/Team'?'active':''}`} icon={<GroupsIcon />} onClick={() =>handleNavigation('/Team')}>
              Team
            </MenuItem>
            
            <MenuItem
            className={`menuItem ${activeTab==='/NewsFeed'?'active':''}`}
              icon={<NotificationsIcon />}
              onClick={() => handleNavigation("/NewsFeed")}
            >
              News Feed
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SideMenuBar;
