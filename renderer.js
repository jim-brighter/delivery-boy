const requestMethods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'OPTIONS',
    'HEAD'
];

const methods = document.getElementById('method');
requestMethods.forEach((requestMethod) => {
    const methodElement = document.createElement('option');
    methodElement.value = requestMethod;
    methodElement.innerText = requestMethod;
    methods.appendChild(methodElement);
});

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

    const response = await fetch(url, {
        method,
        headers
    });

    const data = await response.json();

    responseArea.innerText = JSON.stringify(data, null, 2);
}

const changeDetails = (event) => {
    document.querySelectorAll('.request-details-editor').forEach((element) => {
        element.hidden = element.id !== `${event.target.id}-editor`;
    });
}

const newHeader = () => {
    const headerTable = document.getElementById('headers-table');
    const headerTableBody = headerTable.getElementsByTagName('tbody')[0];

    const row = document.createElement('tr');
    const headerCol = document.createElement('td');
    const headerVal = document.createElement('td');

    const headerColInput = document.createElement('input');
    headerColInput.classList.add('header-input');
    headerColInput.type = 'text';
    headerColInput.autocomplete = 'off';
    headerColInput.placeholder = 'Content-Type';

    const headerValInput = document.createElement('input');
    headerValInput.classList.add('header-input');
    headerValInput.type = 'text';
    headerValInput.autocomplete = 'off';
    headerValInput.placeholder = 'application/json';

    headerCol.appendChild(headerColInput);
    headerVal.appendChild(headerValInput);
    row.appendChild(headerCol);
    row.appendChild(headerVal);

    headerTableBody.appendChild(row);
}
