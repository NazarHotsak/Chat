let inputGroup = document.getElementsByClassName("input-group");
const passwordText = "password";

addEvents(inputGroup);

function addEvents(element) {
    for (let index = 0; index < element.length; index++) {
        element[index].addEventListener('mousedown', (event) => isTargetEye(event));
        element[index].addEventListener('mouseup', (event) => isTargetEye(event));
    }
}

function isTargetEye(event) {
    if (event.target.classList.contains("eye")) {
        swichEye(event.target);
        fidePasswordElement(event.currentTarget.children)
    }
}

function fidePasswordElement(children) {
    for (let index = 0; index < children.length; index++) {
        if (children[index].classList.contains(passwordText)) {
            swichTypePasswordToText(children[index]);
            return;
        }
    }
}

function swichEye(target) {
    target.classList.toggle("bi-eye-slash-fill");
    target.classList.toggle("bi-eye-fill");
    swichTypePasswordToText(target);
}

function swichTypePasswordToText(password) {

    if (password.type == passwordText) {
        password.type = "text";
    }
    else {
        password.type = passwordText;
    }
}

function isTouchDevice() {
    return ('ontouchstart' in document.documentElement);
}