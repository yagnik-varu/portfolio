"use client";

import * as React from "react";
import { Card } from "../card/card";

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log actual errors per docs/10-coding-standards.md §16
    // Never a silent empty catch block
    console.error("ErrorBoundary caught a rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="p-6 flex flex-col items-center justify-center gap-4 border-danger/50 bg-danger/10 text-center">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-danger">Rendering Error</h3>
            <p className="text-sm text-muted">
              {this.props.fallbackMessage || "An unexpected error occurred while rendering this component."}
            </p>
          </div>
          <button 
            type="button"
            className="px-4 py-2 bg-surface text-text text-sm font-medium rounded-md hover:bg-surface/80 transition-colors border border-border"
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            Try Again
          </button>
        </Card>
      );
    }

    return this.props.children;
  }
}
