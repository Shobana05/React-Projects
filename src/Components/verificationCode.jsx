import {
  AppBar,
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import errorpic from  "../Components/error.png"

function VerificationCode() {
  const[password,setPassword]=useState();
  const[confirmPassword,setConfirmPassword]=useState();
  const [show, setShow] = useState(false);
  const[error,setError]=useState('');
  const[toast,setToast]=useState('');
  const navigate = useNavigate();
  


   

  let verificationCode= localStorage.getItem("ForgotPassword")
  let forgotPasswordData = JSON.parse(verificationCode);

  const emailid=forgotPasswordData.email;
  const code=forgotPasswordData.code;
  const newpassword=password;
  
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit=async()=>{
    try{
 if(!password){
   setError("Password is required");
   return;
 }
 else{
  if(password!==confirmPassword){
    setError("Password must be same");
    return;
  }
   const response= await axios.post("http://localhost:8080/user/reset/password",{
     email: emailid,
   verificationCode: code,
   password: confirmPassword
   })
   console.log("response",response)
 if(response.data.code===200){
   setShow(true);
   setTimeout(() => {
     navigate('/');
   }, 2000);
   setError();
   setToast(response.data.message);

 
 }
 else{
  setError(response.data.message);
 }
   }
 }
    catch(error){
   console.error(error);
    }}
  return (
    <div>
      <AppBar style={{ height: "50px", fontSize: "20px", padding: "15px",zIndex:"-1" }}>
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
            height: "100%",
            paddingBottom:"20px",
            width: "900px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "40px",color:"navy", fontFamily: "sans-serif" ,marginBottom:"10px"}}>
            Forgot your Password
          </div>
          <div style={{ fontSize: "20px",fontWeight:"bold" }}>
            Welcome back! Please enter your details
           
          </div>
          <div>
            <div style={{ marginTop: "50px", fontSize: "20px" }}>
              Please enter a verification code
            </div>
            <div>
              <input
                style={{
                  width: "200px",
                  height: "50px",
                  fontSize: "20px",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                }}
                placeholder="Enter your code"
                value={forgotPasswordData.code}
              />
            </div>

            <div>
              <div style={{ marginTop: "30px", fontSize: "20px" }}>
                Enter New Password
              </div>
              <FormControl style={{ width: "300px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => setPassword(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <div style={{ marginTop: "30px", fontSize: "20px" }}>
                Confirm Password
              </div>
              <FormControl style={{ width: "300px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
            {error&&<p style={{color:"red",fontSize:"20px",textAlign:"center",marginTop:"10px",marginRight:"50px"}}>
             <img src={errorpic} style={{width:"30px"}}/> {error}</p>}

            <Button
              style={{ marginTop: "50px", width: "200px",backgroundColor:"navy" }}
              variant="contained"
              onClick={handleSubmit}
            
            >
              Submit
            </Button>
            <ToastContainer position="top-end" className="p-3" >
 <Toast 
style={{backgroundColor:"#66CDAA"}}
 onClose={() => setShow(false)} show={show} delay={2000} autohide>          
   <Toast.Header closeButton={true}>
             
              <h3 className="me-auto">Success</h3>
            </Toast.Header>
            <Toast.Body><h5>
            {toast}
              </h5></Toast.Body>
          
          </Toast>
          </ToastContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default VerificationCode;
