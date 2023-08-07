const schema : Schema = {

    type: "object",

    rules: {

        "username.name": {
            required: true,
            type: "string"
        }

    },

    messages: {
        "username.name": {
            type: "Esta aleatorio"
        }
    }

}

export default schema