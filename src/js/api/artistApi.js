import axios from "axios";

export default async function ArtistInfo (data) {
  const url = `https://api.spotify.com/v1/artists/${data}`;
  const auth = 'BQAEi3-tR8sbzeZsC3G9VMW2P7ZcXeGmTp87_Ib_ZaddolWmX-4e5eB3DEVkLjhIMGS-JKAY2KmXi3ZogxhU5MTsnXX9wQ6Qjt4HmRwaaK5Huw7PIQs1';
  const token = `Bearer ${auth}`;

  try {
    const res =  await axios.get(url, {
      headers: {
        Authorization: token
      }
    });
  
    return res.data;
  } catch (err) {
    alert('tq');
  }
}
