var roles = require("../roles.js");
var payload = require("../payload.js");
var validate = require("../validator.js");

var assert = require("assert");

describe("Regex validation: ", function () {
    describe("Number:", function () {
        it("Generate Error if not exact 2 digit", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = regex_number)
                ).code,
                "NB0001"
            );
        });
        it("Generate Error if not currency", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = regex_float)
                ).code,
                "FT0001"
            );
        });
    });
    describe("Text:", function () {
        it("Generate Error if not email", function () {
            assert.equal(
                validate((payload = payload_text), (validations = regex_email))
                    .code,
                "ST0001"
            );
        });
        it("Generate error if not a saudi mobile number", function () {
            assert.equal(
                validate((payload = payload_text), (validations = regex_mobile))
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
                (payload = payload_numbers),
                (validations = number_smaller)
            ).code,
            "CM0002"
        );
    });
    it("Generate error if field more than expected", function () {
        assert.equal(
            validate((payload = payload_numbers), (validations = number_bigger))
                .code,
            "CM0001"
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

describe("Customized by function", function () {
    it("Generate error based on function return ");
});
describe("Required", function () {
    it("Generate error if field equal value");
    it("Generate error if field greater than value");
    it("Generate error if field greater than or equal value");
    it("Generate error if field lest than value");
    it("Generate error if field lest than or equal value");
    it("Generate error if field in a defined list");
});
