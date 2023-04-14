import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import { FiHeadphones } from 'react-icons/fi';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster />
			<div className="container mt-4">
				<h1 className="fw-bold fst-italic mb-4">
					<FiHeadphones className="border rounded-circle p-1 border-dark border-2" />{' '}
					<u>Activity App</u>
				</h1>
				<Component {...pageProps} />
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
