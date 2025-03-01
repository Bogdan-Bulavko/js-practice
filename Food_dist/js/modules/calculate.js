const modal = require("./modal");

function calculate() {
    const parentGender = document.querySelector("#gender");
    const choiseGender = parentGender.querySelectorAll(".calculating__choose-item");
    const parentPhysicalActivity = document.querySelector(".calculating__choose_big");
    const choisePhysicalActivity = parentPhysicalActivity.querySelectorAll(".calculating__choose-item");
    const parentConstitutionBody = document.querySelector(".calculating__choose_medium");
    const calculatingResult = document.querySelector(".calculating__result span");

    let gender = 'Женщина';
    let physicalActivity = 1.55;
    let height = 0;
    let age = 0;
    let weight = 0;
    let totalCalc = 0;

    if(localStorage.getItem("gender")) {
        gender = localStorage.getItem("gender");
        staticDate(choiseGender, localStorage.getItem("gender"));
    } 
    
    if (localStorage.getItem("physicalActivity")) {
        physicalActivity = localStorage.getItem("physicalActivity");
        staticDate(choisePhysicalActivity, localStorage.getItem("physicalActivity"));
        physicalActivity = 1.55;
    }

    function staticDate(collection, localStorage) {
        collection.forEach(item => {
            item.classList.remove("calculating__choose-item_active");
            if(item.innerText === localStorage) {
                item.classList.add("calculating__choose-item_active");
            }
        });
    };

    function chooseAnOption(parent, collection) {
        collection.forEach(item => {
            item.addEventListener("click", e => {
                if(item.parentElement === parent) {
                    collection.forEach(item => {
                        item.classList.remove("calculating__choose-item_active");
                    });
                item.classList.add("calculating__choose-item_active");
                }; 
                
                if(parent === parentGender){
                    gender = e.target.innerText;
                    localStorage.setItem("gender", e.target.innerText)
                } else if (parent === parentPhysicalActivity) {
                    if(e.target.innerText === "Низкая активность") {
                        physicalActivity = 1.2;
                        localStorage.setItem("physicalActivity", e.target.innerText)
                    } else if (e.target.innerText === "Невысокая активность") {
                        physicalActivity = 1.375;
                        localStorage.setItem("physicalActivity", e.target.innerText)
                    } else if (e.target.innerText === "Умеренная активность") {
                        physicalActivity = 1.55;
                        localStorage.setItem("physicalActivity", e.target.innerText)
                    } else if (e.target.innerText === "Высокая активность") {
                        physicalActivity = 1.725;
                        localStorage.setItem("physicalActivity", e.target.innerText)
                    }
                }
                calculatDate();
            });
        });
    };

    parentConstitutionBody.addEventListener("input", e => {
        if(e.target.value.match(/\D/g)) {
            e.target.style.cssText = "border: 1px solid red"
        } else {
            e.target.style.cssText = "border: 0px"
        }
        if(e.target && e.target.className === "calculating__choose-item") {
            if(e.target.id === "height"){
                height = +e.target.value;
            } else if (e.target.id === "age") {
                age = +e.target.value;
            } else if (e.target.id === "weight") {
                weight = +e.target.value;
            }
        }
        calculatDate();
    });



    function calculatDate() {
        if(gender === "Мужчина") {
            totalCalc = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * physicalActivity);
        } else {
            totalCalc = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * physicalActivity);
        }

        if(!height || !weight || !age || !gender || !physicalActivity) {
            calculatingResult.innerText = "____"
        } else {
            calculatingResult.innerText = totalCalc;
        }
        
    };

    chooseAnOption(parentGender, choiseGender);
    chooseAnOption(parentPhysicalActivity, choisePhysicalActivity);
    calculatDate();
}

export default calculate;