import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Paper, TextField, colors } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import "../App.css"
import Button from "@mui/material/Button";
import errorpic from  "../Components/error.png"




function LoginPage() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)



  const handleSubmit = async (e) => {


    try {
      if (!username || !password) {
        setError('Email Id and Password are required')
        return;

      } else {
        const response = await axios.post("http://localhost:8080/user/login", {
          email: username,
          password: password
        })
console.log("response",response);
      


        if (response.data.code === 200&&response.data.data.isStatus===true) {
        
          localStorage.setItem("userID", response.data.data.id)
          localStorage.setItem("userName", response.data.data.userName);
          localStorage.setItem("userEmail", response.data.data.email);
          localStorage.setItem("UserRole",response.data.data.role)
      
          navigate('/Home')
        }
        if(response.data.code===200&& response.data.data.isStatus!==true){
          setError('User is inactive')
        }
        else {

          setError(response.data.message)
          console.log("error", response.data.message)
        }
      }

    }

    catch (error) {
    if (error.response&& error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("unexpected error")
    }
    }

  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  localStorage.clear();

  return (
    <div className="LoginPage">
      <Paper className="LoginPage-Paper">
        <h1 style={{ color: "#1a237e", marginTop: "20px" }}> Ford Announce Net</h1>
        <br></br>
        <br></br>
        <div>
          <p>
            {error &&  <p style={{ width: "70%", marginLeft: "15%", color: "red" }}>
              <img src={errorpic}style={{width:"5%",height:"5%"}}/>
            {error}</p>}
            <FormControl variant="outlined">
              <TextField
                label="Email"
                style={{ width: "300px" }}

                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormControl>
          </p>
          <p>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                style={{ width: "300px" }}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={

                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>

                }
                label="Password"
              />
            </FormControl>
            <div style={{ paddingLeft: "135px", fontSize: "17px" ,marginTop:"20px"}}>
              <a href="/forgotPassword">Forgot Password</a>
            </div>
          </p>
          <br></br>
          <p >

            <Button
              onClick={handleSubmit}
              style={{ backgroundColor: "#1a237e", width: "20%", color: "white" }}

            >
              Login
            </Button>

          </p>
        </div>
      </Paper>
    </div>
  );
}

export default LoginPage;
