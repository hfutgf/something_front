import { StreamType } from '../types/stream.type';

export default function StreamCard({ stream }: { stream: StreamType }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{stream.title}</h2>
      <p className="text-gray-400">{stream.category}</p>
      <p className="text-gray-400">{stream.viewerCount} viewers</p>
    </div>
  );
}
