import { useGetAllSubmissions } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Phone, Calendar, Package, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Admin() {
  const { identity, login, loginStatus, isLoggingIn } = useInternetIdentity();
  const { data: submissions, isLoading, error } = useGetAllSubmissions();

  // Check if user is authenticated
  const isAuthenticated = !!identity && loginStatus === 'success';

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Access Required</CardTitle>
              <CardDescription>
                Please log in to access the admin dashboard and view customer submissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={login}
                disabled={isLoggingIn}
                className="w-full"
                size="lg"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Log In to Admin Panel
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Secure authentication powered by Internet Identity
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Sort submissions by timestamp descending (most recent first)
  const sortedSubmissions = submissions
    ? [...submissions].sort((a, b) => Number(b.timestamp - a.timestamp))
    : [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load customer submissions. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {sortedSubmissions.length} Customer Submission{sortedSubmissions.length !== 1 ? 's' : ''}
          </h1>
          <p className="text-muted-foreground">
            View and manage all AC purchase inquiries from customers
          </p>
        </div>

        {sortedSubmissions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No customer submissions yet</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Submissions</CardTitle>
              <CardDescription>
                Contact customers directly using the phone or email links below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[140px]">Date</TableHead>
                      <TableHead className="min-w-[120px]">Customer</TableHead>
                      <TableHead className="min-w-[130px]">Phone</TableHead>
                      <TableHead className="min-w-[180px]">Email</TableHead>
                      <TableHead className="min-w-[100px]">Brand</TableHead>
                      <TableHead className="min-w-[120px]">Model</TableHead>
                      <TableHead className="min-w-[80px]">Age</TableHead>
                      <TableHead className="min-w-[200px]">Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedSubmissions.map((submission, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{formatDate(submission.timestamp)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{submission.customerName}</TableCell>
                        <TableCell>
                          <a
                            href={`tel:${submission.phone}`}
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Phone className="h-4 w-4" />
                            {submission.phone}
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`mailto:${submission.email}`}
                            className="flex items-center gap-2 text-primary hover:underline break-all"
                          >
                            <Mail className="h-4 w-4 flex-shrink-0" />
                            {submission.email}
                          </a>
                        </TableCell>
                        <TableCell>{submission.brand}</TableCell>
                        <TableCell>{submission.model}</TableCell>
                        <TableCell>{Number(submission.age)} years</TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {submission.condition.description}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
