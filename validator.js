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
const parameterizedString = (str, params) => {
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
    return failure;
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
    errorList = new Array();
    var error = null;
    for (key in validations) {
        //check if field required
        if (validations[key].required) {
            if (
                typeof payload[key] == "undefined" ||
                payload[key] == null ||
                payload[key] == "" ||
                payload[key] == "null" // TODO: this should be highlighted and reviewed by end developer
            ) {
                error = generateError("CODE?", "field " + key + ": is required");
                errorList.push(error);
                return;
            }
        }
        try {
            validations[key].rules.forEach((rule) => {
                switch (rule.condition) {
                    case "regex":
                        if (!rule.regex.test(payload[key])) {
                            error = generateError(rule.error, rule.message);
                            errorList.push(error);
                        }
                        break;
                    case "bigger_than":
                        var vl =
                            typeof rule.value == "number"
                                ? rule.value
                                : GetPropertyValue(payload, rule.value);
                        if (!(payload[key] > vl)) {
                            error = generateError(
                                rule.error,
                                parameterizedString(rule.message, [
                                    payload[key],
                                    rule.value,
                                ])
                            );
                            errorList.push(error);
                        }
                        break;
                    case "smaller_than":
                        var vl =
                            typeof rule.value == "number"
                                ? rule.value
                                : GetPropertyValue(payload, rule.value);
                        if (!(payload[key] < vl)) {
                            error = generateError(
                                rule.error,
                                parameterizedString(rule.message, [
                                    payload[key],
                                    rule.value,
                                ])
                            );
                            errorList.push(error);
                        }
                        break;
                    case "before_date":
                        var dt = new Date(payload[key]);
                        var vl =
                            rule.date instanceof Date
                                ? rule.date
                                : GetPropertyValue(payload, rule.date);
                        if (!(new Date(vl).getTime() > dt.getTime())) {
                            error = generateError(
                                rule.error,
                                parameterizedString(rule.message, [
                                    payload[key],
                                    rule.date,
                                ])
                            );
                            errorList.push(error);
                        }
                        break;
                    case "after_date":
                        var dt = new Date(payload[key]);
                        var vl =
                            rule.date instanceof Date
                                ? rule.date
                                : GetPropertyValue(payload, rule.date);
                        if (!(new Date(vl).getTime() < dt.getTime())) {
                            error = generateError(
                                rule.error,
                                parameterizedString(rule.message, [
                                    payload[key],
                                    rule.date,
                                ])
                            );
                            errorList.push(error);
                        }
                        break;
                    case "in_list":
                        if (
                            !rule.value
                                .split("|")
                                .includes(String(payload[key]))
                        ) {
                            error = generateError(
                                rule.error,
                                parameterizedString(rule.message, [
                                    payload[key],
                                    rule.value,
                                ])
                            );
                            errorList.push(error);
                        }
                        break;
                    case "function":
                        id_type = GetPropertyValue(payload, rule.param); // TODO: simplify this
                        if (eval(rule.value)(id_type, payload[key])) {
                            error = generateError(
                                rule.error,
                                parameterizedString(rule.message, [
                                    payload[key],
                                    id_type,
                                ])
                            );
                            errorList.push(error);
                        }
                        break;
                    case "required_if":
                        compared_to = GetPropertyValue(payload, rule.key);
                        if (compare(rule._condition, rule.value, compared_to)) {
                            if (!isExist(payload, key)) {
                                message = parameterizedString(rule.message, [
                                    key,
                                    rule.key,
                                ]);
                                error = generateError(rule.error, message);
                                errorList.push(error);
                            }
                        }
                }
            });
            if (errorList.length != 0){ 
                return errorList;
            }
        } catch (e) {
            return error;
        }
    }
};
module.exports = validate;
