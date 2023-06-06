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
        document.getElementById("taskArea").value = document.getElementById("taskArea").value || "Empty Task";

        // Get form input, Create note + Store data, Reset form
        const formObject = formToObject(document.getElementsByClassName("form-control"));
        notepad.createNote(formObject);
        this.reset();
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
        
        //Placeholder
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

    initialize();
    setupClipboardScroll(0.7);

})();
