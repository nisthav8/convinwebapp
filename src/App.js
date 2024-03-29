import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { Container,Col,Row,Image,Spinner} from "react-bootstrap";  
import { useSSRSafeId } from "@react-aria/ssr";

function App() {
  const [show, setShow] = useState(true);
  const [data, setData] = useState([]);
  const [userData, setuserData] = useState()
  const [firstName,setfirstName]=useState()
  const [lastName, setlastName] = useState();
  const [avatar, setAvatar] = useState();
  const [email,setEmail] = useState();
  const [id,setId] = useState();
     
const card = () => {
  
};
  const handleClick = async(e) => {
    // alert(e.target.innerText);
    const id = e.target.innerText;
    const url = "https://reqres.in/api/users/" + id;
    const data = await fetch(url);
    const json = await data.json();
    setuserData(json.data);
    //console.log(json.data);
    setfirstName(json.data.first_name);
    setlastName(json.data.last_name);
    setId(json.data.id);
    setAvatar(json.data.avatar);
    setEmail(json.data.email);
    //card()
    console.log(id);
  };
  const getData = async () => {
    const url = "https://reqres.in/api/users?page=1";
    const data = await fetch(url);
    const json = await data.json();
    setData(json.total);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Container>
        <Col>
          <Row className="m-4 justify-content-center">
            {id && (
              <Card
                display="flex"
                align-items="center"
                justify-content="center"
                style={{ width: "320px" }}
              >
                <Card.Img
                  as={Image}
                  variant="top"
                  src={avatar}
                  fluid={true}
                  alt="Card image"
                  style={{ height: "300px" }}
                />
                <Card.Body>
                  <Card.Title>
                    {" "}
                    <Card.Text>Id: {id}</Card.Text>{" "}
                  </Card.Title>
                  <Card.Text>First Name: {firstName}</Card.Text>
                  <Card.Text> Last Name: {lastName}</Card.Text>
                  <Card.Text>E-mail: {email}</Card.Text>
                </Card.Body>
              </Card>
            )}
            {!id && (
              <Card
                display="flex"
                align-items="center"
                style={{ width: "310px", height: "470px" }}
              >
                <Card.Img
                  src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcnR1cCUyMG9mZmljZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                  style={{ height: "400px" }}
                />
                <Card.Body>
                  <Card.Title className="justify-content-center">
                    Click on the button to see a particular user's details!
                  </Card.Title>
                </Card.Body>
              </Card>
            )}
          </Row>
        </Col>
      </Container>
      <div class="d-flex justify-content-center">
        {Array(data)
          .fill(0)
          .map((_, i) => (
            <Button
              className="m-2"
              variant="success"
              size="lg"
              onClick={handleClick}
            >
              {i + 1}
            </Button>
          ))}
      
      </div>
    </div>
  );
}

export default App;
