document.getElementById("usernameInput").addEventListener("keyup", (event) => {
  const searchQuery = event.target.value.toLowerCase();

  const userListDOM = document.getElementsByClassName("name");

  for (let counter = 0; counter < userListDOM.length; counter++) {
    let currentUsername = userListDOM[counter].textContent.toLowerCase();

    if (currentUsername.includes(searchQuery)) {
      userListDOM[counter].style.display = "block";
    } else {
      userListDOM[counter].style.display = "none";
    }
  }
});
