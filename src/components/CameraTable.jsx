/* eslint-disable react/prop-types */
import { FaBan } from "react-icons/fa";
import { IoMdCloudOutline } from "react-icons/io";
import { GrStorage } from "react-icons/gr";

const CameraTable = ({
  cameras,
  selectedCameras,
  onSelectCamera,
  onDelete,
  onSelectAll,
}) => {
  // eslint-disable-next-line no-unused-vars
  const calculateProgressOffset = (value) => {
    const maxProgress = 80;
    return 113 - (113 * maxProgress) / 100;
  };

  return (
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
                <div className="d-flex gap-4">
                  <div className="d-flex align-items-center customGap">
                    <IoMdCloudOutline />
                    <div className="progress-container">
                      <svg
                        className="progress-circle"
                        width="25"
                        height="25"
                        viewBox="0 0 40 40"
                      >
                        <circle
                          className="progress-circle-bg"
                          cx="20"
                          cy="20"
                          r="18"
                        ></circle>
                        <circle
                          className="progress-circle-fg"
                          cx="20"
                          cy="20"
                          r="18"
                          style={{
                            strokeDashoffset: calculateProgressOffset(
                              camera.health.cloud
                            ),
                          }}
                        ></circle>
                      </svg>
                      <span>{camera.health.cloud}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center customGap ">
                    <GrStorage />
                    <div className="progress-container green">
                      <svg
                        className="progress-circle"
                        width="25"
                        height="25"
                        viewBox="0 0 40 40"
                      >
                        <circle
                          className="progress-circle-bg"
                          cx="20"
                          cy="20"
                          r="18"
                        ></circle>
                        <circle
                          className="progress-circle-fg"
                          cx="20"
                          cy="20"
                          r="18"
                          style={{
                            strokeDashoffset: calculateProgressOffset(
                              camera.health.device
                            ),
                          }}
                        ></circle>
                      </svg>
                      <span>{camera.health.device}</span>
                    </div>
                  </div>
                </div>
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
};

export default CameraTable;
