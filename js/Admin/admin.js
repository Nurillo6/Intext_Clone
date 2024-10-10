let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")
let elCategoryList = document.querySelector(".category-list")
let elPoolsList = document.querySelector(".pool-tbody")
let products = JSON.parse(localStorage.getItem("products")) || []

let elSearchInput = document.querySelector(".search-input")
document.querySelector(".user-logined").textContent = JSON.parse(localStorage.getItem("user")).username

const active = "font-bold cursor-pointer text-[35px] leading-10 border-b-[2px] border-[#009398] text-[#009398] pb-2"
const disabled = "font-bold cursor-pointer text-[35px] leading-10 text-[#B4B4C6] border-b-[2px] border-transparent pb-2"

// Add Part start
function handleAddProductBtnClick() {
  elModalWrapper.classList.remove("scale-0")
  elModalInner.innerHTML = `
    <form class="p-[41px] add-product-form" autocomplete="off">
        <label class="block mb-[24px]">
          <input class="add-choose-input hidden" type="file" class="hidden">
          <img class="add-choose-img mx-auto w-[550px] h-[300px] p-2 rounded-md" src="./images/empty-img.png" alt="Empty img" width="691" height="316">
        </label>
        <div class="flex justify-between">
          <div class="w-[49%] space-y-5">
            <select class="outline-none py-[13px] rounded-md pl-2 border-[1px] border-slate-500 w-full" name="category">
              <option value="1">Каркасные</option>
              <option value="2">Надувные</option>
            </select>
            <input class="outline-none py-3 rounded-md pl-2 border-[1px] border-slate-500 w-full" required type="number" name="oldPrice" placeholder="Стартая цена (сум) ">
            <select class="outline-none py-[13px] rounded-md pl-2 border-[1px] border-slate-500 w-full" name="frame">
              <option value="1">Металлический</option>
              <option value="2">Прямоугольная</option>
              <option value="3">Рамка призмы</option>
            </select>
          </div>
          <div class="w-[49%]  space-y-5">
            <input class="outline-none py-[11.5px] rounded-md pl-2 border-[1px] border-slate-500 w-full" required type="number" name="amount" placeholder="Количество">
            <input class="outline-none py-[11.5px] rounded-md pl-2 border-[1px] border-slate-500 w-full" required type="number" name="newPrice" placeholder="Цена со скидкой (сум) ">
          </div>
        </div>
        <button class="w-[237px] py-[6px] block mx-auto bg-[#009398] text-white text-[20px] font-bold text-center font-bold rounded-[30px] mt-[25px]">Добавить</button>
      </form>
    `
  let elAddProductForm = document.querySelector(".add-product-form")
  let elChooseInput = document.querySelector(".add-choose-input")
  let elChooseImg = document.querySelector(".add-choose-img")

  elChooseInput.addEventListener("change", function (e) {
    elChooseImg.src = URL.createObjectURL(e.target.files[0])
    elChooseImg.classList.add("bg-white")
  })

  elAddProductForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const data = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      imgUrl: elChooseImg.src,
      categoryId: e.target.category.value,
      oldPrice: e.target.oldPrice.value,
      frame: e.target.frame.value,
      amount: e.target.amount.value,
      newPrice: e.target.newPrice.value
    }
    e.target.lastElementChild.innerHTML = `
           <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="Loading" width="40">
        `
    setTimeout(() => {
      e.target.lastElementChild.innerHTML = "Добавить"
      products.push(data)
      elModalWrapper.classList.add("scale-0")
      if(data.categoryId == "1"){
        elCategoryList.children[0].className = active
        elCategoryList.children[1].className = disabled
      }
      else if (data.categoryId == "2"){
        elCategoryList.children[0].className = disabled
        elCategoryList.children[1].className = active
      }
      renderPools(products, data.categoryId)
      localStorage.setItem("products", JSON.stringify(products))
    }, 1000)
  })

}
elModalWrapper.addEventListener("click", (e) => {
  if (e.target.id == "wrapper") {
    elModalWrapper.classList.add("scale-0")
    setTimeout(() => {
      elModalInner.className = "modal-inner w-[1000px] h-[680px] bg-blue-200 absolute top-0 bottom-0 left-0 right-0 m-auto rounded-[20px]"
    }, 500)
  }
})
// Add Part end

