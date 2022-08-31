let taskLists = [];
let count = 0;
let taskListsCompleted = [];

let showTaskLists = () => {
    let content = "";
    taskLists.map((task,index) => {
        content+= `
            <li class="bg-info ">
                <div class="d-flex w-100">
                    <span style="width: 10%">${++index}</span>
                    <p class="text-center mb-0" style="width: 70%">${task.name}</p>
                    <button onclick="deleteTask('${task.id}')" class="btn">
                        <i class="fa-solid fa-trash-can">
                    </i></button>
                    <div onclick="addTaskCompleted('${task.id}')" id="checkTask" >
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                </div>
            </li>
        `
    })
    document.getElementById("todo").innerHTML = content;
}

let setLocalStorage = () => {
    localStorage.setItem("DSCV", JSON.stringify(taskLists));
}

let addNewTask = () => {
    let newTask = document.getElementById("newTask").value;
    if (newTask.trim() === "") {
        alert("Vui lòng nhập công việc")
    } else {
        taskLists.push({id: `task${++count}`,name: newTask});
        showTaskLists(taskLists);
        setLocalStorage();
    }
    document.getElementById("newTask").value = "";
}
document.getElementById("addItem").onclick = addNewTask;

let getLocalStorage = () => {
    if (localStorage.getItem("DSCV") != undefined) {
      taskLists = JSON.parse(localStorage.getItem("DSCV"));
    }
    showTaskLists(taskLists);
}
getLocalStorage();

let searchLocation = (id) =>{
    let viTri = -1;
    taskLists.map((task,index) => {
        if (task.id === id) {
            viTri = index;
        }
    })
    return viTri;
}

let deleteTask = (id) => {
    let viTri = searchLocation(id);
    if (viTri > -1) {
        taskLists.splice(viTri, 1);
    }
    setLocalStorage();
    showTaskLists();
}

let showTaskCompleted = () => {
    let content = "";
    
    taskListsCompleted.filter((task,index) => {
        content+= `
        <li class="bg-gradient-success">
            <div class="d-flex w-100">
                <span style="width: 10%">${++index}</span>
                <p class="text-center mb-0" style="width: 70%">${task.name}</p>
                <div class="checked">
                    <i class="fa-solid fa-square-check"></i>
                </div>
            </div>
        </li>
        `
    })
    document.getElementById("completed").innerHTML = content;

}

let addTaskCompleted = (id) => {
    taskLists.map((task,index) => {
        if (task.id === id) {
          taskListsCompleted.push(task);
          showTaskCompleted(taskListsCompleted);  
          deleteTask(id);       
        }
    })

}

let compareNameAZ = (a,b) => {
    let name1 = a.name.toUpperCase();
    let name2 = b.name.toUpperCase();

    if (name1 > name2) {
        return 1;
    } else if (name1 < name2) {
        return -1;
    } 
    return 0;
}

let sortNameAZ = () => {
    let arrAfterSoft =  taskLists.sort(compareNameAZ);
    showTaskLists(arrAfterSoft);
}
document.getElementById("two").onclick = sortNameAZ;

let sortNameZA = () => {
    let arrAfterSoft =  taskLists.sort(compareNameAZ);
    arrAfterSoft.reverse();
    showTaskLists(arrAfterSoft);
}
document.getElementById("three").onclick = sortNameZA;
