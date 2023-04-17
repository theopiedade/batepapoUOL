axios.defaults.headers.common['Authorization'] = '4w9C68vlTtbdtXrsnZR849FV';
var myIntervalStatus;
var myIntervalGetMessages;

function join_chat () {
    console.log("Button enter passed Nickname to javascript");
    let nickname = document.querySelector('.chat_nickname_input').value;
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
  console("Starting chat...");
  myIntervalStatus = 0;
  myIntervalGetMessages = 0;
  let element = document.querySelector('.chat_status_and_messages');
  element.innerHTML = '';
  get_messages();
  myIntervalStatus = setInterval(keep_status_ok,5000);
  setInterval(clearInterval(myIntervalStatus),30000);
  myIntervalGetMessages = setInterval(get_messages,1000);
  setInterval(clearInterval(myIntervalGetMessages),30000);
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
	console.log(statusCode);
    console.log(answer.data.length);
    console.log(answer.data[0]);
    for (let i=0;i<=answer.data.length;i++) { 
        message_data_process(answer.data[i]); }

}


function message_data_process (item) {
    if (item.type === 'status') {
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
    if (item.type === 'message') {
        let element = document.querySelector('.chat_status_and_messages');
        element.innerHTML += `
        <div class="container_msg">
            <div class="action">
            <h1>${item.time}</h1>
            <p>${item.from}</p> para <p>${item.to}</p> ${item.text}
            </div>
        </div>
        `;
        }
    if (item.type === 'private_message') {
        let element = document.querySelector('.chat_status_and_messages');
        element.innerHTML += `
        <div class="container_private_msg">
            <div class="action">
            <h1>${item.time}</h1>
            <p>${item.from}</p> para <p>${item.to}</p> ${item.text}
            </div>
        </div>
            `;
        }
}

function keep_status_ok (data) {
    const query = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', data);
}

function send_messages (message) {
    const query = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', data);
}

function errorTreat(error) {
    console.log("Status code: " + error.response.status); // Ex: 404
    console.log("Error message: " + error.response.data); // Ex: Not Found
  }