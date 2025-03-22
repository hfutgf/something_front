export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <a href="/" className="hover:text-purple-400">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a href="/stream" className="hover:text-purple-400">
              Streams
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
