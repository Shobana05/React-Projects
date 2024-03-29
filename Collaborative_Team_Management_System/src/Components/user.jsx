import React from "react";
import SideMenuBar from "./SideMenuBar";
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
import "../../src/App.css"
import Form from 'react-bootstrap/Form'

function User() {
  const [data, setData] = useState([]);
  const [user,setUser] = useState([]);
  const[passwordShown,setPasswordShown]=useState(false);

  const [editable, setEditable] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);
  const [editedData,setEditedData]=useState({})
  const [password,setPassword]=useState();

  const[toast,setToast]=useState('');
  const[toastHeader,setToastHeader]=useState('');
  const[toastShow,setToastShow]=useState(false);
  const[toastColor,setToastColor]=useState(`#66CDAA`);
  const [userRole, setUserRole] = useState('');
  const userid=localStorage.getItem("userID")
 
  const handleEdit=(index)=>{
 
    setEditable(true);    setRowIndex(index);
    setEditedData({
...user[index]
    });
    
  };
  const handleInputChange=(field,value)=>{
    setEditedData((prev)=>({...prev,[field]:value}));
  }
  const handleStatusChange=(event)=>{
    const newStatus=event.target.value==='Active';
    setEditedData({...editedData,isActive:newStatus})
  }
  const handleRoleChange=(event)=>{
    const newRole=event.target.value;
       setEditedData({...editedData,role:newRole})
  }
  const handleInput=(value)=>{
    setPassword(value);
  }
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const handleSave=async()=>{
    try{
   
 
    if(rowIndex!==null){
    
      const response=await axios.put(`http://localhost:8080/user/${editedData.userId}`,
      {
        "userName": editedData.userName,
          "email": editedData.email,
        "role":editedData.role,
        "isActive":editedData.isActive,
        "updatedBy":userid
      
      
      }
      );//UPDATE ROW

     
      setToastShow(true);
      setToastHeader(response.data.status)
      setToast(response.data.message);
      setToastColor(`#66CDAA`)
      setTimeout(() => {
        setEditable(false)
      }, 1000);
fetchInitialData();

    }else{
      editedData.password=password;
   
      const response=await axios.post(`http://localhost:8080/user`,{
        "userName": editedData.userName,
        "email": editedData.email,
        "password": password,
        "role":editedData.role,
        "createdBy":userid
      });//CREATE ROW
      if(response.data.code===200){
        setEditable(false)
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
      

      }
    

    }

  

  }
  catch(error){
    setToast(error.response.data.message);
    setToastShow(true);
    setToastHeader(error.response.data.status);
    setToastColor('red')
  }
  fetchInitialData();
 
};
const handleClose=()=>{
  setEditable(false);
}
const handleAdd=()=>{
  setEditedData({
    "userName": '',
    "email": '',
    "password": '',
    "role":"User",
    "createdBy":''
  });
  setRowIndex(null);
  setEditable(true);
}

const fetchInitialData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/user');
    setData(response.data.data);


   
      
    
  
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchData=async()=>{
  try{
    const sortedData=[...data].sort((a,b)=>b.userId-a.userId);
        setUser(sortedData);
  }
  catch(error){
    console.error('Error sorting data:', error);
  }
}





