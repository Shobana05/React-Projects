import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { CardContent, IconButton, TableCell, TextField } from "@mui/material";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import "../App.css"
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Autocomplete from '@mui/material/Autocomplete';
function User() {
  const [data, setData] = useState([]);
  const [user,setUser] = useState([]);
  const[passwordShown,setPasswordShown]=useState(false);

  const [editable, setEditable] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);
  const [editedData,setEditedData]=useState({})
  const [password,setPassword]=useState();
  const[teamName,setTeamName]=useState();
  const[toast,setToast]=useState('');
  const[toastHeader,setToastHeader]=useState('');
  const[toastShow,setToastShow]=useState(false);
  const[toastColor,setToastColor]=useState(`#66CDAA`);
  const[showModal,setShowModal]=useState(false);

//For searching user. 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
const [selectedUserId, setSelectedUserId] = useState('');
  const[userData,setUserData]=useState([]);


 const currentTeam=localStorage.getItem("currentTeamId");
 const userID= parseInt(localStorage.getItem("userID"));
 const findId=user.find(user=>user.userId===userID);
 if(findId&&findId.isModerator===true){
  localStorage.setItem('isModerator',true);
 }
 else{
  localStorage.setItem('isModerator',false);
 }





  const handleEdit=(index)=>{
 
    setEditable(true);
    setRowIndex(index);
    setEditedData({
...user[index]
    });
    
  };

  const handleSave=async()=>{
    try{
      let edit= localStorage.getItem("currentTeamObj")
    if(!editedData.userName&&!editedData?.password && !editedData.email){
      setToast("All the fields are required")
      setToastShow(true);
      setToastHeader("");
      setToastColor('red')
      return;
    }else{
      if(rowIndex!==null){
        editedData.team=JSON.parse(edit);
        const response=await axios.put(`http://localhost:8080/user/${editedData.userId}`,editedData);//UPDATE ROW
    
        setToastShow(true);
        setToastHeader(response.data.status)
        setToast(response.data.message);


        setToastColor(`#66CDAA`)
        setTimeout(() => {
          setEditable(false)
        }, 2000);
  
      }else{
        editedData.password=password;
        editedData.team=JSON.parse(edit)
       
        const response=await axios.post(`http://localhost:8080/user`,editedData);//CREATE ROW
        if(response.data.code===200){
          setTimeout(() => {
            setEditable(false)
          }, 2000);
          setToast(response.data.message);
          setToastShow(true);
          setToastHeader(response.data.status);
          setToastColor(`#66CDAA`)
  
        }
        else{
          setEditable(true)
          setToast(response.data.message);
          setToastShow(true);
          setToastHeader(response.data.status);
          setToastColor('red')
        
  
        }
      
  
      }
    }
  

  

  }
  catch(error){
    setToast(error.response.data.message);
    setToastShow(true);
    setToastHeader(error.response.data.status);
    setToastColor('red')
  }
  fetchData();
 
};

const handleAdd=()=>{
  setShowModal(true);
  setEditedData({});
  setRowIndex(null);
  setEditable(true);

}
const handleBackModal=()=>{
  setShowModal(false);
setSelectedEmail('');
}
const handleSaveModal=async()=>{
 try {
  const response= await axios.post('http://localhost:8080/team/add/member',
  {
    "userId": selectedUserId,
    "teamId": currentTeam
}
  )
  if (response.data.code===200) {
    setShowModal(false);
  }
  else{
    setToastShow(true);
    setToast('hi');
  }
 } catch (error) {
  console.error(error)
  setToastShow(true);
  setToast(error.response.data.message)
  setToastColor('red')
 }
 
 
fetchDataInitial();
}
const handleSwitchChange=async(moderator,userId)=>{
try {
  if (findId.isModerator ===true) {
 
    const response=await axios.patch('http://localhost:8080/team/role',
    {
      "userId": userId,
      "teamId": currentTeam
  }
    );
    
    if(response.code==200){
      fetchData();
      setToast('');
      setToastShow(false);
    }
   else{
    setToastShow(true)
    setToast(response.message);
    setToastColor('red');
    console.log(response,"Response")
   }
  
  }
} catch (error) {
  console.log(error,"ERROR");
  setToastShow(true)
  setToast(error.response.data.message);
  setToastHeader(error.response.data.code)
  setToastColor('red');
}


    
  
   
fetchData();
fetchDataInitial();
 

}

