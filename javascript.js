const FORM = document.querySelector('form')
const messageError = document.querySelectorAll('.errorMessage')






function checkIfEmpty(field, errorMessage) {
    return field.trim() === "" ? errorMessage : "";
}
function checkIfLength(field, value) {
    return `le ${field} doit avoir ${value} caracteres`
}







function validateForm() {
    const email = FORM.mail.value.trim();
    const subject = FORM.title.value.trim();
    const message = FORM.message.value.trim();

    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        errors.email = "Veuillez entrer une adresse email.";
    } else if (!emailRegex.test(email)) {
        errors.email = "Veuillez entrer une adresse email valide.";
    }

    if (subject === "") {
        errors.subject = "Veuillez entrer un objet pour votre message.";
    } else if (subject.trim().length < 5) {
        errors.subject = "Le sujet doit avoir au moins 5 caractères.";
    }

    if (message === "") {
        errors.message = "Veuillez entrer un message.";
    } else if (message.trim().length < 10) {
        errors.message = "Le message doit avoir au moins 10 caractères.";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }


    return { email, subject, message };
}


FORM.addEventListener("submit", (event) => {
    event.preventDefault();

    const result = validateForm();

    if (result.errors) {
        // Afficher les erreurs
        Object.keys(result.errors).forEach((key, index) => {
            messageError[index].textContent = result.errors[key];
            messageError[index].style.color = 'red'
            messageError[index].style.display = 'block'

        });
    } else {

        const { email, subject, message } = result;
        // sendMail(email, subject, message);

        Object.keys(result.errors).forEach((key, index) => {
            messageError[index].style.display = 'none'

        });
        console.log('oui')
    }
});



function sendMail() {
    var params = {

        email: FORM.mail.value,
        message: FORM.message.value,
        titre: FORM.title.value,
    };

    const serviceID = "service_8j0o4a6";
    const templateID = "template_1mbdfn4";

    emailjs.send(serviceID, templateID, params)
        .then(res => {

            email: FORM.mail.value = "";
            message: FORM.message.value = "";
            titre: FORM.title.value = "";
            console.log(res);
            afficherMessage()
            FORM.title.style.borderColor = 'black'
            FORM.mail.style.borderColor = 'black'
            FORM.message.style.borderColor = 'black'

        })
        .catch(err => console.log(err));

}
let message = 'envoyé'
function afficherMessage(message) {
    const element = document.querySelector('.valide');
    // element.textContent = message;
    element.style.display = 'block';
    setTimeout(function () {
        element.style.display = 'none';
    }, 2000);
}




setTimeout(function () {
    $(".loader_bg").fadeToggle();
}, 2500);