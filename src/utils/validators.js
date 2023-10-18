import strings from '../i18n/strings';

const emailRegex =
  /^[a-z0-9_%+-]+(\.[a-z0-9_%+-]+)*@[a-z]+(\.[a-z]+)*\.[a-z]{2,}$/;

const passwordRegex = /^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{1,}$/;

const nameRegex = /^([a-zA-Z]{1,})+([a-zA-Z\s]{0,})+$/i;

const mobileRegex = /^[6-9][0-9]{9}$/;

// regex for atm card number
const atmCardNumberRegex = /^[0-9]{16}$/;

// regex for cvv
const cvvRegex = /^[0-9]{3}$/;

// Name validation
const validateName = name => {
  if (name) {
    return nameRegex.test(name)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.plsEnterValidName,
        };
  } else {
    return {
      status: false,
      msg: '',
    };
  }
};

// ATM card number validation
const validateCardNumber = atmCardNumber => {
  if (!atmCardNumber) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return atmCardNumberRegex.test(atmCardNumber)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validCardNumber,
        };
  }
};

// CVV validation
const validateCvv = cvv => {
  if (!cvv) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return cvvRegex.test(cvv)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validCvv,
        };
  }
};

//Email validation
const validateEmail = email => {
  if (!email) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return emailRegex.test(email)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validEmail,
        };
  }
};

//Password validation
const validatePassword = (pass, isConfrimPass, password) => {
  if (!pass) {
    return {
      status: false,
      msg: strings.plsEnterPassword,
    };
  } else if (pass.length < 8) {
    return {
      status: false,
      msg: strings.validatePassword,
    };
  } else {
    if (passwordRegex.test(pass)) {
      if (isConfrimPass && password != pass) {
        return {
          status: false,
          msg: strings.confirmPassValidString,
        };
      }
      return {status: true, msg: ''};
    } else {
      return {
        status: false,
        msg: strings.validatePassword,
      };
    }
  }
};

// confirm password validation
const validateConfirmPassword = (pass, password) => {
  if (!pass) {
    return {
      status: false,
      msg: strings.plsEnterPassword,
    };
  } else if (pass.length < 8) {
    return {
      status: false,
      msg: strings.validatePassword,
    };
  } else {
    if (passwordRegex.test(pass)) {
      if (password != pass) {
        return {
          status: false,
          msg: strings.confirmPassValidString,
        };
      }
      return {status: true, msg: ''};
    } else {
      return {
        status: false,
        msg: strings.validatePassword,
      };
    }
  }
};

// Mobile number validation
const validateMobileNumber = mobileNumber => {
  if (mobileNumber)
    return mobileRegex.test(mobileNumber)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validMobileNumber,
        };
  else {
    return {
      status: true,
      msg: '',
    };
  }
};

export {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateCardNumber,
  validateCvv,
  validateMobileNumber,
};
