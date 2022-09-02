import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import RouterProps from "../interfaces/RouterProps";
import "../css/login.css";

class LoginView extends React.Component <RouterProps> {
  state = {
    email: "",
    password: "",
  };

  handleChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [el.target.name]: el.target.value });
  };

  handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    
    const { email, password } = this.state;
    const cred: String = btoa(email + ":" + password)
    
    const request = await fetch("/auth/singin", {
        method: "post",
        headers:{
            "Authorization": "Basic " + cred
        }
    })

    const response = await request.json()
    if(response.error) return alert(response.message)
    window.localStorage.setItem("token", response.token)
    window.localStorage.setItem("email", response.userinfo.email)
    window.localStorage.setItem("fullname", response.userinfo.fullname)
    window.localStorage.setItem("isAdmin", response.userinfo.is_admin)
    
    this.props.go("Clients",{})

  };

  render() {
    return (
      <Container
        className="d-flex justify-content-center align-items-center login-contianer"
        fluid
      >
        <Form
          style={{ width: "100%" }}
          className="text-center"
          onSubmit={this.handleSubmit}
        >
          <Form.Control
            type="email"
            placeholder="Correo"
            className="input-login"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
            required
          />
          <Form.Control
            type="password"
            placeholder="Contraseña"
            className="input-login mt-4"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            required
          />
          <Button className="mt-5 w-100" size="lg" type="submit">
            Iniciar Sesión
          </Button>
        </Form>
      </Container>
    );
  }
}

export default LoginView;
