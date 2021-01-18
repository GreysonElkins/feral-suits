import React, {useState} from 'react'
import * as emailjs from 'emailjs-com'

import './Contact.scss'

const Contact:React.FC = () => {
  const [senderName, setSenderName] = useState<string>('')
  const [senderEmail, setSenderEmail] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [messageToUser, setMessageToUser] = useState<string>('')

  const messageFieldsAreEmpty = ():boolean => {
    const fields = [senderName, senderEmail, subject, message]
    return fields.some(field => field === '')
  }

  const checkEmail = () => {
    if (messageFieldsAreEmpty()) {
      setMessageToUser('Please fill out all the fields below before sending your message')
      timedResetMessageToUser()
    } else {
      sendEmail()
    }
  }

  const sendEmail = () => {
    let templateParams = {
      sender_name: senderName,
      sender_email: senderEmail,
      subject: subject,
      message: message
    }

    emailjs.send(
      'service_0tywxo4',
      'template_oj33iod',
      templateParams,
      'user_41TBLMXHJvoGaVfa49KFX'
    ).then(response => {
      if (response.status === 200) {
        setMessageToUser("Message sent! We'll get back to you as soon as possible")
        resetForm()
      } else {
        setMessageToUser('Something went wrong, please try again later, or message us on Facebook or Instagram')
      } 
    })
  }

  const resetForm = () => {
    setSenderName('')
    setSenderEmail('')
    setSubject('')
    setMessage('')
    timedResetMessageToUser()
  }
  
  const timedResetMessageToUser = () => {
    window.setTimeout(() => {
      setMessageToUser('')
    }, 3000)
  }

  return (
    <>
      <div className="message-to-user">{messageToUser}</div>
      <form 
        onSubmit={
          (event) => {
            event.preventDefault()
            checkEmail()
          }
        }
      >
        <label htmlFor="ContactName">
          Name:
        </label>
        <textarea 
          name="ContactName" 
          value={senderName}
          rows={1}
          onChange={
            (event) => {
              setSenderName(event.target.value)
              setMessageToUser('')
            }
          }
        />

        <label htmlFor="ContactEmail">
          Email:
        </label>
        <textarea 
          name="ContactEmail"
          value={senderEmail}
          rows={1}
          onChange={
            (event) => {
              setSenderEmail(event.target.value)
              setMessageToUser('')
            }
          } 
        />

        <label htmlFor="ContactSubject">
          Subject:
        </label>
        <textarea 
          name="ContactSubject" 
          value={subject}
          rows={1}
          onChange={
            (event) => {
              setSubject(event.target.value)
              setMessageToUser('')
            }
          }
        />
        <label htmlFor="ContactSubject">
          Message:
        </label>
        <textarea 
          name="ContactMessage" 
          value={message}
          rows={5}
          onChange={
            (event) => {
              setMessage(event.target.value)
              setMessageToUser('')
            }
          }
        />
        <input 
          className="email-submit"
          type="submit"
          value="Submit" 
        />
      </form>
    </>
  )
}

export default Contact