const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const filterItem = document.querySelector(".filter");
const delAllBtn = document.getElementById("clear");
const editBtn = document.getElementById("editBtn");
const addBtn = document.getElementById("addBtn");
//filtering
function filtering() {
  Array.from(itemList.children).forEach((li) => {
    if (li.innerText.toLowerCase().includes(itemFilter.value)) {
      li.style.display = "inherit";
    } else {
      li.style.display = "none";
    }
  });

  console.log(Array.from(itemList.children));
}

itemFilter.addEventListener("input", filtering);

//
function populateUl(li = itemInput.value) {
  //Create Elements and Assign Classes
  const newEl = document.createElement("li");
  const newBtn = document.createElement("button");
  const newIdk = document.createElement("i");
  newBtn.className = "remove-item btn-link text-red";
  newIdk.className = "fa-solid fa-xmark";
  newEl.className = "liElement";
  //
  newEl.innerText = li;

  newBtn.appendChild(newIdk);
  newEl.appendChild(newBtn);
  itemList.appendChild(newEl);
  itemInput.value = "";
}

function addItem(e) {
  e.preventDefault();
  let equal = false
  if(JSON.parse(localStorage.getItem("item"))){JSON.parse(localStorage.getItem("item")).map((element) => {
    if ((element === itemInput.value)) {
      equal = true
    }
  })}
  if (itemInput.value === "") {
    alert("please add item ! !");
    return;
  } else if (equal) {alert('Item already exist !')
  } else {
    // local storage adding
    let item = [];
    if (localStorage.getItem("item")) {
      item = JSON.parse(localStorage.getItem("item"));
    }
    item.push(itemInput.value);
    localStorage.setItem("item", JSON.stringify(item));

    populateUl();
  }
  checkUi();
}
itemForm.addEventListener("submit", addItem);

function delEditFunction(e) {
  if (e.target.classList.contains("fa-xmark")) {
    e.target.parentElement.parentElement.remove();
    console.log(e.target.parentElement.parentElement.innerText);

    const item = JSON.parse(localStorage.getItem("item"));
    item.forEach((element, i) => {
      if (element === e.target.parentElement.parentElement.innerText) {
        item.splice(i, 1);
        localStorage.setItem("item", JSON.stringify(item));
      }
    });

    checkUi();
  } else if (e.target.classList.contains("liElement")) {
    // we selected the li element
    itemInput.value = e.target.innerText;
    addBtn.style.display = "none";

    editBtn.style.display = "inline-block";
    editBtn.addEventListener("click", editing);
    function editing() {
      let equal = false
      if(JSON.parse(localStorage.getItem("item"))){JSON.parse(localStorage.getItem("item")).map((element) => {
        if ((element === itemInput.value)) {
          equal = true
        }
      })}
/////////////      
      if(equal){
        alert('item already exist ! cannot modify!')
        return
      }

      const item = JSON.parse(localStorage.getItem("item"));
      const index = item.indexOf(e.target.innerText);

      if (index > -1) {
        // Check if the element was found
        item[index] = itemInput.value;
      }

      localStorage.setItem("item", JSON.stringify(item));
      // Clear the list and repopulate
      itemList.innerHTML = ""; // Assuming 'ulElement' is your unordered list
      JSON.parse(localStorage.getItem("item")).forEach((li) => {
        populateUl(li);
      });
      editBtn.style.display = "none";
      addBtn.style.display = "block";
      itemInput.value = "";
      editBtn.removeEventListener("click", editing);
    }
  }
}
itemList.addEventListener("click", delEditFunction);

delAllBtn.addEventListener("click", () => {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  localStorage.clear();
  checkUi();
});

const checkUi = () => {
  if (itemList.firstElementChild) {
    delAllBtn.style.display = "inherit";
    filterItem.style.display = "inherit";
  } else {
    delAllBtn.style.display = "none";
    filterItem.style.display = "none";
  }
};
if (localStorage.getItem("item")) {
  JSON.parse(localStorage.getItem("item")).forEach((li) => {
    populateUl(li);
  });
}
checkUi();
