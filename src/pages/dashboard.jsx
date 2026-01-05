import React, { useState } from "react";
import {
  PieChart, Pie, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, Cell, Sector
} from "recharts";
import { useDashboardData } from "../hooks/useDashboardData.jsx";

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#dc2626", "#9333ea", "#0ea5e9"];

export default function Dashboard() {
  const {
    data,
    loading,
    error,
    region,
    setRegion,
    district,
    setDistrict,
    timeFilter,
    setTimeFilter,
    TIME_FILTERS,
  } = useDashboardData();

  const [activeIndex, setActiveIndex] = useState(null);
  const onPieEnter = (_, index) => setActiveIndex(index);

  if (loading) return <div className="p-10 text-gray-700">Loading dashboard…</div>;
  if (error) return <div className="p-10 text-red-600">{error}</div>;
  if (!data) return null;

  const {
    totals = {},
    genderChart = [],
    diagnosisChart = [],
    monthlyChart = [],
    regions = [],
    districts = [],
    alerts = [],
  } = data;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 National EMR Dashboard</h1>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex flex-col border-l-4 border-blue-600">
          <span className="text-gray-500">Total Patients</span>
          <span className="text-2xl font-bold">{totals.totalPatients ?? 0}</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col border-l-4 border-sky-500">
          <span className="text-gray-500">Male Patients</span>
          <span className="text-2xl font-bold">{totals.male ?? 0}</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col border-l-4 border-purple-600">
          <span className="text-gray-500">Female Patients</span>
          <span className="text-2xl font-bold">{totals.female ?? 0}</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col border-l-4 border-green-600">
          <span className="text-gray-500">Total Visits</span>
          <span className="text-2xl font-bold">{totals.totalVisits ?? 0}</span>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg shadow mb-2">
            <h3 className="font-semibold mb-2">🚨 Public Health Alerts</h3>
            {alerts.map((a, i) => (
              <div key={i} className="bg-red-100 text-red-800 p-2 rounded mb-1 font-medium">
                {a.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="sticky top-0 z-10 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="mb-2">
            <strong>Applied:</strong> {timeFilter} {region && `· ${region}`} {district && `/${district}`}
          </p>

          {/* Time Filter */}
          <h4 className="font-medium mb-2">Timeframe</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {TIME_FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setTimeFilter(f.key)}
                className={`px-3 py-1 rounded ${timeFilter === f.key ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Region Filter */}
          <h4 className="font-medium mb-2">Region</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={() => setRegion("")} className={`px-3 py-1 rounded ${region === "" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}>
              All Regions
            </button>
            {regions.map(r => (
              <button key={r} onClick={() => setRegion(r)} className={`px-3 py-1 rounded ${region === r ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}>
                {r}
              </button>
            ))}
          </div>

          {/* District Filter */}
          {region && (
            <>
              <h4 className="font-medium mb-2">District</h4>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setDistrict("")} className={`px-3 py-1 rounded ${district === "" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700"}`}>
                  All Districts
                </button>
                {districts.map(d => (
                  <button key={d} onClick={() => setDistrict(d)} className={`px-3 py-1 rounded ${district === d ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Gender Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Patients by Gender</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderChart}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                activeIndex={activeIndex}
                activeShape={(props) => {
                  const { cx, cy, outerRadius, fill, payload, value } = props;
                  return (
                    <g>
                      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={16}>
                        {payload.name}: {value}
                      </text>
                      <Sector {...props} outerRadius={outerRadius + 10} />
                    </g>
                  );
                }}
                onMouseEnter={onPieEnter}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {genderChart.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Diagnoses */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Top Diagnoses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={diagnosisChart} layout="vertical" margin={{ left: 80 }}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill={COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Visits */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-semibold mb-2">Patient Visits Over Time</h3>
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={monthlyChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke={COLORS[1]} strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
