function showWindow(modalSelector, modalTimerID) {
    const modalWindow = document.querySelector(modalSelector);
    document.body.style.overflow = "hidden";
    modalWindow.style.display = "block";

    if (modalSelector) {
        clearInterval(modalTimerID);
    }
}

function closeWindow(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    document.body.style.overflow = "";
    modalWindow.style.display = "none";
}

function modal(triggerSelector, modalSelector, modalTimerID) {
    const btnOpenModalWindow = document.querySelectorAll(triggerSelector);
    const btnCloseModalWindow = document.querySelector("[data-close]");
    const modalWindow = document.querySelector(modalSelector);

    btnOpenModalWindow.forEach(btnOpen => {
        btnOpen.addEventListener("click", () => showWindow(modalSelector, modalTimerID));
    }) 

    btnCloseModalWindow.addEventListener("click", () => closeWindow(modalSelector));

    modalWindow.addEventListener("click", (e) => {
        if(e.target === modalWindow || e.target.getAttribute("data-close") == "") {
            closeWindow(modalSelector);
        }
    })

    document.addEventListener("keydown", (e) => {
        if(e.code === "Escape" && modalWindow.style.display === "block") {
            closeWindow(modalSelector);
        }
    })


    window.addEventListener("scroll", () => {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            showWindow(modalSelector, modalTimerID);
        }
    })       
}

export default modal;
export {showWindow, closeWindow};