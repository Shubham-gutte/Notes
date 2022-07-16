const addbtn = document.querySelector('.add');
const main = document.querySelector('.main-continer');

const notes = JSON.parse(localStorage.getItem('notes')); //setting getItem from the notes aarry

if (notes) {
  notes.forEach((note) => addNewNote(note)); // for each single note creation
}

addbtn.addEventListener('click', () => addNewNote()); //clck btn to add new note

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
    <div class="tools">
        <button class="edit">Add</button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
       

    </div>
    
    <textarea placeholder="Please Click Add  to notes" readonly rows="4" cols="15"></textarea>
    `;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');

  const textArea = note.querySelector('textarea');

  textArea.value = text;

  deleteBtn.addEventListener('click', () => {
    note.remove();

    updateLS();
  });

  editBtn.addEventListener('click', () => {
    if (editBtn.innerText == 'Add') {
      textArea.removeAttribute('readonly');
      textArea.focus();
      editBtn.innerText = 'Save';
    } else if (editBtn.innerText == 'Edit') {
      textArea.removeAttribute('readonly');
      textArea.focus();
      editBtn.innerText = 'Save';
    } else {
      textArea.setAttribute('readonly', 'readonly');
      editBtn.innerText = 'Edit';
    }
  });

  textArea.addEventListener('input', (e) => {
    const { value } = e.target;

    updateLS();
  });

  main.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea');

  const notes = []; //empty array

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(notes)); //set item in store local storange
}
