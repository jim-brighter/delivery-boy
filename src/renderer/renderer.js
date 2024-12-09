import { REQUEST_METHODS } from './constants.js';
import * as listeners from './eventListeners.js';
import { loadAllRequests, loadRequest } from './loadRequests.js';

function populateRequestMethodDropdown() {
    const methods = document.getElementById('method');
    REQUEST_METHODS.forEach((requestMethod) => {
        const methodElement = document.createElement('option');
        methodElement.value = requestMethod;
        methodElement.innerText = requestMethod;
        methods.appendChild(methodElement);
    });
}

const addListeners = () => {
    document.getElementById('send').addEventListener('click', listeners.sendRequest);
    document.getElementById('headers').addEventListener('click', listeners.changeDetails);
    document.getElementById('query-params').addEventListener('click', listeners.changeDetails);
    document.getElementById('new-header').addEventListener('click', listeners.newHeader);
}

const init = () => {
    populateRequestMethodDropdown();

    loadAllRequests();
    loadRequest();

    addListeners();
}

init();
