import {showWindow, closeWindow} from "./modal";
import {postData} from "../services/services";
function forms(formSelector, modalTimerID) {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(item => {
        bindPostForm(item);
    })

    const answer = {
        loading: "img/spinner/spinner.svg",
        fail: "Ошибка сервера, попробуйте попытку позже",
        succes: "Спасибо за отправку ваших данных, скоро мы с вам свяжемся"
    }


    
    function bindPostForm(form) {
        form.addEventListener("submit", e => {
            e.preventDefault();

            const div = document.createElement("img");
            div.src = answer.loading;
            div.style.cssText = `
                                    display: block;
                                    margin: 0 auto`;
            form.append(div);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(answer.succes);
                div.remove();
                e.stopPropagation();
            }).catch(() => {
                showThanksModal(answer.fail);
            }).finally(() => {
                form.reset();
            });
        });
        
    };

    function showThanksModal(answer) {
        const prewModalDialog = document.querySelector(".modal__dialog");

        prewModalDialog.classList.add("hide");

        showWindow(".modal", modalTimerID);

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${answer}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prewModalDialog.classList.add("show");
            prewModalDialog.classList.remove("hide");
            closeWindow(".modal");
        }, 4000);
    };
}

export default forms;