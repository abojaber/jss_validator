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
module.exports = {
    regex_digit: regex_number,
    regex_price: regex_float,
    regex_text: regex_email,
    regex_mb: regex_mobile,
};
