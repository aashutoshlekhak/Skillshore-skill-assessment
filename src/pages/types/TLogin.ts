export type LoginField = {
  email: string;
  password: string;
};

export type LoginResponseSuccess = {
  message: string;
  token: string;
};

export type LoginResponseError = {
  message: string;
  errors: { email: string[] };
};
