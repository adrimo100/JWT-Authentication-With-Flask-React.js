import React, { useContext } from "react";

import { Context } from "../store/appContext";

export const Private = () => {
  const { store, actions } = useContext(Context);

  let output = null;

  if (store.user)
    output = (
      <div className="Container d-flex justify-content-center align-items-center">
        <h3>{`Welcome to your page. Your email is: ${store.user.email}`}</h3>
      </div>
    );
  else
    output = (
      <div className="Container d-flex justify-content-center align-items-center">
        <h3>{"You are not logged, you have to sing up!!"}</h3>
      </div>
    );

  return output;
};
