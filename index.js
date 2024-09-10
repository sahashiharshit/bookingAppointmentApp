function handleFormSubmit(event) {
  event.preventDefault();
  const username = event.target.username.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;
  let userDetails = {
    username: username,
    email: email,
    phone: phone,
  };
  // axios post request
  axios
    .post(
      "https://crudcrud.com/api/3a9bab322d584a76b2a9b15b0f6d5bb4/appointmentData",
      userDetails
    )
    .then((res) => {
      addUserOnScreen(res.data);
    })
    .catch((error) => console.log(error));
}
function addUserOnScreen(data) {
  const userList = document.querySelector("ul");
  const listItem = document.createElement("li");
  listItem.className = "list-group-item";
  listItem.setAttribute("data-id", data._id);
  listItem.innerHTML = `username: ${data.username}, email: ${data.email}, phone: ${data.phone} <button class='btn btn-outline-secondary m-2'>Edit</button><button class='btn btn-outline-secondary m-2'>Delete</button>`;
  userList.appendChild(listItem);
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

function getData() {
  return axios
    .get(
      "https://crudcrud.com/api/3a9bab322d584a76b2a9b15b0f6d5bb4/appointmentData"
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}
function getDataByID(id) {
  return axios
    .get(
      `https://crudcrud.com/api/3a9bab322d584a76b2a9b15b0f6d5bb4/appointmentData/${id}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
}

function deleteData(id) {
  axios
    .delete(
      `https://crudcrud.com/api/3a9bab322d584a76b2a9b15b0f6d5bb4/appointmentData/${id}`
    )
    .then((res) => {
      console.log("Data Deleted:", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
async function updateUserList() {
  //Get data from api
  let users = await getData();

  // Update List with the data coming from api

  users.forEach((data) => {
    const userList = document.querySelector("ul");
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.setAttribute("data-id", data._id);
    listItem.innerHTML = `username: ${data.username}, email: ${data.email}, phone: ${data.phone} <button class='btn btn-outline-secondary m-2'>Edit</button><button class='btn btn-outline-danger m-2'>Delete</button>`;
    userList.appendChild(listItem);
  });

  const userList = document.querySelector("ul");
  if (userList) {
    userList.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-outline-danger")) {
        const userToDelete = event.target.parentElement;
        const id = userToDelete.getAttribute("data-id");
        const email = userToDelete.textContent
          .match(/email:\s*([^,]*)/)[1]
          .trim();

        userList.removeChild(userToDelete);
        deleteData(id);
      }
    });
  }

  if (userList) {
    userList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("btn-outline-secondary")) {
        const userToEdit = event.target.parentElement;
        const email = userToEdit.textContent
          .match(/email:\s*([^,]*)/)[1]
          .trim();
        const id = userToEdit.getAttribute("data-id");
        const userDetails = await getDataByID(id);
        document.getElementById("username").value = userDetails.username;
        document.getElementById("email").value = userDetails.email;
        document.getElementById("phone").value = userDetails.phone;
        userList.removeChild(userToEdit);
        deleteData(id);
      }
    });
  }
}

window.onload = updateUserList;
