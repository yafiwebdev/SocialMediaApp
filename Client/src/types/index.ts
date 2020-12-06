export enum FieldName {
  FIRSTNAME = 'firstname',
  LASTNAME = 'lastname',
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirm_password',
}
export interface IUser {
  firstname?: { value: string };
  lastname?: { value: string };
  username: { value: string; isRequired: boolean; isValid: boolean };
  email: { value: string; isRequired: boolean; isValid: boolean };
  password: { value: string; isRequired: boolean; isValid: boolean };
  confirm_password: { value: string; isRequired: boolean; isValid: boolean };
}

export interface IComments {
  commenter: string;
  comment: string;
}

export interface IPost {
  username: string;
  url: string;
  caption: string;
  interactions: [
    {
      likes: Array<string>;
      comments: Array<IComments>;
    }
  ];
}

export interface IUserFeed {
  username: string;
  email: string;
  post: Array<IPost>;
}

export interface ILoginUser {
  username: { value: string; isValid: boolean };
  password: { value: string; isValid: boolean };
}

export interface IErrorMessage {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export type TChangeHandler<T> = (
  event: React.ChangeEvent<HTMLInputElement>
) => void | T;

export type TValidateField = (value: string) => boolean;

export type THandleSubmit = (event: React.FormEvent<HTMLElement>) => void;

export type TIsFomValid<T> = (field: T) => boolean;
