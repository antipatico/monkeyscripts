// ==UserScript==
// @name        FAMAIE
// @namespace   Violentmonkey Scripts
// @match       http://www.amaie-energia.it/IT/index.php?pag=riepilogo-vendite*
// @match       http://amaie-energia.it/IT/index.php?pag=riepilogo-vendite*
// @grant       none
// @version     1.1
// @author      antipatico
// @homepageURL https://github.com/antipatico/monkeyscripts
// @downloadURL https://raw.githubusercontent.com/antipatico/monkeyscripts/main/FAMAIE.js
// @description 1/8/2023, 2:59:11 PM
// ==/UserScript==

function tableInvertItems() {
  let tableBody = document.querySelector("table tbody");
  let newRows = Array.prototype.slice.call(tableBody.querySelectorAll("tr"));
  let outHtml = "";
  newRows = [ newRows[0] ].concat(newRows.slice(1).reverse());
  newRows.forEach((v, i) => {
    outHtml += v.outerHTML;
  });
  tableBody.innerHTML = outHtml;
  let dateCol = tableBody.firstChild.firstElementChild;
  dateCol.onclick = tableInvertItems;
  let direction = (dateCol.textContent.slice(-1) == "↓")? "↑" : "↓";
  dateCol.textContent = dateCol.textContent.slice(0,-1) + direction;
}


(() => {
  /* On document ready handler */

  // Our variables
  let items = [];
  let totalNet = 0;
  let table = document.querySelector("table");

  // Table parsing
  if (table === null) {
    console.log("[FAMAIE]: table not found, aborting");
    return;
  }
  let rows = Array.from(table.firstChild.children);
  rows.forEach((v,i) => {
    if(i == 0) {
      return;
    }
    let amount = parseInt(v.children[2].innerHTML);
    let priceGross = parseFloat(v.children[3].innerHTML.replace(/\./g, "").replace(/\,/g, "."));
    let priceNet = parseFloat((priceGross*0.9).toFixed(4));
    let valueNet = parseFloat((priceNet * amount).toFixed(2));
    totalNet += valueNet;
    items.push([amount, priceGross, priceNet, valueNet]);
  });

  // Table editing, add two columns (priceNet and valueNet)
  rows.forEach((v,i) => {
    let itemPriceNet;
    let itemValueNet;
    if(i == 0) {
      itemPriceNet = document.createElement("th");
      itemValueNet = document.createElement("th");
      itemPriceNet.textContent = "Prezzo Netto";
      itemValueNet.textContent = "Valore Netto";
      itemValueNet.setAttribute("width", "60");
    } else {
      itemPriceNet = document.createElement("td");
      itemValueNet = document.createElement("td");
      itemPriceNet.setAttribute("align", "right");
      itemValueNet.setAttribute("align", "right");
      itemPriceNet.textContent = items[i-1][2].toLocaleString("it-IT", { minimumFractionDigits: 4, maximumFractionDigits: 4});
      itemValueNet.textContent = items[i-1][3].toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
    v.appendChild(itemPriceNet);
    v.appendChild(itemValueNet);
  });

  // Add net total to the page output
  let totalNetString = totalNet.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2});
  table.insertAdjacentHTML("afterend", "<p align='center'><b>Totale Netto € : " + totalNetString + "</b></p>");

  // Add clicking on "Data" will revert order of items in table
  let dateCol = table.firstChild.firstChild.firstElementChild;
  dateCol.style.cursor = "pointer";
  dateCol.style.color = "red";
  dateCol.style.userSelect = "none";
  dateCol.textContent += " ↓"; // ↑
  dateCol.onclick = tableInvertItems;

})();
