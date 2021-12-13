/* eslint-disable require-jsdoc */
function dayConverter(day) {
  switch (day) {
    case 0:
      return ('Minggu');
    case 1:
      return ('Senin');
    case 2:
      return ('Selasa');
    case 3:
      return ('Rabu');
    case 4:
      return ('Kamis');
    case 5:
      return ('Jumat');
    case 6:
      return ('Sabtu');
  }
}

export {dayConverter};
