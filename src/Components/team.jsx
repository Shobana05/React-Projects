import React, { useState } from "react";
import SideMenuBar from "./SideMenuBar";
import { useEffect } from "react";
import GroupsIcon from '@mui/icons-material/Groups';
import { CardHeader } from "@mui/material";
import { Grid } from "@mui/material";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import errorpic from  "../Components/error.png"
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate } from "react-router-dom";



function Team() {

  const [data, setData] = useState([]);
  const[sorted,setSorted]=useState([])
  const [editedData, setEditedData] = useState([]);
  const [addedData, setAddedData] = useState([])
  const [teams, setTeams] = useState([]);
  const [show, setShow] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const[error,setError]=useState();
  const[toast,setToast]=useState('');
  const[mockData,setMockata]=useState();
const[toastShow,setToastShow]=useState(false);

const [userRole, setUserRole] = useState('');
const userId=parseInt(localStorage.getItem("userID"));

const navigate=useNavigate();

  const handleEdit = (index) => {
    setShow(true);
    setError("");
    setEditedData({
      ...sorted[index]
    });
  }
  const handleAdd = () => {
    setShowSave(true);
    setError('');
  }
  //FOR UPDATE
  const handleNameChange = (event) => {
    const newName = event.target.value
    setEditedData({ ...editedData, teamName: newName });
  };
  const handleStatusChange = (event) => {
    const newStatus = event.target.value === 'Active';
    setEditedData({ ...editedData, active: newStatus });
  };
  //FOR CREATE

  const handleNameSave = (event) => {
    const addName = event.target.value;
    setAddedData((prev)=>({...prev,name: addName }))

  }
  // const handleStatusSave = (event) => {
  //   const addStatus = event.target.value === 'Active'
  //   setIsActive(addStatus)
  //   setAddedData((prev)=>({...prev, isActive: addStatus }))
  // }
  const handleBack = () => {
    setShow(false);
    setShowSave(false);
  }

  const fetchInitialData = async () => {
    try {
    
      const response = await axios.get(`http://localhost:8080/team/${userId}`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };
  
  const fetchData = () => {
    try {
      const sortedData = [...data].sort((a, b) => a.teamId - b.teamId);
      setSorted(sortedData);
    } catch (error) {
      console.error('Error sorting data:', error);
    }
  };
  
  useEffect(() => {
    document.title = "AnnounceNet_Team";
    const UserRole=localStorage.getItem('UserRole');
    setUserRole(UserRole);
    fetchInitialData();
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [data]);
  
    //UPDATE
    const handleSave = async () => {
      try{
        if(!editedData.teamName){
          setError('Team name is required');
        }
        else{
          const response= await axios.put("http://localhost:8080/team/" + editedData.teamId, {
            "name": editedData.teamName,
            "isActive": editedData.active,
            "updatedBy":userId
          })
          fetchInitialData();
         
      if(response.data.code===200){
     setToastShow(true);
        setToast(response.data.message);
        setTimeout(() => {
          setShow(false);
        }, 1000);
        setError('');
      }else{
        setError('');
        setToastShow(false);
      }
        }
    
      }
     catch(error){
   if (error.response &&error.response.data&& error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("")
        }
     }
    
     
    }
    //CREATE
    const handleAddSave = async () => {
   
      try{
        if(!addedData.name){
          setError("Team name is required")
        }
        else{
          const respone= await axios.post("http://localhost:8080/team", {
            "name": addedData.name,
            "isActive": true,
            "userId": userId,   
            "createdBy":userId
          })
          fetchInitialData();
          if(respone.data.code===200){
          
            setToastShow(true);
            setToast(respone.data.message);
            setTimeout(() => {
              setShowSave(false);
            }, 1000);
            setError('');
          }else{
            setError('');
            setToastShow(false);
          }
          
        }
    
  
      } catch(error){
  if(error.response&&error.response.data && error.response.data.message){
    setError(error.response.data.message);
  }else{
    setError('');
  }
      }
     
      
    }
  const handleAction=(teamId,teamStatus)=>{
    if(teamStatus){
      navigate('/Tab')
    }
 
    localStorage.setItem("currentTeamId", teamId)
   
  }

  return (
    <div style={{ display: "flex"}}>
      <div style={{ position: 'fixed' }}>
        <SideMenuBar />
      </div>

      <Card style={{ width: "83%", marginLeft: "16%", height: "100%", marginTop: "20px", marginBottom: "20px",backgroundColor:"whitesmoke"}}>

        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1  >{<GroupsIcon />}
              Teams</h1>
              {userRole === 'Admin' ?
             
            <button onClick={handleAdd} style={{ backgroundColor: "navy", width: "10%", color: "white", height: "35px", borderRadius: "10px" }} >Create Team</button>
  :''}
            <ToastContainer position="top-end" className="p-3" >
 <Toast 
style={{backgroundColor:"#66CDAA"}}
 onClose={() => setToastShow(false)} show={toastShow} delay={1000} autohide>          
   <Toast.Header closeButton={true}>
             
              <h3 className="me-auto">Success</h3>
            </Toast.Header>
            <Toast.Body><h5>
            {toast}
              </h5></Toast.Body>
          
          </Toast>
          </ToastContainer>
            <Modal show={showSave} >
              <Modal.Header>
                <Modal.Title>Add Team</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                  <Form.Label style={{display:"flex",justifyContent:"space-between"}}>Team Name{
                          error&&<p style={{color:"red",fontSize:"15px"}}>
                          <img src={errorpic} style={{width:"25px"}}/> 
                            {error}</p>}</Form.Label>
                    <Form.Control

                      onChange={handleNameSave}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"

                  >
                    <Form.Label>Status</Form.Label>

                    <Form.Select
                      value="Active"
                      disabled

                      // onChange={handleStatusSave}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Form.Select>

                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <button  variant="secondary" style={{borderColor:"navy",width:"100px",borderRadius:"5px"}} onClick={handleBack}>
                  Back                       </button>
                <button variant="primary" style={{borderColor:"navy",width:"100px",borderRadius:"5px"}} onClick={handleAddSave} >
                  Save
                </button>
              </Modal.Footer>
            </Modal>
          </div>




          <div >
            <Grid container spacing={3}>

              {sorted&&   sorted.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} >
                  <Card key={item.teamId} style={{fontSize:"22px"}} >



                    <CardActionArea  onClick={() => handleAction(item.teamId,item.active)}>

                      <CardHeader  title={<GroupsIcon style={{ fontSize: "70px" ,color:"#525252"}} />}
                        subheader={item.teamName}
                        subheaderTypographyProps={{ style: { fontSize: "25px",color:"black" }}}
                        style={{ textAlign: "center",fontSize:"28px" }}>

                      </CardHeader>


                      <CardContent style={{ textAlign: "center" }}>
                        <p style={{margin:"0px"}}>Team id: {item.teamId}</p>


                        <p style={{margin:"0px"}} >Status:
                          <span className={item.active?'active':'inactive'}></span>
                       <span className={item.active?'statusactive':'statusinactive'}> {item.active ? 'Active' : 'Inactive'}</span></p>

                      {/* <p >Created by:{item.createdBy}</p> */}
                      </CardContent>
                    </CardActionArea>
                    {userRole === 'Admin' ?
                    <button 
                        style={{borderRadius:"10px",width:"40%",marginLeft:"30%",marginBottom:"20px",backgroundColor:"#003665",color:"white",border:"none"}}
                        onClick={() => handleEdit(index)}>Edit<EditIcon style={{marginLeft:"10px"}} ></EditIcon></button>
                        :''}
                  </Card>
                  <ToastContainer position="top-end" className="p-3" >
 <Toast 
style={{backgroundColor:"#66CDAA"}}
 onClose={() => setToastShow(false)} show={toastShow} delay={1000} autohide>          
   <Toast.Header closeButton={true}>
             
              <h3 className="me-auto">Success</h3>
            </Toast.Header>
            <Toast.Body><h5>
            {toast}
              </h5></Toast.Body>
          
          </Toast>
          </ToastContainer>
                  <Modal show={show} style={{fontSize:"20px"}} >
                    <Modal.Header>
                      <Modal.Title>Edit Team</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label style={{display:"flex",justifyContent:"space-between"}}>Team Name{
                          error&&<p style={{color:"red",fontSize:"15px"}}>
                          <img src={errorpic} style={{width:"25px"}}/> 
                            {error}</p>}</Form.Label>
                          
                          <Form.Control
                            value={editedData.teamName}
                            onChange={handleNameChange}
                            autoFocus
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"


                        >
                          <Form.Label>Status</Form.Label>

                          <Form.Select
                            value={editedData.active? 'Active' : 'Inactive'}
                            onChange={handleStatusChange}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </Form.Select>

                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <button variant="secondary" style={{borderColor:"navy",width:"100px",borderRadius:"5px"}} onClick={handleBack}>
                        Back                       </button>
                      <button style={{borderColor:"navy",width:"100px",borderRadius:"5px"}} variant="primary" onClick={handleSave}>
                        Save
                      </button>
                    </Modal.Footer>
                  </Modal>

                </Grid>



              ))}



            </Grid>

          </div>


        </CardContent>
      </Card>



    </div>
  );
}

export default Team;
