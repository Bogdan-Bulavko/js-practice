"use strict";
window.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loaded");
    const getDataQuestion =  async() => {
        try {
            const res = await fetch("http://localhost:3000/questions");
            const data = await res.json();
            console.log(data)
            return data;
        } catch (e) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`)
        } finally {
            console.log(fetch("http://localhost:3000/questions"))
        }
        
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        return await res.json();
    };

    function funForPostData(points, name, event) {
        event.preventDefault();
        const resultTest = {
            UserName: name,
            grade: points,  
        }

        const json = JSON.stringify(resultTest);

        postData('http://localhost:3000/statistics', json)
        .then(data => console.log(data))
        .catch(data => console.log(data))

    }

    async function chooseAnswer() {
        let findName = prompt("Как вас зовут?", '');
        const container = document.querySelector(".container");
        const btnSend = document.querySelector(".send-data");
        let index = 0;
        let grade = 0;
        let enlarged = false;

        const data = await getDataQuestion()
        
        console.log(data)
        const question = document.querySelector(".question");
        outputData(data, question);
        event(question, data);
        btnSend.addEventListener("click" , (e) => {
            e.preventDefault();
            console.log(data.length, index)
            container.style.cssText = "opacity: 0"
            index++;
            if(index !== 0) {
                setTimeout (() => {
                    outputData(data, question); 
                }, 700)
            } else {
                container.style.cssText = "opacity: 1";
                outputData(data, question); 
            }
            enlarged = false;
            if(index === data.length - 1) {
                setTimeout(() => {
                    question.innerHTML = ``;
                    if(grade >= (data.length / 2)) {
                        outputSummary("Поздравляю", data, e)
                    } else {
                        outputSummary("К сожалению", data, e)
                    }
                }, 700)

            } else if (index === 0) {
                document.querySelector("h2").remove();
                document.querySelector("p").remove();            
            }

        });
    
        function event(ques, data) {
            ques.addEventListener("click", (e) => {
                if(e.target && e.target.tagName === "BUTTON"){
                    console.dir(e.target)
                    if(e.target.innerText !== data[index].correctAnswer) {
                        if(enlarged === true) {
                            grade--;
                            enlarged = false;
                        }
                    } else { 
                        if (enlarged === false) {
                            grade++;
                            enlarged = true; 
                        }       
                    }
                    activeBtn(e.target);
                }
            });
        };

        function outputSummary(messege, data, e) {
            funForPostData(grade, findName, e);
            container.insertAdjacentHTML("beforeend", `<h2>${messege}</h2>
            <p>Вы правильно ответили на ${grade} из ${data.length - 1} вопросов!</p>                            
            `);
            grade = 0;
            index = -1;
            btnSend.innerText = "Начать заново";

        }
        
        function outputData(data, question) {
            container.style.cssText = "opacity: 1";
            question.innerText = data[index].question;
            question.insertAdjacentHTML("beforeEnd", `<ul class="options"></ul>`);
            const options = document.querySelector(".options");
            for(let value in data[index].answer) {
                options.innerHTML += `<li><button>${data[index].answer[value]}</button></li>`
            };
            btnSend.innerText = "Отправить";
        };
        
        function activeBtn(elem) {
            const btnAns = document.querySelectorAll("li button");
            btnAns.forEach(item => {
                item.classList.remove("activeClass");
            });
            elem.classList.add("activeClass");
        };

    };
    
    chooseAnswer();


});


