"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".toggle"),
          body = document.querySelector("body"),
          sun = document.querySelector("#sun"),
          helpModal = document.querySelector(".help"),
          helpBrowser = document.querySelector(".help-browser"),
          helpImg = document.querySelector("#help-img"),

          html = document.querySelectorAll("html"),
          bg = document.querySelectorAll(".bg"),
          toggleCont = document.querySelectorAll(".toggle-container"),
          svg = document.querySelectorAll(".svg"),
          svgBg = document.querySelectorAll(".svg-bg"),
          h1 = document.querySelectorAll("h1"),
          float = document.querySelectorAll(".float"),
          smLink = document.querySelectorAll(".sm-link"),
          qr = document.querySelectorAll(".qr"),

          mediaSm = window.matchMedia("(max-width: 640px)"),
          mediaXl = window.matchMedia("(min-width: 1300px)"),
          darkMode = sun.classList.contains("--dark"),
          darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)"),
          elementsToChange = [html, bg, toggleCont, svg, svgBg, h1, float, smLink, qr]; 

    const setFloatContent = (darkMode, matchedXl) => {
        const chrome = getComputedStyle(body).borderRadius;
        let i = 0, content = "";

        float.forEach(item => {
            i > 0 ? content = "¡" : content = "!";

            if (chrome === "1px" && matchedXl) {
                item.innerHTML = content;
                helpBrowser.innerHTML = `<img width="16px" height="16px" src="img/help-browser--true.svg" alt="" class="inline-block -ml-[5px] mb-px" />Full support`;
                if(darkMode) {
                    helpBrowser.classList.replace("text-rose", "text-emerald");
                    helpImg.classList.add("filter--help-img");
                } else {
                    helpBrowser.classList.replace("text-rose", "text-emerald");
                    helpImg.classList.remove("filter--help-img");
                }
            } else {
                item.innerHTML = `<img class="nabla${i} cursor-help" sizes="(max-width: 640px) 11px,(max-width: 1300px) 18px, 25px" alt="">`;
                helpBrowser.innerHTML = `<img width="16px" height="16px" src="img/help-browser--false.svg" alt="" class="inline-block -ml-[5px] mb-px" />For full support use\u00A0Google Chrome on\u00A0desktop`;
                if (darkMode) {
                    helpBrowser.classList.replace("text-emerald", "text-rose");
                    helpImg.classList.add("filter--help-img");
                } else {
                    helpBrowser.classList.replace("text-emerald", "text-rose");
                    helpImg.classList.remove("filter--help-img");
                }
            } 
            i = 1;
        });
    }   

    const setNablaSrc = (mode) => {
        for (let i = 0; i < 2; i++) {
            let nabla = document.querySelectorAll(`.nabla${i}`);

            nabla.forEach(item => {
                item.srcset = `img/nabla-${mode}${i}--xs.webp 11w, img/nabla-${mode}${i}--sm.webp 18w, img/nabla-${mode}${i}--xl.webp 25w`;
                item.src = `img/nabla-${mode}${i}--xl.webp`;
            });
        }
    }     

    const mediaCheck = (darkMode) => {
        const matchedXl = mediaXl.matches;
        setFloatContent(darkMode, matchedXl);

        if (matchedXl) {
            float.forEach(item => { item.classList.add("--xl") });
            h1.forEach(item => { item.classList.add("--xl") });
        } else {
            float.forEach(item => { item.classList.remove("--xl") });
            h1.forEach(item => { item.classList.remove("--xl") });
        }
        darkMode ? setNablaSrc("light") : setNablaSrc("dark");
    }

    const toggleDarkMode = (array) => {
        array.forEach(arrayItem => {
            arrayItem.forEach(item => {
                item.classList.toggle("--dark");
            });
        });
    }

    const hideModal = () => {
        helpModal.classList.replace("opacity-1", "opacity-0");
        setTimeout(() => { helpModal.classList.toggle("-z-20") }, 350);
    }

    const showModal = (e) => {
        const matchedSm = mediaSm.matches;

        if (matchedSm) {
            helpModal.classList.toggle("-z-20");
            helpModal.classList.replace("opacity-0", "opacity-1");
            helpModal.style.left = "calc(calc(100dvw - 330px) / 2)";     
            helpModal.style.bottom = "12rem";
            body.addEventListener("click", () => { hideModal() });
        } else {
            let mouse = {};
            mouse.x = e.clientX + 70; 
            mouse.y = e.clientY - 80;

            helpModal.classList.toggle("-z-20");
            helpModal.classList.replace("opacity-0", "opacity-1");
            helpModal.style.left = mouse.x + "px";     
            helpModal.style.top = mouse.y + "px";
        }
    }

    mediaCheck(darkMode);

    if (darkModeMedia.matches) {
        darkMode ? setNablaSrc("dark") : setNablaSrc("light");
        toggleDarkMode(elementsToChange);
    }

    darkModeMedia.addEventListener("change", (e) => {
        e.matches ? setNablaSrc("dark") : setNablaSrc("light");
        toggleDarkMode(elementsToChange);
    });

    mediaXl.addEventListener("change", () => { 
        let darkModeOnMediaChange = sun.classList.contains("--dark"); 
        mediaCheck(darkModeOnMediaChange); 
    }); 

    toggle.addEventListener("click", () => {   
        let darkModeOnToggle = sun.classList.contains("--dark"); 
        darkModeOnToggle ? setNablaSrc("dark") : setNablaSrc("light");
        toggleDarkMode(elementsToChange);
    });

    float[0].addEventListener("mouseover", (e) => showModal(e));
    float[0].addEventListener("mouseout", () => hideModal());
});