let modal = document.getElementById("myModal");
let btn = document.getElementById("openModalBtn");
let formData = document.getElementById("form-data");
let modalShadow = document.getElementsByClassName("modal-shadow")[0];
const errorId = document.getElementById('error')
const success = document.getElementById('success')


btn.addEventListener('click', function () {
    modal.classList.add('active');
    modalShadow.classList.add('modal__shadow--show')
})

function toggleLoader() {
    const loader = document.getElementById('loader')
    loader.classList.toggle('hidden')
}

formData.addEventListener('submit', handleFormSubmit)

async function handleFormSubmit(event) {
    errorId.classList.add('hidden')
    success.classList.add('hidden')
    event.preventDefault();
    const data = serializeForm(event.target);
    toggleLoader();
    const {status, error} = await sendData(data);
    toggleLoader()

    if (status === 201) {
        success.classList.remove('hidden')
        document.forms[0].reset()
    } else {
        errorId.classList.remove('hidden')
    }
    console.log('Отправка!')
}

function serializeForm(formNode) {
    return new FormData(formNode)
}

async function sendData(data) {
    try {
        return await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            body: data,
        })
    } catch (err) {
        toggleLoader()
        errorId.classList.remove('hidden')
    }
}

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.classList.remove('active');
        modalShadow.classList.remove('modal__shadow--show')
        errorId.classList.add('hidden')
        success.classList.add('hidden')
    }
})

window.addEventListener('keydown', function (event) {
    const key = event.key;
    if (key === "Escape") {
        modal.classList.remove('active');
        modalShadow.classList.remove('modal__shadow--show')
        errorId.classList.add('hidden')
        success.classList.add('hidden')
    }
});

