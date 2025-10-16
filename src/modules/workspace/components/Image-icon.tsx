export const ImageIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="16" height="16" />

        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 14.222V1.778C16 .796 15.204 0 14.222 0H1.778C.796 0 0 .796 0 1.778v12.444C0 15.204.796 16 1.778 16h12.444c.982 0 1.778-.796 1.778-1.778zM4.889 9.333l2.222 2.671L10.222 8l4 5.333H1.778l3.11-4z"
            fill="red"
        />
    </svg>
);


export const VideoIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 2H2C1.447 2 1 2.447 1 3v10c0 .553.447 1 1 1h12c.553 0 1-.447 1-1V3c0-.553-.447-1-1-1zM6 11V5l5 3-5 3z"
            fill="orange"
        />
    </svg>
);

export const AudioIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 5v6h3l4 3V2L6 5H3zm9.707.293a1 1 0 0 1 0 1.414 3 3 0 0 1 0 4.242 1 1 0 0 1-1.414-1.414 1 1 0 0 0 0-1.414 1 1 0 0 0 0-1.414 1 1 0 0 1 1.414-1.414z"
            fill="skyblue"
        />
    </svg>
);

export const DocIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 0h10l4 4v12H2V0zm10 1H3v14h11V5h-2V1z"
            fill="purple"
        />
    </svg>
);

export const TxtIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 0h12v16H2V0zm2 2h8v1H4V2zm0 3h8v1H4V5zm0 3h8v1H4V8zm0 3h5v1H4v-1z"
            fill="orange"
        />
    </svg>
);