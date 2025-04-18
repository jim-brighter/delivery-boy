import { getHeaders, setLoading } from "./utils.js";

const handleResponse = async (response) => {
    const responseArea = document.getElementById('response-body');
    const responseCode = document.getElementById('response-code');

    const status = response.status;

    responseCode.innerText = status;

    responseCode.className = '';

    if (status < 400) {
        responseCode.classList.add('status-ok');
    } else {
        responseCode.classList.add('status-bad');
    }

    const data = await response.json();

    responseArea.innerText = JSON.stringify(data, null, 2);
}


const sendRequest = async () => {
    const method = document.getElementById('method').value;
    const url = document.getElementById('url').value;

    const headers = getHeaders();

    await window.electronAPI.saveRequest('default', {
        url,
        method,
        headers
    });

    try {
        setLoading(true);

        const response = await fetch(url, {
            method,
            headers
        });

        setLoading(false);

        await handleResponse(response);
    } catch (e) {
        console.error(e);
    }
};

const changeDetails = (event) => {
    document.querySelectorAll('.request-details-editor').forEach((element) => {
        element.hidden = element.id !== `${event.target.id}-editor`;
    });
};

const deleteHeader = (event) => {
    const tBody = document.getElementById('headers-table').getElementsByTagName('tbody')[0];
    tBody.removeChild(event.target.parentNode.parentNode);
};

const createHeader = (storedHeader) => {
    const headerCol = document.createElement('td');
    const headerColInput = document.createElement('input');
    headerColInput.classList.add('header-input');
    headerColInput.type = 'text';
    headerColInput.autocomplete = 'off';
    headerColInput.placeholder = 'Content-Type';
    if (storedHeader) {
        headerColInput.value = storedHeader;
    }
    headerCol.appendChild(headerColInput);

    return headerCol;
}

const createHeaderValue = (storedValue) => {
    const headerVal = document.createElement('td');
    const headerValInput = document.createElement('input');
    headerValInput.classList.add('header-input');
    headerValInput.type = 'text';
    headerValInput.autocomplete = 'off';
    headerValInput.placeholder = 'application/json';
    if (storedValue) {
        headerValInput.value = storedValue;
    }
    headerVal.appendChild(headerValInput);

    return headerVal;
}

const createHeaderDeleteButton = () => {
    const headerDelete = document.createElement('td');
    const deleteLink = document.createElement('button');
    deleteLink.classList.add('no-style-button', 'delete-header');
    deleteLink.title = 'Delete Header';
    deleteLink.textContent = '🗑️';
    deleteLink.addEventListener('click', deleteHeader);
    headerDelete.classList.add('header-delete');
    headerDelete.appendChild(deleteLink);
    return headerDelete;
}

const createHeaderRow = (headerCol, headerVal, headerDelete) => {
    const row = document.createElement('tr');
    row.appendChild(headerCol);
    row.appendChild(headerVal);
    row.appendChild(headerDelete);

    return row;
}

const newHeader = (event, storedHeader, storedValue) => {
    const headerTable = document.getElementById('headers-table');
    const headerTableBody = headerTable.getElementsByTagName('tbody')[0];

    const headerCol = createHeader(storedHeader);

    const headerVal = createHeaderValue(storedValue);

    const headerDelete = createHeaderDeleteButton();

    const row = createHeaderRow(headerCol, headerVal, headerDelete);

    headerTableBody.appendChild(row);
};

export {
    newHeader,
    deleteHeader,
    changeDetails,
    sendRequest
}
