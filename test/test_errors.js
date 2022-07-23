var rules = require("../multi_rules.js");
var payload = require("../payload.js");
var validate = require("../validator.js");

var assert = require("chai").assert;

var expect = require("chai").expect;
// var should = require("expect");
describe("Multi error", function () {
    describe("Regex multi error", function () {
        result_regex = validate(
            payload_multi_regex,
            (validations = multi_rules_regex)
        );

        it("Return list of regex errors", function () {
            assert.typeOf(result_regex, "array");
            assert.equal(result_regex.length, 3);
        });

        it("Return Error Code", function () {
            expect(result_regex[0]).to.haveOwnProperty("code");
            expect(result_regex[0]).to.haveOwnProperty("message");
        });
    });

    describe("Date Multi error", function () {
        result_date = validate(payload_date, (validations = multi_rules_date));

        it("Return list of Date errors", function () {
            assert.typeOf(result_date, "array");
            assert.equal(result_date.length, 2);
        });
        it("Return list of error", function () {
            assert.include(result_date[0].message, "after");
            assert.include(result_date[1].message, "before");
        });
    });
    describe("comparison multi error", function () {
        result_compare = validate(
            payload_multi_regex,
            (validations = multi_rules_compare)
        );
        it("Return list of comparison error",function () {
            assert.typeOf(result_compare, "array");
            assert.equal(result_compare.length, 2);
        });
        it("Return list of errors", function () {
            assert.include(result_compare[0].message, "bigger");
            assert.include(result_compare[1].message, "smaller"); 
        })
    });
});
