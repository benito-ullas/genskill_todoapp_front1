var data;

const init = () => {
        set_date();
        fetch_todo();  

        document.getElementById('add-button').addEventListener('click', create_todo);
        
}

function set_task_no(){
        var no = document.getElementsByClassName('list-item').length
        document.getElementById('task-no').innerHTML = `${no} Tasks`;
}

function set_date(){
        const d = new Date();
        document.getElementById('date').innerHTML == `${d.getDate()} th`;
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        document.getElementById("day").innerHTML = `${days[d.getDay()]} ,`;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        document.getElementById("month").innerHTML = months[d.getMonth()];
        
}

function fetch_todo()
{
        const url = "http://localhost:5000/todo";
        headers = new Headers();
        headers.append('x-access-token', sessionStorage.getItem('token'))
        fetch(url,{headers: headers}).then(resp => resp.json() ).then(r => {
        
        data = r;
        add_todo(r);
        
        });
        
}

function add_todo(data){
        //console.log(data);
        let html = '';
        for (i=0; i< data['todos'].length; i++){
                html = html + `<div class="list-item" id="list-item-${i+1}"><input class="checkbox" type="checkbox" id="completed-${i+1}" onclick="checkbox_click(${i})" ${data["todos"][i]["completed"] ? 'checked' : '' } ${data["todos"][i]["completed"] ? 'disabled' : '' }></input><li class="checkbox-text ${data["todos"][i]["completed"] ? "st" : "" }" id="todo-data-${i+1}">${data["todos"][i]["description"]}</li><button class="far fa-trash-alt" id="delete-btn-${i+1}" onclick="delete_button(${i})"></button></div>`;
        }
        document.getElementsByClassName('todo-list')[0].innerHTML = html;
        set_task_no();
        
}
function checkbox_click(i){
        //console.log(i);
        var checkBox = document.getElementById(`completed-${i+1}`);
        
        checkBox.checked = true;
        checkBox.disabled = true;
        
        var text = document.getElementById(`todo-data-${i+1}`);
        text.className = "checkbox-text st";
        
        send_data('PUT',data.todos[i].id);
             
}

function send_data(method,id){
        const url = `http://localhost:5000/todo/${id}`;
        headers = new Headers();
        headers.append('x-access-token', sessionStorage.getItem('token'));
        fetch(url,{method: method, headers: headers});
}

function delete_button(i){
        var div = document.getElementById(`list-item-${i+1}`);
        div.remove();
        send_data('DELETE',data.todos[i].id);
        set_task_no();
}

const create_todo = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        var text = document.getElementById('input-add-task').value;
        document.getElementById('input-add-task').value = '';
        const url = `http://localhost:5000/todo`;
        headers = new Headers();
        data = {"description" : `${text}`};
        headers.append('x-access-token', sessionStorage.getItem('token'));
        headers.append("Content-Type", "application/json");
        fetch(url,{ method: 'POST', headers: headers, body: JSON.stringify(data) });
        fetch_todo();
}

if (!sessionStorage.token){
        window.location.href = "/login";
}

document.addEventListener('DOMContentLoaded', init);
