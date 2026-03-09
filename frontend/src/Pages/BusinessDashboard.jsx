import React from "react";

const BusinessDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white p-4 rounded-2xl shadow mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Business Dashboard
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
          Logout
        </button>
      </header>

      <main className="grid md:grid-cols-3 gap-6">
        {/* Stats Section */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-medium mb-3">Quick Stats</h2>
          <ul>
            <li>
              Total Views: <span className="font-semibold">0</span>
            </li>
            <li>
              Active Listings: <span className="font-semibold">0</span>
            </li>
            <li>
              Messages: <span className="font-semibold">0</span>
            </li>
          </ul>
        </section>

        {/* Profile Section */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-medium mb-3">Business Profile</h2>
          <p>
            Name: <span className="font-semibold">My Business</span>
          </p>
          <p>
            Status: <span className="text-green-600 font-semibold">Active</span>
          </p>
        </section>

        {/* Placeholder for Future Map or Insights */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-medium mb-3">Location Insights</h2>
          <p className="text-gray-500">Map or analytics will go here.</p>
        </section>
      </main>
    </div>
  );
};

export default BusinessDashboard;
