import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Sample Somaliland clinics
  const clinics = [
    { _id: "1", name: "Hargeisa Group Hospital", location: "Hargeisa, Woqooyi Galbeed" },
    { _id: "2", name: "Berbera Regional Hospital", location: "Berbera, Woqooyi Galbeed" },
    { _id: "3", name: "Burao General Hospital", location: "Burao, Togdheer" },
    { _id: "4", name: "Erigavo Hospital", location: "Erigavo, Sanaag" },
    { _id: "5", name: "Las Anod Hospital", location: "Las Anod, Sool" },
  ];

  const filteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700">
          Ministry of Health - Somaliland
        </h1>
        <p className="text-lg text-gray-600">
          Overview of National Clinics
        </p>
      </header>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search clinics..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Clinics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClinics.map((clinic) => (
          <div
            key={clinic._id}
            className="bg-white rounded-xl shadow p-5 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/clinic/${clinic._id}`)}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {clinic.name}
            </h2>
            <p className="text-gray-600 mt-2">
              Location: {clinic.location}
            </p>

            <button
              onClick={() => navigate(`/clinic/${clinic._id}`)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              View Clinic
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredClinics.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No clinics found.
        </p>
      )}
    </div>
  );
}
