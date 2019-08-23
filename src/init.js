import * as editor from './editor.js'
import { previewEmail}  from './preview.js';
import { merge } from './merge';

export var modal = {
    userName: 'Din Jian',
    runId: 12345,
    runStatus: 'closed'
};

var template = `
    Hello {{userName}},

    You run {{runId}} is {{runStatus}}.

    Thanks.
`;


editor.init();

document.getElementById("preview-btn").onclick = function(){
    previewEmail();
}

document.getElementById("merge-btn").onclick = function(){
    let mailHtm = window.myquill.container.firstElementChild.innerHTML;
    let templateAfterMerge = merge(mailHtm, modal);
    console.log(templateAfterMerge);
}

document.getElementById("get-modal-btn").onclick = function(){
    getModal();
}

// function email() {
//     previewEmail();
// }
document.getElementById("login-btn").onclick = function(){
    getModal();
}

function getModal(){
    var xhr = new XMLHttpRequest();

    let userId = 32;

    xhr.open('GET', `/xxx?userId=${userId}`);
    
    //Send the proper header information along with the request
    //xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function(res) { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let userFieldEl = document.getElementById('user-fields');
            userFieldEl.innerHTML = '';
            // Request finished. Do processing here.
            let data = JSON.parse(this.response);
            modal = data;
            window.editorModal = modal;
            for(let key in data){
                let li = document.createElement('li');
                let liText = document.createTextNode(key + ':  ' + data[key]);
                li.appendChild(liText);
                li.onclick = function(){
                    window.myquill.insertText(window.editorLastIndex || 0, `{{${key}}}`);
                };
                userFieldEl.appendChild(li);
            }
        }
    }

    xhr.send();
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

