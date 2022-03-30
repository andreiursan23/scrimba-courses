const emailForm = document.getElementById("email-collector");
emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = new FormData(e.target);
  const userFirstName = userData.get("firstName");
  const userEmailAddress = userData.get("emailAddress");

  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
    <div class="container">
      <h2 class="main-title">Congratulations, ${userFirstName}!</h2>
      <p class="main-subtitle">You're on your way to becoming a BBQ Master</p>
      <p class="form-footer">
        You will get weekly BBQ tips sent to: <strong>${userEmailAddress}</strong>
      </p>
    </div>
  `;
});
