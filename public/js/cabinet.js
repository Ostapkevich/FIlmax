/*jshint esversion:8 */
async function userFeedback() {
    let d=new Date();
     let params = new URLSearchParams();
    params.set("feedback", document.getElementById("fback").value);
    params.set("date", `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`);
    let result = await fetch("/userFeedback", {
      method: "POST",
      body: params,
    }); 
    let data = await result.text();
    if (data === "1") {
      alert("Дякуємо за відгук");
    }
    document.getElementById("fback").value="";
  }
