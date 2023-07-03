import { useState } from 'react'
import { Formik } from 'formik'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ConfirmationModal from '@/components/Modal'

/* The code is defining a React functional component called `NewsLetterForm`.it renders a formik form component
with mui styling */
export default function NewsLetterForm (props) {
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({ title: '', content: '' })
  const initialValues = { email: '' }

  /**
   * The `submitHandler` function is an asynchronous function that handles the submission of a form by
   * making a POST request to an API endpoint and displaying a success or error message based on the
   * response.
   */
  const submitHandler = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      if (response.ok) {
        setModalData(prev => ({
          title: 'Thank You for Subscribing! ✨✨✨',
          content:
            "Congratulations! You're now part of this vibrant community. Get ready to embark on a journey of inspiration, insights, and exclusive content straight to your inbox. I'm thrilled to have you on board. Keep an eye on your email for exciting updates and occasional surprises. Welcome on board!"
        }))
      } else {
        throw new Error('error while sending')
      }
    } catch (e) {
      console.log(e)
      setModalData(prev => ({
        title: 'Subscription Unsuccessful',
        content:
          'I apologize for the inconvenience. It seems there was an issue processing your subscription request. Please check your network connection and try again. If the problem persists, kindly contact me for assistance. I appreciate your interest and hope to resolve this issue promptly. Thank you for your understanding.'
      }))
    } finally {
      toggleModal()
      setSubmitting(false)
    }
  }

  /**
   * The function `validateContactForm` is used to validate a contact form by checking if the email
   * field is empty or if it contains a valid email address.
   */
  const validateContactForm = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  }

  /**
   * The toggleModal function toggles the state of the openModal variable.
   */
  const toggleModal = () => {
    setOpenModal(prev => !prev)
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validateContactForm}
        onSubmit={submitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Stack
            component='form'
            onSubmit={handleSubmit}
            spacing={3}
            justifyContent='center'
            alignItems='center'
            {...props}
          >
            <TextField
              error={errors.email && touched.email}
              id='email'
              label='Your Email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.email && touched.email ? errors.email : ''}
              sx={{
                width: 1,
                '.MuiInputBase-input': { backgroundColor: 'white.main' }
              }}
            />
            <Button type='submit' disabled={isSubmitting} variant='contained'>
              Subscribe
            </Button>
          </Stack>
        )}
      </Formik>
      <ConfirmationModal
        open={openModal}
        handler={toggleModal}
        data={modalData}
      />
    </>
  )
}
