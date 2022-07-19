regex_number = {
    config: {},
    fields: {
        age: {
            required: true,
            rules: [
                {
                    regex: /^\d{2,2}$/,
                    condition: "regex",
                    error: "NB0001",
                    message: "age field should be 2 digit",
                },
            ],
        },
    },
};
regex_float = {
    config: {},
    fields: {
        price: {
            required: true,
            rules: [
                {
                    condition: "regex",
                    regex: /^\d+.?\d{0,2}$/,
                    error: "FT0001",
                    message: "price Field should be a decimal",
                },
            ],
        },
    },
};
regex_email = {
    config: {},
    fields: {
        email: {
            required: true,
            rules: [
                {
                    condition: "regex",
                    regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    error: "ST0001",
                    message: "email field should be valid Email",
                },
            ],
        },
    },
};
regex_mobile = {
    config: {},
    fields: {
        mobile: {
            required: true,
            rules: [
                {
                    condition: "regex",
                    regex: /^(009665)\d{8}$/,
                    error: "MB0001",
                    message: "mobile Field should be valid saudi mobile",
                },
            ],
        },
    },
};
number_equal = {
    config: {},
    fields: {
        age: {
            required: true,
            rules: [
                {
                    condition: "compare_with",
                    _condition: "is",
                    value: 13,
                    error: "CM0001",
                    message: "%s1 value is not equal %s2",
                },
            ],
        },
    },
};
number_bigger = {
    config: {},
    fields: {
        age: {
            required: true,
            rules: [
                {
                    condition: "bigger_than",
                    value: 200,
                    error: "CM0001",
                    message: "%s1 value is not bigger than %s2",
                },
            ],
        },
    },
};
number_smaller = {
    config: {},
    fields: {
        age: {
            required: true,
            rules: [
                {
                    condition: "smaller_than",
                    value: 20,
                    error: "CM0002",
                    message: "age value is not smaller than %s2",
                },
            ],
        },
    },
};
date_before = {
    config: {},
    fields: {
        birthday: {
            required: true,
            rules: [
                {
                    condition: "after_date",
                    date: new Date(),
                    error: "DT0001",
                    message: "%1 is not after %2",
                },
            ],
        },
    },
};

date_after = {
    config: {},
    fields: {
        next_visit: {
            required: true,
            rules: [
                {
                    condition: "before_date",
                    date: new Date(),
                    error: "DT0002",
                    message: "%1 is not after %2",
                },
            ],
        },
    },
};

use_function = {
    config: {},
    fields: {
        id_number: {
            required: true,
            rules: [
                {
                    condition: "function",
                    value: "validate_id_type",
                    param: "id_type",
                    error: "FN0001",
                    message: "id_number (%s1) is not correct id_type (%s2)",
                },
            ],
        },
    },
};

required_if_equal = {
    config: {},
    fields: {
        iqama_number: {
            required: false,
            rules: [
                {
                    condition: "required_if",
                    error: "RQ0001",
                    key: "id_type",
                    _condition: "is",
                    value: "IQA",
                    message: "%s1 field is required if %s2 is %s3",
                },
            ],
        },
    },
};
required_if_gt = {
    config: {},
    fields: {
        discount: {
            required: false,
            rules: [
                {
                    condition: "required_if",
                    error: "RQ0002",
                    key: "age",
                    _condition: "gt",
                    value: 200,
                    message:
                        "%s1 field is required if %s2 value is greater than %s3",
                },
            ],
        },
    },
};
required_if_gte = {
    config: {},
    fields: {
        discount: {
            required: false,
            rules: [
                {
                    condition: "required_if",
                    error: "RQ0002",
                    key: "age",
                    _condition: "gte",
                    value: 103,
                    message:
                        "%s1 field is required if %s2 value is greater than or equal %s3",
                },
            ],
        },
    },
};

required_if_lt = {
    config: {},
    fields: {
        discount: {
            required: false,
            rules: [
                {
                    condition: "required_if",
                    error: "RQ0003",
                    key: "age",
                    _condition: "lt",
                    value: 10,
                    message:
                        "%s1 field is required if age value is less than 10",
                },
            ],
        },
    },
};
required_if_lte = {
    config: {},
    fields: {
        discount: {
            required: false,
            rules: [
                {
                    condition: "required_if",
                    error: "RQ0004",
                    key: "age",
                    _condition: "lte",
                    value: 103,
                    message:
                        "%s1 field is required if %s2 value is less than or equal to %s3",
                },
            ],
        },
    },
};
required_if_in = {
    config: {},
    fields: {
        discount: {
            required: false,
            rules: [
                {
                    condition: "required_if",
                    error: "RQ0005",
                    key: "id_type",
                    _condition: "in",
                    value: "ABC|IQA",
                    message: "%s1 field is required based if %s2 in %s3",
                },
            ],
        },
    },
};
module.exports = {
    regex_digit: regex_number,
    regex_price: regex_float,
    regex_text: regex_email,
    regex_mb: regex_mobile,
};
