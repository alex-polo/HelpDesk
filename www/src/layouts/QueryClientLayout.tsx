import { useOutlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

export const QueryClientLayout = () => {
  const outlet = useOutlet();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{outlet}</AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
