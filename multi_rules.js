multi_rules_regex = {
    config: {
        report: "LIST", // if not list validator should return single result
    },
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
multi_rules_date = {
    config: {
        report: "LIST",
    },
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
        next_visit: {
            required: true,
            rules: [
                {
                    condition: "before_date",
                    date: new Date(),
                    error: "DT0002",
                    message: "%1 is not before %2",
                },
            ],
        },
    },
};
multi_rules_compare = {
    config: {
        report: "LIST",
    },
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
        price: {
            required: true,
            rules: [
                {
                    condition: "smaller_than",
                    value: 2,
                    error: "CM0002",
                    message: "age value is not smaller than %s2",
                },
            ],
        },
    },
};

multi_rules_in_list = {
    config: { report: "LIST" },
    fields: {
        sex: {
            required: true,
            rules: [
                {
                    condition: "in_list",
                    value: "Male|Female",
                    error: "AF004",
                    message: "%s1 not in accepted values (%s2)",
                },
            ],
        },
        price: {
            required: true,
            rules: [
                {
                    condition: "smaller_than",
                    value: 1,
                    error: "CM0002",
                    message: "age value is not smaller than %s2",
                },
            ],
        },
    },
};
multi_rules_function = {
    config: { report: "LIST" },
    fields: {
        id_type: {
            required: true,
            rules: [
                {
                    condition: "function",
                    value: "validate_id_type",
                    param: "id_type",
                    error: "AF001A",
                    message: "id_number (%s1) is not correct id_type (%s2)",
                },
            ],
        },
        id_number: {
            required: true,
            rules: [
                {
                    condition: "in_list",
                    value: "Male|Female",
                    error: "AF004",
                    message: "%s1 not in accepted values (%s2)",
                },
            ],
        },
    },
};

multi_rules_if = {
    config: { report: "LIST" },
    fields: {
        id_code: {
            required: false, // TODO: remove this condition
            rules: [
                {
                    condition: "required_if",
                    error: "RQ0001",
                    key: "id_type",
                    _condition: "in",
                    value: "NIN|BRN",
                    message: "%s1 field is required based on %s2 value",
                },
            ],
        },
        age: {
            required: false,
            rules: [
                {
                    condition: "smaller_than",
                    value: 1,
                    error: "CM0002",
                    message: "age value is not smaller than %s2",
                },
            ],
        },
    },
};


multi_rule_compare_with = {
    config: { report: "LIST" },
    fields: {
        id_number: {
            required: false, // TODO: remove this condition
            rules: [
                {
                    condition: "compare_with",
                    error: "RQ0001",
                    _condition: "lt",
                    value: 10101010,
                    message: "%s1 value is not less than %s2",
                },
            ],
        },
        age: {
            required: false,
            rules: [
                {
                    condition: "smaller_than",
                    value: 1,
                    error: "CM0002",
                    message: "age value is not smaller than %s2",
                },
            ],
        },
    },
};


module.exports = {
    multi_rules_regex: this.multi_rules_regex,
    multi_rules_date: this.multi_rules_date,
    multi_rules_in_list: this.multi_rules_in_list,
};
