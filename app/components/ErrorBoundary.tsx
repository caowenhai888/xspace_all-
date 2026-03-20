'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              The application encountered an unexpected error. Please try refreshing the page.
            </p>
            <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-auto max-h-40 mb-6">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#3871FF] text-white py-3 rounded-full font-bold hover:bg-[#2a5cd9] transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
