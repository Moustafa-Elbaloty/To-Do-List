let inp = document.querySelector("input")
let btnAdd = document.querySelector(".add")
let box = document.querySelector(".box")
let arr = []
if (localStorage.getItem("task")) {
    //update array From local
    arr = JSON.parse(localStorage.getItem("task"))
    arr.forEach(ele => {
        elementInDom(ele)
    })

}
// when click add task
btnAdd.addEventListener("click", (e) => {
    e.preventDefault()
    if (inp.value === "") return;
    let obj = {
        id: Date.now(),
        title: inp.value,
        statu: false
    }
    arr.push(obj)

    //Add to local
    localStorage.setItem("task", JSON.stringify(arr))
    elementInDom(obj)
    inp.value = ''
})

// add or remove 
function elementInDom(obj) {
    //create Element
    let task = document.createElement("div")
    task.className = "task"
    task.textContent = obj.title
    let btnDel = document.createElement("button")
    btnDel.textContent = "Delete"
    btnDel.className = "btnDel"
    //add element  to Dom
    task.append(btnDel)
    box.append(task)
    if (obj.statu) { task.classList.add("taskClick") }
    btnDel.onclick = () => {
        task.remove()
        arr = arr.filter(el => el.id !== obj.id)
        // localStorage.setItem("task", JSON.stringify(arr))
    }
    task.onclick = (e) => {
        //prevents events from interfering with each other by bubbling up to parent elements.
        e.stopPropagation()

        task.classList.toggle("taskClick")
        obj.statu = !obj.statu
        localStorage.setItem("task", JSON.stringify(arr))
    }

}

