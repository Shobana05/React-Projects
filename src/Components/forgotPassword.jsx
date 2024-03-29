import { AppBar, Button, Card, useScrollTrigger } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"
import errorpic from  "../Components/error.png"



function ForgotPassword() {
 
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async() => {
  
    try {
      if (!email) {
        setError("Email Id is required")
        return;
      }
      else {
        const response = await axios.post("http://localhost:8080/user/forgot/password", {
          email: email
        })
        console.log("loginre", response.data.data)

        if (response.data.code === 200) {
          const email = response.data.data.email;
          const accessCode = response.data.data.verificationCode;

          let detail = {
            email: email,
            code: accessCode,
          }

          navigate("/VerificationCode")
         localStorage.setItem("ForgotPassword", JSON.stringify(detail))
        } else {
          setError(response.data.message)
        }
      }

    }
    catch (error) {
      console.error("errorstruct",error);
      if (error.response &&error.response.data&& error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("unexpected error")
      }
    }
  }
  return (
    <div >
      <AppBar style={{ height: "50px", fontSize: "20px", padding: "15px" }}>
        Ford Announce Net
      </AppBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "100px",
        }}
      >
        <Card
          style={{
            height: "500px",
            width: "900px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "100px",
          }}
        >
          <div style={{ fontSize: "50px", fontFamily: "sans-serif", color: "navy" }}>
            Forgot your Password!
          </div>


          <div style={{ fontSize: "20px" }}>
            Welcome back! Please enter your details
          </div>

          <div style={{ display: "flex",
            flexDirection: "column",
            alignItems: "center"}}>
          
  {error&&<p style={{color:"red",fontSize:"20px",textAlign:"center",marginTop:"10px",marginRight:"50px"}}>
                           <img src={errorpic}style={{width:"4%"}}/>

              {error}</p>}
            <div>
              <input
                style={{
              marginTop:"15px",
    padding:"20px",
                  marginBottom:"20px",
                  width: "250px",
                  height: "50px",
                  fontSize: "20px",
                  borderRadius: "5px",
                }}
                placeholder="Enter your email"
                onChange={(event) => setEmail(event.target.value)}
              />

            </div>
          
            <Button
              style={{ marginTop: "30px" }}
              variant="contained"
              onClick={handleSubmit}
            >
              Send verification code
            </Button>
          </div>
       
      
        </Card>
      </div>
    </div>
  );
}

export default ForgotPassword;
