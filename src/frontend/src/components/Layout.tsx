import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { Menu, X, Wind, LogOut, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { toast } from 'sonner';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingAdminNavigation, setPendingAdminNavigation] = useState(false);
  const navigate = useNavigate();
  const { identity, clear, loginStatus, login, isLoggingIn, isInitializing, loginError } = useInternetIdentity();

  // Check if user is authenticated
  const isAuthenticated = !!identity && loginStatus === 'success';

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Submit AC', path: '/submit' },
    { name: 'Pricing Info', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const phoneNumbers = [
    '889700937',
    '6304843930',
    '+917095510215'
  ];

  // Effect to handle navigation after successful authentication
  useEffect(() => {
    console.log('[Layout Effect] Authentication state changed:', {
      isAuthenticated,
      loginStatus,
      hasIdentity: !!identity,
      pendingAdminNavigation,
      identityPrincipal: identity?.getPrincipal().toString(),
      timestamp: new Date().toISOString()
    });

    if (pendingAdminNavigation && isAuthenticated) {
      console.log('[Layout Effect] Authentication successful, navigating to admin dashboard...');
      setPendingAdminNavigation(false);
      setMobileMenuOpen(false);
      navigate({ to: '/admin' });
      toast.success('Successfully authenticated!');
    }

    if (pendingAdminNavigation && loginStatus === 'loginError') {
      console.error('[Layout Effect] Login failed:', loginError);
      setPendingAdminNavigation(false);
      
      const errorMessage = loginError?.message || 'Authentication failed';
      
      // Provide user-friendly error messages based on error type
      if (errorMessage.includes('User cancelled') || errorMessage.includes('cancelled')) {
        toast.info('Login was cancelled');
      } else if (errorMessage.includes('network') || errorMessage.includes('Network')) {
        toast.error('Network connection failed. Please check your internet connection and try again.');
      } else if (errorMessage.includes('timeout') || errorMessage.includes('Timeout')) {
        toast.error('Login timed out. Please try again.');
      } else {
        toast.error(`Authentication failed: ${errorMessage}`);
      }
    }
  }, [isAuthenticated, loginStatus, pendingAdminNavigation, navigate, identity, loginError]);

  const handleLogout = () => {
    console.log('[Logout] Logging out user');
    clear();
    navigate({ to: '/' });
    setMobileMenuOpen(false);
  };

  const handleAdminClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    console.log('[Admin Click] ========== ADMIN DASHBOARD BUTTON CLICKED ==========');
    console.log('[Admin Click] Current authentication state:', {
      isAuthenticated,
      loginStatus,
      hasIdentity: !!identity,
      isLoggingIn,
      isInitializing,
      identityPrincipal: identity?.getPrincipal().toString(),
      timestamp: new Date().toISOString()
    });

    // If already authenticated, navigate directly
    if (isAuthenticated) {
      console.log('[Admin Click] User already authenticated, navigating directly to admin dashboard');
      navigate({ to: '/admin' });
      setMobileMenuOpen(false);
      return;
    }

    // If currently initializing, wait
    if (isInitializing) {
      console.log('[Admin Click] Auth client still initializing, please wait...');
      toast.info('Initializing authentication, please wait...');
      return;
    }

    // If already logging in, don't trigger again
    if (isLoggingIn) {
      console.log('[Admin Click] Login already in progress, ignoring duplicate click');
      return;
    }

    try {
      console.log('[Admin Click] User not authenticated, triggering Internet Identity login dialog...');
      setPendingAdminNavigation(true);
      
      // Call login() - this will trigger the Internet Identity dialog
      // The login() function is void and handles the flow via callbacks
      login();
      
      console.log('[Admin Click] Login function called, Internet Identity dialog should appear now');
      console.log('[Admin Click] Waiting for user to complete authentication in the dialog...');
      
    } catch (error) {
      console.error('[Admin Click] Unexpected error during login trigger:', {
        error,
        errorMessage: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString()
      });
      
      setPendingAdminNavigation(false);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const isAdminButtonLoading = isLoggingIn || (pendingAdminNavigation && loginStatus === 'logging-in');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Wind className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">AC Buy</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    activeProps={{
                      className: 'bg-accent text-accent-foreground',
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={handleAdminClick}
                  disabled={isAdminButtonLoading || isInitializing}
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isAdminButtonLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Admin Dashboard
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              )}
              <Button onClick={() => navigate({ to: '/submit' })}>
                Get a Quote
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    activeProps={{
                      className: 'bg-accent text-accent-foreground',
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={handleAdminClick}
                  disabled={isAdminButtonLoading || isInitializing}
                  className="px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isAdminButtonLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Admin Dashboard
                </button>
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </Button>
                )}
                <Button
                  onClick={() => {
                    navigate({ to: '/submit' });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wind className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">AC Buy</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for purchasing used air conditioners at competitive prices.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {phoneNumbers.map((phone) => (
                  <li key={phone}>
                    <a 
                      href={`tel:${phone}`}
                      className="hover:text-foreground transition-colors"
                    >
                      Phone: {phone}
                    </a>
                  </li>
                ))}
                <li>Email: info@acbuy.com</li>
                <li>Hours: Mon-Sat, 9AM-6PM</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} AC Buy. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'ac-buy'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
