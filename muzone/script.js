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
          elementsToChange = [html, bg, toggleCont, svg, svgBg, h1],
          sets = [ 
              document.querySelector('.set1'), 
              document.querySelector('.set2'), 
              document.querySelector('.set3') 
          ]; 

    const toggleDarkMode = (array) => {
        array.forEach(arrayItem => {
            arrayItem.forEach(item => {
                item.classList.toggle("--dark");
            });
        });
    }

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

    let currentIndex = 0; 

    const updateStyles = () => {
        const nextIndex = (currentIndex + 1) % sets.length;
        const prevIndex = (currentIndex + sets.length - 1) % sets.length;

        const currentSet = sets[currentIndex];
        const nextSet = sets[nextIndex];
        const prevSet = sets[prevIndex];

        sets.forEach(set => {
            set.classList.remove('current-set', 'next-set', 'prev-set');
        });

        currentSet.classList.add('current-set');
        nextSet.classList.add('next-set');
        prevSet.classList.add('prev-set');
    }

    const slideUp = () => {
        currentIndex = (currentIndex + 1) % sets.length;
        updateStyles();
    }

    const slideLeft = (set) => {
        const images = set.querySelectorAll('img');
        let imageIndex = 0;

        const slideImages = () => {
            images.forEach((img) => {
                img.style.transform = `translateX(-${100 * imageIndex}%)`;
            });
            imageIndex = (imageIndex + 1) % images.length;
        };

        if (mediaXl.matches) {
            set.removeEventListener('click', slideImages);
        } else {
            set.addEventListener('click', slideImages);
        }
    };

    const mediaCheck = () => {
        if (mediaXl.matches) {
            h1.forEach(item => { item.classList.add("--xl") });
            sets.forEach(set => {
                set.addEventListener('click', slideUp);
            });
        } else {
            h1.forEach(item => { item.classList.remove("--xl") });
            sets.forEach(set => {
                set.removeEventListener('click', slideUp);
            });
        }
        slideLeft(sets[0]);
        slideLeft(sets[2]);
    }

    mediaCheck();

    mediaXl.addEventListener("change", () => mediaCheck());

    updateStyles();
});    