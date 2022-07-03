validations = {
    id_number: {
        required: true,
        roles: [
            {
                regex: /^\d{10,10}$/,
                condition: "regex",
                error: "AF0001",
                message: "field should 10 digits",
            },
        ],
    },
    name: {
        required: false,
        roles: [
            {
                regex: /\w{3,10}/,
                condition: "regex",
                error: "AF0002",
                message: "name not correct",
            },
        ],
    },
    bigger_than_five: {
        required: true,
        roles: [
            {
                condition: "bigger_than",
                value: 5,
                error: "AF003",
                message: "%s1 is not bigger than %s2",
            },
        ],
    },
    smaller_than_five: {
        required: true,
        roles: [
            {
                condition: "smaller_than",
                value: 11,
                error: "AF004",
                message: "%s1 is not smaller than %s2",
            },
        ],
    },
};

module.export = {
    validations: validations,
};
