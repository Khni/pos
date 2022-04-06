import { ValidationChain } from "express-validator";

export const List = {
  invalidEmail: {
    en: "Email is invalid",
    ar: "البريد الالكتروني غير صحيح",
  },
  invalidPassword: {
    en: "Password must be between 8 to 20 characters",
    ar: "الرقم السري يجب ان يكون بين 8 و 20 حرف",
  },
};

class MultiLang {
  constructor(public lang: "ar" | "en" | ValidationChain) {}
  ListAr = {
    invalidEmail: "البريد الالكتروني غير صحيح",
    invalidPassword: "الرقم السري يجب ان يكون بين 8 و 20 حرف",
  };
  ListEn = {
    invalidEmail: "Email is invalid",
    invalidPassword: "Password must be between 8 to 20 characters",
  };

  loadString() {
    switch (this.lang) {
      case "en":
        return this.ListEn;
        break;
      case "ar":
        return this.ListAr;
      default:
        break;
    }
  }
}

export { MultiLang };
