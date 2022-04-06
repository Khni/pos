//const { isEmpty } = require("./is-empty");
import { isEmptyBindingElement } from "typescript";
import validator from "validator";

class RegisterValidator {
  validateErrors: { name: string; msg: string }[];
  errors: {
    email?: string;
    password?: string | number;
    confrimPassword?: string | number;
  };
  constructor(
    public email: string,
    public password: string,
    public confirmPassword: string | number
  ) {
    this.errors = {};
    this.validateErrors = [];
  }

  validate() {
    if (validator.isEmail(this.email)) {
      this.errors.email = "error";
    }
    if (validator.isLength(this.password, { min: 8 })) {
      this.errors.password = "";
    }
    if (this.confirmPassword !== this.password) {
      this.errors.confrimPassword = "password is not much";
    }

    return {
      errors: this.errors,
      isValid: Object.keys(this.errors).length === 0 ? true : false,
    };
  }
}

let register = new RegisterValidator("sdfsdf", "dsff", "ddd");

console.log(register.validate());
