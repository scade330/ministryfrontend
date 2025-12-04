import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(false);

  const buttons = [
    {
      to: "/appointment",
      title: "🗓️ Appointments",
      subtitle: "Schedule & View Bookings",
      color: "from-indigo-500 to-indigo-700 hover:to-indigo-800",
    },
    {
      to: "/patients",
      title: "🧑 Patients",
      subtitle: "Access Records & Vitals",
      color: "from-teal-500 to-teal-700 hover:to-teal-800",
    },
    {
      to: "/pharmacyview",
      title: "💊 Pharmacy",
      subtitle: "Inventory & Prescriptions",
      color: "from-pink-500 to-pink-700 hover:to-pink-800",
    },
  ];

  const NavLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-indigo-700 hover:text-white transition group"
    >
      <span className="text-xl group-hover:scale-110 transition">{icon}</span>
      <span className="font-medium text-[15px]">{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* MOBILE TOGGLE BUTTON */}
      <button
        onClick={() => setOpenSidebar(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg"
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-gray-100 p-6 shadow-2xl
          transform transition-transform duration-300 z-40
          ${openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <h2 className="text-2xl font-extrabold text-indigo-400 mb-8 border-b border-indigo-700 pb-4">
          ⚕️ Sahlan Clinic
        </h2>

        <nav className="space-y-1">
          <NavLink to="/recordsale" icon="🏠" label="Add Sales" />
          <NavLink to="/appointment" icon="🗓️" label="Appointments" />
          <NavLink to="/patients" icon="🧑" label="Patients" />
          <NavLink to="/pharmacyview" icon="💊" label="Pharmacy" />
          <NavLink to="/salesdashboard" icon="📊" label="Financial Reports" />
          <NavLink to="/lowstockpage" icon="⚙️" label="Lowstock Drugs" />
        </nav>

        {/* CLOSE SIDEBAR (MOBILE) */}
        <button
          onClick={() => setOpenSidebar(false)}
          className="md:hidden mt-6 bg-red-500 text-white px-3 py-2 rounded-lg w-full"
        >
          Close
        </button>

        <div className="mt-auto text-xs text-gray-400 pt-8 border-t border-gray-700">
          <p className="font-semibold">Sahlan Clinic</p>
          <p className="mt-1">© {currentYear} All rights reserved.</p>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* HEADER */}
        <header className="w-full bg-white shadow-md p-5 sticky top-0 z-10">
          <div className="flex justify-between items-center px-4 md:px-8">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">
              Welcome, Administrator
            </h1>

            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 text-sm font-semibold rounded-full 
                         bg-red-400 text-black border border-red-500
                         hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1">

          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-6 border-b pb-2 px-4 md:px-8 pt-6">
            Quick Access Modules
          </h2>

          {/* GRID BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-8 pb-8">
            {buttons.map((b) => (
              <Link key={b.to} to={b.to}>
                <div
                  className={`relative bg-gradient-to-br ${b.color} text-white rounded-2xl 
                              p-6 md:p-8 h-[180px] md:h-[200px] flex flex-col justify-center items-center 
                              shadow-2xl hover:shadow-indigo-500/50 transition transform hover:scale-[1.03]`}
                >
                  <svg className="absolute top-0 right-0 h-full w-full opacity-10">
                    <circle cx="50" cy="50" r="40" fill="white" />
                  </svg>

                  {/* Emoji */}
                  <span className="text-4xl md:text-5xl mb-3 relative z-10">
                    {b.title.split(" ")[0]}
                  </span>

                  {/* Title */}
                  <span className="text-xl md:text-2xl font-extrabold tracking-wide relative z-10">
                    {b.title.substring(b.title.indexOf(" ") + 1)}
                  </span>

                  {/* Subtitle */}
                  <span className="text-xs md:text-sm opacity-80 mt-2 relative z-10">
                    {b.subtitle}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* SYSTEM OVERVIEW */}
          <div className="pb-12 px-4 md:px-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              System Overview
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <p className="text-gray-500">
                Data charts and key metrics will appear here.
              </p>

              <div className="h-40 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-lg mt-4">
                Recent Activity Log / KPIs
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="w-full bg-gray-800 text-gray-400 py-4 text-center text-sm shadow-inner">
          <div className="flex flex-col md:flex-row justify-between px-4 md:px-8 gap-2 md:gap-0">
            <span>Version 2.0.1 — Licensed to ZultanMed</span>
            <span>© {currentYear} Sahlan Clinic</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default HomePage;
