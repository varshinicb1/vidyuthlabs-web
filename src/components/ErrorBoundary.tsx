import { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * Contains a failure (WebGL unavailable, an asset that won't load) to the
 * subtree that caused it. Without this, any error inside a 3D <Canvas>
 * unmounts the entire app and visitors see a blank page.
 */
export class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Recovered from a rendering error:', error, info.componentStack);
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
