axios.defaults.headers.common['Authorization'] = '4w9C68vlTtbdtXrsnZR849FV';
var myIntervalStatus;
var myIntervalGetMessages;
var nickname;
var errorActual;


function join_chat () {
    console.log("Button enter passed Nickname to javascript");
    nickname = document.querySelector('.chat_nickname_input').value;
    document.querySelector('.chat_nickname_input').value = '';
    console.log("Nickname choice: "+nickname);
    const data = {
        name: nickname
    };
    const query = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', data);
    query.then(nick_check);
    query.catch(errorTreat);
}

function nick_check (answer) {
    console.log(answer.data);
    if (answer.status === 400) {
       alert("Nome já em uso, escolha outro.");
    }
    if (answer.status === 200) {
      chat_start();
    }
} 

function chat_start() {
  console.log("Starting chat...");
  let element = document.querySelector('.chat_status_and_messages');
  get_messages();
  setInterval(get_messages,3000);
  setInterval(keep_status_ok, 5000);
}


function get_users () {
    const query = axios.get('https://mock-api.driven.com.br/api/vm/uol/participants');
    query.then(show_users);
    query.catch(errorTreat);
}

function show_users (users) {
    console.log(users.data);
}

function get_messages () {
    const query = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    query.then(server_data_process);
    query.catch(errorTreat);
}

function server_data_process (answer) {
    const statusCode = answer.status;
    for (let i=0;i<=answer.data.length;i++) { 
        message_data_process(answer.data[i]); 
    }
}


function message_data_process (item) {
          if (item.type == 'status') {
            let element = document.querySelector('.chat_status_and_messages');
            element.innerHTML += `
                <div class="container_status">
                    <div class="action">
                    <h1>(${item.time})</h1>
                    <p>${item.from}</p> ${item.text}
                    </div>
                </div>
            `;
            }
        if (item.type == 'message') {
            let element = document.querySelector('.chat_status_and_messages');
            element.innerHTML += `
            <div class="container_msg">
                <div class="action">
                <h1>(${item.time})</h1>
                <p>${item.from}</p> para <p>${item.to}</p> ${item.text}
                </div>
            </div>
            `;
            }
        if (item.type == 'private_message') {
            let element = document.querySelector('.chat_status_and_messages');
            element.innerHTML += `
            <div class="container_private_msg">
                <div class="action">
                <h1>(${item.time})</h1>
                <p>${item.from}</p> para <p>${item.to}</p> ${item.text}
                </div>
            </div>
                `;
            }
            var chatHistory = document.querySelector('.chat_status_and_messages');
            chatHistory.scrollTop = chatHistory.scrollHeight;
}

function keep_status_ok () {
    data = {
        name: nickname
    };
    const query = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', data);
}

function send_message () {
    //console.log("Send message function actioned");
    let element = document.querySelector('.myText');
    let textMsg = element.value;
    document.querySelector('.myText').value = '';
    console.log(textMsg);
    let toWho = "Todos";
    let typeOfMsg = "message";
    element.innerHTML = '';
    
    const data = {
        from: nickname,
        to: toWho,
        text: textMsg,
        type: typeOfMsg // ou "private_message" para o bônus
    };
    console.log(data);
    if (textMsg != null) {
        keep_status_ok ();
        const query = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', data);
        query.then(get_messages);
        query.catch(errorTreat);
    }
}
function errorTreat(error) {
    console.log("Status code: " + error.response.status); // Ex: 404
    console.log("Error message: " + error.response.data); // Ex: Not Found
    if (errorActual == 'userGoes') window.location.reload();
    if (errorActual == 'messages') window.location.reload();
}

document.addEventListener('keydown', function (event) {
            if (event.keyCode !== 13) return;
            let text_check = document.querySelector('.myText').value;
            console.log(text_check);
            if(text_check != null) {
                console.log("entercheck passed");
                send_message();
            }
});
