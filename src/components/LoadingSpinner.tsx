export default function LoadingSpinner({ text = "Loading..." }) {
    return (
        <div className="loading-spinner-container">
            <span className="loading-spinner"></span>
            <span className="loading-spinner-text">{text}</span>
        </div>
    );
}
