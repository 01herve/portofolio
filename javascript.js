const form = document.querySelector("form");

function sendmsg(e) {
  e.preventDefault();

  Email.send({
    SecureToken: "5ff22818-43f7-4beb-92c8-34b5897f5811",
    To: "hervengalamulume1@gmail.com",
    From: form.elements.address.value,
    Subject: form.elements.title.value,
    Body: form.elements.message.value,
  }).then((message) => alert(message));
  console.log(form.elements.address.value);
}

form.addEventListener("submit", sendmsg);
