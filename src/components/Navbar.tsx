
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  FolderKanban,
  Database,
  Users,
  Bell,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  subItems?: Array<{ href: string; label: string }>;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  icon: Icon,
  active = false,
  subItems,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (subItems && subItems.length > 0) {
    return (
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'flex items-center px-4 py-2 text-sm rounded-lg transition-colors w-full',
              active
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-foreground/80 hover:bg-gray-100'
            )}
          >
            <Icon size={18} className="mr-2" />
            <span>{label}</span>
            <ChevronDown
              size={16}
              className={cn('ml-auto transform transition-transform', dropdownOpen && 'rotate-180')}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {subItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link to={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      to={href}
      className={cn(
        'flex items-center px-4 py-2 text-sm rounded-lg transition-colors',
        active
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-foreground/80 hover:bg-gray-100'
      )}
    >
      <Icon size={18} className="mr-2" />
      <span>{label}</span>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
      label: 'Projects',
      href: '/projects',
      icon: FolderKanban,
      subItems: [
        { label: 'All Projects', href: '/projects' },
        { label: 'New Project', href: '/projects/new' },
      ],
    },
    {
      label: 'Resources',
      href: '/resources',
      icon: Database,
      subItems: [
        { label: 'All Resources', href: '/resources' },
        { label: 'New Resource', href: '/resources/new' },
      ],
    },
    { label: 'Departments', href: '/departments', icon: Users },
    { label: 'Notifications', href: '/notifications', icon: Bell },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-gray-200/80">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-jd-blue to-jd-green bg-clip-text text-transparent">
                JD
              </span>
              <span className="ml-2 font-medium">Joint Departments</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={isActive(item.href)}
                subItems={item.subItems}
              />
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-jd-blue to-jd-green flex items-center justify-center text-white font-medium">
                  AD
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin User</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center text-jd-red">
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={isActive(item.href)}
                subItems={item.subItems}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
