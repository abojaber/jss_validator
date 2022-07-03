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
  name: {
    required: false,
    roles: [
      {
        regex: /\w{3,10}/,
        condition: "regex",
        error: "AF0002",
        message: "name not correct",
      },
    ],
  },
};

module.export = {
  validations: validations,
};
