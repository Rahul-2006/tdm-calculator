module.exports = {
  type: "object",
  required: [
    "id",
    "calculationId",
    "code",
    "name",
    "category",
    "dataType",
    "units",
    "value",
    "functionBody",
    "displayOrder",
    "inactive",
    "calculationPanelId",
    "used",
    "displayFunctionBody",
    "minValue",
    "maxValue",
    "choices",
    "calcCode",
    "required",
    "minStringLength",
    "maxStringLength",
    "displayComment",
    "description",
    "mask",
    "link",
    "validationFunctionBody",
    "readOnly"
  ],
  properties: {
    id: {
      type: "number"
    },
    calculationId: {
      type: "number"
    },
    code: {
      type: "string"
    },
    name: {
      type: "string"
    },
    category: {
      type: "string"
    },
    dataType: {
      type: "string"
    },
    units: {
      type: "string"
    },
    value: {
      type: "string"
    },
    functionBody: {
      type: "string"
    },
    displayOrder: {
      type: "number"
    },
    inactive: {
      type: "boolean"
    },
    calculationPanelId: {
      type: "number"
    },
    used: {
      type: "boolean"
    },
    displayFunctionBody: {
      type: "string"
    },
    minValue: {
      type: ["number", "null"]
    },
    maxValue: {
      type: ["number", "null"]
    },
    choices: {
      type: ["string", "null"]
    },
    calcCode: {
      type: ["string", "null"]
    },
    required: {
      type: "boolean"
    },
    minStringLength: {
      type: ["number", "null"]
    },
    maxStringLength: {
      type: ["number", "null"]
    },
    displayComment: {
      type: "boolean"
    },
    description: {
      type: "string"
    },
    mask: {
      type: ["string", "null"]
    },
    link: {
      type: ["string", "null"]
    },
    validationFunctionBody: {
      type: ["string", "null"]
    },
    readOnly: {
      type: ["boolean", "null"]
    }
  }
};
