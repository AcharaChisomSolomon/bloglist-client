import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    const { message, status } = notification

    return (
        <div className={status}>
            {message}
        </div>
    )
}

Notification.propTypes = {
    notification: PropTypes.object
}

export default Notification