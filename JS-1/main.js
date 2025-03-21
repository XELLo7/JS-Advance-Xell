const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const sortOptions = document.getElementById("sortOptions");
const sortLabel = document.getElementById("sortLabel");

const tbl = document.getElementById("tblNumbers");

let total = 0;
let numbersArr = new Array();

function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value;

    let num;
    let regex = /^[0-9]+$/;

    if (txtNumber.match(regex)) {
        num = parseInt(txtNumber);
        numbersArr.push(num);
        console.log(numbersArr);
        document.getElementById("txtNum").value = "";
        iterateNumbers();

        btn3.style.display = "inline";
        btn4.style.display = "inline";
        btn5.style.display = "inline";
        sortLabel.style.display = "inline";
        sortOptions.style.display = "inline";
    } else {
        alert("Please input a positive number");
        document.getElementById("txtNum").value = "";
        return;
    }
}

btn1.addEventListener("click", () => {
    insertNumber();
});

document.getElementById("txtNum").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;

    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    btn3.style.display = "none";
    btn4.style.display = "none";
    btn5.style.display = "none";
    sortLabel.style.display = "none";
    sortOptions.style.display = "none";
});

btn4.addEventListener("click", () => {
    const trTotal = document.createElement("tr");
    const tdTotalLabel = document.createElement("td");
    const tdTotalValue = document.createElement("td");

    trTotal.style.height = "30px";

    tdTotalLabel.innerHTML = "<strong>TOTAL</strong>";
    tdTotalValue.style.textDecoration = "underline";
    tdTotalValue.innerHTML = total;

    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);
    tbl.appendChild(trTotal);
});

btn5.addEventListener("click", () => {
    if (numbersArr.length > 0) {
        const highest = Math.max(...numbersArr);
        const lowest = Math.min(...numbersArr);

        const trHighest = document.createElement("tr");
        const tdHighest = document.createElement("td");
        tdHighest.colSpan = 4;
        tdHighest.innerHTML = `<strong>HIGHEST</strong> <u>${highest}</u>`;
        tdHighest.style.textTransform = "uppercase";
        trHighest.appendChild(tdHighest);
        tbl.appendChild(trHighest);

        const trLowest = document.createElement("tr");
        const tdLowest = document.createElement("td");
        tdLowest.colSpan = 4;
        tdLowest.innerHTML = `<strong>LOWEST</strong> <u>${lowest}</u>`;
        tdLowest.style.textTransform = "uppercase";
        trLowest.appendChild(tdLowest);
        tbl.appendChild(trLowest);
    } else {
        alert("No numbers have been entered.");
    }
});

sortOptions.addEventListener("change", () => {
    if (sortOptions.value === "ascending") {
        numbersArr.sort((a, b) => a - b);
    } else if (sortOptions.value === "descending") {
        numbersArr.sort((a, b) => b - a);
    }
    iterateNumbers();
});

function deleteNumber(i) {
    numbersArr.splice(i, 1);
    iterateNumbers();
    console.log(numbersArr);
}

function editNumber(i) {
    const editTxt = prompt("Enter new number: ", numbersArr[i]);
    const regex = /^[0-9]+$/;

    if (editTxt == null || editTxt == "") {
        alert("You did not input a new value!");
    } else {
        if (editTxt.match(regex)) {
            numbersArr[i] = parseInt(editTxt);
            iterateNumbers();
            console.log(numbersArr);
        } else {
            alert("You did not input a valid number!");
        }
    }
}

function iterateNumbers() {
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if (numbersArr.length > 0) {
        total = 0;

        console.log(`Array Length: ${numbersArr.length}`);

        for (let i = 0; i < numbersArr.length; i++) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = numbersArr[i];

            td2.style.width = "70px";

            if (numbersArr[i] % 2 == 0) {
                td2.style.color = "green";
                td2.innerHTML = "EVEN";
            } else {
                td2.style.color = "blue";
                td2.innerHTML = "ODD";
            }

            btnDelete.setAttribute("onclick", `deleteNumber(${i})`);
            btnDelete.innerHTML = "Remove";

            btnEdit.setAttribute("onclick", `editNumber(${i})`);
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tbl.appendChild(tr);

            total += numbersArr[i];
            console.log(numbersArr[i]);
            console.log(`Total: ${total}`);
        }

        document.getElementById("btn4").style.display = "inline";
    } else {
        total = 0;
        document.getElementById("btn4").style.display = "none"; 
    }
}