useEffect(() => {
  document.title="AnnonceNet_User";
  const UserRole=localStorage.getItem('UserRole');
  setUserRole(UserRole);
     fetchInitialData();
   }, []);
   useEffect(()=>{
     fetchData();
   },[data])
  return (
  
    <div style={{ display: "flex", }}>
      <div style={{position:'fixed'}}>
        <SideMenuBar />
        <header/>
        
      </div>
      <Card style={{ width: "83%", marginLeft: "16%", height: "100%", marginTop: "20px",marginBottom:"20px",backgroundColor:"whitesmoke" }}>
        <CardContent>
          <TableContainer  >

           <div style={{display:"flex",justifyContent:"space-between"}}>
           <h1  >{<PersonIcon />} 
            Users</h1>
            {userRole === 'Admin' ?
                        <button style={{backgroundColor:"navy",width:"10%",color:"white",height:"40px",borderRadius:"10px"}} onClick={handleAdd}>Create user</button>
                        :''}
                     
           </div>
           
          <Table stickyHeader aria-label="sticky table">

              <TableHead >
                <TableRow  >
                  <TableCell style={{ fontWeight: "bold", textTransform: "uppercase" }}>User Id</TableCell>
                  <TableCell style={{ fontWeight: "bold", textTransform: "uppercase" }}>Username</TableCell>
                  <TableCell style={{ fontWeight: "bold", textTransform: "uppercase" }}>Email</TableCell>
                  <TableCell style={{ fontWeight: "bold", textTransform: "uppercase" }}>Role</TableCell>
                  <TableCell style={{ fontWeight: "bold", textTransform: "uppercase" }}>Status</TableCell>
                  {editable&&rowIndex===null&&(
                <TableCell
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  width: "180px",
                }}
              >
                Initial Password
              </TableCell>

                  )}
                  {userRole==='Admin'? <TableCell></TableCell>:''}
                 
                </TableRow>
              </TableHead>
              <TableBody className="tbody" >
              {editable&&rowIndex===null&&(
                    <TableRow>
                      <TableCell>
                      <TextField value={editedData.userId} disabled
                      
                        onChange={(e)=>handleInputChange('userName',e.target.value)}
                        inputProps={{
                          style: { padding: "5%",backgroundColor:"lightgray" }
                        }}/>
                      </TableCell>
                      <TableCell>
                        <TextField value={editedData.userName}
                        onChange={(e)=>handleInputChange('userName',e.target.value)}
                        inputProps={{
                          style: { padding: "5%" }
                        }}/>
                      </TableCell>
                      <TableCell>
                        <TextField value={editedData.email}
                        onChange={(e)=>handleInputChange('email',e.target.value)}
                        inputProps={{
                          style: { padding: "5%" }
                        }}/>
                      </TableCell>
                      <TableCell >
                        <Form     style={{padding:"5%"}}>
                      <Form.Select
                 
                    value={editedData.role === 'Admin' ? 'Admin' : 'User'}
                    onChange={handleRoleChange}
                  >
                    <option value='Admin'>Admin</option>
                    <option value='User'>User</option>
                  </Form.Select>
                </Form>
                              
                 
                      </TableCell>
                    
                      <TableCell>
                        <TextField 
                        value="Active" disabled
                    
                        inputProps={{
                          style: { padding: "5%" }
                          
                        }}/>
                              
                 
                      </TableCell>
                      <TableCell>
                      <TextField
                        onChange={(e) => handleInput(e.target.value)}
                        type={passwordShown ? "text" : "password"}
                        InputProps={{
                          style: { padding: "0", height: "40px" },

                          endAdornment: (
                            <InputAdornment>
                              <IconButton onClick={togglePasswordVisibility}>
                                {passwordShown ? (
                                  <Visibility style={{ fontSize: "20px" }} />
                                ) : (
                                  <VisibilityOff style={{ fontSize: "20px" }} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </TableCell>

                      

                  
                     
                      <TableCell style={{ cursor: "pointer" }}>
  {editable && rowIndex === null ? <div>
    <SaveIcon onClick={handleSave} />
    <CloseIcon onClick={handleClose} style={{marginLeft:"30px"}} />
  </div> : <EditIcon  onClick={()=>handleEdit()}/>}
</TableCell> 
                     
                    </TableRow>
                  )}
              {user?.map((item, index) => (
                
                  
                  <TableRow key={item.userId}>
                    <TableCell>

                      {item.userId}
                    </TableCell>
                    <TableCell>
                      {editable && rowIndex === index ? 

                      <TextField 
                      value={editedData.userName}
                      onChange={(e)=>handleInputChange('userName',e.target.value)}
                      inputProps={{
                        style: { padding: "5%" }
                      }}
                       /> 
                      :
                        item.userName


                      }
                    </TableCell>
                    <TableCell>
                      {editable && rowIndex === index ?
                       <TextField 
                     value={editedData?.email}
                     onChange={(e)=>handleInputChange('email',e.target.value)}
                      inputProps={{
                        style: { padding: "5%" }
                       
                      }} 
                      /> :
                        item.email


                      }
                    </TableCell>
                  
                      <TableCell>
                      {editable && rowIndex === index ? 
                  <Form>
                  <Form.Select
                    value={editedData.role === 'Admin' ? 'Admin' : 'User'}
                    onChange={handleRoleChange}
                  >
                    <option value='Admin'>Admin</option>
                    <option value='User'>User</option>
                  </Form.Select>
                </Form>
                
                     :
                     item.role
                      }
                    </TableCell>
                    <TableCell>
                      {editable && rowIndex === index ? 
                                            <Form >
<Form.Select

value={editedData.isActive?'Active':'Inactive'}
onChange={handleStatusChange}
>
   <option value='Active'>Active</option>
   <option value='Inactive'>Inactive</option>
</Form.Select>
                      </Form>
                      
                     :
                   
                     <p style={{margin:"0px"}} >
                       <span className={item.isActive?'active':'inactive'}></span>
                    <span className={item.isActive?'statusactive':'statusinactive'}> {item.isActive ? 'Active' : 'Inactive'}</span></p>
                  
                    
                      }
                    </TableCell>
                
                    {userRole === 'Admin'&& userid!=item.userId ?
                    <TableCell style={{ cursor: "pointer" }}>
                      {editable && rowIndex === index ? <div>
                        <SaveIcon onClick={handleSave} />
                        <CloseIcon onClick={handleClose} style={{marginLeft:"30px"}} />
                      </div> : <EditIcon onClick={()=>handleEdit(index)}/>}

                    </TableCell>:''}


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