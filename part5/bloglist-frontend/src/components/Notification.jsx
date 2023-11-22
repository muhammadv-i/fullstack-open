import '../styles/Notification.css'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  return (
    <div className="notification">
      <p>{ message }</p>
    </div>
  )
}

Notification.PropTypes = {
  message: PropTypes.string.isRequired
}

export default Notification