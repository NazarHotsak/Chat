let chatMessages = document.getElementsByClassName("chat-messages-main")[0];
let chatList = document.querySelectorAll(".sidebar a.list-group-item");


const deg0 = 0;
const deg5 = 5;
const deg50 = 50;
const deg360 = 360;

const backgroundGradientSpeed = deg5;

let chatGradientDeg = deg50;

function rotateChatBackground() {
    chatGradientDeg += backgroundGradientSpeed;
    chatMessages.style.background = `0 0 / 460px url(../Img/Chat/chat-bg-pattern-light.ee148af944f6580293ae.png), linear-gradient( ${chatGradientDeg}deg, #afffe7 50%, #ceffb4)`;
    if (chatGradientDeg >= deg360) {
        chatGradientDeg = deg0;
    }
}

chatMessages.addEventListener("wheel", rotateChatBackground);


class Sidebar {
    #arrowDisabledStateStyle = "arrow-line-rotate3d";
    #sidebarFullScreen = "sidebar-full-screan";
    #sidebarInvisible = "sidebar-invisible";
    #arrowBtn = document.getElementsByClassName("arrow")[0];
    #arrowBtnLine;
    #sidebar = document.getElementsByClassName("sidebar")[0];
    #chatOpen = false;
    #peerId = "";

    verySmallWindowScreen = 600;
    smallWindowScreen = 880;
    bigWindowScreen = 930;
    delayTimeCollapseSidebar = 300;

    constructor() {
        this.#arrowBtnLine = this.#arrowBtn.querySelector('.arrow-line.arrow-straight');
    }

    getPeerId() {
        return this.#peerId;
    }

    getIsArrowOff() {
        if (window.getComputedStyle(this.#arrowBtn).display == "none") {
            return true;
        }

        return this.#arrowBtnLine.classList.contains(this.#arrowDisabledStateStyle) == false;
    }

    getIsSidebarHidden() {
        return this.#sidebar.clientWidth <= 1;
    }

    #closeOrOpenSidebar() {
        if (window.innerWidth <= this.verySmallWindowScreen) {
            this.#sidebarSmallScreen();
        }
        else {
            this.#sidebarBigScreen();
        }
    }

    #sidebarSmallScreen() {
        if (this.getIsSidebarHidden() == true) {
            this.#sidebar.classList.add(this.#sidebarFullScreen);
        }
        else {
            this.#sidebar.classList.remove(this.#sidebarFullScreen);
        }
    }

    #sidebarBigScreen() {
        if (this.getIsSidebarHidden() == false) {
            this.#sidebar.classList.add(this.#sidebarInvisible);
        }
        else {
            this.#sidebar.classList.remove(this.#sidebarInvisible);
        }
    }

    #turnBtnTipOffOrOn() {
        const isArrowOff = this.getIsArrowOff();
        if (isArrowOff == true && this.getIsSidebarHidden() == true) {
            this.#arrowBtnLine.classList.add(this.#arrowDisabledStateStyle);
        }
        else if (isArrowOff == false && this.getIsSidebarHidden() == false) {
            this.#arrowBtnLine.classList.remove(this.#arrowDisabledStateStyle);
        }
    }

    #turnArrowBtnOffOrOnDelay(delayTime = this.delayTimeCollapseSidebar) {
        setTimeout(this.#turnBtnTipOffOrOn.bind(this), delayTime);
    }

    changeSidebarAndArrowBtn() {
        this.#closeOrOpenSidebar();
        this.#turnArrowBtnOffOrOnDelay();
    }

    #closeSidebarIfClickItAndSmallScreen() {
        if (window.innerWidth <= this.bigWindowScreen) {
            this.changeSidebarAndArrowBtn();
        }
    }

    adoptToScreen() {
        this.#openSidebarIfScreenBig();
        this.#turnArrowBtnIfSidebarClose();
        this.#removeSidebarFullScreenIfScreenBig();
        this.#closeSidebarIfScreenSmallerThanBigScreen();
    }

    #turnArrowBtnIfSidebarClose() {
        if (window.innerWidth <= this.verySmallWindowScreen) {
            this.#turnArrowBtnOffOrOnDelay();
        }
    }

    #closeSidebarIfScreenSmallerThanBigScreen() {
        if (window.innerWidth <= this.bigWindowScreen
            && this.#chatOpen == true
            && this.getIsSidebarHidden() == false) {
            this.changeSidebarAndArrowBtn();
        }
    }

    #openSidebarIfScreenBig() {
        if (Math.ceil(window.innerWidth) >= this.bigWindowScreen && this.getIsSidebarHidden() == true) {
            this.changeSidebarAndArrowBtn();
        }
    }

    #removeSidebarFullScreenIfScreenBig() {
        if (window.innerWidth > this.verySmallWindowScreen && this.#sidebar.classList.contains(this.#sidebarFullScreen)) {
            this.#sidebar.classList.remove(this.#sidebarFullScreen);
        }
    }

    openChat(chatInfo) {
        this.#chatOpen = true;
        this.#peerId = chatInfo.currentTarget.dataset.peerId;
        sidebar.#closeSidebarIfClickItAndSmallScreen();
    }

    addEventListenerForArrowBtn() {
        this.#arrowBtn.addEventListener("click", () => {
            sidebar.changeSidebarAndArrowBtn();
        });
    }
}

let sidebar = new Sidebar();
sidebar.addEventListenerForArrowBtn();

class Chat {
    #chatMessages = document.getElementsByClassName("chat-messages-group")[0];
    #scroll = document.getElementsByClassName("chat-messages-scroll")[0];

