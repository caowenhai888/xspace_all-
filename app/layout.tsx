import type {Metadata} from 'next';
import './globals.css';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './components/AuthProvider';
import NextTopLoader from 'nextjs-toploader';
import ErrorBoundary from './components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'XSPARK AI | Embodied AGI World Engine',
  description: 'Xspark AI is a robotics company building high-quality real-world data infrastructure for embodied intelligence.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextTopLoader 
          color="#3871FF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #3871FF,0 0 5px #3871FF"
        />
        <AuthProvider>
          <LanguageProvider>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
