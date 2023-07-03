import client from '@sendgrid/client'

client.setApiKey(process.env.SENDGRID_API_KEY)

// TODO: send email confirmation to user
/**
 * This function handles a POST request to create a new contact and returns a success message if the
 * operation is successful.
 * @param req - The `req` parameter represents the HTTP request object, which contains information
 * about the incoming request such as the request method, headers, and body.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to set the status code, headers, and
 * send the response body.
 * @returns a response object with the appropriate status code and message depending on the conditions.
 * If the request method is 'POST' and the createNewContact operation is successful, it returns a
 * response with a status code of 201 and a message of 'operation successful'. If the createNewContact
 * operation fails, it throws an error and returns a response with a status code of 500 and the
 */
export default async function handler (req, res) {
  if (req.method === 'POST') {
    try {
      const wasoperationSuccessful = await createNewContact(req.body)
      if (wasoperationSuccessful) {
        return res.status(201).json({ message: 'operation successful' })
      }
      throw new Error('something went wrong')
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: e })
    }
  }
  res.status(405).json({ message: 'Method Not Allowed' })
}

/**
 * The function `createNewContact` is an asynchronous function that creates a new contact in Twilio Sendgrid
 * by making a PUT request to the SendGrid API.
 * @param contact - The `contact` parameter is an object that contains the information of the contact
 * to be created. It should have an `email` property which represents the email address of the contact.
 * @returns a boolean value of true if the contact was successfully added, and an Error object if
 * something went wrong while adding the contact.
 */
async function createNewContact (contact) {
  const data = {
    list_ids: [process.env.SENDGRID_NEWSLETTER_LIST_ID],
    contacts: [
      {
        email: contact.email
      }
    ]
  }

  const request = {
    url: '/v3/marketing/contacts',
    method: 'PUT',
    body: data
  }
  try {
    const res = await client.request(request)
    console.log(res)
    if (res.statusCode === 202) {
      return true
    }
    throw new Error('something went wrong while adding the contact')
  } catch (e) {
    console.log(e)
    return e
  }
}
