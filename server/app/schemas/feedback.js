module.exports = {
  type: "object",
  required: ["name", "email", "comment", "forwardToWebTeam"],
  properties: {
    name: {
      type: "string"
    },
    email: {
      type: "string"
    },
    comment: {
      type: "string"
    },
    forwardToWebTeam: {
      type: "boolean"
    },
    id: {
      type: "number"
    }
  }
};
