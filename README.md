# Javascript simple object validator

## Scope

This project aim to provide you with simple validator to use it against json. mainly I wrote this script to simplify apigee payload validation. APIGEE has some limitations that prevent using external libraries.

## using this script

-   this script consist of 3 files `payload.js` which use only for simulate HTTP payload, `vaildation_roles.js` containing roles for each fields and `validator.js` file. `validator.js` file is the core file that will process the validations.
-   remove debug section in `validation.js` file header, Lines: 1-9, before using script
    `TODO:// update the include steps`
-   review export section (last 3 lines in `validation_roles.js`)

### to use this script in APIGEE

1. make a javascript file to export validation roles for payload.
1. make a javascript include content of `validator.js`.
1. update `generateError` function to export the error to your prefer format and variable.

### Regex Validation

An easy simple way to make validation is using regex and below some sample for it.

#### Samples

-   Float number with 2 decimal digit `^\d+\.?\d{0,2}$`
-   10 digits `^\d{10,10}$`
-   Saudi Mobile number `^(009665)\d{8}$`, `^(9665)\d{8}$` or `(\+9665)\d{8}$`
-   Email `^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`

#### Validate Number

sample for validate id number is 10 digits

-   ref commit: 5eba75bc12a0b807049870ba7e21c20bd5ce7d3f
-   also, check the sample from regex

#### validate String

sample for validate string is more than 3 char

-   ref commit: 63b86fdf11ea3a311525a340ddb8a437312df3ee
-   also, check the sample from regex

### Compare to fixed number

compare payload number with a number (fixed)

-   bigger_than ref: 3401b1e10a9c36d78d87cd8fa70806ef90d121d7

    ```javascript
            roles: [
            {
                condition: "bigger_than",
                value: 5,
                error: "AF003",
                message: "%s1 is not bigger than %s2",
            },
        ],
    ```

    message has 2 variable `%s1` will be replaced with field value `%s2` will be replaced by the comparison value.

-   smaller_than ref: b71e9ed45280038223ce203971d195eea242b7fa
-   compare with other field in payload `this is common`

    ```javascript
            roles: [
            {
                condition: "smaller_than",
                value: "bigger_than_five",
                error: "AF004",
                message: "%s1 is not smaller than %s2",
            },
        ],
    ```

    value here is a field name

### Validate Date

compare dates

-   date before ref: fca0d75392984bd4052cb1128e737f9db5dff1fa

    ```javascript
        roles: [
            {
                condition: "before_date",
                date: new Date("2005-02-02"),
                error: "AF004",
                message: "%s1 is not before %s2",
            },
        ],
    ```

-   date after ref: ff4b7d739887e97e57123603ec4e5b4d9e029656
-   date between 2 dates

### Validate Options (List)

provide a list of values separated by `|`

```javascript
        roles: [
            {
                condition: "in_list",
                value: "Male|Female",
                error: "AF004",
                message: "%s1 not in accepted values (%s2)",
            },
        ],
```

-   ref: 74772e545eda46e97248921f3e19e9047a27fb71

### Validate Number Range

-   ether use `in_list` condition or `bigger_than` and `smaller_than`

### Validate required fields

This will check if the field is not submitted (`undefined`) or its value is `null` including `""` & `"null"`

-   you have to check `validator.js` file.
