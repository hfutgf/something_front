import MediaCard from '@/features/media/components/media-card';

const contents = [
  {
    id: '1',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur officia libero iusto',
    videoUrl:
      'http://localhost:3001/uploads/videos/fae9cebc-2cbc-4b4f-b6b4-079689f79e23.MP4',
    cover:
      'http://localhost:3001/uploads/covers/2848a79e-8ab3-475f-8291-a1d41d7cf2d8.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur officia libero iusto quam nam dignissimos eos dolores repudiandae necessitatibus voluptatibus.',
    views: 120,
    duration: 2000,
    createdAt: '2025-04-09T16:48:31.810Z',
    channel: {
      id: '1',
      createdAt: '2025-04-09T16:48:31.810Z',
      updatedAt: '2025-04-09T16:48:31.810Z',
      avatar:
        'http://localhost:3001/uploads/covers/2848a79e-8ab3-475f-8291-a1d41d7cf2d8.jpg',
      name: 'Test',
      verified: true,
    },
  },
  {
    id: '2',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur officia libero iusto',
    videoUrl:
      'http://localhost:3001/uploads/videos/fae9cebc-2cbc-4b4f-b6b4-079689f79e23.MP4',
    cover:
      'http://localhost:3001/uploads/covers/2848a79e-8ab3-475f-8291-a1d41d7cf2d8.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur officia libero iusto quam nam dignissimos eos dolores repudiandae necessitatibus voluptatibus.',
    views: 120,
    duration: 2000,
    createdAt: '2025-04-09T16:48:31.810Z',
    channel: {
      id: '1',
      createdAt: '2025-04-09T16:48:31.810Z',
      updatedAt: '2025-04-09T16:48:31.810Z',
      avatar:
        'http://localhost:3001/uploads/covers/2848a79e-8ab3-475f-8291-a1d41d7cf2d8.jpg',
      name: 'Test',
      verified: false,
    },
  },
];

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((content) => (
        <MediaCard key={content.id} content={content} isLoading={false} />
      ))}
    </div>
  );
}
