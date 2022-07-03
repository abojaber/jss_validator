# Javascript simple object validator

## Scope

This project aim to provide you with simple validator to use it against json. mainly I wrote this script to simplify apigee payload validation. APIGEE has some limitations that prevent using external libraries.

## using this script

### Regix Validation

An easy simple way to make validation is using regix and below some sample for it.

#### Validate Number

sample for validate id number is 10 digits

-   ref commit: 5eba75bc12a0b807049870ba7e21c20bd5ce7d3f

#### validate String

sample for validate string is more than 3 char

-   ref commit: 63b86fdf11ea3a311525a340ddb8a437312df3ee

### Compare to fixed number

compare payload number with a number (fixed)

-   bigger_than ref: 3401b1e10a9c36d78d87cd8fa70806ef90d121d7
-   smaller_than ref: b71e9ed45280038223ce203971d195eea242b7fa
-   compare with other field in payload

### Validate Date

### Validate Date Range

### Validate Options (List)

### Validate Number Range
