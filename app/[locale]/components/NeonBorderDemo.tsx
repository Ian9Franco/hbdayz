import React from 'react';

const NeonBorderDemo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Neon Border Demo</h1>
      
      <div className="neon-border p-6 rounded-lg">
        <p className="text-xl">This box has a neon border in both light and dark modes.</p>
      </div>
      
      <div className="flex space-x-4">
        <button className="neon-border px-4 py-2 rounded-md">
          Neon Button
        </button>
        <button className="neon-border px-4 py-2 rounded-full">
          Rounded Neon Button
        </button>
      </div>
      
      <div className="neon-border w-64 h-64 flex items-center justify-center rounded-full">
        <p className="text-center">Neon Circle</p>
      </div>
    </div>
  );
};

export default NeonBorderDemo;