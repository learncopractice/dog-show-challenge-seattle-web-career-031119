let BASE_URL = `http://localhost:3000`
let ALL_DOGS = `${BASE_URL}/dogs`

const dogTable = document.getElementById('table-body')
const dogForm = document.getElementById('dog-form')
let allDogsObj = {}
let currentDogObj = {}


document.addEventListener('DOMContentLoaded', () => {
    loadAllDogs()
    dogForm.addEventListener('submit', updateDogInfo)
})

function loadAllDogs() {
    fetch(ALL_DOGS)
    .then( response => response.json())
    .then( data => renderAllDogs(data))
}

function renderAllDogs(allDogs){
    allDogsObj = Object.assign({}, allDogs)
    console.log(allDogsObj)

    for (let index in allDogs) {
        // console.log(allDogs[index])
        let tr = document.createElement('tr')
        let tdName = document.createElement('td')
        let tdBreed = document.createElement('td')
        let tdSex = document.createElement('td')
        let tdEdit = document.createElement('td')
        
        let editButton = document.createElement('button')
        editButton.type = 'button'
        editButton.className = 'edit'
        editButton.name = 'Edit Dog'
        editButton.setAttribute('id', allDogs[index].id)
        editButton.addEventListener('click', editDog)

        tdName.textContent = allDogs[index].name
        tdBreed.textContent = allDogs[index].breed
        tdSex.textContent = allDogs[index].sex
        tdEdit.appendChild(editButton)

        tr.append(tdName)
        tr.append(tdBreed)
        tr.append(tdSex)
        tr.append(tdEdit)
        dogTable.appendChild(tr)
    }
}

function editDog(event){
    event.preventDefault()

    //finding the dog object to edit
    let dogToEdit = searchDogs(event.target.id)
    console.log(dogToEdit)

    //preloading the form with the dog information
    let inputs = dogForm.getElementsByTagName('input')
    dogForm.setAttribute('data-dog-id', dogToEdit.id)
    inputs.name.value = dogToEdit.name
    inputs.breed.value = dogToEdit.breed
    inputs.sex.value = dogToEdit.sex

}

function searchDogs(dogId) {
    for (let index in allDogsObj) {
        console.log(allDogsObj[index].id)
        console.log(allDogsObj[index].id === dogId)
        if (allDogsObj[index].id == dogId) {
            currentDogObj = Object.assign({}, allDogsObj[index])
            return allDogsObj[index]
        }
    }
}

function updateDogInfo(event) {
    event.preventDefault();

    // let dogToEdit = searchDogs(dogForm.getAttribute('data-dog-id'))
    // console.log(dogToEdit)

    // let EDIT_DOG_URL = `${ALL_DOGS}/${dogToEdit.id}`
    let EDIT_DOG_URL = `${ALL_DOGS}/${currentDogObj.id}`

    //update from form information
    let inputs = dogForm.getElementsByTagName('input')
    let updateName = inputs.name.value
    let updateBreed = inputs.breed.value
    let updateSex = inputs.sex.value

    console.log(EDIT_DOG_URL)
    return fetch(EDIT_DOG_URL, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': updateName,
          'breed': updateBreed,
          'sex': updateSex
        })
      })
      .then(res => res.json())
      .then(data => renderAllDogs(data))
      .then(document.location.reload())
      
}