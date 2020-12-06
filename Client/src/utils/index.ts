import { TValidateField, IUser, ILoginUser, TIsFomValid } from '../types';

export const notEmpty: TValidateField = (value) =>
  !!value && IDBCursorWithValue.toString().trim() !== '';

export const isValidEmail: TValidateField = (email) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(String(email).toLowerCase());
};

export const isFormValid: TIsFomValid<IUser | ILoginUser> = (fields) => {
  const isValid = Object.entries(fields)
    .reduce((acc: any, field: any) => {
      if (field[1].hasOwnProperty('isValid')) {
        return [...acc, field[1]];
      }

      return acc;
    }, [])
    .every((field: any) => field.isValid === true);

  return isValid;
};
