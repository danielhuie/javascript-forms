/*
    app.js
    application script for the JavaScript and Forms Demo
*/

"use strict";

/* onReady()
* Called when the DOM is loaded and ready for manipulation.
* We need to populate the class standing select based on the standings array
* and add an event listener for the form's submit event
* */
function onReady() {
    var standings = [
        {
            code: 'f',
            displayText: 'Freshman'
        },
        {
            code: 's',
            displayText: 'Sophomore'
        },
        {
            code: 'j',
            displayText: 'Junior'
        },
        {
            code: 'sn',
            displayText: 'Senior'
        },
        {
            code: 'ss',
            displayText: 'Super Senior'
        }
    ];
    var personForm = document.getElementById('person-form');

    // asks for the field inside form that has name 'standing' (a reference to the html5 form)
    var standingsSelect = personForm.elements['standing'];
    var i;
    var option;

    for (i = 0; i < standings.length; i++) {
        option = document.createElement('option');
        option.innerHTML = standings[i].displayText;
        option.value = standings[i].code;
        standingsSelect.appendChild(option);
    }

    personForm.addEventListener('submit', onSubmit);

} //onReady()

/* onSubmit()
 * Called when the user attempts to submit the form
 * The browser will pass an event object as the first parameter and we can use this object
 * to stop the form from being submitted if it is invalid.
 * Also the keyword 'this' will refer to the form that is being submitted while inside this function.
 * */
function onSubmit(evt) {
    evt.returnValue = validateForm(this);
    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
} //onSubmit()


/* validateForm()
* This function validates the form's information and returns true if the form is valid or false if the form is invalid.
* It will also let the user know which fields are invalid.
* parameters:
*   form    reference to the form that needs to be validated
* */
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'standing', 'age'];
    var i;
    var formValid = true;
    for (i = 0; i < requiredFields.length; i++) {
        // condition to check if field has been selected
        formValid &= validateRequiredField(form.elements[requiredFields[i]]);
    }

    if (!formValid) {
        var errMsg = document.getElementById('error-message');
        errMsg.innerHTML = 'Please fill out the required fields!';
        errMsg.style.display = 'block';
    }


} //validateForm()

/* validateRequiredField()
* This function validates a field that is required. If the field does not have a value, or has only spaces,
* it will mark the field as invalid and return false. Otherwise it will return true.
* */
function validateRequiredField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;
    if (valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid-field';
    }

    return valid;
} //validateRequiredField()

document.addEventListener('DOMContentLoaded', onReady);