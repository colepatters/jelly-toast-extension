console.log("Jelly - For Toast is loaded!");

let table = document.querySelector("table#bulk-edit-table");
addGUIDTableCol();
// addGuidColToDropdown();

function handleTableUpdate(mutationList, observer) {
  // console.log("mutations:", mutationList);
  for (const mutation of mutationList) {
    if (mutation.type === "childList" && mutation.addedNodes) {
      for (const addedNode of mutation.addedNodes.values()) {
        if (addedNode.nodeType !== 1) continue; // isn't an HTML element
        if (addedNode.nodeName !== "TR") continue;
        if (addedNode.className.includes("loading")) continue;
        if (addedNode.className.includes("divider")) continue;
        if (addedNode.className.includes("guid")) continue;

        console.log("added node nodeName", addedNode.nodeName);

        let mlidColEl = addedNode.querySelector("td.masterIdString");

        let newChild = document.createElement("td");
        newChild.textContent = "null";
        newChild.classList = "guid";

        addedNode.insertBefore(newChild, mlidColEl);
      }
    }
  }

  // // insert columns in each tr
  // let tbody = document.querySelector("table tbody");

  // if (!tbody) {
  //   console.error("unable to locate table body");
  //   return;
  // }

  // for (const child of tbody.querySelectorAll("tr")) {
  //   // check if GUID column is already present
  //   if (child.querySelector("td.guid")) continue;

  //   let mlidColEl = child.querySelector("td.masterIdString");

  //   if (!mlidColEl) {
  //     console.error("unable to locate mlid column header");
  //     return;
  //   }

  //   let newChild = document.createElement("td");
  //   newChild.textContent = "null";
  //   newChild.classList = "guid";

  //   child.insertBefore(newChild, mlidColEl);
  // }
}

function addGUIDTableCol() {
  if (!table) {
    console.error("unable to locate table");
    return;
  }

  // the table columns load with the page, so we can edit it right away
  // insert column title in thead before th.masterIdString
  let thead = document.querySelector("table thead tr");

  if (!thead) {
    console.error("unable to locate table body");
    return;
  }

  let mlidHeaderColEl = document.querySelector(
    "table thead tr th.masterIdString",
  );

  if (!thead) {
    console.error("unable to locate mlid column header");
    return;
  }

  let guidHeader = document.createElement("th");
  guidHeader.textContent = "GUID";

  thead.insertBefore(guidHeader, mlidHeaderColEl);

  // the table data doesn't load with the page, so we attach a listener to the page to handle changes
  const tableObserver = new MutationObserver(handleTableUpdate);
  tableObserver.observe(table, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

function addGuidColToDropdown() {
  let dropdownEl = document.querySelector("div#show-hide");

  if (!dropdownEl) {
    console.error("couldn't locate show/hide dropdown el");
    return;
  }

  let dropdownListEl = dropdownEl.querySelector("ul");

  if (!dropdownListEl) {
    console.error("couldn't locate dropdown list el");
    return;
  }

  let newListEntryIcon = document.createElement("i");
  newListEntryIcon.classList = "glyphicon glyphicon-ok icon-ok check-mark";

  let newListEntryText = document.createElement("span");
  newListEntryText.classList = "text";
  newListEntryText.textContent = "GUID";

  let newListEntryContent = document.createElement("a");
  newListEntryContent.classList = "opt";
  newListEntryContent.tabIndex = 0;
  newListEntryContent.appendChild(newListEntryText);
  newListEntryContent.appendChild(newListEntryIcon);

  let newListEntry = document.createElement("li");
  newListEntry.classList = "selected rel=3.5";
  newListEntry.appendChild(newListEntryContent);

  newListEntry.addEventListener("click", handleGuidVisibilityOptionClick);

  let mlidListEntry = dropdownListEl.querySelector(`li[rel="3"]`);

  if (!mlidListEntry)
    console.error(
      "couldn't locate mlid list entry, inserting guid option at the end",
    );

  dropdownListEl.insertBefore(newListEntry, mlidListEntry);
}

function handleGuidVisibilityOptionClick(event) {}
