let elLoginForm = document.querySelector(".login-form")
let registeredUser = JSON.parse(localStorage.getItem("registeredUser"))

elLoginForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        username:e.target.username.value,
        password:e.target.password.value
    }
    elLoginForm.children[5].innerHTML = `
         <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="Loading" width="40">
    `
    if(registeredUser){
        if(registeredUser.newUsername == data.username && registeredUser.newPassword == data.password){
            localStorage.setItem("user", JSON.stringify(data))
            setTimeout(() => location.pathname = "./admin.html", 1000)
        }
        else{
            setTimeout(() => {
                elLoginForm.children[5].innerHTML = `
                 <img class="mx-auto scale-[1.4]" src="./images/error.svg" alt="not found" width="40">
                `
             },800)
             setTimeout(() => {
                elLoginForm.children[5].innerHTML = `Войти`
             },2000)
        }
    }
    else{
        if(data.username == "Suxrob" && data.password == "123"){
            localStorage.setItem("user", JSON.stringify(data))
            setTimeout(() => location.pathname = "./admin.html", 1000)
        }
        else{
             setTimeout(() => {
                elLoginForm.children[5].innerHTML = `
                 <img class="mx-auto scale-[1.4]" src="./images/error.svg" alt="not found" width="40">
                `
             },800)
             setTimeout(() => {
                elLoginForm.children[5].innerHTML = `Войти`
             },2000)
        }
    }
})