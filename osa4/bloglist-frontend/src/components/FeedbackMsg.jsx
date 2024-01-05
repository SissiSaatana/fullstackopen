const FeedbackMsg = ({ msg }) => {
  let msgStyle

  if (msg.msg === '')
    return

  msgStyle = {
    borderRadius: '5px',
    fontSize: 16,
    padding: '.4em'
  }

  if (msg.type ==='success') {
    msgStyle.border = '2px solid green'
    msgStyle.color =  'green'
  } else if (msg.type ==='error') {
    msgStyle.border = '2px solid red'
    msgStyle.color =  'red'
  }

  return (
    <p style={msgStyle}>{msg.msg}</p>
  )
}

export default FeedbackMsg