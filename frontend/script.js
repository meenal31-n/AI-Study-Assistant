const sendBtn = document.getElementById("sendBtn");

const userInput = document.getElementById("userInput");

const chatBox = document.querySelector(".chat-box");

const pdfUpload =document.getElementById(
"pdfUpload");


sendBtn.addEventListener("click", sendMessage);

pdfUpload.addEventListener(
"change",uploadPDF);



function sendMessage(){

    const message = userInput.value.trim();

    if(message === ""){
        return;
    }


    // Save message before clearing input
    const currentMessage = message;


    const userMessage =
    document.createElement("div");

    userMessage.classList.add(
        "message",
        "user"
    );

    userMessage.innerText =
    currentMessage;

    chatBox.appendChild(
        userMessage
    );


    userInput.value = "";


    chatBox.scrollTop =
    chatBox.scrollHeight;


    setTimeout(function(){

        botReply(currentMessage);

    },1000);

}

async function uploadPDF(){

    const file=
    pdfUpload.files[0];


    const formData=
    new FormData();

    formData.append(
        "pdf",
        file
    );


    await fetch(
    "http://127.0.0.1:5000/upload",

    {
        method:"POST",

        body:formData
    });

    alert(
        "PDF uploaded"
    );

}

async function botReply(message){

    const response =
    await fetch(
        "http://127.0.0.1:5000/chat",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                message:message
            })
        }
    );

    const data =
    await response.json();


    const botMessage =
    document.createElement("div");

    botMessage.classList.add(
        "message",
        "bot"
    );

    botMessage.innerText =
    data.reply;

    chatBox.appendChild(
        botMessage
    );

    chatBox.scrollTop =
    chatBox.scrollHeight;
}


userInput.addEventListener("keydown", function(event){

    if(event.key==="Enter"){

        sendMessage();

    }

});