import { GET_ADDRESS } from "./apiConfig";

export async function getAddress(address) {
    let response = await fetch(GET_ADDRESS, {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            address: address
        }),
        method: 'POST',
    })
    if (response.ok) {
        const responseData = await response.json(); // Parse the response as JSON
        const aiResponseString = responseData.ai_response; // Get the nested string representation

        return aiResponseString
    } else {
        console.error('Failed to fetch data');
    }
}
