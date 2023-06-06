"use strict";
(() => {

    /** Creates a new note on the clipboard
     * @param {Object} formObject A form object containing the data that's written in the notes
     */
    function createNote(formObject) {
        const content = formObject.taskDescription;
        const date = formObject.date;
        const time = formObject.time;

        // Create the outer div element with class and attributes
        const newElement = document.createElement("div");
        newElement.classList.add("col-lg-3", "col-sm-4", "col-xs-6", "notepadContainer");

        // Create the notepadWrapper div
        const notepadWrapper = document.createElement("div");
        notepadWrapper.classList.add("notepadWrapper");

        // Create the notepadText div
        const notepadText = document.createElement("div");
        notepadText.textContent = content;
        notepadText.classList.add("notepadText");

        // Create the notepadDate div
        const notepadDate = document.createElement("div");
        notepadDate.textContent = parseDateTime(date, time);
        notepadDate.classList.add("notepadDate");

        // Append notepadText and notepadDate to notepadWrapper
        notepadWrapper.appendChild(notepadText);
        notepadWrapper.appendChild(notepadDate);

        // Append notepadWrapper to the outer div
        newElement.appendChild(notepadWrapper);

        // Create the image element
        const imageElement = document.createElement("img");
        imageElement.src = "resources/images/sticky.png";
        imageElement.classList.add("img-responsive");
        imageElement.style.width = "100%";
        imageElement.alt = "Sticky Note";

        // Append the image element to the outer div
        newElement.appendChild(imageElement);

        // Create the delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("noteDelete");
        const glyphicon = document.createElement("span");
        glyphicon.classList.add("glyphicon", "glyphicon-remove");
        deleteButton.appendChild(glyphicon);
        deleteButton.style.display = "none";
        newElement.appendChild(deleteButton);
        // Remove the dynamic element when the button is clicked
        deleteButton.addEventListener("click", () => {
            removeData(formObject);
            newElement.remove();
        });

        // Add mouse hover listeners to container div
        newElement.addEventListener("mouseenter", (event) => {
            deleteButton.style.display = "block";
        });
        newElement.addEventListener("mouseleave", (event) => {
            deleteButton.style.display = "none";
        });

        // Append the new dynamic element to a parent container
        const parentElement = document.getElementById("notepadContainer");
        parentElement.appendChild(newElement);    
    }

    /** Reformats the date and time. Accepts the localstorage format
     * @param {String} date Date in YYYY-MM-DD
     * @param {String} time Time in HH-MM
     * @returns Date as DD/MM/YYYY - HH:MM
     */
    function parseDateTime(date, time) {
        const inputDate = date + "|" + time;
        let finalDate = `${inputDate.substring(8, 10)}/${inputDate.substring(5, 7)}/`+
            `${inputDate.substring(0, 4)} - ${inputDate.substring(11, inputDate.length)}`;
        return finalDate;
    }

})();