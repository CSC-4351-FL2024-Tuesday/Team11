import { ADD_EVENT_TO_USER_URL, UPDATE_EVENT_RSVP } from "./apiConfig";

export async function CreateEvent(email, eventData) {
    try {
        const response = await fetch(ADD_EVENT_TO_USER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                eventData: eventData,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add store');
        }

        console.log('Store added successfully');
    } catch (error) {
        console.error('Error adding store:', error.message);
    }

}


export async function UpdateRSVP(eventName) {
    try {
      console.log("ABRACADA")
      const response = await fetch(UPDATE_EVENT_RSVP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: eventName,
        }),
      });

      console.log("res")
      if (!response.ok) {
        throw new Error('Failed to add event rsvp');
      }

      console.log('rsvp added successfully');
    } catch (error) {
      console.error('Error adding store revenue:', error.message);
    }

  }
