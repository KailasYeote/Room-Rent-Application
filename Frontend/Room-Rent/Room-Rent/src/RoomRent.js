import axios from "axios";

// Your Spring Boot API base URL
const apiClient = axios.create({
    baseURL: "http://localhost:8080/Room/v1/sundari",
    timeout: 5000,
});

// ✅ Fetch all rooms (for HomePage.js)
export async function Loader() {
    try {
        // 1. CHANGED: Was apiClient.get("/")
        const response = await apiClient.get("");
        return response.data;
    } catch (error) {
        console.error("❌ Error loading rooms:", error);
        throw error;
    }
}

// ✅ Fetch room by ID (for ViewDetails.js and UpdateRoom.js)
export async function getRoomById(id) {
    try {
        const response = await apiClient.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`❌ Error fetching room with id ${id}:`, error);
        throw error;
    }
}

// ✅ Create a new room (for AddDetails.js)
export async function createRoom(formData) {
    try {
        // 2. CHANGED: Was apiClient.post("/")
        const response = await apiClient.post("", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 10000,
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error creating room:", error);
        throw error;
    }
}

// ✅ Delete room by ID (for HomePage.js)
export async function DeleteRoom(id) {
    try {
        const response = await apiClient.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`❌ Error deleting room with id ${id}:`, error.response?.data || error.message);
        throw error;
    }
}

// ✅ Update room by ID (for UpdateRoom.js)
export async function updateRoom(id, updateData) {
    try {
        const response = await apiClient.put(`/${id}`, updateData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error(`❌ Error updating room with id ${id}:`, error.response?.data || error.message);
        throw error;
    }
}