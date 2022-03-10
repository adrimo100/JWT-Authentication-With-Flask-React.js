import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

import { Modal, Button } from "react-bootstrap";

export const Singup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    document.getElementById("singup").reset();
  };
  const handleShow = () => setShow(true);

  const history = useHistory();

  const { store, actions } = useContext(Context);

  return (
    <div className="container text-center my-5">
      <h3>CREATE A NEW USER</h3>
      <form id="singup">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            <strong>User Email</strong>
          </label>
          <div style={{ width: "50%", marginLeft: "25%" }}>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <strong>Create Password</strong>
          </label>
          <div style={{ width: "50%", marginLeft: "25%" }}>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <strong>Repeat Password</strong>
          </label>
          <div style={{ width: "50%", marginLeft: "25%" }}>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(event) => {
                setRepeatedPassword(event.target.value);
              }}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            if (password == repeatedPassword && password != "" && email != "") {
              actions.singUp({
                email: email,
                password: password,
              });

              history.push(`/login`); //Para redirigir a la página de login
            } else {
              console.log("No coinciden las contraseñas");
              handleShow();
            }
          }}
        >
          <strong>Create User!</strong>
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ERROR!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Passwords do not match!!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};
