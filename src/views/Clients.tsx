import React from "react";
import { Container, ListGroup, Navbar } from "react-bootstrap";
import Client from "../interfaces/Client";
import request from "../utils/requests";
import ResponseHttp from "../interfaces/ResponseHttp";
import RouterProps from "../interfaces/RouterProps";

class Clients extends React.Component<RouterProps> {
  state = {
    clients: [],
    darkMode: false,
  };

  componentDidMount() {
    request.get("/api/clients").then((response: ResponseHttp) => {
      this.setState({ clients: response.data });
    });
  }

  render(): React.ReactNode {
    return (
      <>
        <Navbar expand="lg" className="p-2">
          <Navbar.Toggle></Navbar.Toggle>
          <Navbar.Brand>EvCRM</Navbar.Brand>
        </Navbar>
        <Container>
          <ListGroup>
            {this.state.clients.map((client: Client) => (
              <ListGroup.Item key={"client_" + client.id}>
                <div>
                  <strong>{client.name || ""}</strong>
                </div>
                <div>{client.phone || ""}</div>
                <div>{client.email || ""}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      </>
    );
  }
}

export default Clients;
