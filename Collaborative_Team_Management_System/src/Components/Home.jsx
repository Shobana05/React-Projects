import React from "react";
import SideMenuBar from "./SideMenuBar";
import employee from "./ford-employees.png";
import team from "./team-pic.png";
import icon from "./logo.jpeg";
import '../App.css'
import {
  Box,
  Button,
  Fab,
  Modal,
  Tooltip,
  Card,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../App.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Home() {
  useEffect(() => {
    document.title = "AnnonceNet_Home";
  }, []);
  const username = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userID");
const role=localStorage.getItem("UserRole");
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleBackButton = () => {
    handleClose();
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex" }}>
        <SideMenuBar />
      </div>
     
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            color: "white",
            backgroundColor: "#1a237e",
            height: "70px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <div>
            <h4>Welcome {username}</h4>
          </div>
          <div
            style={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Tooltip title="Profile">
              <Fab onClick={handleOpen} color="lightblue" aria-label="Profile">
                <AccountCircleIcon
                  style={{ fontSize: "xxx-large", color: "navy" }}
                />
              </Fab>
              <Modal open={open} onClose={handleClose}>
                <Box className="Profile-Modal">
                  <ArrowBackIcon
                    style={{
                      fontSize: "35px",
                      marginLeft: "30px",
                      marginTop: "-30px",
                      cursor: "pointer",
                    }}
                    onClick={handleBackButton}
                  />
                  <AccountCircleIcon
                    style={{
                      fontSize: "100px",
                      marginTop: "30px",
                      marginLeft: "140px",
                      color: "#607d8b",
                    }}
                  />
                  <h1
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    Profile
                  </h1>
                  <p style={{ marginTop: "60px", marginLeft: "20%" }}>
                    <div style={{ display: "flex" }}>
                      <h3 style={{ fontWeight: "bold" }}>Name: </h3>
                      <h4 style={{ marginLeft: "20px" }}>{username}</h4>
                    </div>
                    <div style={{ display: "flex" }}>
                      <h3 style={{ fontWeight: "bold" }}>Email: </h3>
                      <h4 style={{ marginLeft: "20px" }}>{userEmail} </h4>
                    </div>
                    {/* <div style={{ display: "flex" }}>
                      <h3 style={{ fontWeight: "bold" }}>UserId: </h3>
                      <h3 style={{ marginLeft: "10px" }}>{userId} </h3>
                    </div> */}
                    <div style={{ display: "flex" }}>
                      <h3 style={{ fontWeight: "bold" }}>Role: </h3>
                      <h4 style={{ marginLeft: "10px" }}>{role} </h4>
                    </div>
                  </p>
                  <Button
                    style={{
                      marginLeft: "375px",
                      marginTop: "40px",
                      backgroundColor: "#1a237e",
                      color: "white",
                    }}
                    onClick={() => navigate("/")}
                  >
                    Logout
                  </Button>
                </Box>
              </Modal>
            </Tooltip>
          </div>
        </div>
        <div style={{ padding: "10px",height:"100vh",position:"fixed" }} className="content">
          <div>
            <h1 style={{ color: "#040946" }}><img  style={{width:"50px",borderRadius:"40px"}}src={icon}/>Welcome to Announce Net</h1>
          </div>
         
         
          
          <div style={{ display: "flex",justifyContent:"space-between" }} >
        
                    
         <div  style={{fontSize: "22px", width: "700px",color:"black",textAlign:"justify",marginRight:"20px"}}>
          <ul>
            <li style={{color:"darkblue",fontWeight:"bold"}}>
             MEET OUR TEAMS
            </li>
          </ul>
          <p style={{fontSize:"20px"}}>Discover our dynamic teams with a glance at their names and current active status.Stay informed with realtime updates on team availability and engagement. Discover the heartbeat of FORD through our dedicated teams.From innovators to collaborators, our teams embody diversity and expertise. </p>
<ul>
  <li style={{color:"darkblue",fontWeight:"bold"}}>
    OUR TEAM HUB
  </li>
</ul>
<p style={{fontSize:"20px"}}>
 You go to space for seamless collaboration and connection within our organization. View the email addresses associated with our team member for easy communication.
</p>
<ul>
  <li style={{color:"darkblue",fontWeight:"bold"}}>
    TEAM-CENTRIC NEWSFEED
  </li>
</ul>
<p style={{fontSize:"20px"}}>Our website features a dynamic newsfeed tailored to highlight updates relevant to our team.  From
                groundbreaking achievements to the latest trends, fuel your
                curiosity and keep pace with the ever-evolving landscape of your
                interests.</p>
             
              </div>
          
           
       
            {/* <img src={employee} style={{ width: "620px", height: "350px" }} /> */}
            <img
              src={team}
              style={{ width: "700px", height: "600px",borderRadius:"20px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
