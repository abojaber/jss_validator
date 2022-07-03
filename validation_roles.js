validations = {
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
};

module.export = {
  validations: validations,
};
