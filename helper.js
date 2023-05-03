export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return;
    const data = await response.json();
    return data
  } catch (err) {
    console.log("Impossible to fetch");
  }
}
