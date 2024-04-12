module.exports = {
  type: "object",
  required: [
    "id",
    "name",
    "address",
    "formInputs",
    "loginId",
    "calculationId",
    "dateCreated",
    "dateModified",
    "description",
    "firstName",
    "lastName",
    "dateHidden",
    "dateTrashed",
    "dateSnapshotted"
  ],
  properties: {
    id: {
      type: "number"
    },
    name: {
      type: "string"
    },
    address: {
      type: "string"
    },
    formInputs: {
      type: "string"
    },
    loginId: {
      type: "number"
    },
    calculationId: {
      type: "number"
    },
    dateCreated: {
      type: "string",
      format: "date-time"
    },
    dateModified: {
      type: "string",
      format: "date-time"
    },
    description: {
      type: "string"
    },
    firstName: {
      type: "string"
    },
    lastName: {
      type: "string"
    },
    dateHidden: {
      type: ["string", "null"],
      format: "date-time"
    },
    dateTrashed: {
      type: ["string", "null"],
      format: "date-time"
    },
    dateSnapshotted: {
      type: "string",
      format: "date-time"
    }
  }
};
