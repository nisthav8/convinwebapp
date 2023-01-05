import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { Container,Col,Row,Image} from "react-bootstrap";  
import { useSSRSafeId } from "@react-aria/ssr";

function App() {
  const [data, setData] = useState([]);
  const [userData, setuserData] = useState()
  const [firstName,setfirstName]=useState()
  const [lastName, setlastName] = useState();
  const [avatar, setAvatar] = useState();
  const [email,setEmail] = useState();
  const [id,setId] = useState();
  const handleClick = async(e) => {
   // alert(e.target.innerText);
    const id = e.target.innerText;
    const url = "https://reqres.in/api/users/"+id;
    const data = await fetch(url);
    const json = await data.json();
    setuserData(json.data);
    //console.log(json.data);
    setfirstName(json.data.first_name)
    setlastName(json.data.last_name)
    setId(json.data.id)
    setAvatar(json.data.avatar)
    setEmail(json.data.email)
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
        <Row>
          <Col sm={4}>
            {Array(data)
              .fill(0)
              .map((_, i) => (
                <div className="mt-2">
                  <Button variant="success" size="slg" onClick={handleClick}>
                    {i + 1}
                  </Button>
                </div>
              ))}
          </Col>

          <Col sm={5}>
            <Card  class="pt-4 mx-auto" style={{ width: "400px" }}>
              <Card.Img
                as={Image}
                variant="top"
                src={avatar}
                fluid={true}
                alt="Card image"
              />
              <Card.Body>
                <Card.Title>
                  {" "}
                  <Card.Text>Id:{JSON.stringify(id)}</Card.Text>{" "}
                </Card.Title>
                <Card.Text>First Name: {JSON.stringify(firstName)}</Card.Text>
                <Card.Text> LastName: {JSON.stringify(lastName)}</Card.Text>
                <Card.Text>E-mail: {JSON.stringify(email)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
