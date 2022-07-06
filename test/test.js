// var validator = require("../validator");
// var payload = require("../payload.js");
var validate = require("../validator.js");
payload = {
    id_number: 10101010,
};

var assert = require("assert");
// console.log(validate(payload, roles));
describe("Regix validation ", function () {
    describe("check By Error Code", function () {
        it("count digits", function () {
            assert.equal(
                validate(payload, {
                    id_number: {
                        required: true,
                        roles: [
                            {
                                regex: /^\d{10,10}$/,
                                condition: "regex",
                                error: "AF0001",
                                message: "field should 10 digits",
                            },
                        ],
                    },
                }).code,
                "AF0001"
            );
        });
    });
});
