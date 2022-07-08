var roles = require("../rule_samples.js");
var payload = require("../payload_samples.js");
var validate = require("../validator.js");

var assert = require("assert");

describe("Regex validation: ", function () {
    describe("Number:", function () {
        it("Generate Error if not exact 2 digit", function () {
            assert.equal(
                validate(
                    (payload = sample_payload_1),
                    (validations = regex_number)
                )[0].code,
                "NB0001"
            );
        });
        it("Generate Error if not currency", function () {
            assert.equal(
                validate(
                    (payload = sample_payload_1),
                    (validations = regex_float)
                )[0].code,
                "FT0001"
            );
        });
    });
    describe("Text:", function () {
        it("Generate Error if not email", function () {
            assert.equal(
                validate((payload = sample_payload_2), (validations = regex_email))[0]
                    .code,
                "ST0001"
            );
        });
        it("Generate error if not a saudi mobile number", function () {
            assert.equal(
                validate((payload = sample_payload_2), (validations = regex_mobile))[0]
                    .code,
                "MB0001"
            );
        });
    });
});
describe("Numbers", function () {
    it("Generate error if field not equal expected");
    it("Generate error if field less than fixed number", function () {
        assert.equal(
            validate(
                (payload = sample_payload_1),
                (validations = number_smaller)
            )[0].code,
            "CM0002"
        );
    });
    it("Generate error if field more than expected", function () {
        assert.equal(
            validate((payload = sample_payload_1), (validations = number_bigger))[0]
                .code,
            "CM0001"
        );
    });
});

describe("Dates", function () {
    it("Generate error if field is before expected", function () {
        assert.equal(
            validate((payload = sample_payload_3), (validations = date_before))[0]
                .code,
            "DT0001"
        );
    });
    it("Generate error if field is after expected", function () {
        assert.equal(
            validate((payload = sample_payload_3), (validations = date_after))[0].code,
            "DT0002"
        );
    });
});

describe("Customized by function", function () {
    it("Generate error based on function return ", function () {
        assert.equal(
            validate((payload = sample_payload_4), (validations = use_function))[0].code,
            "FN0001"
        );
    });
});
describe("Required based on other field value", function () {
    it("Generate error if field equal value", function () {
        assert.equal(
            validate((payload = sample_payload_4), (validations = required_if_equal))
            [0].code,
            "RQ0001"
        );
    });
    it("Generate error if field greater than value", function () {
        assert.equal(
            validate(
                (payload = sample_payload_1),
                (validations = required_if_gt)
            )[0].code,
            "RQ0002"
        );
    });
    it("Generate error if field greater than or equal value", function () {
        assert.equal(
            validate(
                (payload = sample_payload_1),
                (validations = required_if_gte)
            )[0].code,
            "RQ0002"
        );
    });
    it("Generate error if field lest than value", function () {
        assert.equal(
            validate(
                (payload = sample_payload_1),
                (validations = required_if_lt)
            )[0].code,
            "RQ0003"
        );
    });
    it("Generate error if field lest than or equal value", function () {
        assert.equal(
            validate(
                (payload = sample_payload_1),
                (validations = required_if_lte)
            )[0].code,
            "RQ0004"
        );
    });
    it("Generate error if field in a defined list", function () {
        assert.equal(
            validate((payload = sample_payload_4), (validations = required_if_in))[0].code,
            "RQ0005"
        );
    });
});
