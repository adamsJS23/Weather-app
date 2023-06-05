import { TIME_BEFORE_REJECT } from "./config.js";

const wait = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Server take too much time to response");
    }, TIME_BEFORE_REJECT);
  });
};

export async function fetchData(url) {
  try {
    const response = await Promise.race([fetch(url), wait()]);
    // const response = await fetch(url);
    if (!response.ok) {
      throw `Something went wrong ${response.status} ${response.statusText}`;
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}
