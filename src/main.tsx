import { Component, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('App crashed:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <pre
          style={{
            margin: 0,
            padding: 16,
            background: '#fff',
            color: '#b00020',
            font: '12px/1.4 -apple-system, monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            minHeight: '100vh',
          }}
        >
          {'App crashed:\n'}
          {this.state.error.stack || this.state.error.message || String(this.state.error)}
        </pre>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
