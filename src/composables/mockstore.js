import axios from "axios";

async function addStore(newStore) {
  try {
    const response = await axios.post(`http://localhost:3000/store`, newStore);
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    console.log("Error adding JSON Data", error);
  }
}

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
  } catch (error) {
    console.log("Error deleting JSON Data", error);
  }
}

async function updateStore(itemID, updateStore) {
  try {
    const response = await axios.put(
      `http://localhost:3000/store/${itemID}`,
      updateStore
    );
    console.log("store updated");
    return response.data;
  } catch (error) {
    console.log("Error updating JSON Data", error);
  }
}

export { loadAndParseStoreJSON, deleteStore, addStore, updateStore };
