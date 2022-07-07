var roles = require("../roles.js");
var payload = require("../payload.js");
var validate = require("../validator.js");

var assert = require("assert");

describe("⚪️Regex validation: ", function () {
    describe("Number:", function () {
        it("Generate Error if not exact 2 digit", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = regex_number)
                ).message,
                "age field should be 2 digit"
            );
        });
        it("Generate Error if not currency", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = regex_float)
                ).message,
                "price Field should be a decimal"
            );
        });
    });
    describe("Text:", function () {
        it("Generate Error if not email", function () {
            assert.equal(
                validate((payload = payload_text), (validations = regex_email))
                    .message,
                "email field should be valid Email"
            );
        });
        it("Generate error if not a saudi mobile number", function () {
            assert.equal(
                validate((payload = payload_text), (validations = regex_mobile))
                    .message,
                "mobile Field should be valid saudi mobile"
            );
        });
    });
});
describe("⚪️Numbers", function () {
    it("Generate error if field not equal expected", function () {
        assert.equal(
            validate((payload = payload_numbers), (validations = number_equal))
                .message,
            "age value is not equal 13"
        );
    });
    it("Generate error if field less than fixed number", function () {
        assert.equal(
            validate(
                (payload = payload_numbers),
                (validations = number_smaller)
            ).message,
            "age value is not smaller than 20"
        );
    });
    it("Generate error if field more than expected", function () {
        assert.equal(
            validate((payload = payload_numbers), (validations = number_bigger))
                .message,
            "age value is not bigger than 200"
        );
    });
});

describe("Dates", function () {
    it("Generate error if field is before expected", function () {
        assert.equal(
            validate((payload = payload_date), (validations = date_before))
                .code,
            "DT0001"
        );
    });
    it("Generate error if field is after expected", function () {
        assert.equal(
            validate((payload = payload_date), (validations = date_after)).code,
            "DT0002"
        );
    });
});

describe("⚪️Customized by function", function () {
    it("Generate error based on function return ", function () {
        assert.equal(
            validate((payload = func_val), (validations = use_function)).code,
            "FN0001"
        );
    });
});
describe("⚪️Required based on other field value", function () {
    it("Generate error if field equal value", function () {
        assert.equal(
            validate((payload = func_val), (validations = required_if_equal))
                .message,
            "iqama_number field is required if id_type is IQA"
        );
    });
    it("Generate error if field greater than value", function () {
        assert.equal(
            validate(
                (payload = payload_numbers),
                (validations = required_if_gt)
            ).message,
            "discount field is required if age value is greater than 200"
        );
    });
    it("Generate error if field greater than or equal value", function () {
        assert.equal(
            validate(
                (payload = payload_numbers),
                (validations = required_if_gte)
            ).message,
            "discount field is required if age value is greater than or equal 103"
        );
    });
    it("Generate error if field lest than value", function () {
        assert.equal(
            validate(
                (payload = payload_numbers),
                (validations = required_if_lt)
            ).message,
            "discount field is required if age value is less than 10"
        );
    });
    it("Generate error if field less than or equal value", function () {
        assert.equal(
            validate(
                (payload = payload_numbers),
                (validations = required_if_lte)
            ).message,
            "discount field is required if age value is less than or equal to 103"
        );
    });
    it("Generate error if field in a defined list", function () {
        assert.equal(
            validate((payload = func_val), (validations = required_if_in))
                .message,
            "discount field is required based if id_type in ABC|IQA"
        );
    });
});
