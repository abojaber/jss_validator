var rules = require("../rules.js");
var payload = require("../payload.js");
var validate = require("../validator.js");

var assert = require("assert");

describe("Single error report: ", function () {
    describe("\033[33m⎻ \033[0mNumber:", function () {
        it("regex: generate Error if not exact 2 digit", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = regex_number)
                ).message,
                "age field should be 2 digit"
            );
        });
        it("regex: generate Error if not currency", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = regex_float)
                ).message,
                "price Field should be a decimal"
            );
        });
    });
    describe("\033[33m⎻ \033[0mText:", function () {
        it("regex: generate Error if not email", function () {
            assert.equal(
                validate((payload = payload_text), (validations = regex_email))
                    .message,
                "email field should be valid Email"
            );
        });
        it("regex: generate error if not a saudi mobile number", function () {
            assert.equal(
                validate((payload = payload_text), (validations = regex_mobile))
                    .message,
                "mobile Field should be valid saudi mobile"
            );
        });
    });

    describe("\033[33m⎻ \033[0mNumbers", function () {
        it("compare_with: generate error if field not equal expected", function () {
            assert.equal(
                validate((payload = payload_numbers), (validations = number_equal))
                    .message,
                "age value is not equal 13"
            );
        });
        it("compare_with: generate error if field less than fixed number", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = number_smaller)
                ).message,
                "age value is not smaller than 20"
            );
        });
        it("compare_with: generate error if field more than expected", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = number_bigger)
                ).message,
                "age value is not bigger than 200"
            );
        });
    });

    describe("\033[33m⎻ \033[0mDates", function () {
        it("Date: generate error if field is before expected", function () {
            assert.equal(
                validate((payload = payload_date), (validations = date_before))
                    .code,
                "DT0001"
            );
        });
        it("Date: generate error if field is after expected", function () {
            assert.equal(
                validate((payload = payload_date), (validations = date_after)).code,
                "DT0002"
            );
        });
    });

    describe("\033[33m⎻ \033[0mCustomized by function", function () {
        it("Function: generate error based on function return ", function () {
            assert.equal(
                validate((payload = func_val), (validations = use_function)).code,
                "FN0001"
            );
        });
    });
    describe("\033[33m⎻ \033[0mRequired based on other field value", function () {
        it("required_if: generate error if field equal value", function () {
            assert.equal(
                validate((payload = func_val), (validations = required_if_equal))
                    .message,
                "iqama_number field is required if id_type is IQA"
            );
        });
        it("required_if: generate error if field greater than value", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = required_if_gt)
                ).message,
                "discount field is required if age value is greater than 200"
            );
        });
        it("required_if: generate error if field greater than or equal value", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = required_if_gte)
                ).message,
                "discount field is required if age value is greater than or equal 103"
            );
        });
        it("required_if: generate error if field lest than value", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = required_if_lt)
                ).message,
                "discount field is required if age value is less than 10"
            );
        });
        it("required_if: generate error if field less than or equal value", function () {
            assert.equal(
                validate(
                    (payload = payload_numbers),
                    (validations = required_if_lte)
                ).message,
                "discount field is required if age value is less than or equal to 103"
            );
        });
        it("required_if: generate error if field in a defined list", function () {
            assert.equal(
                validate((payload = func_val), (validations = required_if_in))
                    .message,
                "discount field is required based if id_type in ABC|IQA"
            );
        });
    });
});
