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

        // <<< Validation goes here >>>

        // Get form input, Create note + Store data, Reset form
        const formObject = formToObject(document.getElementsByClassName("form-control"));
        notepad.createNote(formObject);
        this.reset();
    };

    // Subscribes to submission event, loads stored data, instantiates notes
    function initialize() {
        // Event
        const form = document.getElementById("mainForm");
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
