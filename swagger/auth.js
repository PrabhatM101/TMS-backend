module.exports = {
  tags: [
    {
      name: "Auth",
      description: "Authentication",
    },
  ],

  paths: {
    "/auth/login": {
      post: {
        summary: "Login a user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful, returns JWT token",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "integer", example: 200 },
                    message: { type: "string", example: "Login successful" },
                    data: {
                      type: "object",
                      properties: {
                        token: {
                          type: "string",
                          example:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        },
                        _id: {
                          type: "string",
                          example: "64df9ad8b2d2348d7c1f9c3d",
                        },
                        name: { type: "string", example: "Prabhat" },
                        email: { type: "string", example: "prabhat@example.com" },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: "Invalid credentials" },
        },
      },
    },

    "/auth/logout": {
      post: {
        summary: "Logout a user",
        tags: ["Auth"],
        security: [{ xAuthToken: [] }],
        responses: {
          200: { description: "Logout successful" },
          401: { description: "Unauthorized / Invalid token" },
        },
      },
    },
  },

  components: {
    securitySchemes: {
      xAuthToken: {
        type: "apiKey",
        in: "header",
        name: "x-auth-token",
        description: "JWT token passed in x-auth-token header",
      },
    },
    schemas: {
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", example: "prabhat@gmail.com" },
          password: { type: "string", example: "secret123" },
        },
      },
    },
  },
};
