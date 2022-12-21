/*jshint esversion:8 */
let filmname = "";
let d1 = "";
let d2 = "";
let row = "";
let place = "";

let trcollection = document.getElementById("tbody").getElementsByTagName("tr");
function print() {
  for (let elem of trcollection) {
    if (elem.getElementsByTagName("input")[0].checked) {
      filmname = elem.getElementsByTagName("td")[0].innerText;
      d1 = elem.getElementsByTagName("td")[1].innerText;
      d2 = elem.getElementsByTagName("td")[2].innerText;
      place = elem.getElementsByTagName("td")[3].innerText;

      if (place <= 5) {
        row = 1;
      } else if (place <= 12) {
        row = 2;
      } else if (place <= 19) {
        row = 3;
      } else {
        row = 4;
      }
      var docInfo = {
        pageSize: { width: 300, height: 140 },
        pageMargins: [10, 10],
        content: [
          {
            width: 80,
            columns: [
              [
                {
                  image:
                    "data:image/jpeg;base64,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",
                },
                {
                  qr: `${d1}${d2}${place} `,
                  fit: "80",
                  margin: [7, 25],
                },
              ],
              {
                width: 200,
                columns: [
                  [
                    {
                      margin: [15, 0],
                      fontSize: 18,
                      italics: true,
                      text: `${filmname}`,
                    },
                    { margin: [30, 0], text: `\nДата : ${d1}` },
                    { margin: [30, 0], text: `Початок : ${d2}` },
                    { margin: [30, 0], text: `Ряд :  ${row}` },
                    { margin: [30, 0], text: `Місто : ${place}` },
                  ],
                ],
              },
            ],
          },
        ],
      };
      const pdfDocGenerator = pdfMake.createPdf(docInfo).download("name.pdf");
      return;
    }
  }
}
