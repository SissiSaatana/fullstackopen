import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const isEmpty = obj => {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  
    return true;
  }
  
  if (isEmpty(notification)) return null

  return (
    <div style={style}>
      {notification.action} {notification.content}
    </div>
  )
}

export default Notification
