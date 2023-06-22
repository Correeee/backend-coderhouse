const user = document.getElementById('user__github')
const role = document.getElementById('role__github')

const userData = fetch('/users/profileGithub')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))

