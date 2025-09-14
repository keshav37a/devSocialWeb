import { Component } from 'react'

import { Link } from 'react-router'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    handleReloadPage = () => {
        window.location.reload()
    }

    render() {
        const { hasError } = this.state
        const { children } = this.props
        if (hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-base-100">
                    <div className="text-center">
                        <h1 className="mb-4 text-4xl font-bold text-error">Oops!</h1>
                        <p className="mb-6 text-lg">Something went wrong.</p>
                        <div className="space-x-4">
                            <button className="btn btn-primary" onClick={this.handleReloadPage}>
                                Reload Page
                            </button>
                            <Link className="btn btn-outline" to="/">
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }

        return children
    }
}
