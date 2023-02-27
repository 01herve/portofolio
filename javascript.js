const FORM = document.querySelector('form')



let message_erreurs = {
    empty: (field) => `Le champ ${field} est vide`,
    email: (field) => `Le champ ${field} doit etre un email valide`,
    length: (field, length) => `Le champ ${field} doit avoir au  moin ${length} characteres`,
}

function verifieFields(field, value, ...validations) {

    value = value.value.trim()
    for (const validation of validations) {
        if (typeof validation === 'string') {
            if (validation === 'required') {
                if (value === '') console.log(message_erreurs.empty(field))
            }

            if (validation === 'email') {
                if (!isNotMailValid(value)) console.log(message_erreurs.email(field))
            }
        } else {

            if (validation[0] === 'length') {
                if (value.length < validation[1]) console.log(message_erreurs.length(field, validation[1]))
            }
        }
    }

}
function isNotMailValid(value) {
    let regex_mail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    if (!regex_mail.test(value)) {
        return message_erreurs.email(field);
    }
    return false;
}



FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    // verifieFields('adresse mail', FORM.mail, 'required'['email', isNotMailValid(value)]);
    // verifieFields('titre', FORM.title, 'required', ['length', 10]);
    // verifieFields('de message', FORM.message, 'required', ['length', 10]);



    sendMail()
    FORM.reset()


})


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