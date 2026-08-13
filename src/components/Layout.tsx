import { Link, useLocation } from '@tanstack/react-router';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/clients', label: 'Clients' },
    { path: '/matters', label: 'Cases / Matters' },
    { path: '/ledger', label: 'Ledger' },
    { path: '/payments', label: 'Payments' },
    { path: '/trademarks', label: 'Trademarks' },
    { path: '/documents', label: 'Documents' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <nav className="navbar-neo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold font-bebas text-white tracking-wider">
                BRANDEX IP PRACTICE
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-mono uppercase tracking-wider transition-colors border-b-4 ${
                    location.pathname === item.path
                      ? 'text-white border-[#C94A00]'
                      : 'text-[#888] hover:text-white border-transparent hover:border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
