regex_number = {
    age: {
        required: true,
        roles: [
            {
                regex: /^\d{2,2}$/,
                condition: "regex",
                error: "NB0001",
                message: "Digit should be 3",
            },
        ],
    },
};
regex_float = {
    price: {
        required: true,
        roles: [
            {
                condition: "regex",
                regex: /^\d+.?\d{0,2}$/,
                error: "FT0001",
                message: "This Field should be a decimal",
            },
        ],
    },
};
regex_email = {
    email: {
        required: true,
        roles: [
            {
                condition: "regex",
                regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                error: "ST0001",
                message: "This field should be Email",
            },
        ],
    },
};
regex_mobile = {
    mobile: {
        required: true,
        roles: [
            {
                condition: "regex",
                regex: /^(009665)\d{8}$/,
                error: "MB0001",
                message: "The Field should be mobile number",
            },
        ],
    },
};
number_bigger = {
    age: {
        required: true,
        roles: [
            {
                condition: "bigger_than",
                value: 200,
                error: "CM0001",
                message: "numbers not bigger than 200",
            },
        ],
    },
};
number_smaller = {
    age: {
        required: true,
        roles: [
            {
                condition: "smaller_than",
                value: 20,
                error: "CM0002",
                message: "Number not smaller than 10",
            },
        ],
    },
};
date_before = {
    birthday: {
        required: true,
        roles: [
            {
                condition: "after_date",
                date: new Date(),
                error: "DT0001",
                message: "%1 is not after %2",
            },
        ],
    },
};

date_after = {
    next_visit: {
        required: true,
        roles: [
            {
                condition: "before_date",
                date: new Date(),
                error: "DT0002",
                message: "%1 is not after %2",
            },
        ],
    },
};
module.exports = {
    regex_digit: regex_number,
    regex_price: regex_float,
    regex_text: regex_email,
    regex_mb: regex_mobile,
};
