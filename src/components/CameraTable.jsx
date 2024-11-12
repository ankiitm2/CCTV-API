/* eslint-disable react/prop-types */
import { FaBan } from "react-icons/fa";

const CameraTable = ({
  cameras,
  selectedCameras,
  onSelectCamera,
  onDelete,
  onSelectAll,
}) => (
  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>
            <label className="container">
              <input
                type="checkbox"
                checked={selectedCameras.length === cameras.length}
                onChange={onSelectAll}
              />
              <div className="checkmark"></div>
            </label>
          </th>
          <th>Name</th>
          <th>Health</th>
          <th>Location</th>
          <th>Recorder</th>
          <th>Tasks</th>
          <th className="text-center">Status</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {cameras.map((camera) => (
          <tr key={camera.id}>
            <td>
              <label className="container">
                <input
                  type="checkbox"
                  checked={selectedCameras.includes(camera.id)}
                  onChange={() => onSelectCamera(camera.id)}
                />
                <div className="checkmark"></div>
              </label>
            </td>
            <td>
              <div className="d-flex">
                <span
                  className="status"
                  style={{
                    backgroundColor:
                      camera.current_status === "Online"
                        ? "green"
                        : camera.current_status === "Offline"
                        ? "red"
                        : "black",
                  }}
                ></span>
                {camera.name}
              </div>
            </td>
            <td>
              {camera.health.cloud} {camera.health.device}
            </td>
            <td>{camera.location}</td>
            <td>{camera.recorder || "N/A"}</td>
            <td>
              <div className="d-flex">{camera.tasks || "N/A"} Tasks</div>
            </td>
            <td className="text-center">
              <span
                className={
                  camera.status === "Active"
                    ? "green active"
                    : camera.status === "Inactive"
                    ? "inactive active"
                    : ""
                }
              >
                {camera.status}
              </span>
            </td>
            <td className="text-center">
              <button
                onClick={() => onDelete(camera.id)}
                disabled={!selectedCameras.includes(camera.id)}
              >
                <FaBan />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CameraTable;
