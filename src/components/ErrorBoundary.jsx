import { Component } from 'react'
import ErrorFallback from './ErrorFallback.jsx'

export class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    console.error('React ErrorBoundary caught an error:', error, errorInfo?.componentStack || error.stack)

    // Store error info for potential reporting
    this.setState({ errorInfo })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <ErrorFallback
        error={this.state.error}
        errorInfo={this.state.errorInfo}
        onRetry={this.handleRetry}
      />
    )
  }
}


