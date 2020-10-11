import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notificationMessage, notificationColor }) => {
  const notificationStyle= {
    color: notificationColor,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  if (notificationMessage === null || notificationMessage==='') {
    return null
  }

  return (
    <div style={notificationStyle}>
      {notificationMessage}
    </div>
  )
}

Notification.propTypes={
  notificationMessage:PropTypes.string.isRequired,
  notificationColor:PropTypes.string.isRequired
}
export default Notification
