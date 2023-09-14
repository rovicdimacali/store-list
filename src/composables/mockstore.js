import axios from "axios";

async function addStore(newStore) {
  try {
    const response = await axios.post(
      `https://storelist-api.onrender.com/store`,
      newStore
    );
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    console.log("Error adding JSON Data", error);
  }
}

async function loadAndParseStoreJSON() {
  try {
    const response = await axios.get(
      "https://storelist-api.onrender.com/store"
    );
    return response.data;
  } catch (error) {
    console.log("Error loading JSON Data", error);
    return [];
  }
}

async function deleteStore(itemID) {
  try {
    const response = await axios.delete(
      `https://storelist-api.onrender.com/store/${itemID}`
    );
    return itemID;
  } catch (error) {
    console.log("Error deleting JSON Data", error);
  }
}

async function updateStore(itemID, updateStore) {
  try {
    const response = await axios.patch(
      `https://storelist-api.onrender.com/store/${itemID}`,
      updateStore
    );
    console.log("store updated");
    return response.data;
  } catch (error) {
    console.log("Error updating JSON Data", error);
  }
}

export { loadAndParseStoreJSON, deleteStore, addStore, updateStore };
