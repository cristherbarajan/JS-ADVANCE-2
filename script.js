let records = [];

let editIndex = -1;

window.onload = function () {

    loadFromLocalStorage();

    displayRecords();

};


document.getElementById("insertBtn").addEventListener(
    "click",
    insertRecord
);


function insertRecord() {

    const firstName =
        document.getElementById("firstName").value.trim();

    const middleName =
        document.getElementById("middleName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const age =
        document.getElementById("age").value.trim();

    if (
        firstName === "" ||
        middleName === "" ||
        lastName === "" ||
        age === ""
    ) {

        alert("Please complete all fields.");

        return;
    }

    const newRecord = {

        firstName: firstName,

        middleName: middleName,

        lastName: lastName,

        age: Number(age)

    };

    if (editIndex !== -1) {

        records[editIndex] = newRecord;

        editIndex = -1;

    }

    else {

        records.push(newRecord);

    }


    displayRecords();

    clearInputs();

}


function displayRecords() {

    const table =
        document.getElementById("recordTable");

    table.innerHTML = "";

    records.forEach(function (record, index) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${escapeHTML(record.firstName)}</td>

            <td>${escapeHTML(record.middleName)}</td>

            <td>${escapeHTML(record.lastName)}</td>

            <td>${record.age}</td>

            <td>

                <button onclick="deleteRecord(${index})">
                    Delete
                </button>

                <button onclick="editRecord(${index})">
                    Edit
                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


function deleteRecord(index) {

    const confirmation = confirm(
        "Are you sure you want to delete this record?"
    );


    if (confirmation) {

        records.splice(index, 1);

        displayRecords();

        saveRecords();

    }

}

function editRecord(index) {

    const record = records[index];

    document.getElementById("firstName").value =
        record.firstName;

    document.getElementById("middleName").value =
        record.middleName;

    document.getElementById("lastName").value =
        record.lastName;

    document.getElementById("age").value =
        record.age;

    editIndex = index;

    document.getElementById("firstName").focus();

}


document.getElementById("clearBtn").addEventListener(
    "click",
    clearInputs
);


function clearInputs() {

    document.getElementById("firstName").value = "";

    document.getElementById("middleName").value = "";

    document.getElementById("lastName").value = "";

    document.getElementById("age").value = "";


    editIndex = -1;

}

document.getElementById("clearRecordsBtn").addEventListener(
    "click",
    clearRecords
);


function clearRecords() {

    if (records.length === 0) {

        return;

    }


    const confirmation = confirm(
        "Are you sure you want to clear all records?"
    );


    if (confirmation) {

        records = [];

        displayRecords();

        localStorage.removeItem("javascriptRecords");

    }

}

document.getElementById("sortField").addEventListener(
    "change",
    sortRecords
);


document.getElementById("sortOrder").addEventListener(
    "change",
    sortRecords
);


function sortRecords() {

    const field =
        document.getElementById("sortField").value;


    const order =
        document.getElementById("sortOrder").value;

    if (field === "" || order === "") {

        return;

    }


    records.sort(function (a, b) {

        let valueA = a[field];

        let valueB = b[field];

        if (typeof valueA === "string") {

            valueA = valueA.toLowerCase();

            valueB = valueB.toLowerCase();

        }


        if (valueA < valueB) {

            return order === "asc" ? -1 : 1;

        }


        if (valueA > valueB) {

            return order === "asc" ? 1 : -1;

        }


        return 0;

    });


    displayRecords();

}

document.getElementById("saveBtn").addEventListener(
    "click",
    saveToLocalStorage
);


function saveToLocalStorage() {

    localStorage.setItem(
        "javascriptRecords",
        JSON.stringify(records)
    );


    alert("Records saved to Local Storage.");

}


function saveRecords() {

    localStorage.setItem(
        "javascriptRecords",
        JSON.stringify(records)
    );

}

function loadFromLocalStorage() {

    const savedRecords =
        localStorage.getItem("javascriptRecords");


    if (savedRecords) {

        try {

            records = JSON.parse(savedRecords);

        }

        catch (error) {

            records = [];

        }

    }

}


function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
