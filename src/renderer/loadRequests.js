import * as listeners from './eventListeners.js';

const loadAllRequests = async () => {
  const allRequests = await window.electronAPI.loadAllRequests();
  if (allRequests) {
      for (let key in allRequests) {
          const listItem = document.createElement('li');
          listItem.textContent = key;
          document.getElementById('saved-requests').appendChild(listItem);
      }
  }
}

const loadRequest = async (key = 'default') => {
  const savedRequest = await window.electronAPI.loadRequest(key);
  if (savedRequest) {
      for (let [key, value] of Object.entries(savedRequest.headers)) {
          listeners.newHeader(null, key, value);
      }
      document.getElementById('url').value = savedRequest.url;
      document.getElementById('method').value = savedRequest.method;
  }

  Array.prototype.forEach.call(document.getElementsByClassName('delete-header'), (b) => {
      b.addEventListener('click', listeners.deleteHeader);
  });
}

export {
  loadAllRequests,
  loadRequest
}
