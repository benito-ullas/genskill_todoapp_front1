const init = () =>{
        
        document.getElementById('button-signup').addEventListener('click', create_user);
        
}

const create_user = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        
        var username = document.getElementById('uname').value;
        var password = document.getElementById('psw').value;
        var password2 = document.getElementById('psw2').value;
        
        if (password != password2) {
                window.alert("passwords dont match");
        }
        else {
             const url = "http://localhost:5000/auth/user"  ;
             fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({'username': username,'password': password})}).then(resp => resp.json()).then(r => {
                if (r.message == `new user ${username} added`){
                        window.alert("new user successfully created, please login");
                        window.location.href = "/login"
                }
             });
        }

}






















document.addEventListener('DOMContentLoaded', init);
