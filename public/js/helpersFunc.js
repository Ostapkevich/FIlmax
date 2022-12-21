/*jshint esversion:8 */
function addZero(n) {
    return n > 9 ? n : "0" + n;
  }
  function func (from, to, places) {
    let i = 1;
    let str = "";
    for (let key in places) {
      if (i >= from && i <= to) {
        if (places[key] === 1) {
          str =
            str +`<a onclick="getPlace()" class="btn-small waves-effect waves-light " style="background-color:#80cbc4;" data-free="${places[key]}"; data-seat="${i}"><i class="material-icons left">airline_seat_recline_extra</i>${addZero(i)}</a>`;
        } else {
          str =str +`<a class=" btn-small disabled" data-free="3"  ><i class="material-icons left">airline_seat_recline_extra</i>${addZero(i)}</a>`;
        }
      }
      i++;
    }
    return str;
  }
module.exports= {func};