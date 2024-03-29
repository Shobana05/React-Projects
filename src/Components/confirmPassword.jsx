import { AppBar, Button, Card } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ConfirmPassword() {
  const navigate = useNavigate();

  return (
    <div>
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
            height: "300px",
            width: "900px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "100px",
          }}
        >
          <div style={{ fontSize: "50px", fontFamily: "sans-serif" }}>
            Forgot your Password
          </div>
          <div style={{ marginTop: "80px" }}>
            <div>
              <label style={{ fontSize: "20px" }}>New Password</label>
              <div>
                <input
                  style={{
                    width: "250px",
                    height: "30px",
                    fontSize: "20px",
                    borderRadius: "5px",
                  }}
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "20px" }}>Confirm New Password</label>
              <div>
                <input
                  style={{
                    width: "250px",
                    height: "30px",
                    fontSize: "20px",
                    borderRadius: "5px",
                  }}
                  placeholder="Enter your password"
                />
              </div>
              <Button
                style={{ marginTop: "50px", marginLeft: "80px" }}
                variant="contained"
                onClick={() => navigate("/")}
              >
                Submit
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ConfirmPassword;
