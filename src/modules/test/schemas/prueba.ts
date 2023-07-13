const schema : Schema = {

    type: "object",

    rules: {

        "username.name": {
            required: true,
            type: "string"
        }

    },

    messages: {
        // "username": {
        //     required: "Esta propiedad es requerida"
        // }
    }

}

export default schema