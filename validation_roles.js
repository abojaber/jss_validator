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
    next_visit: {
        required: true,
        roles: [
            {
                condition: "after_date",
                date: new Date(),
                error: "AF004",
                message: "%s1 is not after %s2",
            },
        ],
    },
    current_visit: {
        required: true,
        roles: [
            {
                condition: "after_date",
                date: "birth_day",
                error: "AF004",
                message: "%s1 is not after %s2",
            },
            {
                condition: "before_date",
                date: "next_visit",
                error: "AF004",
                message: "%s1 is not after %s2",
            },
        ],
    },
    sex: {
        required: true,
        roles: [
            {
                condition: "in_list",
                value: "Male|Female",
                error: "AF004",
                message: "%s1 not in accepted values (%s2)",
            },
        ],
    },
    mid_number: {
        required: true,
        roles: [
            {
                condition: "bigger_than",
                value: "smaller_than_bigger",
                error: "AF004",
                message: "%s1 is not smaller than %s2",
            },
            {
                condition: "smaller_than",
                value: "bigger_than_five",
                error: "AF004",
                message: "%s1 is not smaller than %s2",
            },
        ],
    },
    random: {
        required: true,
        roles: [],
    },
};

module.export = {
    validations: validations,
};
