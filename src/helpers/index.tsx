export const convertPayloadToFormData = (payload: any) => {
  const formData = new FormData();
  for (const key in payload) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      // eslint-disable-next-line
      const value: string = payload[key];
      formData.append(key, value);
    }
  }
  return formData;
};

export const generateSlug = (inputString: string) => {
  return inputString
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-/, "")
    .replace(/-$/, "");
};
