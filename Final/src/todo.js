const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function delectToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}   

function checkBlankId(obj){
    const currentObj = obj;
    let id = [];
    let step;
    for (step = 0; step < currentObj.length; step++){
        id[step] = currentObj[step].id;
    }
    for (step = 1; step < Math.max(...id) + 1; step++){
        if(!id.includes(step)){
            return step;
        }
    }
    return Math.max(...id) + 1;
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    let newId;
    const loadToDo = JSON.parse(localStorage.getItem(TODOS_LS));
    if(loadToDo === null || loadToDo.length === 0){
        newId = 1;
    } else if(loadToDo !== null){
        newId = checkBlankId(loadToDo);
    }
    span.innerText = text;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", delectToDo);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
    
}

function loadToDos(){
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function (toDo){
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();

