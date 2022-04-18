
const SuccessNotification = ({ message }) => {
    if (message === null) {
        return null;
    }
    return (
        <div className="success-message">{message}</div>
    )
}

const ErrorNotification = ({ message }) => {
    if (message === null) {
        return null;
    }
    return (
        <div className="error-message">{message}</div>
    )
}

export { SuccessNotification, ErrorNotification }