const init = () =>{
        
        document.getElementById('button-reset').addEventListener('click', reset);
        document.getElementById('button-login').addEventListener('click', login);
}

const reset = (ev) => {
        ev.preventDefault();
        document.getElementById('login-form').reset();
}

const login = async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        
        var username = document.getElementById('uname').value;
        var password = document.getElementById('psw').value;
        const url = "http://localhost:5000/login"
        var headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
        const response = await fetch(url,{method: 'GET', mode: 'cors', headers: headers});
        const res = response.json();
        
        if (response.statusText == 'UNAUTHORIZED'){
                window.alert("Please enter valid credentials");
        }
        else{
                res.then(r => {
                        sessionStorage.setItem("token", r['token']);
                });
                window.alert("You have successfully logged in");
                window.location.href = "/todo";
        }
                
        
        //then(resp => resp.json()).then(res => {
        //        
        //});
        //window.alert("You have successfully logged in");
}


document.addEventListener('DOMContentLoaded', init);

