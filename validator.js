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
var validate = function (payload, validations) {
  for (key in validations) {
    validations[key].roles.forEach((role) => {
      switch (role.condition) {
        case "regex":
          if (!role.regex.test(payload[key])) {
            console.log(role.error + ": " + role.message);
          }
          break;
      }
    });
  }
};
// END VALIDATOR SCRIPT

// Execute the test
validate(payload, validations);
