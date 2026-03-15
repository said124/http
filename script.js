let nameInput = document.querySelector('.nameInput')
let numberInput = document.querySelector('.numberInput')
let addBtn = document.querySelector('.addBtn')
let contacts = document.querySelector('.contacts')

let API = 'https://69b6db10583f543fbd9eb5b1.mockapi.io/api/user'

function getUsers() {

    fetch(API)
        .then(res => res.json())
        .then(data => {

            contacts.innerHTML = ''

            data.forEach(user => {

                let div = document.createElement('div')
                div.classList.add('contact')

                div.innerHTML = `
<div class="left">
<div class="avatar"></div>

<div class="info">
<h3>${user.name}</h3>
<p>${user.number}</p>
</div>
</div>

<div class="actions">
<span class="edit">✏️</span>
<span class="delete">🗑</span>
</div>
`

                div.querySelector('.delete').addEventListener('click', () => {
                    deleteUser(user.id)
                })

                div.querySelector('.edit').addEventListener('click', () => {
                    editUser(user.id)
                })

                contacts.append(div)

            })

        })

}

getUsers()

addBtn.addEventListener('click', () => {

    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput.value.trim(),
            number: numberInput.value.trim()
        })
    })
        .then(res => res.json())
        .then(() => {

            nameInput.value = ''
            numberInput.value = ''

            getUsers()

        })

})

function deleteUser(id) {

    fetch(`${API}/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            getUsers()
        })

}

function editUser(id) {

    let newName = prompt('New name')
    let newNumber = prompt('New number')

    fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            number: newNumber
        })
    })
        .then(res => res.json())
        .then(() => {
            getUsers()
        })

}