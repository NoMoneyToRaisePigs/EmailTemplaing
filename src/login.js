document.getElementById("login-btn").onclick = function(){
    login();
}

function login(){
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/user');
    
    //Send the proper header information along with the request
    //xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function(res) { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let x = 0;
        }
    }

    xhr.send(JSON.stringify({username:'fan gao', passowrd:'Gf@19901103'}));
}