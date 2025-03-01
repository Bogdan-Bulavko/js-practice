function tabs(tabsSelector, tabsContentSelector, tabsActiveClass) {
    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = "none";
        });

        tabs.forEach(item => {
            item.classList.remove(tabsActiveClass)
        });
    }; 

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add(tabsActiveClass)
    }

    hideTabContent();
    showTabContent();

    tabs.forEach(item => {
        item.addEventListener("click", event => {
            if (event.target.classList.contains(tabsSelector.slice(1))) {
                tabs.forEach((item, i) => {
                    if(event.target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                })
            };
        });
    });


}

export default tabs;