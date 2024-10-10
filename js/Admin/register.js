let elRegisterForm = document.querySelector(".register-form")

elRegisterForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        newUsername:e.target.newUsername.value,
        newPassword:e.target.newPassword.value
    }
    elRegisterForm.children[5].innerHTML = `
         <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="Loading" width="40">
    `
    localStorage.setItem("registeredUser", JSON.stringify(data))
    setTimeout(() => location.pathname = "/", 1000)
})