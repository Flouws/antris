/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function checkError({register, user, rePassword, emailInvalidId, nameInvalidId, phoneInvalidId,
  passwordInvalidId, rePasswordInvalidId, cityInvalidId, zipInvalidId, addressInvalidId}) {
  const status = [];
  if (register === true) {
    status[0] = checkEmail({email: user.email, emailInvalidId});
    status[1] = checkName({name: user.name, nameInvalidId});
    status[2] = checkPassword({password: user.password, passwordInvalidId});
    status[3] = checkRePassword({password: user.password, rePassword: rePassword, rePasswordInvalidId});
    status[4] = checkAddress({user, cityInvalidId, zipInvalidId, addressInvalidId});
    status[5] = checkPhone({phone: user.phone, phoneInvalidId});
  } else {
    status[0] = checkEmail({email: user.email, emailInvalidId});
    status[1] = checkPassword({password: user.password, passwordInvalidId});
  }
  if (status.indexOf(false) !== -1) { // check if there is false in array
    return false;
  } else {
    return true;
  }
}

function checkEmail({email, emailInvalidId}) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    $(emailInvalidId).hide();
    return true;
  } else {
    $(emailInvalidId).html('Please enter a valid email');
    $(emailInvalidId).show();
    return false;
  }
}

function checkName({name, nameInvalidId}) {
  if (name !== '') {
    $(nameInvalidId).hide();
    return true;
  } else {
    $(nameInvalidId).html('Please enter your name');
    $(nameInvalidId).show();
    return false;
  }
}

function checkPhone({phone, phoneInvalidId}) {
  if (phone !== '') {
    $(phoneInvalidId).hide();
    return true;
  } else {
    $(phoneInvalidId).html('Please enter your phone number');
    $(phoneInvalidId).show();
    return false;
  }
}

function checkPassword({password, passwordInvalidId}) {
  if (password.length > 7) {
    $(passwordInvalidId).hide();
    return true;
  } else {
    $(passwordInvalidId).html('Password must be atleast 8 characters');
    $(passwordInvalidId).show();
    return false;
  }
}

function checkRePassword({password, rePassword, rePasswordInvalidId}) {
  if (password === rePassword) {
    $(rePasswordInvalidId).hide();
    return true;
  } else {
    $(rePasswordInvalidId).html('Password must be the same');
    $(rePasswordInvalidId).show();
    return false;
  }
}

function checkAddress({user, cityInvalidId, zipInvalidId, addressInvalidId}) {
  const address = [];
  const status = [];
  user.address.split(/\s*,\s*/).forEach((data) => {
    address.push(data);
  });

  if (address[0] !== '') {
    $(addressInvalidId).hide();
    status.push(true);
  } else {
    $(addressInvalidId).html('Please a valid address');
    $(addressInvalidId).show();
    status.push(false);
  }

  if (address[1] !== '') {
    $(cityInvalidId).hide();
    status.push(true);
  } else {
    $(cityInvalidId).html('Please a valid city');
    $(cityInvalidId).show();
    status.push(false);
  }

  if (address[2] !== '') {
    $(zipInvalidId).hide();
    status.push(true);
  } else {
    $(zipInvalidId).html('Please a valid zip code');
    $(zipInvalidId).show();
    status.push(false);
  }
  if (status.indexOf(false) !== -1) { // check if there is false in array
    return false;
  } else {
    return true;
  }
}

// not used
function checkMakeAppointmentModalTimeInvalid(invalidId) {
  if (null) {
    $(invalidId).hide();
    return true;
  } else {
    $(invalidId).html('This polyclinic has no available appointment');
    $(invalidId).show();
    return false;
  }
}

export {checkError, checkMakeAppointmentModalTimeInvalid};
