"use strict";
/*------------------- navigation menu ---------------------*/
(() => {
    const mainLogoLinks = document.querySelectorAll(".main-logo-link");
    const mainMenuButton = document.querySelector(".main-menu");
    const navMenu = document.querySelector(".nav-menu");
    const closeNavBtn = navMenu.querySelector(".close-nav-menu");
    const linkItems = document.querySelectorAll(".link-item");
    mainMenuButton.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);
    function showNavMenu() {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenu() {
        navMenu.classList.remove("open");
        bodyScrollingToggle();
    }
    linkItems.forEach(linkItem => {
        linkItem.addEventListener("click", (event) => {
            if (linkItem.hash !== "") {
                event.preventDefault();
                const hash = linkItem.hash;
                // deactivate existing active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // activate new 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                /* deactivate existing active navigation menu 'link-item' */
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                /* if clicked 'link-item' is contained within the navigation menu */
                if (navMenu.classList.contains("open")) {
                    // activate new navigation menu 'link-item'
                    linkItem.classList.add("active", "inner-shadow");
                    linkItem.classList.remove("outer-shadow", "hover-in-shadow");
                    // hide navigation menu
                    hideNavMenu();
                }
                else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            // activate new navigation menu 'link-item'
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    });
                }
                // add hash (#) to url
                window.location.hash = hash;
            }
        });
    });
    mainLogoLinks.forEach(mainLogoLink => {
        mainLogoLink.addEventListener("click", (event) => {
            if (mainLogoLink.hash !== "") {
                event.preventDefault();
                const hash = mainLogoLink.hash;
                // deactivate existing active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // activate new 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                /* deactivate existing active navigation menu 'link-item' */
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                /* if clicked 'link-item' is contained within the navigation menu */
                if (navMenu.classList.contains("open")) {
                    // activate new navigation menu 'link-item'
                    mainLogoLink.classList.add("active", "inner-shadow");
                    mainLogoLink.classList.remove("outer-shadow", "hover-in-shadow");
                    // hide navigation menu
                    hideNavMenu();
                }
                else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            // activate new navigation menu 'link-item'
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    });
                }
                // add hash (#) to url
                window.location.hash = hash;
            }
        });
    });
})();
function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling");
}
