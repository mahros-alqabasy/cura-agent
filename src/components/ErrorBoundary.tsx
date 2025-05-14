import React, { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, errorInfo);
    toast({
      title: 'An error occurred',
      description: error.message,
      variant: 'destructive',
    });
  }

  render() {
    if (this.state.hasError) {
      if (import.meta.env.MODE === 'development') {
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-red-100 p-4">
            <h1 className="text-2xl font-bold text-red-600">An error occurred</h1>
            <pre className="mt-4 p-4 bg-white rounded shadow text-sm text-left text-gray-800 overflow-auto max-w-4xl max-h-96">
              {this.state.error?.message}
              {this.state.error?.stack}
            </pre>
          </div>
        );
      }

      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Something went wrong.</h1>
          <p className="text-sm text-gray-500">Please try refreshing the page or contact support.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
