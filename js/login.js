const input = document.querySelector('.name');
const button = document.querySelector('.btn-submit');
const form = document.querySelector('.login_form');

const validadeInput = ({ target }) => {
    if(target.value.length > 4) {
        button.removeAttribute('disabled');
        button.innerHTML = 'continuar';
        return;
    }
    button.setAttribute('disabled', '');
    button.innerHTML = '&#128285; | &#128064;'
}

const validadePassword =(event) => {
    let password = document.querySelector('.name').value.toLowerCase();
    if(password == 'joyce') {
        event.preventDefault();
        localStorage.setItem('user_name', password);
        window.location = 'pages/game.html';
    } else {
        alert('senha incorreta');
    };
};

input.addEventListener('input', validadeInput);
form.addEventListener('submit', validadePassword);