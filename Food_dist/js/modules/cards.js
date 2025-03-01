import { getDataCard } from "../services/services";

function cards() {
    const menuItem = document.querySelectorAll(".menu__item");
    const menuField = document.querySelector(".menu__field .container");
    const menu = [
        {
          img: "img/tabs/vegy.jpg",
          altimg: "vegy",
          title: "Меню 'Фитнес'",
          descr: "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
          price: 9,
          id: "cdac"
        },
        {
          img: "img/tabs/post.jpg",
          altimg: "post",
          title: "Меню 'Постное'",
          descr: "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
          price: 14,
          id: "86d5"
        },
        {
          img: "img/tabs/elite.jpg",
          altimg: "elite",
          title: "Меню 'Премиум'",
          descr: "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
          price: 21,
          id: "f671"
        }
      ]
    class MenuItem { 
        constructor(img, alt, menuItemSubtitle, menuItemDescr, menuItemTotal, ...clases) {
            this.img = img;
            this.alt = alt;
            this.menuItemSubtitle = menuItemSubtitle;
            this.menuItemDescr = menuItemDescr;
            this.menuItemTotal = menuItemTotal;
            this.clases = clases;
        }

    }

    function addMenuItem() {

        menuItem.forEach((item) => {
            item.remove();
        })


        menu.forEach(({img, alt, title, descr, price}) => {
            menuField.innerHTML += `<div class="menu__item">
            <img src="${img}" alt="${alt}">
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
            </div>
            </div>`
        });
    }

    addMenuItem();
}

export default cards;