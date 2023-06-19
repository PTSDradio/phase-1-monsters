let count = 50
let page = 1

// upon opening activate this function
document.addEventListener("DOMContentLoaded", () => {
    //creates variables for elements
    const monstContainer = document.getElementById("monster-container")
    const createMonster = document.getElementById("create-monster")
   
    //fetches ins
   function fetchMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=2&_page=${page}`)
    .then(res => res.json())
    .then(data => {
        data.forEach(info => loadMonsters(info));
    }) 
    
}
fetchMonsters()

    const fwdBtn = document.getElementById(`forward`)
    const backBtn = document.getElementById(`back`)

        fwdBtn.addEventListener(`click`, (e) =>{
        e.preventDefault();
        monstContainer.innerHTML= ``
        
        page++
        fetchMonsters()
        console.log (page)
    })

    backBtn.addEventListener(`click`, (e) =>{
        e.preventDefault();
        monstContainer.innerHTML= ``
        if (page>1) {
            page--  
        }
        else {}
        fetchMonsters()
        console.log (page)
    })
   

    function loadMonsters(info) {
        const name = document.createElement('h2');
        const age = document.createElement('h3');
        const desc = document.createElement('p');

        name.textContent = info.name
        age.textContent = `Age: ${info.age}`
        desc.textContent = `Bio: ${info.description}`

        monstContainer.append(name, age, desc)
    }
//create 3 form elements and include a submit button

    const nameInput = document.createElement("input");
    const ageInput = document.createElement("input");
    const descInput = document.createElement("input");
    const br1 = document.createElement("br")
    const br2 = document.createElement("br")
    const br3 = document.createElement("br")
    const button = document.createElement("button");

    nameInput.placeholder = `Insert name here!`
    ageInput.placeholder = `Insert age here!`
    descInput.placeholder = `Insert description here!`

    button.textContent= `Create Monster`

    createMonster.append(nameInput, br1, ageInput, br2, descInput, br3, button)


    button.addEventListener("click", (e) => {
        e.preventDefault();
        
        const monsterData = {
            name: nameInput.value,
            age: ageInput.value,
            description: descInput.value
        }

        const configObject= {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(monsterData)
        }

        fetch(`http://localhost:3000/monsters`, configObject)
        nameInput.value= ``
        ageInput.value= ``
        descInput.value= ``
    })

})



