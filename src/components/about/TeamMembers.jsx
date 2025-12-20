import React from 'react';

const TeamMembers = () => {
    return (
           <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transform transition-all">
            <img src="/captain.jpg" alt="Captain" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
            <p className="text-gray-600">Captain</p>
            <a href="https://linkedin.com/in/johndoe" target="_blank" className="text-blue-600 mt-4 inline-block">LinkedIn</a>
          </div>
          {/* Add more team members here */}
        </div>
      </div>
    </section>
    );
};

export default TeamMembers;