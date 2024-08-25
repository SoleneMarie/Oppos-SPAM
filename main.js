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
  console.log("le prénom dans mon objet :  " + data.firstName); // jusqu'ici tout va bien
  console.log("Voici le data que je vais envoyer par main : " + data); // OK, et en plus il arrive sur ma route post...

  try {
    const response = await axios.post("http://localhost:3000/contact", data);
    console.log("Voici le data envoyé : " + response.data);
  } catch (error) {
    console.log("erreur provenant de main.js"); // Le catch ci-contre s'enclenche
  }
});
