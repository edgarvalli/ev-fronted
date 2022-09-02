import React from "react";
import { ListGroup, Navbar } from "react-bootstrap";
import Client from "../interfaces/Client";
import request from "../utils/requests";
import ResponseHttp from "../interfaces/ResponseHttp";
import RouterParams from "../interfaces/RouterProps";

class Clients extends React.Component <RouterParams> {
  state = {
    clients: [],
  };

  componentDidMount() {
    request.get("/api/clients").then((response: ResponseHttp) => {
      this.setState({ clients: response.data });
    });
  }

  render(): React.ReactNode {
    return (
      <>
        <Navbar bg="light" expand="lg" className="p-2">
          <Navbar.Toggle></Navbar.Toggle>
          <Navbar.Brand>EvCRM</Navbar.Brand>
        </Navbar>
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
      </>
    );
  }
}

export default Clients;
