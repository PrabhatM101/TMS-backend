module.exports = {
  tags: [
    {
      name: "Tasks",
      description: "Task management for users",
    },
  ],

  paths: {
    "/tasks": {
      post: {
        summary: "Create a new task",
        tags: ["Tasks"],
        security: [{ xAuthToken: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TaskCreate" },
            },
          },
        },
        responses: {
          201: { description: "Task created successfully" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized / Invalid token" },
        },
      },

      get: {
        summary: "Get all tasks of the logged-in user",
        tags: ["Tasks"],
        security: [{ xAuthToken: [] }],
        responses: {
          200: { description: "List of tasks retrieved successfully" },
          401: { description: "Unauthorized / Invalid token" },
        },
      },
    },

    "/tasks/{id}": {
      get: {
        summary: "Get a task by ID",
        tags: ["Tasks"],
        security: [{ xAuthToken: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
            description: "MongoDB Task ID",
          },
        ],
        responses: {
          200: { description: "Task retrieved successfully" },
          401: { description: "Unauthorized / Invalid token" },
          404: { description: "Task not found" },
        },
      },

      patch: {
        summary: "Update a task",
        tags: ["Tasks"],
        security: [{ xAuthToken: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
            description: "MongoDB Task ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TaskUpdate" },
            },
          },
        },
        responses: {
          200: { description: "Task updated successfully" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized / Invalid token" },
          404: { description: "Task not found" },
        },
      },

      delete: {
        summary: "Delete a task",
        tags: ["Tasks"],
        security: [{ xAuthToken: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
            description: "MongoDB Task ID",
          },
        ],
        responses: {
          200: { description: "Task deleted successfully" },
          401: { description: "Unauthorized / Invalid token" },
          404: { description: "Task not found" },
        },
      },
    },
  },

  components: {
    schemas: {
      TaskCreate: {
        type: "object",
        required: ["title"],
        properties: {
          title: { type: "string", example: "Finish Node.js assignment" },
          description: {
            type: "string",
            example: "Complete the API endpoints and push to GitHub",
          },
          status: {
            type: "string",
            enum: ["to-do", "in-progress", "completed"],
            example: "to-do",
          },
          dueDate: {
            type: "string",
            format: "date-time",
            example: "2025-09-01T18:30:00.000Z",
          },
        },
      },

      TaskUpdate: {
        type: "object",
        properties: {
          title: { type: "string", example: "Update Swagger docs" },
          description: {
            type: "string",
            example: "Write swagger in JS object format",
          },
          status: {
            type: "string",
            enum: ["to-do", "in-progress", "completed"],
            example: "in-progress",
          },
          dueDate: {
            type: "string",
            format: "date-time",
            example: "2025-09-02T18:30:00.000Z",
          },
          isTrashed: { type: "boolean", example: false },
        },
      },
    },
  },
};
