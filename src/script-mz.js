"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".toggle"),
          main = document.querySelector("main"),
          overview = document.querySelector(".js-overview");

    const html = document.querySelectorAll("html"),
          bg = document.querySelectorAll(".bg"),
          toggleCont = document.querySelectorAll(".toggle-container"),
          svg = document.querySelectorAll(".svg"),
          svgBg = document.querySelectorAll(".svg-bg"),
          h1 = document.querySelectorAll("h1"),
          glassBg = document.querySelectorAll(".glass-bg");

    const mediaXl = window.matchMedia("(min-width: 1300px)");
    const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const elementsToChange = [html, bg, toggleCont, svg, svgBg, h1, glassBg];
    
    const sets = [ 
        document.querySelector('.js-set1'), 
        document.querySelector('.js-set2'), 
        document.querySelector('.js-set3'),
        document.querySelector('.js-set4') 
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

    const authContent = 'Features a secure and efficient phone-based authorization flow, including a three-step registration process, SMS code verification, login interface and a password recovery process.';

    const cabinetContent = 'Student cabinet provides a comprehensive dashboard displaying enrolled classes with detailed descriptions and progress tracking. Students will have access to video & audio lecture materials, and a homework submission portal.';

    const profileContent = 'The profile section will include notifications for class updates, homework reminders, and school announcements, ensuring that users stay informed about important events and deadlines. Interactive calendar will show class schedules, upcoming events, and a secure payment gateway will facilitate tuition payments and provide transaction history and receipts.';

    const adminContent = 'The admin panel will provide tools for user management and role-based access control. Administrators can create and schedule classes, assign lecturers and educational materials, oversee student payments and generate financial reports.';

    let currentIndex = 0; 

    const updateStyles = () => {
        const nextIndex = (currentIndex + 1) % sets.length;
        const prevIndex = (currentIndex + sets.length - 1) % sets.length;
        const lastIndex = (currentIndex + sets.length - 2) % sets.length;

        const currentSet = sets[currentIndex];
        const nextSet = sets[nextIndex];
        const prevSet = sets[prevIndex];
        const lastSet = sets[lastIndex];

        sets.forEach(set => {
            set.classList.remove('current-set', 'next-set', 'prev-set');
        });

        currentSet.classList.add('current-set');
        nextSet.classList.add('next-set');
        prevSet.classList.add('prev-set');
        lastSet.classList.add('prev-set');

        switch (currentSet) {
            case sets[0]:
                overview.textContent = authContent;
                break;
            case sets[1]:
                overview.textContent = cabinetContent;
                break;
            case sets[2]:
                overview.textContent = profileContent;
                break;
            case sets[3]:
                overview.textContent = adminContent;
                break;
        }
    }

    const slideUp = () => {
        currentIndex = (currentIndex + 1) % sets.length;
        updateStyles();
    }

    const mediaCheck = () => {
        if (mediaXl.matches) {
            main.scrollTop = 0;
            updateStyles();
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
    }

    mediaCheck();

    mediaXl.addEventListener("change", () => mediaCheck());
});    
