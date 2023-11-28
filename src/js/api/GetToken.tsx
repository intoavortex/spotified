import axios from "axios";

export default async function GetToken () {
  const url = `http://localhost:8888/access-token`;
  try {
    const res =  await axios.get(url);

    return res.data;
  } catch (err) {
    console.error(err);
  }
}
