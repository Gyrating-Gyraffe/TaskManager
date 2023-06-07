"use strict";

import { Notepad } from './modules/notepad.mjs';
import { StorageManager } from './modules/storage.mjs';
import { setupClipboardScroll } from './modules/clipboard.mjs';

(() => {
    const storage = new StorageManager();
    const notepad = new Notepad(storage);

    /** Converts form data into a key-value object representation. */
    const formToObject = (elements) =>
        [].reduce.call(elements, (data, element) => {
            data[element.name] = element.value;
            return data;
        }, {});

    // Handles submission and preparation for JSON actions
    const handleSubmit = function (event) {
        // Stop default form submission
        event.preventDefault();
        
        // Validate task description
        if(!validateForm()) return; 

        // Get form input, Create note + Store data, Reset form
        const formObject = formToObject(document.getElementsByClassName("form-control"));
        notepad.createNote(formObject);

        // Store data
        storage.storeData(formObject);

        resetForm(this);
    };

    // Subscribes to submission event, loads stored data, instantiates notes, corrects date:time user input
    function initialize() {
        // DOM
        const form = document.getElementById("mainForm");
        const dateElement = document.getElementById("date");
        const timeElement = document.getElementById("time");

        // Date & Time Correction
        let dateAndTime = new Date().toISOString(); // ISO 8601 format: "YYYY-MM-DDTHH:mm:ss:sssZ"
        let dateToday = dateAndTime.split("T")[0];
        dateElement.min = dateToday;
        let timeToday = dateAndTime.split("T")[1].substring(0, 5);
        
        // Default values
        dateElement.value = dateToday;
        timeElement.value = timeToday;

        // Events
        dateElement.addEventListener("focusout", () => {
            dateElement.value = dateElement.value < dateToday ? dateToday : dateElement.value;
            timeElement.min = dateElement.value === dateToday ? timeToday : 0;
        });
        timeElement.addEventListener("focusout", () => {
            if(timeElement.min !== 0)
                timeElement.value = timeElement.value < timeToday ? timeToday : timeElement.value;
        });
        form.addEventListener("submit", handleSubmit);

        // Storage load
        const formObjArray = JSON.parse(localStorage.getItem("formData"));
        if (!formObjArray)
            return;

        // Note creation
        for (const formObject of formObjArray) {
            notepad.createNote(formObject);
        }
    }

    function resetForm(form) {
        form.reset();

        // DOM
        const dateElement = document.getElementById("date");
        const timeElement = document.getElementById("time");

        // Date & Time Correction
        let dateAndTime = new Date().toISOString(); // ISO 8601 format: "YYYY-MM-DDTHH:mm:ss:sssZ"
        let dateToday = dateAndTime.split("T")[0];
        dateElement.min = dateToday;
        let timeToday = dateAndTime.split("T")[1].substring(0, 5);
        
        // Default values
        dateElement.value = dateToday;
        timeElement.value = timeToday;
    }

    // Validate the three form inputs, if invalid notifies the user and returns false
    function validateForm() {
        const valid = true;
        
        [document.getElementById("taskArea"), document.getElementById("date"), document.getElementById("time")]
        .forEach(element => {
            if(!element.value) {
                const validateDiv = element.nextElementSibling;
                validateDiv.innerHTML = "Please fill out this form.";
                element.addEventListener("focus", (event) => {
                    validateDiv.innerHTML = "";
                    element.removeEventListener("focus", this);
                });
                valid = false;
            }
        });

        return valid;
    }

    initialize();
    setupClipboardScroll(0.7);

})();
