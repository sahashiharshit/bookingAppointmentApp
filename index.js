
function handleFormSubmit(event) {
  event.preventDefault();
  const username = event.target.username.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;
  let newUser = {
    username: username,
    email: email,
    phone: phone,
  };
  localStorage.setItem(email, JSON.stringify(newUser));

  // Clear the form fields
 
  const userList = document.getElementById("userlist"); 
  let user = JSON.parse(localStorage.getItem(localStorage.key(email)));
  const listItem = document.createElement("li");
  listItem.textContent = `Username: ${user.username}, Email: ${user.email}, Phone: ${user.phone}`;
  userList.appendChild(listItem);

}

function updateUserList() {
  const userList = document.getElementById("userlist");
  let users = [];

  // Retrieve the users from localStorage
  for (let i = 0; i < localStorage.length; i++) {
    
    users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  
  users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Username: ${user.username}, Email: ${user.email}, Phone: ${user.phone}`;

    userList.appendChild(listItem);
  });
}
window.onload = updateUserList;
