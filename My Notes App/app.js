// Get Relevant Components of the App
const myTitle = document.getElementById('title')
const myNotes = document.getElementById('notes')
const myForm = document.getElementById('notes-form')
const addNote = document.getElementById('add-button')

myForm.style.display = 'None'

addNote.addEventListener('click', () => {
  myForm.style.display = 'Block'
  addNote.style.display = 'None'
})

myForm.addEventListener('submit', (e) => {
  const data = {
    title: myTitle.value,
    notes: myNotes.value
  }

  if (localStorage.getItem('notes') === null) {
    // Initializa an Array
    const notes = []
    // Push the data to the notes Array
    notes.push(data)
    localStorage.setItem('notes', JSON.stringify(notes))
  } else {
    // Get the available notes
    const notes = JSON.parse(localStorage.getItem('notes'))

    // Push notes data to notes array
    notes.push(data)

    // Re-initialize localstorage
    localStorage.setItem('notes', JSON.stringify(notes))
  }

  addToUI()
  myForm.style.display = 'None'
  addNote.style.display = 'Block'
  e.preventDefault()
})

function removeNote(note) {
  const notes = JSON.parse(localStorage.getItem('notes'))

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].notes === note) {
      notes.slice(i, 1)
    }
  }

  localStorage.setItem('notes', JSON.stringify(notes))
  addToUI()
}

function addToUI () {
  // Get notes from localstorage
  const notes = JSON.parse(localStorage.getItem('notes'))

  const notesArea = document.getElementById('notes-area')

  notesArea.innerHTML = ''

  for (let i = 0; i < notes.length; i++) {
    const title = notes[i].title
    const note = notes[i].notes

    notesArea.innerHTML += `
      <div class="col-sm-12 mt-3 mb-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">${title}</h4>
            <p class="card-text"> ${note} </p>
            <button class="btn btn-danger" onclick="removeNote(${note})">Delete Note</button>
          </div>
        </div>
      </div>
    `
  }
}
