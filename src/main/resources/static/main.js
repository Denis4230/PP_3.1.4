

const userFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Referer': null
    },
    getAllUsers: async () => await fetch('api/users'),
    getUserByUsername: async () => await fetch(`api/users/name`),
    getUserById: async (id) => await fetch(`api/users/` + id),
    addUser: async (user) => await fetch('api/users', {method: "POST", headers: userFetch.head, body: JSON.stringify(user)}),
    updateUserByID: async (user, id) => await fetch(`api/users/` + id, {method: 'PUT', headers: userFetch.head, body: JSON.stringify(user)}),
    deleteUserByID: async (id) => await fetch(`api/users/` + id, {method: 'DELETE', headers: userFetch.head})
}

allFunctions()

function allFunctions() {
    infoUser();
    getUsers();
}

function infoUser() {
    userFetch.getUserByUsername()
        .then(res => res.json())
        .then(user => {
            let stringRoles = getRoles(user.roles);
            document.querySelector('#infoUser').innerHTML = `
                ${user.username} with roles:  ${stringRoles}
            `;
            document.querySelector('#userInfoPanel').innerHTML = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.surname}</td>
                <td>${user.username}</td>
                <td>${stringRoles}</td>
                <td>
            `;
        });
}

function getUsers() {
    userFetch.getAllUsers()
        .then(res => res.json())
        .then(users => {users.forEach((user) => {
            let stringRoles = getRoles(user.roles);
            document.querySelector('#tableUsers').insertAdjacentHTML('beforeend',
                `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.surname}</td>
                <td>${user.username}</td>
                <td>${stringRoles}</td>
                <td>
                <button type="submit" onclick="editUser(${user.id})"
                class="btn btn-info" data-toggle="modal" data-target="#editUser">Edit</button>
                </td>
                <td>
                <button type="submit" onclick="deleteUser(${user.id})" 
                class="btn btn-danger" data-toggle="modal" data-target="#deleteUser">Delete</button>
                </td>
                </tr>`);
        })
        });
}

function addUserData() {
    document.addEventListener('DOMContentLoaded', addUserData);
        let name = document.getElementById('addName').value;
        let age = document.getElementById('addAge').value;
        let surname = document.getElementById('addSurname').value;
        let username = document.getElementById('addUsername').value;
        let password = document.getElementById('addPassword').value;
        let role = document.getElementById('addRoles').value;
        let user = {
            name:name,
            age:age,
            surname:surname,
            username:username,
            password:password,
            roles: addRoles(role)
        };
    userFetch.addUser(user).then(() => {
        document.getElementById('addName').value = ``;
        document.getElementById('addAge').value = ``;
        document.getElementById('addSurname').value = ``;
        document.getElementById('addUsername').value = ``;
        document.getElementById('addPassword').value = ``;
        document.getElementById('addRoles').value = ``;
        document.getElementById('tableUsers').innerHTML = ``;
    }).then(() => getUsers());
}

function editUser(id) {
    userFetch.getUserById(id)
        .then(res => {
            res.json().then(user => {
                $('#editID').val(user.id)
                $('#editName').val(user.name)
                $('#editAge').val(user.age)
                $('#editSurname').val(user.surname)
                $('#editUsername').val(user.username)
                $('#editPassword').val("")
                $('#editRoles').val(addRoles(user.roles))
            })
        })
}

function updateUser() {
    let id = document.getElementById('editID').value;
    let name =  document.getElementById('editName').value;
    let age = document.getElementById('editAge').value;
    let surname = document.getElementById('editSurname').value;
    let username = document.getElementById('editUsername').value;
    let password = document.getElementById('editPassword').value;
    let role = addRoles(document.getElementById('editRoles').value);
    let user = {
        id:id,
        name:name,
        age:age,
        surname:surname,
        username:username,
        password:password,
        roles: addRoles(role)
    };

    userFetch.updateUserByID(user, id).then(() => {
        document.getElementById('editID').value = ``;
        document.getElementById('editName').value = ``;
        document.getElementById('editAge').value = ``;
        document.getElementById('editSurname').value = ``;
        document.getElementById('editUsername').value = ``;
        document.getElementById('editPassword').value = ``;
        document.getElementById('editRoles').value = ``;
        document.getElementById('tableUsers').innerHTML = ``;
        getUsers();
    })
}
//ok
function deleteUser(id) {
    userFetch.getUserById(id)
        .then(res => {
            res.json().then(user => {
                $('#deleteID').val(user.id)
                $('#deleteName').val(user.name)
                $('#deleteAge').val(user.age)
                $('#deleteSurname').val(user.surname)
                $('#deleteUsername').val(user.username)
                $('#deleteRoles').val(getRoles(user.roles))
            })
        })
}

function deleteUserById() {
    let id = document.getElementById('deleteID').value;
    userFetch.deleteUserByID(id).then(() => {
        document.getElementById('deleteID').value = ``;
        document.getElementById('deleteName').value = ``;
        document.getElementById('deleteAge').value = ``;
        document.getElementById('deleteSurname').value = ``;
        document.getElementById('deleteUsername').value = ``;
        document.getElementById('deleteRoles').value = ``;
        document.getElementById('tableUsers').innerHTML = ``;
        getUsers();
    });
}


function getRoles(list) {
    let userRoles = [];
    for (let role of list) {
        if (role.role ==="ROLE_ADMIN") {
            userRoles.push(" ADMIN");
        }
    }
        userRoles.push(" USER");

    return userRoles.join("  ");
}

function addRoles(role) {
    let roles = [];
    if (role === "ROLE_ADMIN"){
        roles.push({role: "ROLE_ADMIN"});
    }
    if (role === "ROLE_USER") {
        roles.push({role: "ROLE_USER"});
    }
    return roles;
}
