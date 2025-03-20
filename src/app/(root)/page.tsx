import StreamCard from '@/features/stream/components/stream-card';

const streams = [
  { id: 1, title: 'Stream 1', viewerCount: 120, category: 'Gaming' },
  { id: 2, title: 'Stream 2', viewerCount: 80, category: 'Music' },
];

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {streams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  );
}
