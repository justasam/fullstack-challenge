const genUrl = (str: string) => `http://localhost:3000/${str}`;

export const getAllCakes = async () => {
  const res = await fetch(genUrl("cakes"));
  if (!res.ok) {
    return {
      error: { text: res.statusText, code: res.status }
    };
  }
  const resJSON = await res.json();
  return resJSON;
};
