const SERVER_URL = "https://backend.cnkav.com";
// const SERVER_URL = "http://127.0.0.1:8000";

export default function getFileById(id) {
  const url = `${SERVER_URL}/community/get-file/${id}`;
  return url;
}
