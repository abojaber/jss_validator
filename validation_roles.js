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
    smaller_than_eleven: {
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
    smaller_than_bigger: {
        required: true,
        roles: [
            {
                condition: "smaller_than",
                value: "bigger_than_five",
                error: "AF004",
                message: "%s1 is not smaller than %s2",
            },
        ],
    },
    birth_day: {
        required: true,
        roles: [
            {
                condition: "before_date",
                date: new Date("2005-02-02"),
                error: "AF004",
                message: "%s1 is not before %s2",
            },
        ],
    },
};

module.export = {
    validations: validations,
};
