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
    var error = null;
    for (key in validations.fields) {
        //check if field required
        if (validations.fields[key].required) {
            if (
                typeof payload[key] == "undefined" ||
                payload[key] == null ||
                payload[key] == "" ||
                payload[key] == "null" // TODO: this should be highlighted and reviewed by end developer
            ) {
                return generateError("CODE?", "field " + key + ": is required");
            }
        }
        try {
            validations.fields[key].rules.forEach((rule) => {
                switch (rule.condition) {
                    case "regex":
                        if (!rule.regex.test(payload[key])) {
                            error = generateError(rule.error, rule.message);
                            throw BreakException;
                        }
                        break;
                    case "bigger_than":
                        var vl =
                            typeof rule.value == "number"
                                ? rule.value
                                : GetPropertyValue(payload, rule.value);
                        //TODO: use compare instead
                        if (!(payload[key] > vl)) {
                            error = generateError(
                                rule.error,
                                parameterizedString(rule.message, [
                                    key,
                                    rule.value,
                                ])
                            );
                            throw BreakException;
                        }
                        break;
                    case "smaller_than":
                        var vl =
                            typeof rule.value == "number"
                                ? rule.value
                                : GetPropertyValue(payload, rule.value);
                        //TODO: use compare instead
                        if (!(payload[key] < vl)) {
                            error = generateError(
                                rule.error,
                                parameterizedString(rule.message, [
                                    payload[key],
                                    rule.value,
                                ])
                            );
                            throw BreakException;
                        }
                        break;
                    case "before_date":
                        var dt = new Date(payload[key]);
                        var vl =
                            rule.date instanceof Date
                                ? rule.date
                                : GetPropertyValue(payload, rule.date);
                        if (!(new Date(vl).getTime() > dt.getTime())) {
                            //TODO: use compare instead
                            error = generateError(
                                rule.error,
                                parameterizedString(rule.message, [
                                    payload[key],
                                    rule.date,
                                ])
                            );
                            throw BreakException;
                        }
                        break;
                    case "after_date":
                        var dt = new Date(payload[key]);
                        var vl =
                            rule.date instanceof Date
                                ? rule.date
                                : GetPropertyValue(payload, rule.date);
                        if (!(new Date(vl).getTime() < dt.getTime())) {
                            //TODO: use compare instead
                            error = generateError(
                                rule.error,
                                parameterizedString(rule.message, [
                                    payload[key],
                                    rule.date,
                                ])
                            );
                            throw BreakException;
                        }
                        break;
                    case "in_list":
                        if (
                            rule.value.split("|").includes(String(payload[key]))
                        )
                            //TODO: use compare instead
                            break;
                        error = generateError(
                            rule.error,
                            parameterizedString(rule.message, [
                                payload[key],
                                rule.value,
                            ])
                        );
                        throw BreakException;

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
                            throw BreakException;
                        }
                        break;
                    case "required_if":
                        compared_to = GetPropertyValue(payload, rule.key);
                        if (compare(rule._condition, rule.value, compared_to)) {
                            if (isExist(payload, key)) break;
                            message = parameterizedString(rule.message, [
                                key,
                                rule.key,
                                rule.value,
                            ]);
                            error = generateError(rule.error, message);
                            throw BreakException;
                        }
                        break;
                    case "compare_with":
                        if (compare(rule._condition, payload[key], rule.value))
                            break;
                        message = parameterizedString(rule.message, [
                            key,
                            rule.value,
                        ]);
                        error = generateError(rule.error, message);
                        throw BreakException;
                }
            });
        } catch (e) {
            return error;
        }
    }
};
module.exports = validate;
