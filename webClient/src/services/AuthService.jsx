import SERVER_URL from '../environment'


export default {
  login: (user) => {
    console.log(
      " %c *** login[/user/login][POST] *** ",
      "font-size: 12px; font-weight: bold;color:green"
    );
    console.log({ user });
    const username = user.username[0];
    const password = user.password[0];

    return fetch(`${SERVER_URL}/user/login`, {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } 
        return { isAuthenticated: false, user: { username: "", role: "" } };
      
    });
  },

  register: (user) => {
    console.log(
      " %c *** register[/user/register][POST] *** ",
      "font-size: 12px; font-weight: bold;color:green"
    );
    return fetch(`${SERVER_URL}/user/register`, {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },

  logout: () => {
    console.log(
      " %c *** logout[/user/login][POST] *** ",
      "font-size: 12px; font-weight: bold;color:green"
    );
    return fetch(`${SERVER_URL}/user/logout`)
      .then((res) => res.json())
      .then((data) => data);
  },
  /*
! Sync backend and frontend (even after browser closes)
! call this function with context API
*/
  isAuthenticated: () => {
    return fetch(`${SERVER_URL}/user/authenticated`)
      .then((res) => {
        console.log(
          " %c *** isAuthenticated[/user/authenticated][GET] *** ",
          "font-size: 12px; font-weight: bold;color:green"
        );
        if (res.status !== 401) {
          return res.json().then((data) => data);
        } 
          return { isAuthenticated: false, user: { username: "", role: "" } };
        
      })
      .then((data) => data);
  },
};
