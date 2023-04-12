import axios from "axios";

export default async function ArtistInfo (data) {
  const url = `https://api.spotify.com/v1/artists/${data}`;
  const auth = 'BQCRMaexsSY6GQd3ZRPgQcnkndHeyZNvVr4gmpXGUuAmF-wQo6PbJ8pMB0C_pruBmMvCzZCSeDit2ew1Kz3w6waOMkeQ9wne7zw_I3uUGjh3NXFiaab_';
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
