import React from "react";

const WhatWeDo = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-12 tracking-tight">
          What We Do
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Card 1: What is Formula Student */}
          <div className="bg-white bg-opacity-10 p-8 rounded-3xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-opacity-20">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">
              What is Formula Student?
            </h3>
            <p className="text-lg text-gray-300 mb-4">
              Formula Student is an international engineering competition where university teams design, build, and race a formula-style car.
            </p>
            <h4 className="text-xl font-semibold text-yellow-300 mb-4">Top FS Competitions:</h4>
            <ul className="space-y-3 text-gray-300">
              <li>FSG</li>
              <li>FSAE Japan</li>
              <li>FSUK</li>
            </ul>
          </div>

          {/* Card 2: Static Events */}
          <div className="bg-white bg-opacity-10 p-8 rounded-3xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-opacity-20">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">
              Static Events
            </h3>
            <ul className="space-y-3 text-lg text-gray-300">
              <li>
                <strong>Business Plan Presentation:</strong> Presenting the business model behind the team.
              </li>
              <li>
                <strong>Engineering Design Report:</strong> Detailing the design and engineering process.
              </li>
              <li>
                <strong>Cost Report:</strong> Demonstrating the team's budgeting and cost-efficiency.
              </li>
            </ul>
          </div>

          {/* Card 3: Dynamic Events */}
          <div className="bg-white bg-opacity-10 p-8 rounded-3xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-opacity-20">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">
              Dynamic Events
            </h3>
            <ul className="space-y-3 text-lg text-gray-300">
              <li>
                <strong>Acceleration:</strong> Measuring the car's speed in a straight line.
              </li>
              <li>
                <strong>Skidpad:</strong> Testing the car's cornering ability.
              </li>
              <li>
                <strong>Autocross:</strong> A short track to assess the agility of the car.
              </li>
              <li>
                <strong>Endurance:</strong> A long-distance race simulating real-world conditions.
              </li>
              <li>
                <strong>Efficiency:</strong> Testing fuel/energy consumption under real driving conditions.
              </li>
            </ul>
          </div>

          {/* Card 4: FS Events */}
          <div className="bg-white bg-opacity-10 p-8 rounded-3xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-opacity-20">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">
              FS Events
            </h3>
            <ul className="space-y-3 text-lg text-gray-300">
              <li><strong>Acceleration:</strong> The car's ability to speed up from 0 to top speed.</li>
              <li><strong>Skidpad:</strong> Evaluating the car’s cornering capabilities on tight curves.</li>
              <li><strong>Autocross:</strong> A short circuit event where handling is critical.</li>
              <li><strong>Endurance:</strong> Testing the car's reliability and performance over time.</li>
              <li><strong>Efficiency:</strong> Measuring fuel or energy consumption in real-time driving conditions.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