// Render Pools start
function renderPools(arr, categoryId) {
  elPoolsList.innerHTML = null
  const filterArr = arr.filter(item => item.categoryId == categoryId)
  filterArr.forEach(item => {
    let elPoolRow = document.createElement("tr")
    elPoolRow.className = "bg-slate-200"
    elPoolRow.innerHTML = `
              <td class="py-[17px] rounded-tl-[30px] rounded-bl-[30px]">
                <img class="mx-auto" src="${item.imgUrl}" alt="Pool img" width="110" height="41">
              </td>
              <td>
                <div class="flex flex-col ">
                  <span class="text-[12px] leading-[13px] text-[#B4B4C6] text-red-500 line-through">${item.oldPrice} сум</span>
                  <strong>${item.newPrice} сум</strong>
                </div>
              </td>
              <td>
                <span class="text-[25px] leading-[35px]">${item.amount}</span>
              </td>
              <td>
                <span class="text-[25px] leading-[35px]">
                    ${item.frame == "1" ? "Металлический" : ""}
                    ${item.frame == "2" ? "Прямоугольная" : ""}
                    ${item.frame == "3" ? "Рамка призмы" : ""}
                </span>
              </td>
              <td>
                <span class="text-[25px] leading-[35px]">
                    ${item.categoryId == "1" ? "Каркасные" : ""}
                    ${item.categoryId == "2" ? "Надувные" : ""}
                </span>
              </td>
              <td class="rounded-tr-[30px] rounded-br-[30px]">
                <div class="flex items-center gap-[18px]">
                  <button onclick="handleEditBtnClick(${item.id})" class="hover:scale-[1.5] duration-300">
                    <img src="./images/edit-icon.svg" alt="Edit Icon" width="22" height="22">
                  </button>
                  <button onclick="handleDeleteBtnClick(${item.id})" class="hover:scale-[1.5] duration-300">
                    <img src="./images/delete-icon.svg" alt="Delete Icon" width="22" height="22">
                  </button>
                </div>
              </td>
        `
    elPoolsList.appendChild(elPoolRow)
  })
}
renderPools(products, "1")
// Render Pools end

// Category list change start
elCategoryList.addEventListener("click", function (e) {
  if (e.target.id == "1") {
    e.target.className = active
    e.target.nextElementSibling.className = disabled
    renderPools(products, "1")
    elSearchInput.value = ""
    
  }
  else if (e.target.id == "2") {
    e.target.className = active
    e.target.previousElementSibling.className = disabled
    renderPools(products, "2")
     elSearchInput.value = ""
  }
})
// Category list change end

// Delete Part start
function handleDeleteBtnClick(id) {
  elModalWrapper.classList.remove("scale-0")
  elModalInner.classList.remove("w-[1000px]")
  elModalInner.classList.remove("h-[680px]")
  elModalInner.classList.add("w-[500px]")
  elModalInner.classList.add("h-[200px]")

  elModalInner.innerHTML = `
    <div class="p-5 mt-[30px]">
      <h2 class="text-center text-[25px]">Вы уверены, что удалите?</h2>
      <div class="flex justify-betwenn">
        <button onclick="handleCancelBtnClick()" class="w-[49%] py-[6px] block mx-auto bg-[#009398] text-white text-[20px] font-bold text-center font-bold rounded-[30px] mt-[25px]">Отмена</button>
        <button onclick="handleDeleteProduct(${id})" class="delete-btn w-[49%] py-[6px] block mx-auto bg-red-500 text-white text-[20px] font-bold text-center font-bold rounded-[30px] mt-[25px]">Да</button>
      </div>
    </div>
  `
  
}
function handleCancelBtnClick() {
  elModalWrapper.classList.add("scale-0")
  setTimeout(() => {
    elModalInner.className = "modal-inner w-[1000px] h-[680px] bg-blue-200 absolute top-0 bottom-0 left-0 right-0 m-auto rounded-[20px]"
  }, 500)
}
function handleDeleteProduct(id){
  let elDeleteBtn = document.querySelector(".delete-btn")
  const deleteIndex = products.findIndex(item => item.id == id)
  const findedObj = products.find(item => item.id == id)      

  elDeleteBtn.innerHTML = `
     <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="Loading" width="40">
  `
  setTimeout(() => {
    handleCancelBtnClick()
    products.splice(deleteIndex, 1)
    renderPools(products, findedObj.categoryId)
    localStorage.setItem("products", JSON.stringify(products))  
  },1000)
 
}
// Delete Part end


