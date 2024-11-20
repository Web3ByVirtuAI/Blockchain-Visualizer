import { useState } from 'react';
import { Block } from './components/Block';
import SHA256 from 'crypto-js/sha256';

interface BlockData {
  index: number;
  timestamp: string;
  data: string;
  previousHash: string;
  hash: string;
}

export default function App() {
  const [blocks, setBlocks] = useState<BlockData[]>(() => {
    const genesisBlock: BlockData = {
      index: 0,
      timestamp: new Date().toISOString(),
      data: 'Genesis Block',
      previousHash: '0',
      hash: '',
    };
    genesisBlock.hash = SHA256(
      genesisBlock.index + 
      genesisBlock.timestamp + 
      genesisBlock.data + 
      genesisBlock.previousHash
    ).toString();
    return [genesisBlock];
  });

  const calculateHash = (block: Omit<BlockData, 'hash'>) => {
    return SHA256(
      block.index + 
      block.timestamp + 
      block.data + 
      block.previousHash
    ).toString();
  };

  const addBlock = () => {
    const previousBlock = blocks[blocks.length - 1];
    const newBlock: BlockData = {
      index: blocks.length,
      timestamp: new Date().toISOString(),
      data: 'New Block Data',
      previousHash: previousBlock.hash,
      hash: '',
    };
    newBlock.hash = calculateHash(newBlock);
    setBlocks([...blocks, newBlock]);
  };

  const updateBlockData = (index: number, newData: string) => {
    const updatedBlocks = blocks.map((block, i) => {
      if (i === index) {
        const updatedBlock = { ...block, data: newData };
        updatedBlock.hash = calculateHash(updatedBlock);
        return updatedBlock;
      }
      if (i > index) {
        const updatedBlock = {
          ...block,
          previousHash: blocks[i - 1].hash,
        };
        updatedBlock.hash = calculateHash(updatedBlock);
        return updatedBlock;
      }
      return block;
    });
    setBlocks(updatedBlocks);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blockchain Visualizer</h1>
          <p className="text-gray-600 mb-4">
            Explore how blockchain works by adding blocks and modifying data
          </p>
          <button
            onClick={addBlock}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add New Block
          </button>
        </div>
        
        <div className="space-y-4">
          {blocks.map((block) => (
            <Block
              key={block.index}
              index={block.index}
              timestamp={block.timestamp}
              data={block.data}
              previousHash={block.previousHash}
              hash={block.hash}
              onDataChange={(data) => updateBlockData(block.index, data)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}