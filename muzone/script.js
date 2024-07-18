"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".toggle"),

          html = document.querySelectorAll("html"),
          bg = document.querySelectorAll(".bg"),
          toggleCont = document.querySelectorAll(".toggle-container"),
          svg = document.querySelectorAll(".svg"),
          svgBg = document.querySelectorAll(".svg-bg"),
          h1 = document.querySelectorAll("h1"),

          mediaXl = window.matchMedia("(min-width: 1300px)"),
          darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)"),
          elementsToChange = [html, bg, toggleCont, svg, svgBg, h1]; 

    const mediaCheck = () => {
        const matchedXl = mediaXl.matches;

        if (matchedXl) {
            h1.forEach(item => { item.classList.add("--xl") });
        } else {
            h1.forEach(item => { item.classList.remove("--xl") });
        }
    }

    const toggleDarkMode = (array) => {
        array.forEach(arrayItem => {
            arrayItem.forEach(item => {
                item.classList.toggle("--dark");
            });
        });
    }

    mediaCheck();

    if (darkModeMedia.matches) {
        toggleDarkMode(elementsToChange);
    }

    darkModeMedia.addEventListener("change", () => {
        toggleDarkMode(elementsToChange);
    });

    mediaXl.addEventListener("change", () => { 
        mediaCheck(); 
    }); 

    toggle.addEventListener("click", () => {   
        toggleDarkMode(elementsToChange);
    });

    const sets = [ 
        document.getElementById('set1'), 
        document.getElementById('set2'), 
        document.getElementById('set3') 
    ]; 

    let currentIndex = 0; 

    function updateStyles() {
        const currentSet = sets[currentIndex];
        const nextIndex = (currentIndex + 1) % sets.length;
        const nextSet = sets[nextIndex];
        const prevIndex = (currentIndex + sets.length - 1) % sets.length;
        const prevSet = sets[prevIndex];
    
        sets.forEach(set => {
            set.style.transition = 'top 0.625s, opacity 0.375s';
            set.style.position = 'absolute';
        });
    
        currentSet.style.top = '0';
        currentSet.style.opacity = '1';
        currentSet.style.zIndex = '1';
        if (currentSet === sets[1]) {
            currentSet.style.marginTop = '0';
            currentSet.style.marginBottom = '2rem';
        }
    
        nextSet.style.top = '69%';
        nextSet.style.opacity = '1';
        nextSet.style.zIndex = '0';
        if (nextSet === sets[1]) {
            nextSet.style.marginTop = '2rem';
            nextSet.style.marginBottom = '0';
        }
        if (nextSet === sets[2]) {
            nextSet.style.marginTop = '0';
        }
    
        prevSet.style.top = '69%';
        prevSet.style.opacity = '0';
        prevSet.style.zIndex = '0';
    }

    function slideUp() { 
        currentIndex = (currentIndex + 1) % sets.length;
        updateStyles();
    } 

    updateStyles();

    sets.forEach(set => { 
        set.addEventListener('click', slideUp); 
    });
});    