//const session = require("express-session");

/*jshint esversion: 8 */
function getPlace() {
  let elem = event.currentTarget;
  if (elem.getAttribute("data-free") == "1") {
    elem.style.background = "#009688";
    elem.setAttribute("data-free", 0);
  } else {
    elem.style.background = "#80cbc4  ";
    elem.setAttribute("data-free", '1');
  }
}

async function buyTicket() {
  
  try {
    let seats = [];
    const collection = fm.getElementsByTagName("a");
    for (let elem of collection) {
      if (elem.dataset.free == 0) {
        seats.push(elem.dataset.seat);
      }
    }
    const buyObj = {
      seats: seats,
      idRasp: document.getElementById("btnsub").getAttribute("data-idRasp"),
    };

    let r = await fetch("/buyticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(buyObj),
    });
    let result = await r.text();
    if (result === "0") {
      alert("Місця, які ви вибрали вже куплені іншими.");
      window.location.reload();
    } else {
      window.location.replace("/");
    }
  } catch (error) {
    alert(error);
  }
}
