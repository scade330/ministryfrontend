import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

  /* ===== FACILITY SELECTION (POST-LOGIN LANDING) ===== */
  const buttons = [
    {
      value: "overall",
      title: "🌍 Overall",
      subtitle: "All Facilities (National Overview)",
      color: "from-slate-600 to-slate-800 hover:to-slate-900",
    },
    {
      value: "public",
      title: "🏥 Public Hospital",
      subtitle: "Government Health Facilities",
      color: "from-indigo-500 to-indigo-700 hover:to-indigo-800",
    },
    {
      value: "private",
      title: "🏨 Private Hospital",
      subtitle: "Private & NGO Facilities",
      color: "from-teal-500 to-teal-700 hover:to-teal-800",
    },
    {
      value: "mch",
      title: "👶 MCH",
      subtitle: "Maternal & Child Health",
      color: "from-pink-500 to-pink-700 hover:to-pink-800",
    },
  ];

  const handleFacilitySelect = (type) => {
    localStorage.setItem("facilityType", type);
    navigate("/dashboard");
  };

  /* ===== SIDEBAR LINK COMPONENT ===== */
  const NavLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg text-gray-300
                 hover:bg-indigo-700 hover:text-white transition group"
    >
      <span className="text-xl group-hover:scale-110 transition">
        {icon}
      </span>
      <span className="font-medium text-[15px]">{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* ===== MOBILE SIDEBAR TOGGLE ===== */}
      <button
        onClick={() => setOpenSidebar(true)}
        className="md:hidden fixed top-4 left-4 z-50
                   bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg"
      >
        ☰
      </button>

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64
          bg-gray-900 text-gray-100 p-6 shadow-2xl
          transform transition-transform duration-300 z-40
          ${openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <h2 className="text-2xl font-extrabold text-indigo-400 mb-8
                       border-b border-indigo-700 pb-4">
          ⚕️ Sahlan EMR
        </h2>

        <nav className="space-y-1">
          <NavLink to="/home" icon="🏠" label="Facility Selection" />
          <NavLink to="/dashboard" icon="📊" label="Dashboard" />
        </nav>

        <button
          onClick={() => setOpenSidebar(false)}
          className="md:hidden mt-6 bg-red-500 text-white
                     px-3 py-2 rounded-lg w-full"
        >
          Close
        </button>

        <div className="mt-auto text-xs text-gray-400 pt-8
                        border-t border-gray-700">
          <p className="font-semibold">Sahlan EMR</p>
          <p className="mt-1">© {currentYear} All rights reserved.</p>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* ===== HEADER ===== */}
        <header className="w-full bg-white shadow-md p-5 sticky top-0 z-10">
          <div className="flex justify-between items-center px-4 md:px-8">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">
              Facility Selection
            </h1>

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="px-3 py-1 text-sm font-semibold rounded-full
                         bg-red-400 text-black border border-red-500
                         hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* ===== PAGE BODY ===== */}
        <main className="flex-1">

          <h2 className="text-lg md:text-xl font-semibold text-gray-700
                         mb-6 border-b pb-2 px-4 md:px-8 pt-6">
            Select Facility Scope
          </h2>

          {/* ===== FACILITY GRID ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                          gap-6 md:gap-8 px-4 md:px-8 pb-8">
            {buttons.map((b) => (
              <button
                key={b.value}
                onClick={() => handleFacilitySelect(b.value)}
                className="text-left"
              >
                <div
                  className={`relative bg-gradient-to-br ${b.color}
                              text-white rounded-2xl p-6 md:p-8
                              h-[180px] md:h-[200px]
                              flex flex-col justify-center items-center
                              shadow-2xl hover:shadow-indigo-500/40
                              transition transform hover:scale-[1.03]`}
                >
                  <span className="text-4xl md:text-5xl mb-3">
                    {b.title.split(" ")[0]}
                  </span>

                  <span className="text-xl md:text-2xl font-extrabold text-center">
                    {b.title.substring(b.title.indexOf(" ") + 1)}
                  </span>

                  <span className="text-xs md:text-sm opacity-80 mt-2 text-center">
                    {b.subtitle}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* ===== SYSTEM OVERVIEW ===== */}
          <div className="pb-12 px-4 md:px-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700
                           mb-4 border-b pb-2">
              System Overview
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-lg
                            border border-gray-200">
              <p className="text-gray-500">
                High-level analytics for national, public, private, and MCH
                facilities will be available after selection.
              </p>

              <div className="h-40 flex items-center justify-center
                              text-gray-400 border-2 border-dashed
                              border-gray-300 rounded-lg mt-4">
                Aggregated Indicators • Trends • KPIs
              </div>
            </div>
          </div>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="w-full bg-gray-800 text-gray-400
                           py-4 text-center text-sm shadow-inner">
          <div className="flex flex-col md:flex-row justify-between
                          px-4 md:px-8 gap-2">
            <span>Version 2.0.1 — Licensed to ZultanMed</span>
            <span>© {currentYear} Sahlan EMR</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default HomePage;
