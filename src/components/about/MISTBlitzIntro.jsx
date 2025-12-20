import React from 'react';

const MISTBlitzIntro = () => {
    return (
      <section className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">What is MIST BLITZ?</h1>
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <img src="/furiosa.jpg" alt="Furiosa 1.0" className="rounded-xl shadow-lg mb-8" />
            <p className="text-gray-600 text-lg">
              MIST BLITZ is the official Formula Student team of the Military Institute of Science and Technology (MIST).
              Founded in April 2024, the team designs and builds a formula-style race car starting with Furiosa 1.0.
            </p>
          </div>
        </div>
      </div>
    </section>
    );
};

export default MISTBlitzIntro;