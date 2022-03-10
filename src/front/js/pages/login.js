import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Context } from "../store/appContext";

import { Modal, Button } from "react-bootstrap";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modalText, setModalText] = useState("");

  const history = useHistory();

  const { store, actions } = useContext(Context);

  //Control Primer Modal: datos de incio de sesión no válidos
  const [show, setShow] = useState(false);
  const [toSingUp, setToSingUp] = useState(false);

  const handleClose = () => {
    setShow(false);
    document.getElementById("login").reset();

    if (toSingUp) history.push("/singup");
  };

  const handleShow = () => setShow(true);

  return (
    <div className="container text-center my-5">
      <h3>INSERT YOUR DATA TO LOGIN!!</h3>
      <form id="login">
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
            <strong>Password</strong>
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
        <button
          type="button"
          className="btn btn-warning"
          onClick={async () => {
            let logged = false;

            if (password != "" && email != "") {
              await actions.logIn({
                email: email,
                password: password,
              });

              if (store.user) logged = true;
            } else {
              console.log("Datos no válidos");
              setModalText({
                label: "Insert valid data!!",
                button: "Close",
              });
              handleShow();
              return;
            }

            console.log("Usuario:" + store.user);

            if (!store.user) {
              setModalText({
                label: "User do not exist, sing up first!!",
                button: "Go to singup!",
              });
              setToSingUp(true);
              handleShow();
            } else history.push(`/private`); //Para redirigir a la página de login
          }}
        >
          <strong>Log in!</strong>
        </button>

        {/*Modal 1*/}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ERROR!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalText.label}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {modalText.button}
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};
