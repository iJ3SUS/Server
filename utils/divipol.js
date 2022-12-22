import axios from 'axios'

const getCities = async () => {

    try {

        const config = {
            headers: {
                'X-Authorization': 'huDQa55syGOgZ0igoIQYWL5MlOoWWwvOdimrDHihqHNJS1rbYG6VRq8eYqHmQvTR',
                'internal': 'Token $2y$10$pQRVR5fJHB8Xo5YLy4ChBu9lLglobnBEMGlQTCywET8cVRO3yUJZu',
                'Authorization': 'Bearer divipol',
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.get('https://bcs-orc.bellpi.co/api/divipol/municipios', config)

        const data = response.data.data[0]['response']['data']

        return data 

    } catch (error) {

        return null
    }

}

export {
    getCities
}