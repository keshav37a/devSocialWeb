/* eslint-disable react/jsx-no-useless-fragment */
export const Loading = ({ isLoading, children }) => {
    return (
        <>
            {isLoading || !children ? (
                <>
                    <div className="absolute inset-0 z-1 bg-gray-400 opacity-50" />
                    <div className="absolute top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2 transform">
                        <span className="loading loading-xl loading-spinner" />
                    </div>
                </>
            ) : (
                children
            )}
        </>
    )
}
