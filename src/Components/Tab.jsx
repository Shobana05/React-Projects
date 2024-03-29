import React from "react";
import { useState } from "react";
import { Tab,Tabs } from "react-bootstrap";
import User from "./teamuser";
import News from "./teamNews";
import SideMenuBar from "./SideMenuBar";

const TabComponent=()=>{
    const[activeTab,setActiveTab]=useState('user');
    const handleTabChange=(tab)=>{
        setActiveTab(tab);
    };
return(

    <div style={{color:"black"}}>
        <div style={{float: "left"}}>
        <SideMenuBar/>

        </div>
        <div
        style={{
       
         
          fontWeight: "bold",
      
          fontSize: "20px",
          fontFamily: "Poppins",
      
          // position:"fixed",
          // marginLeft:"15%"
         
        }}
      >
        <Tabs activeKey={activeTab}
        onSelect={(tab)=>handleTabChange(tab)}>
            <Tab eventKey="user" title="Member">
                <User/>

            </Tab>
            <Tab eventKey="newsfeed" title="News feed">
             <News/>
            </Tab>
        </Tabs>
      </div>
    </div>
)
}
export default TabComponent;