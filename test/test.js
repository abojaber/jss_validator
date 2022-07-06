var roles = require("../roles.js");
var payload = require("../payload.js");
var validate = require("../validator.js");

console.log(payload_text);

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
    });
});
