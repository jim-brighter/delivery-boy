const sendRequest = async () => {
    const method = document.getElementById('method').value;
    const url = document.getElementById('url').value;

    const headerTable = document.getElementById('headers-table');
    const headerTableBody = headerTable.getElementsByTagName('tbody')[0];
    const headerTableRows = headerTableBody.getElementsByTagName('tr');

    const headers = {};

    for (let headerRow of headerTableRows) {
        const cells = headerRow.getElementsByTagName('td');
        const headerName = cells[0].getElementsByTagName('input')[0].value;
        const headerVal = cells[1].getElementsByTagName('input')[0].value;

        headers[headerName] = headerVal;
    }

    const responseArea = document.getElementById('response-body');
    const responseCode = document.getElementById('response-code');

    await window.electronAPI.saveRequest('default', {
        url,
        method,
        headers
    });

    try {
        document.getElementById('response-code').hidden = true;
        document.getElementById('response-body').hidden = true;
        document.getElementById('response-spinner').hidden = false;

        const response = await fetch(url, {
            method,
            headers
        });

        document.getElementById('response-spinner').hidden = true;
        document.getElementById('response-code').hidden = false;
        document.getElementById('response-body').hidden = false;

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

const newHeader = (event, storedHeader, storedValue) => {
    const headerTable = document.getElementById('headers-table');
    const headerTableBody = headerTable.getElementsByTagName('tbody')[0];

    const row = document.createElement('tr');
    const headerCol = document.createElement('td');
    const headerVal = document.createElement('td');
    const headerDelete = document.createElement('td');

    const headerColInput = document.createElement('input');
    headerColInput.classList.add('header-input');
    headerColInput.type = 'text';
    headerColInput.autocomplete = 'off';
    headerColInput.placeholder = 'Content-Type';
    if (storedHeader) {
        headerColInput.value = storedHeader;
    }

    const headerValInput = document.createElement('input');
    headerValInput.classList.add('header-input');
    headerValInput.type = 'text';
    headerValInput.autocomplete = 'off';
    headerValInput.placeholder = 'application/json';
    if (storedValue) {
        headerValInput.value = storedValue;
    }

    const deleteLink = document.createElement('button');
    deleteLink.classList.add('no-style-button', 'delete-header');
    deleteLink.textContent = '🗑️';

    deleteLink.addEventListener('click', deleteHeader);

    headerDelete.classList.add('header-delete');
    headerDelete.appendChild(deleteLink);

    headerCol.appendChild(headerColInput);
    headerVal.appendChild(headerValInput);
    row.appendChild(headerCol);
    row.appendChild(headerVal);
    row.appendChild(headerDelete);

    headerTableBody.appendChild(row);
};

export {
    newHeader,
    deleteHeader,
    changeDetails,
    sendRequest
}