    #getOwnMessage(message) {
        return '<div class=\"message own\">' +
            '<div class=\"message-content message-content-own\">' +
            `${message}` +
            '</div>' +
            '</div>';
    }

    #getMessage(message) {
        return '<div class="message">' +
            '<div class="message-content">' +
            `${message}` +
            '</div>' +
            '</div>';
    }

    #setScrollDown() {
        // this.#scroll.scrollTop = this.#scroll.scrollHeight;

        this.#scroll.scrollTo({
            top: this.#scroll.scrollHeight,
            behavior: "smooth"
        });
    }

    #insertHtmlMessageInChat(message) {
        this.#chatMessages.insertAdjacentHTML('beforeend', message);
        this.#setScrollDown();
    }

    insertMessage(message) {
        this.#insertHtmlMessageInChat(this.#getMessage(message));
    }

    insertOwnMessage(message) {
        this.#insertHtmlMessageInChat(this.#getOwnMessage(message));
    }
}

let chat = new Chat();

class InputText {
    #textMassage;
    #countOfRowsInTextMassage = 1;
    #messagePalceholder;
    #inputTextMassage;

    #sendMessageBtn;
    #iconSend;

    #chat;
    #sidebar;

    constructor(chat, sidebar) {
        this.#textMassage = document.getElementsByClassName("text-massage")[0];
        this.#messagePalceholder = document.getElementsByClassName("message-palceholder")[0];
        this.#inputTextMassage = document.getElementsByClassName("input-text-massage")[0];

        this.#sendMessageBtn = document.getElementsByClassName("send-message-button")[0];
        this.#iconSend = document.getElementsByClassName("icon-send")[0];
        this.#chat = chat;
        this.#sidebar = sidebar;
    }

    #updateInput() {
        this.#hideMessagePalceholder();
        this.#changeHeightInput();
    }

    #changeHeightInput() {
        const lineHeight = parseFloat(window.getComputedStyle(this.#textMassage).lineHeight);
        const height = this.#textMassage.clientHeight;
        const rows = Math.round(height / lineHeight);

        this.#_changeHeightInput(lineHeight, rows);

        this.#setScrollForInput();
    }

    #_changeHeightInput(lineHeight, rows) {

        if (this.#countOfRowsInTextMassage != rows) {
            const inputHeight = rows * lineHeight;
            this.#inputTextMassage.style.height = `${inputHeight}px`;
            this.#countOfRowsInTextMassage = rows;
        }
    }

    #setScrollForInput() {

        const inputTextMassageStyles = window.getComputedStyle(this.#inputTextMassage);
        if (this.#textMassage.clientHeight > parseFloat(inputTextMassageStyles.getPropertyValue('max-height'))) {
            this.#inputTextMassage.style.overflowY = "scroll";
        }
        else {
            this.#inputTextMassage.style.overflowY = "hidden";
        }
    }

    #hideMessagePalceholder() {
        if (this.#textMassage.textContent.length != 0) {
            this.#messagePalceholder.style.display = "none";
        }
        else {
            this.#messagePalceholder.style.display = "block";
        }
    }

    #clearInput() {
        this.#textMassage.innerText = "";
    }

    #changeButtonColorOnHover() {
        this.#sendMessageBtn.classList.toggle("send-message-button-action");
        this.#iconSend.classList.toggle("icon-send-action");
    }

    #clearFormattiong(event) {
        event.preventDefault();

        let paste = (event.clipboardData || window.clipboardData).getData("text");
        this.#selection(paste);

        this.#updateInput();
    }

    #selection(text) {
        const selection = window.getSelection();

        if (selection.rangeCount == false) {
            return;
        }

        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(text));
        selection.collapseToEnd();
    }

    #sentMessage(event, sender) {

        let message = this.#textMassage.innerText;

        if (message == "") {
            return;
        }

        // this.#chat.insertOwnMessage(message);
        sender(message);
        this.#clearInput();
        this.#updateInput();
        // this.#chat.insertMessage("");
    }

    start(sender) {
        this.#textMassage.addEventListener("input", this.#updateInput.bind(this));
        window.addEventListener("resize", this.#updateInput.bind(this));
        this.#sendMessageBtn.addEventListener("mouseover", this.#changeButtonColorOnHover.bind(this));
        this.#sendMessageBtn.addEventListener("mouseout", this.#changeButtonColorOnHover.bind(this));
        this.#sendMessageBtn.addEventListener("click", (event) => this.#sentMessage(event, sender));

        this.#textMassage.addEventListener("paste", (event) => this.#clearFormattiong(event));
    }
}

window.addEventListener("resize", resizeChat);
window.addEventListener("load", resizeChat);

function resizeChat() {
    sidebar.adoptToScreen();
}

function addEventListenerForChatList() {
    for (let index = 0; index < chatList.length; index++) {
        chatList[index].addEventListener("click", (event) => openChat(event));
    }
}

function openChat(chatInfo) {
    sidebar.openChat(chatInfo);
}

addEventListenerForChatList();

const hubConnection = new signalR.HubConnectionBuilder().withUrl("/Chat").build();

function sendMessageToPeers(message) {
    // hubConnection.invoke("Send", message)
    // .catch(function (err) {
    //     return console.error(err.toString());
    // });

    const data = new FormData();
    data.append("message", message);
    // data.append("connectionId", connectionId);

    // const data = {
    //     message: messageToSend
    // }

    fetch("home/send", {
        method: "POST",
        body: data
    })
    .catch(error => console.error("Error: ", error));
}

hubConnection.on("Receive", function (message, username) {
    chat.insertMessage(username + ": " + message);
});

hubConnection.start()
    .then(function () {
        // document.getElementById("sendBtn").disabled = false;
    })
    .catch(function (err) {
        return console.error(err.toString());
    });


let inputText = new InputText(chat, sidebar);
inputText.start(sendMessageToPeers);