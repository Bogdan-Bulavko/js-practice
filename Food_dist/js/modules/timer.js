function timer(id, deadLine) {

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60); 

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    
    function getZero(num) {
        if(num >= 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function corectlyDaysTimer(time, selector) {
        const timer = document.querySelector(selector);
        const daysWord = timer.querySelector(".days-word");
        if(time < 5 && time > 1) {
            return daysWord.innerHTML = "Дня";
        } else if(time === 1) {
            return daysWord.innerHTML = "День";
        } else if (time < 1) {
            return daysWord.innerHTML = "Дней";
        } 
    }

    function corectlyHoursTimer(time, selector) {
        const timer = document.querySelector(selector);
        const hoursWord = timer.querySelector(".hours-word");
        if(time < 5 && time > 1) {
            return hoursWord.innerHTML = "Часа";
        } else if(time === 1) {
            return hoursWord.innerHTML = "Час";
        } else {
            return hoursWord.innerHTML = "Часов";
        } 
    }

    function corectlyMinutesTimer(time, selector) {
        const timer = document.querySelector(selector);
        const minutesWord = timer.querySelector(".minutes-word");
        if(time < 5 && time > 1) {
            return minutesWord.innerHTML = "Минуты";
        } else if(time === 1) {
            return minutesWord.innerHTML = "Минута";
        } else {
            return minutesWord.innerHTML = "Минут";
        } 
    }

    function corectlySecondsTimer(time, selector) {
        const timer = document.querySelector(selector);
        const secondsWord = timer.querySelector(".seconds-word");
        if(time < 5 && time > 1) {
            return secondsWord.innerHTML = "Секунды";
        } else if(time === 1) {
            return secondsWord.innerHTML = "Секунда";
        } else {
            return secondsWord.innerHTML = "Секунд";
        } 
    }

    function setClocks(selector, endtime) {
        const timer = document.querySelector(selector),
                days = timer.querySelector("#days"),
                hours = timer.querySelector("#hours"),
                minutes = timer.querySelector("#minutes"),
                seconds = timer.querySelector("#seconds"),
                timeInterval = setInterval(updateClock, 1000);
                updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            corectlyDaysTimer(t.days, selector);
            corectlyHoursTimer(t.hours, selector);
            corectlyMinutesTimer(t.minutes, selector);
            corectlySecondsTimer(t.seconds, selector);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClocks(id, deadLine);

}

export default timer;