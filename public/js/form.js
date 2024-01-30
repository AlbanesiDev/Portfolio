function nameValidation() {
    let nameInput = document.getElementById("name");
    let nameError = document.getElementById("nameError");
    let name = nameInput.value.trim();

    if (name.length === 0) {
        nameError.textContent = "Por favor, ingrese un nombre.";
        nameInput.classList.add("error");
        return false;
    } else if (name.length < 3 || name.length > 20) {
        nameError.textContent = "Por favor, ingrese un nombre entre 3 y 20 caracteres.";
        nameInput.classList.add("error");
        return false;
    } else {
        nameError.textContent = "";
        nameInput.classList.remove("error");
        return true;
    }
}

function emailValidation() {
    let emailInput = document.getElementById("email");
    let emailError = document.getElementById("emailError");
    let email = emailInput.value.trim();

    if (email.length === 0) {
        emailError.textContent = "Por favor, ingrese un correo electrónico.";
        emailInput.classList.add("error");
        return false;
    } else if (!emailRegexValidation(email)) {
        emailError.textContent = "Por favor, ingrese un correo electrónico válido.";
        emailInput.classList.add("error");
        return false;
    } else {
        emailError.textContent = "";
        emailInput.classList.remove("error");
        return true;
    }
}

function emailRegexValidation(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function textAreaValidation() {
    let textAreaInput = document.getElementById("textArea");
    let textAreaError = document.getElementById("textAreaError");
    let textArea = textAreaInput.value.trim();

    if (textArea.length === 0) {
        textAreaError.textContent = "Por favor, ingrese un mensaje.";
        textAreaInput.classList.add("error");
        return false;
    } else if (textArea.length < 10 || textArea.length > 300) {
        textAreaError.textContent = "Por favor, ingrese un mensaje entre 10 y 300 caracteres.";
        textAreaInput.classList.add("error");
        return false;
    } else {
        textAreaError.textContent = "";
        textAreaInput.classList.remove("error");
        return true;
    }
}

function sendEmail() {
    var formError = document.getElementById("formError");

    var nameValid = nameValidation();
    var emailValid = emailValidation();
    var textAreaValid = textAreaValidation();

    if (nameValid && emailValid && textAreaValid) {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var textArea = document.getElementById("textArea").value;

        fetch('/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, textArea }),
        })
            .then(response => response.json())
            .then(data => {
                formError.textContent = "";
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        formError.textContent = "Por favor, complete todos los campos correctamente.";
    }
}
