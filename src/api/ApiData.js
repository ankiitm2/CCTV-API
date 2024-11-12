/* eslint-disable no-unused-vars */
import axios from "axios";

const BASE_URL = "https://api-app-staging.wobot.ai/app/v1";

export const fetchCameras = async () => {
  const response = await axios.get(`${BASE_URL}/fetch/cameras`, {
    headers: { Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy" },
  });
  console.log("data: ", response.data);
  return response.data.data;
};

export const updateCameraStatus = async (cameraId, status) => {
  try {
    const response = await axios.post(
      "https://api-app-staging.wobot.ai/app/v1/update/camera/status",
      {
        cameraId,
        status,
      }
    );
    console.log("Camera status updated:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error; // Rethrow the error to handle it in the calling function if needed
  }
};

export const deleteCamera = async (id) => {
  // Implement delete functionality if API allows
};
