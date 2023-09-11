import axios from "axios";

async function loadAndParseStoreJSON() {
  try {
    const response = await axios.get("http://localhost:3000/store");
    return response.data;
  } catch (error) {
    console.log("Error loading JSON Data", error);
    return [];
  }
}

export { loadAndParseStoreJSON };
