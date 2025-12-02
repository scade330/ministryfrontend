import React, { useEffect, useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PatientDialogForm from "../../components/patient/PatientDialogForm";
import { getAllPatients, deletePatient } from "../../lib/patientApi";

// Helper Icons
const EditIcon = () => <span role="img" aria-label="edit">✏️</span>;
const DeleteIcon = () => <span role="img" aria-label="delete">🗑️</span>;

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

// Expanded patient details row
const PatientDetailsRow = ({ patient }) => (
  <tr className="bg-gray-50 border-t border-b border-gray-200">
    <td colSpan="7" className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        {[
          ["Address", patient.address],
          ["Medical History", patient.medicalHistory],
          ["Current Medications", patient.currentMedications],
          ["Allergies", patient.allergies],
          ["Physical Exam", patient.physicalExam],
          ["Lab Results", patient.labResults],
          ["Diagnosis", patient.diagnosis],
          ["Treatment Plan", patient.treatmentPlan],
          ["Next Appointment", patient.nextAppointment ? formatDate(patient.nextAppointment) : "None"],
          ["Reason for Visit", patient.reason],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col">
            <span className="font-semibold text-gray-700">{label}:</span>
            <span className="text-gray-600 truncate">{value || "N/A"}</span>
          </div>
        ))}
      </div>
    </td>
  </tr>
);

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const navigate = useNavigate();

  const loadPatients = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllPatients();
      const patientData = Array.isArray(response) ? response : response?.patients || [];
      setPatients(patientData);
    } catch (err) {
      console.error("Failed to load patients:", err);
      toast.error("Failed to load patient data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      await deletePatient(id);
      toast.success("Patient deleted successfully!");
      loadPatients();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Deletion failed.");
    }
  };

  const toggleRow = (id) => setExpandedRow(expandedRow === id ? null : id);

  const filteredPatients = useMemo(() => {
    return patients.filter((p) =>
      `${p.firstName} ${p.lastName} ${p.phone} ${p.diagnosis}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [patients, search]);

  return (
    <div className="bg-white rounded-xl shadow-2xl border overflow-hidden p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">🏥 Patient Directory</h1>
        <button
          onClick={() => navigate("/create")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add Patient
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name, phone, or diagnosis..."
        className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="max-h-[70vh] overflow-y-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="bg-blue-50 text-gray-600 uppercase text-sm sticky top-0 z-10 shadow-md">
            <tr>
              <th className="p-3 border-b border-gray-200">#</th>
              <th className="p-3 border-b border-gray-200">Name</th>
              <th className="p-3 border-b border-gray-200">Age</th>
              <th className="p-3 border-b border-gray-200">Gender</th>
              <th className="p-3 border-b border-gray-200">Phone</th>
              <th className="p-3 border-b border-gray-200 text-center">Details</th>
              <th className="p-3 border-b border-gray-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="p-5 text-center text-blue-500 font-medium">
                  Loading patients...
                </td>
              </tr>
            )}

            {!loading && filteredPatients.length === 0 && (
              <tr>
                <td colSpan={7} className="p-5 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}

            {!loading &&
              filteredPatients.map((p, index) => (
                <React.Fragment key={p._id}>
                  <tr
                    className="hover:bg-gray-50 transition border-b border-gray-100 cursor-pointer"
                    onClick={() => toggleRow(p._id)}
                  >
                    <td className="p-3 text-sm font-medium text-gray-500">{index + 1}</td>
                    <td className="p-3 font-medium">{p.firstName} {p.lastName}</td>
                    <td className="p-3 text-sm">{p.age}</td>
                    <td className="p-3 text-sm">{p.gender}</td>
                    <td className="p-3">{p.phone}</td>
                    <td className="p-3 text-center">
                      <button className="text-blue-600 hover:text-blue-800 p-1 rounded">
                        {expandedRow === p._id ? "▲ Hide" : "▼ Show"}
                      </button>
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <PatientDialogForm
                        patientToEdit={p}
                        buttonTitle={<EditIcon />}
                        onSuccess={loadPatients}
                        className="text-yellow-600 hover:text-yellow-800 p-1 rounded"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(p._id);
                        }}
                        className="text-red-600 hover:text-red-800 p-1 rounded"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>

                  {expandedRow === p._id && <PatientDetailsRow patient={p} />}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
