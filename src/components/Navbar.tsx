import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
  { path: '/', label: 'Low-Latency GC' },
  { path: '/locking', label: 'Locking vs Lock-Free' },
  { path: '/memory-layout', label: 'False Sharing' },
  { path: '/logging', label: 'GC-Free Logging' },
  { path: '/offheap', label: 'Off-Heap Queues' },
  { path: '/startup', label: 'Startup Optimization' },
  { path: '/network', label: 'Network Latency' },
  { path: '/gc-visualizer', label: 'GC Visualizer' },
  ];

  return (
    <header className="w-full bg-gray-900 text-white shadow">
      <nav className="max-w-screen-xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-semibold">Latency Lab</div>
        <ul className="flex space-x-6 text-sm">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`hover:underline ${
                  location.pathname === item.path ? 'font-bold text-blue-400' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
