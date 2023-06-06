"use strict";
(() => {
    const notepad = new Notepad();
    // Dependency import
    const createNote = notepad.createNote;

    /** Converts form data into a key-value object representation. */
    const formToObject = (elements) =>
        [].reduce.call(elements, (data, element) => { data[element.name] = element.value; return data; }, {});

    // Handles submission and preparation for JSON actions
    const handleSubmit = function (event) {
        // Stop default form submission
        event.preventDefault();

        // <<< Validation goes here >>>

        // Get form input, Store data, Create note and Reset form
        const formObject = formToObject(document.getElementsByClassName("form-control"));
        storeData(formObject);
        createNote(formObject);
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
            createNote(formObject);
        }
    }

    initialize();
    setupClipboardScroll(0.7);


    /** Store form object in local storage with JSON
     * @param {Object} formObject Input data from forms as an Object
     */
    function storeData(formObject) {
        let formObjArray = JSON.parse(localStorage.getItem("formData")) || [];
        formObjArray = formObjArray.concat(formObject);
        localStorage.setItem("formData", JSON.stringify(formObjArray));
    }

    /** Removes an object from formData in local storage
     * @param {Object} formObject The object we are looking to remove
     */
    function removeData(formObject) {
        let formObjArray = JSON.parse(localStorage.getItem("formData"));
        if (!formObjArray)
            return;

        // Find target's index, Remove from array, Update local storage
        const index = formObjArray.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(formObject));
        if (index !== -1) formObjArray.splice(index, 1);
        localStorage.setItem("formData", JSON.stringify(formObjArray));
    }

})();