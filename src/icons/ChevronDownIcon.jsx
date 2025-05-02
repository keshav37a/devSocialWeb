export const ChevronDownIcon = ({ className = '', onClick: handleClick }) => (
    <svg
        className={className}
        fill="currentColor"
        onClick={handleClick}
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            clipRule="evenodd"
            d="M12 14.25a.75.75 0 0 1-.53-.22l-5.25-5.25a.75.75 0 1 1 1.06-1.06L12 12.44l4.72-4.72a.75.75 0 0 1 1.06 1.06l-5.25 5.25a.75.75 0 0 1-.53.22z"
            fillRule="evenodd"
        />
    </svg>
)