// Edit part start
function handleEditBtnClick(id){
  const findedObj = products.find(item => item.id == id)
  
  elModalWrapper.classList.remove("scale-0")
  elModalInner.innerHTML = `
  <form class="p-[41px] edit-product-form" autocomplete="off">
      <label class="block mb-[24px]">
        <input class="edit-choose-input hidden" type="file" class="hidden">
        <img onerror="handleErrorImg()" class="edit-choose-img cursor-pointer mx-auto w-[550px] h-[300px] p-2 rounded-md" src="${findedObj.imgUrl}" alt="Empty img" width="691" height="316">
      </label>
      <div class="flex justify-between">
        <div class="w-[49%] space-y-5">
          <select class="outline-none py-[13px] rounded-md pl-2 border-[1px] border-slate-500 w-full" name="category">
            <option ${findedObj.categoryId == "1" ? "selected" : ""} value="1">Каркасные</option>
            <option ${findedObj.categoryId == "2" ? "selected" : ""} value="2">Надувные</option>
          </select>
          <input value="${findedObj.oldPrice}" class="outline-none py-3 rounded-md pl-2 border-[1px] border-slate-500 w-full" required type="number" name="oldPrice" placeholder="Стартая цена (сум) ">
          <select class="outline-none py-[13px] rounded-md pl-2 border-[1px] border-slate-500 w-full" name="frame">
            <option ${findedObj.frame == "1" ? "selected" : ""} value="1">Металлический</option>
            <option ${findedObj.frame == "2" ? "selected" : ""} value="2">Прямоугольная</option>
            <option ${findedObj.frame == "3" ? "selected" : ""} value="3">Рамка призмы</option>
          </select>
        </div>
        <div class="w-[49%]  space-y-5">
          <input value="${findedObj.amount}" class="outline-none py-[11.5px] rounded-md pl-2 border-[1px] border-slate-500 w-full" required type="number" name="amount" placeholder="Количество">
          <input value="${findedObj.newPrice}" class="outline-none py-[11.5px] rounded-md pl-2 border-[1px] border-slate-500 w-full" required type="number" name="newPrice" placeholder="Цена со скидкой (сум) ">
        </div>
      </div> 
      <button class="update-btn w-[237px] py-[6px] block mx-auto bg-[#009398] text-white text-[20px] font-bold text-center font-bold rounded-[30px] mt-[25px]">Редактировать</button>
    </form>
  `
  let elEditForm = document.querySelector(".edit-product-form")
  let elEditChooseInput = document.querySelector(".edit-choose-input")
  let elEditChooseImg = document.querySelector(".edit-choose-img")

  elEditChooseInput.addEventListener("change", function(e){
    elEditChooseImg.classList.add("bg-white")
    elEditChooseImg.classList.add("p-5")
    elEditChooseImg.classList.add("rounded-md")
    elEditChooseImg.src = URL.createObjectURL(e.target.files[0])
  })

  elEditForm.addEventListener("submit", function(e){
    e.preventDefault()
    let elEditBtn = document.querySelector(".update-btn")
    elEditBtn.innerHTML = `
      <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="Loading" width="40">
    `
    setTimeout(() => {
      elModalWrapper.classList.add("scale-0")

      findedObj.imgUrl = elEditChooseImg.src
      findedObj.categoryId = e.target.category.value
      findedObj.oldPrice = e.target.oldPrice.value
      findedObj.frame = e.target.frame.value
      findedObj.amount = e.target.amount.value
      findedObj.newPrice = e.target.newPrice.value

      if(e.target.category.value == "1"){
        elCategoryList.children[0].className = active
        elCategoryList.children[1].className = disabled
      }
      else if (e.target.category.value == "2"){
        elCategoryList.children[0].className = disabled
        elCategoryList.children[1].className = active
      }

      renderPools(products, e.target.category.value)
      localStorage.setItem("products", JSON.stringify(products))
    },1000)
 
  })
} 
function handleErrorImg(){
  let elEditChooseImg = document.querySelector(".edit-choose-img")
  elEditChooseImg.src = "./images/empty-img.png"
}
// Edit part end

// Search Part start
elSearchInput.addEventListener("input", function(e){
  if(elCategoryList.children[0].className == active){
   const newPriceSearhList = products.filter(item => item.newPrice.includes(e.target.value))
   renderPools(newPriceSearhList, "1")
  }
  if(elCategoryList.children[1].className == active){
    const newPriceSearhList = products.filter(item => item.newPrice.includes(e.target.value))
    renderPools(newPriceSearhList, "2")
  }
})

function handleLoginBtnClick(){
  elModalWrapper.classList.remove("scale-0")
  elModalInner.classList.remove("w-[1000px]")
  elModalInner.classList.remove("h-[680px]")
  elModalInner.classList.add("w-[500px]")
  elModalInner.classList.add("h-[200px]")

  elModalInner.innerHTML = `
    <div class="p-5 mt-[30px]">
      <h2 class="text-center text-[25px]">Вы хотите выйти из системы?</h2>
      <div class="flex justify-betwenn">
        <button onclick="handleCancelBtnClick()" class="w-[49%] py-[6px] block mx-auto bg-[#009398] text-white text-[20px] font-bold text-center font-bold rounded-[30px] mt-[25px]">Отмена</button>
        <button onclick="handleGOLoginPage()" class="logout-btn w-[49%] py-[6px] block mx-auto bg-red-500 text-white text-[20px] font-bold text-center font-bold rounded-[30px] mt-[25px]">Да</button>
      </div>
    </div>
  `
}

function handleGOLoginPage(){
  let elLogOutBtn = document.querySelector(".logout-btn")
  elLogOutBtn.innerHTML = `
    <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="Loading" width="40">
  `
  setTimeout(() => {
    localStorage.clear()
    sessionStorage.clear()
    location.pathname = "/"
  },1000)

}
// Search Part end
