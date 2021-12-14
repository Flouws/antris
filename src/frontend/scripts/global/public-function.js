/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function dayConverter(day) {
  switch (day) {
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
    case 7:
      return ('Minggu');
  }
}

function appendPages({pages, lastPageText}) {
  pages.forEach((page) => {
    $('#pageBar').append(`<a href="${page.link}">${page.text}</a>`);
    $('#pageBar').append(' <img src="./images/icons8-right-20.png" alt="arrow"/> ');
  });
  $('#pageBar').append(lastPageText);
}

export {dayConverter, appendPages};
