export default {
  getTodos: () => {
    return fetch("127.0.0.1:5000/user/todos").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } 
        return { message: { msgBody: "unAuthorized" }, msgError: true };
      
    });
  },

  postTodo: (todo) => {
    return fetch("127.0.0.1:5000/user/todo", {
      method: "post",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } 
        return { message: { msgBody: "unAuthorized" }, msgError: true };
      
    });
  },
};
