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
module.exports = {
    multi_rules_regex: this.multi_rules_regex,
    multi_rules_date: this.multi_rules_date,
};
