const sendRequest = async () => {
    const method = document.getElementById('method').value;
    const url = document.getElementById('url').value;

    const responseArea = document.getElementById('response-body');

    const response = await fetch(url, {
        method
    });

    const data = await response.json();

    responseArea.innerText = JSON.stringify(data, null, 2);
}

document.getElementById('send').onclick = sendRequest;
