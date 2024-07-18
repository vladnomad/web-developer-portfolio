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
    
    function slideUp() { 
        const currentSet = sets[currentIndex]; 
        const nextIndex = (currentIndex + 1) % sets.length; 
        const nextSet = sets[nextIndex]; 
        const thirdIndex = (currentIndex + 2) % sets.length; 
        const thirdSet = sets[thirdIndex]; 

        currentSet.style.top = '100%'; 
        nextSet.style.top = '0'; 
        thirdSet.style.top = '77%'; 

        currentSet.style.zIndex = '0'; 
        nextSet.style.zIndex = '1'; 
        currentIndex = nextIndex; 
    } 
    
    sets.forEach(set => { 
        set.addEventListener('click', slideUp); 
    });
});