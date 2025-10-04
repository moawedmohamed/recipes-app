import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorMessage from "../components/ErrorMessage";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }; // نخزن الـ error
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // لو فيه fallback من الـ props نعرضه
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorMessage
          message={this.state.error?.message || "Something went wrong"}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
