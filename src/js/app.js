/*
*   app.js
*/
import 'bootstrap';
import '../scss/app.scss';
import './custom.js';
import $ from 'jquery';

let core = {};
/**
 * bot settings
 */
const chat_id = '-290963395';
const botURL = 'https://api.telegram.org/bot692164601:AAHGakivE_eGg0OvGRjr_cwqfbNlzm5RbAc/sendMessage';
const geoIP = 'http://ip-api.com/json';
/**
 * getGeoAndSend - get geo information and send back the result
 * @param {function} callbackSuccess - callback on positive retrive of geo information
 * @param {function} callbackError - callback on positive negative of geo information
 */
core.getGeoAndSend = function (callbackSuccess, callbackError) {

    $.ajax({
        async: false,
        dataType: 'json',
        url: geoIP,
        success: function (response) {
            callbackSuccess(response);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            callbackError(textStatus);
        }
    });

}
/**
 * checking string to email pattern
 * @param {string} email - email to check
 */
core.validate = function (email) {

    const emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    return emailFilter.test(email) ? true : false;

}
/**
 * @param {object} sendData - data to send to the bot
 */
core.sendMessage = function(sendData) {

      $.ajax({
        type: 'POST',
        url: botURL,
        dataType: 'json',
        data: sendData,
        cache: false,
        success: function (result) {
            //  inform user and remove ajax icon
        },
        error: function (data) {
            //  inform user and remove ajax icon
        }
    });
}

const sendMessageElement = document.getElementById('sendMessage');

if (sendMessageElement!== null) {
    sendMessageElement.onclick = function(event) {

        event.preventDefault();
        event.stopPropagation();

        const form = document.getElementById('sendForm');
        const email = document.getElementById('yourEmail').value;

        if (form.checkValidity() === false || !core.validate(email)) {
            form.classList.add('was-validated');
        } else {

            let formData = {};

            const you = document.getElementById('you').value;
            const yourMessage = document.getElementById('yourEmail').value;

            formData.chat_id = chat_id;
            formData.text = you + ' (' + email + ') :' + yourMessage;

            const sendContactMessage = function(info) {
                formData.text = formData.text + JSON.stringify(info);
                core.sendMessage(formData);
                return false;
            }
     
            core.getGeoAndSend(sendContactMessage, sendContactMessage);
            
        }
    };
}
/**
 * resume functions
 */
const notifications = ['DOC', 'PDF'];
const notificationsIDs = notifications.map(x => 'download' + x);
const notificationsElements = notificationsIDs.map(x => document.getElementById(x));

notificationsElements.forEach((element, index) => {

    if (element !== null) {
        element.onclick = function(event) {

            let fileUrl = $(this).attr("href");
            event.preventDefault();

            const sendSuccess = function(response) {
 
                let message = notifications[index] + ' is downloaded. ' + JSON.stringify(response);

                let formData = {};
                formData.chat_id = chat_id;
                formData.text = message;

                core.sendMessage(formData);
                window.open(fileUrl), '_blank';
                return true;
            }

            const sendError = function(response) {
                
                let message =  notifications[index] + ' is downloaded. ' + 'Unable to to get geolocation: ' + response;

                let formData = {};
                formData.chat_id = chat_id;
                formData.text = message;

                core.sendMessage(formData);
                window.open(fileUrl, '_blank');
                return true;
            }            

            core.getGeoAndSend(sendSuccess, sendError);
            return false;

        };
    }

});