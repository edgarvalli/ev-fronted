import React from "react";
import { Container, Form, ListGroup, Navbar } from "react-bootstrap";
import { BsFilter } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import Client from "../interfaces/Client";
import request from "../utils/requests";
import ResponseHttp from "../interfaces/ResponseHttp";
import RouterProps from "../interfaces/RouterProps";

class Clients extends React.Component<RouterProps> {
  state = {
    clients: [],
    darkMode: false,
  };

  waitEvent: any = null;

  componentDidMount() {
    request.get("/api/clients").then((response: ResponseHttp) => {
      this.setState({ clients: response.data });
    });
  }

  searchClients = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;
    clearTimeout(this.waitEvent);
    this.waitEvent = setTimeout(() => {
      const uri = `/api/clients?$filter=name eq '*${val}*'`;
      request.get(uri).then((response: ResponseHttp) => {
        this.setState({ clients: response.data });
      });
    }, 500);
  };

  render(): React.ReactNode {
    return (
      <>
        <Navbar expand="lg" className="p-2">
          <FiMenu size={30} />
          <div style={{ width: "70%" }}>
            <Form.Control
              placeholder="Buscar Cliente"
              onChange={this.searchClients}
            />
          </div>
          <BsFilter size={30} />
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
