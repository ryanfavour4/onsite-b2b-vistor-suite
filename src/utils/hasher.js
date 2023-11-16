export const hasher = (input) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  return JSON.stringify(data);
};
