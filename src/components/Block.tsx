import React from 'react';

interface BlockProps {
  index: number;
  timestamp: string;
  data: string;
  previousHash: string;
  hash: string;
  onDataChange: (data: string) => void;
}

export const Block: React.FC<BlockProps> = ({ 
  index, 
  timestamp, 
  data, 
  previousHash, 
  hash,
  onDataChange 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4 border-2 border-blue-500">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <h3 className="text-lg font-bold mb-2">Block #{index}</h3>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Timestamp</label>
          <input
            type="text"
            value={timestamp}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Previous Hash</label>
          <input
            type="text"
            value={previousHash}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 font-mono text-sm"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Data</label>
          <textarea
            value={data}
            onChange={(e) => onDataChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={2}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Hash</label>
          <input
            type="text"
            value={hash}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
};