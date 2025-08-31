module.exports = {
  tags: [
    {
      name: "Users",
      description: "User management",
    },
  ],

  paths: {
    "/users": {
      post: {
        summary: "Register a new user",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserRegister" },
            },
          },
        },
        responses: {
          201: { description: "User registered successfully" },
        },
      },
    },

    "/users/{id}": {
      get: {
        summary: "Get a user by ID",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
            description: "MongoDB User ID",
          },
        ],
        security: [{ xAuthToken: [] }],
        responses: {
          200: { description: "User data retrieved successfully" },
        },
      },

      patch: {
        summary: "Update a user",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        security: [{ xAuthToken: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserUpdate" },
            },
          },
        },
        responses: {
          200: { description: "User updated successfully" },
        },
      },

      delete: {
        summary: "Delete a user",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        security: [{ xAuthToken: [] }],
        responses: {
          200: { description: "User deleted successfully" },
        },
      },
    },
  },

  components: {
    schemas: {
      UserRegister: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "Prabhat Mishra" },
          email: { type: "string", example: "prabhat@gmail.com" },
          password: { type: "string", example: "secret123" },
        },
      },
      UserUpdate: {
        type: "object",
        properties: {
          name: { type: "string", example: "Prabhat Updated" },
        },
      },
    },
  },
};
