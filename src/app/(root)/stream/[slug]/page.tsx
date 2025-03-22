export default function StreamPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <div>
      <h1 className="text-2xl font-bold">Stream: {slug}</h1>
      <p>This is a live stream page.</p>
    </div>
  );
}
