"use strict";

class StorageInterface {
    storeData(data) {
        throw new Error("Method not implemented");
    }
    removeData(data) {
        throw new Error("Method not implemented");
    }
}

export class StorageManager extends StorageInterface {
    /** Store form object in local storage with JSON
    * @param {Object} formObject Input data from forms as an Object
    */
    storeData(formObject) {
        let formObjArray = JSON.parse(localStorage.getItem("formData")) || [];
        formObjArray = formObjArray.concat(formObject);
        localStorage.setItem("formData", JSON.stringify(formObjArray));
    }

    /** Removes an object from formData in local storage
    * @param {Object} formObject The object we are looking to remove
    */
    removeData(formObject) {
        let formObjArray = JSON.parse(localStorage.getItem("formData"));
        if (!formObjArray) return;

        // Find target's index, Remove from array, Update local storage
        const index = formObjArray.findIndex(
            (obj) => JSON.stringify(obj) === JSON.stringify(formObject)
        );
        if (index !== -1) formObjArray.splice(index, 1);
        localStorage.setItem("formData", JSON.stringify(formObjArray));
    }   
}