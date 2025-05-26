// Data model as JSON
const data = {
  server: {
    id: 'srv1',
    name: 'Kerix',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/906/906343.png',
    categories: [
      { id: 'cat1', name: 'Category 1', channels: [
          { id: 'ch1', name: '# General' },
          { id: 'ch2', name: '# Random' }
        ]
      },
      { id: 'cat2', name: 'Category 2', channels: [
          { id: 'ch3', name: '# Music' },
          { id: 'ch4', name: '# Gaming' }
        ]
      }
    ]
  }
};

let dragging = null;
let draggingType = null;
const container = document.querySelector('.channelListContent');

function render() {
  container.innerHTML = '';
  data.server.categories.forEach(cat => {
    const catEl = document.createElement('div');
    catEl.className = 'category';
    catEl.dataset.id = cat.id;

    const headerEl = document.createElement('h3');
    headerEl.textContent = cat.name;
    headerEl.draggable = true;
    headerEl.addEventListener('dragstart', () => {
      dragging = cat;
      draggingType = 'category';
      headerEl.classList.add('dragging');
    });
    headerEl.addEventListener('dragend', () => headerEl.classList.remove('dragging'));
    headerEl.addEventListener('dragover', e => {
      if (draggingType === 'category') {
        e.preventDefault();
        headerEl.classList.add('over');
      }
    });
    headerEl.addEventListener('dragleave', () => {
      if (draggingType === 'category') headerEl.classList.remove('over');
    });
    headerEl.addEventListener('drop', e => {
      if (draggingType === 'category') {
        e.preventDefault();
        headerEl.classList.remove('over');
        if (dragging.id !== cat.id) {
          const arr = data.server.categories;
          const from = arr.findIndex(c => c.id === dragging.id);
          const to = arr.findIndex(c => c.id === cat.id);
          arr.splice(from, 1);
          arr.splice(to, 0, dragging);
          render();
        }
      }
    });
    catEl.appendChild(headerEl);

    const listEl = document.createElement('div');
    listEl.className = 'itemList';
    listEl.addEventListener('dragover', e => {
      if (draggingType === 'channel') {
        e.preventDefault();
        listEl.classList.add('over');
      }
    });
    listEl.addEventListener('dragleave', () => {
      if (draggingType === 'channel') listEl.classList.remove('over');
    });
    listEl.addEventListener('drop', e => {
      if (draggingType === 'channel') {
        e.preventDefault();
        listEl.classList.remove('over');
        const { cat: fromCat, ch: fromCh } = dragging;
        if (fromCat.id !== cat.id) {
          const arrFrom = fromCat.channels;
          const idx = arrFrom.findIndex(c => c.id === fromCh.id);
          if (idx > -1) arrFrom.splice(idx, 1);
          cat.channels.push(fromCh);
          render();
        }
      }
    });

    cat.channels.forEach(ch => {
      const chEl = document.createElement('div');
      chEl.className = 'channelItem';
      chEl.draggable = true;
      chEl.dataset.id = ch.id;
      chEl.textContent = ch.name;

      chEl.addEventListener('dragstart', () => {
        dragging = { cat, ch };
        draggingType = 'channel';
        chEl.classList.add('dragging');
      });
      chEl.addEventListener('dragend', () => chEl.classList.remove('dragging'));
      chEl.addEventListener('dragover', e => {
        if (draggingType === 'channel') {
          e.preventDefault();
          chEl.classList.add('over');
        }
      });
      chEl.addEventListener('dragleave', () => {
        if (draggingType === 'channel') chEl.classList.remove('over');
      });
      chEl.addEventListener('drop', e => {
        if (draggingType === 'channel') {
          e.preventDefault();
          chEl.classList.remove('over');
          const { cat: fromCat, ch: fromCh } = dragging;
          if (fromCat.id === cat.id && fromCh.id !== ch.id) {
            const arr = cat.channels;
            const fromIdx = arr.findIndex(c => c.id === fromCh.id);
            const toIdx = arr.findIndex(c => c.id === ch.id);
            arr.splice(fromIdx, 1);
            arr.splice(toIdx, 0, fromCh);
            render();
          }
        }
      });
      listEl.appendChild(chEl);
    });

    catEl.appendChild(listEl);
    container.appendChild(catEl);
  });
}
render();