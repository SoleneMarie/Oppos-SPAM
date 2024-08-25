document.addEventListener("DOMContentLoaded", () => console.log("DOM loaded"));
const form = document.querySelector("#contact");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const question = document.querySelector("#question").value;
  const message = document.querySelector("#message").value;

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    question: question,
    message: message,
  };
  console.log(data);

  try {
    const response = await axios.post("http://localhost:3000/contact", data);
    console.log(response.data);
  } catch (error) {
    console.log(error.response);
  }
});