const fetchDataInitial = async () => {
  try {
   
    const respone=await axios.get(`http://localhost:8080/user/${currentTeam}`)
    setData(respone?.data.data);  
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchData=async()=>{
  try{
    const sortedData=[...data].sort((a,b)=>a.userId-b.userId);
    setUser(sortedData);
  }
  catch(error){
    console.error('Error sorting data:', error);
  }
}

const fetchUserData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/user');

    setUserData(response?.data.data);

  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
  useEffect(() => {
 document.title="AnnonceNet_User";
    fetchDataInitial();
  }, []);
  useEffect(()=>{
    fetchData();
  },[data])

  useEffect(() => {
  
   
fetchUserData();
  
  
  }, []);
 
  const fil=userData?.map((user)=>user.email);


  
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredResults =query?
     userData.filter((user) => {
      return user.userName.toLowerCase().includes(query.toLowerCase()) ||
             user.email.toLowerCase().includes(query.toLowerCase());
    })
    :[];

    setFilteredData(filteredResults);
  };
  


  const handleEmailChange = (event, value) => {
    setSelectedEmail(value); 
    const selectedUser = userData.find((user) => user.email === value);
    if (selectedUser) {
      setSelectedUserId(selectedUser.userId); 
    }
  };

  return (
  
    <div style={{ display: "flex", }}>
        <Card
        style={{
          width: "100%",
          height: "100%",
          margin: "10px",
          backgroundColor: "whitesmoke",
        }}
      ><CardContent>
          <TableContainer  >

           <div style={{display:"flex",justifyContent:"space-between"}}>
           <h1  >{<PersonIcon />} 
            Members</h1>
       
        {findId&& findId.isModerator?  <button style={{backgroundColor:"navy",width:"15%",color:"white",height:"40px",borderRadius:"10px"}} onClick={handleAdd}>Add Member</button>
                    :''
        }
                          <Modal show={showModal} style={{fontSize:"20px"}} >
                    <Modal.Header>
                      <Modal.Title>Add members</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                  <Form.Group className="mb-3">
                    
                  <Form.Label style={{display:"flex",justifyContent:"space-between"}}>Email Id
                  {/* {
                          error&&<p style={{color:"red",fontSize:"15px"}}>
                          <img src={errorpic} style={{width:"25px"}}/> 
                            {error}</p>} */}
                            </Form.Label>
                    {/* <Form.Control
  value={searchQuery}
  onChange={handleSearchInputChange}

                      // onChange={handleNameSave}
                      autoFocus
                    /> */}
                 
                    <Autocomplete
      disablePortal
      id="combo-box-demo"
 options={userData.map((user)=>user.email)}
      sx={{ width: 400 }}
      value={selectedEmail}
  onChange={handleEmailChange}
      renderInput={(params) => <TextField {...params} label="Select email" />}
    />
                  </Form.Group>
                  </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <button variant="secondary" style={{borderColor:"navy",width:"100px",borderRadius:"5px"}} onClick={handleBackModal}>
                        Back                       </button>
                      <button style={{borderColor:"navy",width:"100px",borderRadius:"5px"}} variant="primary" onClick={handleSaveModal}>
                        Save
                      </button>
                    </Modal.Footer>
                  </Modal>
                    
                    

           </div>
           
          <Table stickyHeader aria-label="sticky table">

              <TableHead >
                <TableRow  >
                  <TableCell style={{ fontWeight: "bold", textTransform: "uppercase" }}>User Id</TableCell>
                  <TableCell style={{ fontWeight: "bold", textTransform: "uppercase" }}>Username</TableCell>
                  <TableCell style={{ fontWeight: "bold", textTransform: "uppercase" }}>Email</TableCell>
                  <TableCell style={{ fontWeight: "bold", textTransform: "uppercase" }}>Status</TableCell>
                  <TableCell style={{ fontWeight: "bold", textTransform: "uppercase" }}>Moderator</TableCell>
               
               
                </TableRow>
              </TableHead>
                        <TableBody >
             
              {user.map((item, index) => (
                
                
                  
                  <TableRow key={item?.userId}>
                  
                    <TableCell>

                      {item.userId}
                    </TableCell>
                    <TableCell>

{item.userName}
</TableCell>
<TableCell>

{item.email}
</TableCell>
<TableCell>

{item.isActive?"Active":"Inactive"}
</TableCell>
<TableCell>
                        <Form>
                        <Form.Switch // prettier-ignore
                          type="switch"
                         key={item.userId}
                        checked={item.isModerator}
                          onChange={()=>handleSwitchChange(item.isModerator,item.userId)}
                          disabled={item.isModerator}
                          className="m-1 input"
                        />
                      </Form>
                      
                        
                        {/* } */}
                      </TableCell>
                     


                  </TableRow>
           

              ))}


</TableBody>

            </Table>
          </TableContainer>
          <ToastContainer position="top-end" className="p-3" >
 <Toast 
style={{backgroundColor:toastColor}}
 onClose={() => setToastShow(false)} show={toastShow} delay={2000} autohide>          
   <Toast.Header closeButton={true}>
             
              <h3 className="me-auto">{toastHeader}</h3>
            </Toast.Header>
            <Toast.Body><h5>
            {toast}
              </h5></Toast.Body>
          
          </Toast>
          </ToastContainer>
        </CardContent>
      </Card>


    

    </div>
  );
}

export default User;
