import { Cake } from "./interfaces";

const genUrl = (str: string) => `http://localhost:3000/${str}`;

export const getAllCakes = async () => {
  try {
    const res = await fetch(genUrl("cakes"));
    if (!res.ok) {
      return {
        error: { text: res.statusText, code: res.status }
      };
    }
    const resJSON = await res.json();
    return resJSON;
  } catch (error) {
    return {
      error: error.message
    };
  }
};

export const getCakeDetail = async (id: any) => {
  try {
    const res = await fetch(genUrl(`cakes/${id}`));
    if (!res.ok) {
      return {
        error: { text: res.statusText, code: res.status }
      };
    }
    const resJSON = await res.json();
    return resJSON;
  } catch (error) {
    return {
      error: error.message
    };
  }
};

export const addNewCake = async (cake: Cake) => {
  try {
    const res = await fetch(genUrl("cakes"), {
      method: "post",
      body: JSON.stringify(cake)
    });
    if (!res.ok) {
      return {
        error: { text: res.statusText, code: res.status }
      };
    }
    const resJSON = await res.json();
  } catch (error) {
    return {
      error: error.message
    };
  }
};

export const updateCake = async (cake: Cake) => {
  try {
    const res = await fetch(genUrl(`cakes/${id}`), {
      method: "put",
      body: JSON.stringify(cake)
    });
    if (!res.ok) {
      return {
        error: { text: res.statusText, code: res.status }
      };
    }
    const resJSON = await res.json();
  } catch (error) {
    return {
      error: error.message
    };
  }
};

export const deleteCake = async (id: any) => {
  try {
    const res = await fetch(genUrl(`cakes/${id}`), {
      method: "delete"
    });
    if (!res.ok) {
      return {
        error: { text: res.statusText, code: res.status }
      };
    }
    const resJSON = await res.json();
  } catch (error) {
    return {
      error: error.message
    };
  }
};
