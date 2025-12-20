import React from 'react';

const Achievements = () => {
    return (
       <section className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Achievements</h1>
        <div className="space-y-8">
          <div className="bg-yellow-200 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800">2024</h3>
            <p className="text-gray-600">1st Place in FSAE Japan</p>
          </div>
          <div className="bg-yellow-200 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800">2025</h3>
            <p className="text-gray-600">PR Award and Best Design</p>
          </div>
          {/* Add more achievements */}
        </div>
      </div>
    </section>
    );
};

export default Achievements;