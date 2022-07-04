// Debug
require("./payload.js");
require("./validation_roles");
console.log("Debug: validations: ");
console.log(validations);
console.log("Debug: payload");
console.log(payload);
console.log("===========================================================");
// End Debug

// START VALIDATOR SCRIPT FROM HERE
// HELPERS
/***
 * @example parameterizedString("my name is %s1 and surname is %s2", "John", "Doe");
 * @return "my name is John and surname is Doe"
 *
 * @firstArgument {String} like "my name is %s1 and surname is %s2"
 * @otherArguments {String | Number}
 * @returns {String}
 */
const parameterizedString = (...args) => {
    const str = args[0];
    const params = args.filter((arg, index) => index !== 0);
    if (!str) return "";
    return str.replace(/%s[0-9]+/g, (matchedStr) => {
        const variableIndex = matchedStr.replace("%s", "") - 1;
        return params[variableIndex];
    });
};

// https://stackoverflow.com/questions/37510640/how-to-get-property-value-from-a-javascript-object
/**
 * return data of dataToRetrieve key in object
 * @param {*} object
 * @param {string} dataToRetrieve
 * @returns value
 */
function GetPropertyValue(object, dataToRetrieve) {
    dataToRetrieve.split(".").forEach(function (token) {
        if (object) object = object[token];
    });

    return object;
}

// END HELPERS
//
var validate = function (payload, validations) {
    for (key in validations) {
        //check if field required
        if (validations[key].required) {
            if (
                typeof payload[key] == "undefined" ||
                payload[key] == null ||
                payload[key] == "" ||
                payload[key] == "null" // TODO: this should be highlighted and reviewed by end developer
            ) {
                console.log("field " + key + ": is required");
            }
        }
        validations[key].roles.forEach((role) => {
            switch (role.condition) {
                case "regex":
                    if (!role.regex.test(payload[key])) {
                        console.log(role.error + ": " + role.message);
                    }
                    break;
                case "bigger_than":
                    var vl =
                        typeof role.value == "number"
                            ? role.value
                            : GetPropertyValue(payload, role.value);
                    if (!(payload[key] > vl)) {
                        console.log(
                            parameterizedString(
                                role.message,
                                payload[key],
                                role.value
                            )
                        );
                    }
                    break;
                case "smaller_than":
                    var vl =
                        typeof role.value == "number"
                            ? role.value
                            : GetPropertyValue(payload, role.value);
                    if (!(payload[key] < vl)) {
                        console.log(
                            parameterizedString(
                                role.message,
                                payload[key],
                                role.value
                            )
                        );
                    }
                    break;
                case "before_date":
                    var dt = new Date(payload[key]);
                    var vl =
                        role.date instanceof Date
                            ? role.date
                            : GetPropertyValue(payload, role.date);
                    if (!(new Date(vl).getTime() > dt.getTime())) {
                        console.log(
                            parameterizedString(
                                role.message,
                                payload[key],
                                role.date
                            )
                        );
                    }
                    break;
                case "after_date":
                    var dt = new Date(payload[key]);
                    var vl =
                        role.date instanceof Date
                            ? role.date
                            : GetPropertyValue(payload, role.date);
                    if (!(new Date(vl).getTime() < dt.getTime())) {
                        console.log(
                            parameterizedString(
                                role.message,
                                payload[key],
                                role.date
                            )
                        );
                    }
                    break;
                case "in_list":
                    if (!role.value.split("|").includes(String(payload[key]))) {
                        console.log(
                            parameterizedString(
                                role.message,
                                payload[key],
                                role.value
                            )
                        );
                    }
                    break;
            }
        });
    }
};
// END VALIDATOR SCRIPT

// Execute the test
validate(payload, validations);
