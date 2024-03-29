import React, { useState } from "react";
import SideMenuBar from "./SideMenuBar";
import { Row, Col, Container, CardBody } from 'react-bootstrap'
import { useEffect } from "react";
import axios from "axios";
import { Card } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { Badge } from 'react-bootstrap'
import upcomingEvents from '../Components/upcomingEvents.jpg'
import shoutouts from "../Components/shoutouts.jpg"
import imporantNotice from "../Components/importantNotice.png"
import reminders from "../Components/reminders.jpg"
import EditIcon from '@mui/icons-material/Edit';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import errorpic from  "../Components/error.png"



function NewsFeed() {
  const [data, setData] = useState([]);
  const[news,setNews]=useState([]);
  const [editedData, setEditedData] = useState({})
  const [dropdown, setDropdown] = useState([])
  const [selectedItem, setSelectedItem] = useState('All');
  const [show, setShow] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState('')
  const[createTitle,setCreateTitle]=useState('');
  const[createDescription,setCreateDescription]=useState();
  const[toast,setToast]=useState('');
  const[toastShow,setToastShow]=useState(false);
  const[error,setError]=useState();

  const teamid=parseInt(localStorage.getItem("CurrentTeamID"));

//FOR UPDATE
  const handleSave = async () => {
   
    try {
     
      const request = {
        "category": selectedDropdown?selectedDropdown:editedData.category,
        "title": editedData.title,
        "description": editedData.description,
        "teamId":teamid
      }
    const response=  await axios.put(`http://localhost:8080/newsfeed/${editedData.id}`, request
      );
      if(response.data.code==200){
        setToastShow(true);

        
        setToast(response.data.message);
        setTimeout(() => {
          setShow(false);
        }, 1000);
      }
      fetchInitialData();
      setSelectedDropdown('')

    }
    

    catch (error) {
      console.error('Error', error)
    }
  }
  const handleCreate=async()=>{
   
 
      try{
        if(createTitle==""&& createDescription==''&&selectedDropdown===''){
          setError('Please fill all details')
        }
        else{
          const request={
            "title":createTitle,
            "description":createDescription,
            "category":selectedDropdown
          
          }
          const response= await axios.post('http://localhost:8080/newsfeed',request);
        fetchData();
        setSelectedDropdown('');
        if(response.data.code==200){
          setError('');
          setToastShow(true);
          setToast(response.data.message);
          setTimeout(() => {
            setShowSave(false);
          }, 1000);
        }
        }
    
      
      }
      
      catch(error){
  setError('Please enter all details')
      }
    
  
  }
  //For dialog box
  const handleShow = (index) => {
    setShow(true);
    setEditedData({
      ...news[index]
    });
  }
  const handleFilterShow=(index)=>{
    setShow(true);
    setEditedData({
      ...news[index]
    });
  }
  const resetEditedData=(card)=>{
    setEditedData({
      title:card.title||'',
      description:card.description||'',
      category:card.category||''
    })
  }
  const handleCloseModal = () => {
    setShow(false);
    setShowSave(false);
    setSelectedDropdown('')
    setError('');
    

  }

const setTitle=(value)=>{
  setEditedData((prevData)=>({...prevData,title:value}))
  
}
const setDescription=(value)=>{
  setEditedData((prevData)=>({...prevData,description:value}))
}
const fetchInitialData = async () => {

  try {
    const response = await axios.get('http://localhost:8080/newsfeed');
    setData(response.data.data);
   
    // const sortedData=[...data].sort((a,b)=>b.id-a.id);
  
    // setNews(sortedData);

    const ddlist = await axios.get('http://localhost:8080/category/dropdown');
    setDropdown(ddlist.data.data);
    console.log("dropdown", dropdown);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchData= async () => {

  try {

    const sortedData=[...data].sort((a,b)=>b.id-a.id);
  
    setNews(sortedData);

   

  } catch (error) {
    console.error('Error sorting news:', error);
  }
};
  useEffect(() => {
    document.title="AnnonceNet_Newsfeed";

   

    fetchInitialData();
  }, []);
  useEffect(()=>{
    fetchData();
  },[data])

  const getImage = (category) => {
    switch (category) {
      case 'UpcomingEvents':
        return upcomingEvents;
      case 'Shoutouts':
        return shoutouts;
      case 'ImportantNotice':
        return imporantNotice;
      case 'Reminders':
        return reminders;
      default:
        return '';



    }

  };
  
  
  const handleAdd = () => {
    setShowSave(true);
  }
  const renderCards = () => {

    if (selectedItem === 'All') {
      return news.map((card, index) => (
        <Card key={index} style={{ margin: "10px 0px", fontSize: "20px", backgroundColor: "ivory" }}>
          <Card.Body >
            <div style={{display:"flex",justifyContent:"space-between"}}>
<h4 style={{fontWeight:"bold"}}>Team:<span style={{marginLeft:"10px",fontWeight:"normal"}}>
{card.team.name}
  </span></h4>
  <h5 style={{fontWeight:"bold"}}>Created at:<span style={{marginLeft:"10px",fontWeight:"normal"}}>
{new Date(card.createdAt).toLocaleDateString()}

  </span></h5>
  </div>
            <div>
            
              <Card.Title> <Row style={{ alignItems: "center" }}>
                <Col xs={3}>


                  <img src={getImage(card.category)}
                    style={{ height: "100%", width: "100%" }}
                    alt="image not found"></img>

                </Col>

                <Col style={{ fontSize: "30px", color: "navy" }}>{card.title}</Col>


                <Col xs={2}>
                  <Badge bg="dark" style={{ minWidth: "100px", fontSize: "15px", padding: "5px" }}>{card.category}</Badge>
                  {/* <EditIcon style={{ marginLeft: "20px" }} onClick={() => handleShow(index)} /> */}
                  <Modal show={show} >
                    <Modal.Header>
                      <Modal.Title>NewsFeed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            value={editedData.title}
                            onChange={(event) => setTitle(event.target.value)}

                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3" >
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea"
                            value={editedData.description}
                            onChange={(event) => setDescription(event.target.value)}

                            rows={3} />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"

                        >
                          <Form.Label>Category</Form.Label>
                          <Dropdown onSelect={(eventKey) => {
                            setSelectedDropdown(eventKey)
                          }} style={{ width: "30%" }}>
                            <Dropdown.Toggle style={{ fontSize: "14px" }} className='w-100' id="dropdown-basic">

                              {selectedDropdown === '' ?  editedData.category:selectedDropdown}
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ width: "100%" }} >

                              {dropdown.map((item) => (

                                <Dropdown.Item key={item.id} eventKey={item.name}>{item.name}</Dropdown.Item>

                              ))}
                            </Dropdown.Menu>


                          </Dropdown>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Back                       </Button>
                      <Button variant="primary" onClick={handleSave}>
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>

                </Col></Row></Card.Title>
              <Row>
                <Col >
                  <p style={{ fontSize: "20px" }}>
                    {card.description}
                  </p>
                </Col>

              </Row>
            </div>




          </Card.Body>
        </Card>
      ));
    }
    else {
      const filteredData = news.filter((item) => item.category === selectedItem || selectedItem == 'All')
      return filteredData.map((card, index) => (
        <Card key={index} style={{ margin: "10px 0px", fontSize: "20px", backgroundColor: "ivory" }}>

          <Card.Body >
          <div style={{display:"flex",justifyContent:"space-between"}}>
<h4 style={{fontWeight:"bold"}}>Team:<span style={{marginLeft:"10px",fontWeight:"normal"}}>
{card.team.name}
  </span></h4>
  <h5 style={{fontWeight:"bold"}}>Created at:<span style={{marginLeft:"10px",fontWeight:"normal"}}>
{new Date(card.createdAt).toLocaleDateString()}

  </span></h5>
  </div>
            <div>
              <Card.Title> <Row style={{ alignItems: "center" }}>
                <Col xs={3}>


                  <img src={getImage(card.category)}
                    style={{ height: "100%", width: "100%" }}
                    alt="image not found"></img>

                </Col>
                <Col xs={7} style={{ fontSize: "30px", color: "navy" }}>{card.title}</Col>


                <Col xs={2}>
                  <Badge bg="dark" style={{ minWidth: "100px", fontSize: "15px", padding: "5px" }}>{card.category}</Badge>
                  {/* <EditIcon style={{ marginLeft: "20px" }} onClick={() => handleFilterShow(index) }/> */}
                  <Modal show={show} onShow={()=>resetEditedData(card,index)}>
                    <Modal.Header >
                      <Modal.Title>NewsFeed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            value={editedData.title}
                            onChange={(event) => setTitle(event.target.value)}

                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"

                        >
                          <Form.Label>Description</Form.Label>
                           <Form.Control as="textarea"
                            value={editedData.description}
                            onChange={(event) => setDescription(event.target.value)}

                            rows={3} />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"

                        >
                          <Form.Label>Category</Form.Label>
                          <Dropdown onSelect={(eventKey) => {
                            setSelectedDropdown(eventKey)
                          }} style={{ width: "30%" }}>
                            <Dropdown.Toggle style={{ fontSize: "14px" }} className='w-100' id="dropdown-basic">

                              {selectedDropdown === '' ? editedData.category : selectedDropdown}
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ width: "100%" }} >

                              {dropdown.map((item) => (

                                <Dropdown.Item key={item.id} eventKey={item.name}>{item.name}</Dropdown.Item>

                              ))}
                            </Dropdown.Menu>


                          </Dropdown>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Back
                      </Button>
                      <Button variant="primary" onClick={handleSave}>
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>

                </Col></Row></Card.Title>
              <Row>

                <Col>
                  <p style={{ fontSize: "20px" }}>
                    {card.description}
                  </p>
                </Col>

              </Row>

            </div>


          </Card.Body>
        </Card>

      ))

    }
  }
  return (
    <div style={{ display: "flex" }}>
      <div style={{ position: 'fixed' }}>
        <SideMenuBar />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", position: "fixed", width: "80%", marginLeft: "18%", marginTop: "10px" }}>

        <div style={{ display: "flex" }}>
          <h2>{<NotificationsIcon/>}News Feed</h2>
       <div style={{ marginLeft: "20px", }}>
            {/* <Button variant="primary" onClick={handleAdd}>+ Add news</Button> */}
            <Modal show={showSave} >
              <Modal.Header>
                <Modal.Title>NewsFeed</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                {
                          error&&<p style={{color:"red",fontSize:"15px"}}>
                          <img src={errorpic} style={{width:"25px"}}/> 
                            {error}</p>}
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control

onChange={(e)=>setCreateTitle(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"

                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea"
onChange={(e)=>setCreateDescription(e.target.value)}

                      rows={3} />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"

                  >
                    <Form.Label>Category</Form.Label>
                    <Dropdown onSelect={(eventKey) => {
                      setSelectedDropdown(eventKey)
                    }} style={{ width: "30%" }}>
                      <Dropdown.Toggle style={{ fontSize: "14px" }} className='w-100' id="dropdown-basic">

                        {selectedDropdown === '' ? "Select category": selectedDropdown }
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ width: "100%" }} >

                        {dropdown.map((item) => (

                          <Dropdown.Item key={item.id} eventKey={item.name}>{item.name}</Dropdown.Item>

                        ))}
                      </Dropdown.Menu>


                    </Dropdown>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Back                       </Button>
                <Button variant="primary" onClick={handleCreate} >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          
         
        </div>


 <Dropdown onSelect={(eventKey) => {
          setSelectedItem(eventKey)
        }} style={{ width: "20%" }}>
          <Dropdown.Toggle style={{ fontSize: "14px" }} className='w-100' id="dropdown-basic">
            {selectedItem}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ width: "100%" }} >
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            {dropdown.map((item) => (

              <Dropdown.Item key={item.id} eventKey={item.name}>{item.name}</Dropdown.Item>

            ))}
          </Dropdown.Menu>


        </Dropdown>
       
       
      </div>
      <Card style={{ width: "80%", marginLeft: "18%", height: "90vh", overflow: "scroll", position: "absolute", marginTop: "50px", zIndex: "-1", backgroundColor: "navy" }}>
        <CardBody>
{/* {teamActiveStatus==="true"? */}
 <Card.Body>{renderCards()}</Card.Body>
{/* :<h1 style={{color:"wheat",display:"flex",alignItems:"center",justifyContent:"center",height:"90vh"}}>Team is INACTIVE</h1>} */}
         
        </CardBody>
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

    </div>

  );
            }

export default NewsFeed;