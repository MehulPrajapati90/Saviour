interface AudioPlayerProps {
    src?: string;
    className?: string;
}

export const AudioPlayer = ({ src, className }: AudioPlayerProps) => {
    if (!src) return null;

    return (
        <div className={`flex items-center gap-2 bg-[#f5f5f5] rounded-md p-2 ${className}`}>
            {/* Optional: Audio Icon */}
            {/* <AudioIcon className="w-5 h-5 text-green-500" /> */}

            {/* Audio Player */}
            <audio controls className="w-full h-8 bg-transparent">
                <source src={src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};