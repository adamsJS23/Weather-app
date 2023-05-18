export async function fetchData(url) {
  try {
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) {
      throw new Error(`Something went wrong ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    
    throw err;
    return
  }
}
