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

async function deleteStore(itemID) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/store/${itemID}`
    );
    return itemID;
  } catch {
    console.log("Error deleting JSON Data", error);
  }
}

export { loadAndParseStoreJSON, deleteStore };
