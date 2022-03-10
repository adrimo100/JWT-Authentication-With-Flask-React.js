const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      user: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      singUp: async (user_data) => {
        await fetch(process.env.BACKEND_URL + "/api/singup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user_data),
        })
          .then((response) => {
            if (!response.ok) throw new Error(response.status);

            return response.json();
          })
          .then((data) => {
            console.log("Usuario Creado:" + data);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      },

      logIn: async (user_data) => {
        await fetch(process.env.BACKEND_URL + "/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user_data),
        })
          .then((response) => {
            if (!response.ok) throw new Error("User not valid!");

            return response.json();
          })
          .then((data) => {
            setStore({ user: data });
            return true;
          })
          .catch((error) => {
            console.log(error);
            return false;
          });
      },

      logOut: () => {
        setStore({ user: null });
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
