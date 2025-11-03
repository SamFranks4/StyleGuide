// Elements
const addNoteBtn = document.getElementById('addNoteBtn');
const noteModal = document.getElementById('noteModal');
const closeModal = document.querySelector('.close');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const noteCategory = document.getElementById('noteCategory');
const notesList = document.getElementById('notesList');

const addCategoryBtn = document.getElementById('addCategoryBtn');
const newCategoryInput = document.getElementById('newCategoryInput');
const categoryList = document.getElementById('categoryList');

let categories = [];
let notes = [];

// Modal
addNoteBtn.addEventListener('click', () => {
  noteModal.style.display = 'flex';
  populateCategorySelect();
});

closeModal.addEventListener('click', () => {
  noteModal.style.display = 'none';
  noteTitle.value = '';
  noteContent.value = '';
});

// Add Category
addCategoryBtn.addEventListener('click', () => {
  const name = newCategoryInput.value.trim();
  if (name && !categories.includes(name)) {
    categories.push(name);
    renderCategories();
    newCategoryInput.value = '';
  }
});

function renderCategories() {
  categoryList.innerHTML = '';
  categories.forEach(cat => {
    const li = document.createElement('li');
    li.textContent = cat;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'x';
    delBtn.className = 'deleteCatBtn';
    delBtn.onclick = () => {
      categories = categories.filter(c => c !== cat);
      notes = notes.filter(n => n.category !== cat);
      renderCategories();
      renderNotes();
    };

    li.appendChild(delBtn);
    categoryList.appendChild(li);
  });
  populateCategorySelect();
}

// Populate category select in modal
function populateCategorySelect() {
  noteCategory.innerHTML = '';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    noteCategory.appendChild(option);
  });
}

// Save Note
saveNoteBtn.addEventListener('click', () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  const category = noteCategory.value;

  if (title && content && category) {
    notes.push({ title, content, category });
    renderNotes();
    noteModal.style.display = 'none';
    noteTitle.value = '';
    noteContent.value = '';
  }
});

function renderNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'x';
    delBtn.className = 'deleteBtn';
    delBtn.onclick = () => {
      notes.splice(index, 1);
      renderNotes();
    };

    div.appendChild(delBtn);
    notesList.appendChild(div);
  });
}

// Search
document.getElementById('searchBar').addEventListener('input', e => {
  const val = e.target.value.toLowerCase();
  const filtered = notes.filter(n => n.title.toLowerCase().includes(val) || n.content.toLowerCase().includes(val));
  notesList.innerHTML = '';
  filtered.forEach((note, index) => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'x';
    delBtn.className = 'deleteBtn';
    delBtn.onclick = () => {
      notes.splice(notes.indexOf(filtered[index]), 1);
      renderNotes();
    };

    div.appendChild(delBtn);
    notesList.appendChild(div);
  });
});
