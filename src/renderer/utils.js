const getHeaders = () => {
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

    return headers;
};

const setLoading = (loading) => {
    document.getElementById('response-code').hidden = loading;
    document.getElementById('response-body').hidden = loading;
    document.getElementById('response-spinner').hidden = !loading;
};

export {
    getHeaders,
    setLoading
}
