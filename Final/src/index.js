// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>


const taskForm = document.querySelector(".js-taskForm"),
    taskInput = taskForm.querySelector("input"),
    pendingList = document.querySelector(".js-pending"),
    finishedList = document.querySelector(".js-finished");


const PEN_LS = "pending";
const FIN_LS = "finished";
const PAINTM_ADD = "add";
const PAINTM_LOAD = "load";

let pending = [];
let finished = [];

function delectPending(event){
    const btn = event.target;
    //console.log(btn);
    const li = btn.parentNode;
    //console.log(li);
    pendingList.removeChild(li);
    const cleanPending = pending.filter(function (obj){
        console.log(obj.id !== parseInt(li.id));
        return obj.id !== parseInt(li.id);
    });
    pending = cleanPending;
    
    savePending();
}

function delectFinished(event){
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanFinished = finished.filter(function (obj){
        return obj.id !== parseInt(li.id);
    });
    finished = cleanFinished;
    saveFinished();
}

function moveFinished(event){
    const btn = event.target;
    const text = btn.parentElement.firstElementChild.innerText;
    delectPending(event);
    paintFinished(text, PAINTM_ADD);
}

function movePending(event){
    const btn = event.target;
    const text = btn.parentElement.firstElementChild.innerText;
    delectFinished(event);
    paintPending(text, PAINTM_ADD);
}

function savePending(){
    localStorage.setItem(PEN_LS, JSON.stringify(pending));
}

function saveFinished(){
    localStorage.setItem(FIN_LS, JSON.stringify(finished));
}

function checkBlankId(arrayLength, obj, LS){
    const loadObject = JSON.parse(localStorage.getItem(LS));
    let step;
    let refNum = 0;
    let sumId = 0;

    loadObject.forEach(function (obj){
        sumId += obj.id;
    })
    
    for (step = 1; step < (arrayLength + 1 ); step++){
        refNum += step;
    }

    let newId = (arrayLength + 1) - (sumId - refNum);

    return newId;
}


function paintPending(text, mode){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const loadPending = localStorage.getItem(PEN_LS);
    let newId;
    if(mode === "add"){
        if(loadPending !== null){
            newId = checkBlankId(pending.length, pending, PEN_LS);
        } else {
            newId = 1;
        }
    } else if (mode === "load"){
        newId = pending.length + 1;
    }
    span.innerText = text;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", delectPending);
    finBtn.innerText = "✅";
    finBtn.addEventListener("click", moveFinished);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    li.id = newId;
    pendingList.appendChild(li);
    const pendingObj = {
        text: text,
        id: newId
    };
    pending.push(pendingObj);
    savePending();
}

function paintFinished(text, mode){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const penBtn = document.createElement("button");
    const loadFinsihed = localStorage.getItem(FIN_LS);
    let newId;
    if(mode === "add"){
        if(loadFinsihed !== null){
            newId = checkBlankId(finished.length, finished, FIN_LS);
        } else {
            newId = 1;
        }
    } else if (mode === "load"){
        newId = finished.length + 1;
    }
    span.innerText = text;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", delectFinished);
    penBtn.innerText = "⏪";
    penBtn.addEventListener("click", movePending);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(penBtn);
    li.id = newId;
    finishedList.appendChild(li);
    const finishedObj = {
        text: text,
        id: newId
    };
    finished.push(finishedObj);
    saveFinished();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = taskInput.value;
    paintPending(currentValue, PAINTM_ADD);
    taskInput.value = "";
}

function loadPending(){
    const loadPending = localStorage.getItem(PEN_LS);
    if(loadPending !== null){
        const parsedPending = JSON.parse(loadPending);
        parsedPending.forEach(function (obj){
            paintPending(obj.text, PAINTM_LOAD);
        })
    }
}

function loadFinsihed(){
    const loadFinsihed = localStorage.getItem(FIN_LS);
    if(loadFinsihed !== null){
        const parsedFinished = JSON.parse(loadFinsihed);
        parsedFinished.forEach(function (obj){
            paintFinished(obj.text, PAINTM_LOAD);
        })
    }
}

function init () {
    loadPending();
    loadFinsihed();
    taskForm.addEventListener("submit", handleSubmit)
};

init();
