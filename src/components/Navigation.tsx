
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/math", label: "Math" },
    { path: "/science", label: "Science" },
    { path: "/progress", label: "Progress" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-tellect-neutral-200">
      <div className="container mx-auto px-tellect">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-tellect-primary hover:text-tellect-primary-hover transition-colors">
            Tellect
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-tellect-accent text-tellect-primary"
                    : "text-tellect-neutral-600 hover:text-tellect-primary hover:bg-tellect-accent-soft"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button className="p-2 text-tellect-neutral-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
