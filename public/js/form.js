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
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    let nameValid = nameValidation();
    let emailValid = emailValidation();
    let textAreaValid = textAreaValidation();

    if (nameValid && emailValid && textAreaValid) {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let textArea = document.getElementById("textArea").value;
        let formData = {
            name,
            email,
            textArea
        }

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://www.albanesidev.com.ar/api/sendEmail', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.responseText === 'success') {
                alert('Tu mensaje ha sido enviado');
                name.value = "";
                email.value = "";
                textArea.value = "";
                console.log('success');
            }
        }
        xhr.send(JSON.stringify(formData));
    }
}