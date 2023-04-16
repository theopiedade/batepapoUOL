axios.defaults.headers.common['Authorization'] = '4w9C68vlTtbdtXrsnZR849FV';
var myIntervalStatus = 0;
var myIntervalGetMessages = 0;

function join_chat () {
    let nickname = document.querySelector('.chat_nickname_input').value;
    const data = {
        name: nickname
    };
    const query = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', data);
    query.then(nick_check);
}

function nick_check (answer) {
    console.log(answer.data);
    if (answer.data === 400) {
       alert("Nome já em uso, escolha outro.");
    }
    if (answer.data === 200) {
       myIntervalStatus = 0;
       myIntervalGetMessages = 0;
       alert("Bem vindo ao chat!");
       myIntervalStatus = setInterval(keep_status_ok,5000);
       setInterval(clearInterval(myIntervalStatus),30000);
       myIntervalGetMessages = setInterval(keep_status_ok,1000);
       setInterval(clearInterval(myIntervalGetMessages),30000);
      }
}

function get_messages () {
    const query = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    query.then(server_data_process);
}

function server_data_process (data) {
    answer.data.forEach(function (item, ind) { message_data_process(item); })
}


function message_data_process (item) {
    if (item.type === "status") {
        let element = document.querySelector('.chat_open');
        element.innerHTML += `
            <div class="container_status">
                <div class="action">
                <h1>${item.time}</h1>
                <p>${item.from}</p> ${text}
                </div>
            </div>
        `;
        }
    if (item.type === "message") {
        let element = document.querySelector('.chat_open');
        element.innerHTML += `
        <div class="container_msg">
            <div class="action">
            <h1>${item.time}</h1>
            <p>${item.from}</p> para <p>${item.to}</p> ${item.text}
            </div>
        </div>
        `;
        }
    if (item.type === "private_message") {
        let element = document.querySelector('.chat_open');
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
