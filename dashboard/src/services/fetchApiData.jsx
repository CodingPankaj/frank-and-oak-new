import axios from "axios";

export const fetchApiData = async (url) => {
  try {
    const res = await axios.get(url, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
