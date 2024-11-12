/* eslint-disable react/prop-types */

const StatusToggle = ({ status, onChange }) => (
  <button onClick={onChange}>
    {status === "Active" ? "Deactivate" : "Activate"}
  </button>
);

export default StatusToggle;
