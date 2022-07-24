const { multi_rules_require_if } = require("../multi_rules.js");
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

    describe("In list multi error", function () {
       in_list = validate(
           payload_multi_regex,
           (validations = multi_rules_in_list)
       );
        it("Return list Of \"In list\" errors", function () {
           assert.typeOf(in_list, "array");
           assert.equal(in_list.length, 2);
        }); 
        it("Return list of errors", function () {
            assert.include(in_list[0].message, "Male|Female");
            assert.include(in_list[1].message, "smaller");
        });
    });
    describe("Function multi erro", function () {
        func_rule = validate(
            payload_multi_function,
            (validations = multi_rules_function)
        );
        it('Return list Of "function" errors', function () {
            assert.typeOf(func_rule, "array");
            assert.equal(func_rule.length, 2);
        });
        it("Return list of errors", function () {
            assert.include(func_rule[0].message, "not correct id_type");
            assert.include(func_rule[1].message, "Male|Female");
        });
    });

    describe("require_if multi error", function () {

        require_if = validate(
            payload_multi_function,
            (validations = multi_rules_if)
        );

        it('Return list Of "require_if" errors', function () {
            assert.typeOf(require_if, "array");
            assert.equal(require_if.length, 2);
        });
        it("Return list of errors", function () {
            assert.include(require_if[0].message, "id_code field");
            assert.include(require_if[1].message, "age value is not smaller");
        });
    });    
    describe("compare_with multi error", function () {
        compare_with = validate(
            payload_multi_function,
            (validations = multi_rule_compare_with)
        );

        it('Return list Of "require_if" errors', function () {
            assert.typeOf(compare_with, "array");
            assert.equal(compare_with.length, 2);
        });
        it("Return list of errors", function () {
            assert.include(compare_with[0].message, "is not less than");
            assert.include(compare_with[1].message, "age value is not smaller");
        });
    });    
});
