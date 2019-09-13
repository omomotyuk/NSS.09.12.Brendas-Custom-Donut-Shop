import Dropdown from "./dropdown.js"
import createNewDonut from "./donut.js";
import API from "./DataManager.js";
import addDonutToDOM from "./donutDOM.js";
import editForm from "./editForm.js";

/*
    Make and populate dropdowns with API info when main.js is seen by browser
*/
Dropdown.makeTypesDropDown();
Dropdown.makeFlavorsDropDown();
Dropdown.makeGlazesDropDown();
Dropdown.makeToppingsDropDown();

// This makes sure we have donuts when the page loads!
API.getDonuts().then((allDonuts) => {
    allDonuts.forEach(donut => {
        addDonutToDOM(donut)
    })
})


// Event listener for the 'create new donut' button
document.querySelector("#donut-btn").addEventListener("click", () => {


    // 1. needs to get values of the inputs/dropdowns
    // they're stored in variables to use later
    const name = document.querySelector("#name-input").value
    const type = document.querySelector("#type-dropdown").value
    const flavor = document.querySelector("#flavor-dropdown").value
    const glaze = document.querySelector("#glaze-dropdown").value
    const toppings = document.querySelector("#topping-dropdown").value

    // IT'S LATER
    // 2. needs to build a donut object
    const newDonutObj = createNewDonut(name, type, flavor, glaze, toppings)
    console.log("my new donut pls", newDonutObj)

    // 3. maybe clear inputs?
    document.querySelector("#name-input").value = "";

    // 4. clear donut-container before adding new donut
    document.querySelector("#donutResults").innerHTML = "";

    // 5. I need to save donut to the json
    API.createDonut(newDonutObj).then(() => {


        // 6. get all the donuts again
        API.getDonuts().then((allDonuts) => {
            allDonuts.forEach(donut => {
                // 7. needs to send donut to DOM
                addDonutToDOM(donut)
            })
        })

    })
})

/*
Listen for delete buttons and then get the id value of the donut from the button id.
*/
const resultsContainer = document.querySelector("#donutResults").addEventListener("click", (event) => {
    if (event.target.id.startsWith("deleteDonut--")) {
        // Extract donut id from the button's id attribute
        console.log(event, event.target.id.split("--")[1])
        document.querySelector("#donutResults").innerHTML = "";
        API.deleteDonut(event.target.id.split("--")[1])
            .then(response => {
                // 4. clear donut-container before adding new donut
                // 6. get all the donuts again
                API.getDonuts().then((allDonuts) => {
                    allDonuts.forEach(donut => {
                        // 7. needs to send donut to DOM
                        addDonutToDOM(donut)
                    })
                })
            })
    } else if (event.target.id.startsWith("editDonut")) {
        console.log("edit", event.target.id.split("--")[1])
        editForm(event.target.id.split("--")[1])
    }
})

document.querySelector("#saveDonut").addEventListener("click", (event) => {
    API.editDonut(document.querySelector("#donutId").value)
    .then(response => {
        console.log("response", response);
        document.querySelector("#donutName").value = "";
        document.querySelector("#donutResults").innerHTML = "";
        API.getDonuts().then((allDonuts) => {
            allDonuts.forEach(donut => {
                // 7. needs to send donut to DOM
                addDonutToDOM(donut)
            })
        })
    })
})

















