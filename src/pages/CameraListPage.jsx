import { useState, useEffect } from "react";
import CameraTable from "../components/CameraTable";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import { fetchCameras, deleteCamera } from "../api/ApiData";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineSignalCellularAlt } from "react-icons/md";

const CameraListPage = () => {
  const [cameras, setCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const camerasPerPage = 10;

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCameras();
      if (Array.isArray(data)) {
        setCameras(data);
        setFilteredCameras(data);
      } else {
        console.error("Expected an array but received:", data);
      }
    } catch (error) {
      console.error("Error fetching cameras:", error);
      setError(
        "Failder to load cameras. Please check your network connection and try gain."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectCamera = (id) => {
    setSelectedCameras((prev) =>
      prev.includes(id) ? prev.filter((camId) => camId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedCameras.length === cameras.length) {
      setSelectedCameras([]); // Deselect all if all are selected
    } else {
      setSelectedCameras(cameras.map((camera) => camera.id)); // Select all cameras
    }
  };

  const handleDeleteSelected = async () => {
    try {
      // Delete all selected cameras using API
      await Promise.all(selectedCameras.map((id) => deleteCamera(id)));

      // Remove deleted cameras from both cameras and filteredCameras states
      setCameras((prev) =>
        prev.filter((cam) => !selectedCameras.includes(cam.id))
      );
      setFilteredCameras((prev) =>
        prev.filter((cam) => !selectedCameras.includes(cam.id))
      );

      // Clear the selected cameras
      setSelectedCameras([]);
    } catch (error) {
      console.error("Error deleting cameras:", error);
    }
  };

  const handleSearch = (query) => {
    setFilteredCameras(
      cameras.filter((camera) =>
        camera.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleFilter = () => {
    let filtered = [...cameras];

    if (selectedLocation) {
      filtered = filtered.filter(
        (camera) =>
          camera.location.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter(
        (camera) => camera.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    setFilteredCameras(filtered);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedLocation, selectedStatus]);

  const paginatedCameras = Array.isArray(filteredCameras)
    ? filteredCameras.slice(
        (currentPage - 1) * camerasPerPage,
        currentPage * camerasPerPage
      )
    : [];

  // Get unique values for dropdowns
  const locations = Array.from(
    new Set(cameras.map((camera) => camera.location))
  );
  const statuses = Array.from(new Set(cameras.map((camera) => camera.status)));

  return (
    <div className="cameraPage">
      <div className="header">
        <div className="content">
          <h2>Cameras</h2>
          <p>Manage your cameras here.</p>
        </div>
        <SearchFilter onSearch={handleSearch} />
      </div>

      {loading ? (
        <p>Loading cameras...</p>
      ) : error ? (
        <div>
          <p>{error}</p>
          <button onClick={loadData}>Retry</button>
        </div>
      ) : (
        <>
          <div className="filter_box">
            <div className="location_box">
              {" "}
              <CiLocationOn />
              <select value={selectedLocation} onChange={handleLocationChange}>
                <option value="">Location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="status_box">
              <MdOutlineSignalCellularAlt />
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                style={{ marginLeft: "10px" }}
              >
                <option value="">Status</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <CameraTable
            cameras={paginatedCameras}
            onSelectCamera={handleSelectCamera}
            selectedCameras={selectedCameras}
            onDelete={handleDeleteSelected}
            onSelectAll={handleSelectAll}
          />
          <Pagination
            totalPages={Math.ceil(filteredCameras.length / camerasPerPage)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalItems={filteredCameras.length}
            itemsPerPage={camerasPerPage}
          />
          {/* Delete Selected Button */}
          <button
            onClick={handleDeleteSelected}
            disabled={selectedCameras.length === 0}
          >
            Delete Selected
          </button>
        </>
      )}
    </div>
  );
};

export default CameraListPage;
