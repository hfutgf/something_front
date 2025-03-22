export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  return (
    <div>
      <h1 className="text-2xl font-bold">Profile: {username}</h1>
      <p>This is the profile page of {username}.</p>
    </div>
  );
}
