import config from "./config.json";


Bangle.http("https://habitica.com/api/v3/tasks/user?type=todos", {
  headers: {
    "x-client":"9d46d9cd-1c9d-4ff9-8f51-59222c2911f4-habiticabangle",
    "x-api-user": config.apiUser,
    "x-api-key" : config.apiKey
  }
}).then(data=>{
  console.info("ok");
  const response = JSON.parse(data.resp);
  if(!response.success) {
    console.debug("oups");
    return;
  };
  const todos = response.data;
  let menu = Object.fromEntries(todos.map(todo => [todo.text, function() {}]));
  menu[""] = {title: "To-dos"};
  console.debug(menu);
  E.showMenu(menu);
})
.catch(console.error);


// Bangle.http("https://jsonplaceholder.typicode.com/todos/1")
// .then(data => {
//   const donnees = JSON.parse(data.resp);
//   console.debug(donnees);
//   E.showAlert(donnees.title);
// });