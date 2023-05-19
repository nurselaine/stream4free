let users = [];
let chatroom = '';

let addUser = (id, username, room) => {
  if(username && room){
    users.push({id, username, room});
  }
}