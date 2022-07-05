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

/**
 * @return {structured single error}
 */
function generateError(code, message) {
    failure = {
        code: code,
        message: message,
    };
    console.log(JSON.stringify(failure));
}

/**
 * comparison function
 */

function compare(operator, left, right) {
    switch (operator) {
        case "is":
            return left == right;
        case "gt":
            return left > right;
        case "lt":
            return left < right;
        case "gte":
            return left >= right;
        case "lte":
            return left <= right;
        case "in":
            return left.split("|").includes(right);
    }
}
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
function validate_id_type(id_type, id_number) {
    switch (id_type) {
        case "NAT":
            return !/^(1)\d{9,9}$/.test(id_number);
        case "IQA":
            return !/^(4|2)\d{9,9}$/.test(id_number);
        default:
            return true;
    }
}
function isExist(payload, key) {
    return !(
        (
            typeof payload[key] == "undefined" ||
            payload[key] == null ||
            payload[key] == "" ||
            payload[key] == "null"
        ) // TODO: this should be highlighted and reviewed by end developer
    );
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
                        generateError(role.error, role.message);
                    }
                    break;
                case "bigger_than":
                    var vl =
                        typeof role.value == "number"
                            ? role.value
                            : GetPropertyValue(payload, role.value);
                    if (!(payload[key] > vl)) {
                        generateError(
                            role.error,
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
                        generateError(
                            role.error,
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
                        generateError(
                            role.error,
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
                        generateError(
                            role.error,
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
                        generateError(
                            role.error,
                            parameterizedString(
                                role.message,
                                payload[key],
                                role.value
                            )
                        );
                    }
                    break;
                case "function":
                    id_type = GetPropertyValue(payload, role.param); // TODO: simplify this
                    if (eval(role.value)(id_type, payload[key])) {
                        generateError(
                            role.error,
                            parameterizedString(
                                role.message,
                                payload[key],
                                id_type
                            )
                        );
                    }
                    break;
                case "required_if":
                    compared_to = GetPropertyValue(payload, role.key);
                    if (compare(role._condition, role.value, compared_to)) {
                        if (!isExist(payload, key)) {
                            message = parameterizedString(
                                role.message,
                                key,
                                role.key
                            );
                            generateError(role.error, message);
                        }
                    }
            }
        });
    }
};
// END VALIDATOR SCRIPT

// Execute the test
validate(payload, validations);
