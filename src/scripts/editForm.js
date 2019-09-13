/*
Responsible for displaying data from database within input fields.
*/

import API from "./DataManager.js"

const editForm = (donutId) => {
    const hiddenDonutId = document.querySelector("#donutId")
    const editDonutName = document.querySelector("#donutName")

    API.getSingle(donutId)
    .then(response => {
        hiddenDonutId.value = donutId;
        editDonutName.value = response.name;
    })
}

export default editForm