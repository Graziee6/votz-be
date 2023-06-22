const documentation = {
  openapi: "3.0.0",
  info: {
    title: "Ekipa for Rwanda",
    version: "1.0.0",
    description: "Ekipa is a digital link of an owner and his/her car",
  },
  paths: {
    "/admin": {
      post: {
        tags: ["Admin"],
        summary: "Create an Admin account",
        description:
          "Create an Admin account with names, email, phone number and NID",
        produces: ["application/json"],
        requestBody: {
          description: "Admin info is to be entered into the system",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Admin created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/admin/login": {
      post: {
        tags: ["Admin"],
        summary: "Admin login",
        description: "Admin can log into his/her account",
        produces: ["application/json"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminLoginInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Query OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/admin/addVoter": {
      post: {
        tags: ["Admin"],
        description: "Admin can add a new voter into the votz system",
        produces: ["application/json"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/VoterInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Voter created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/admin/addCandidate": {
      post: {
        tags: ["Admin"],
        description: "Admin can add a new candidate into the votz system",
        produces: ["application/json"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CandidateInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Candidate created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/voter": {
      post: {
        tags: ["Voter"],
        summary: "Create an Voter account",
        description:
          "Create an Voter account with names, email, phone number and NID",
        produces: ["application/json"],
        requestBody: {
          description: "Voter info is to be entered into the system",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/VoterInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "voter created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/voter/login": {
      post: {
        tags: ["Voter"],
        summary: "Voter login",
        description: "Voter can log into his/her account",
        produces: ["application/json"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/VoterLoginInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Query OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/voter/getAllCandidates": {
      get: {
        tags: ["Voter"],
        description: "Get all candidates",
        summary: "Get all candidates",
        produces: ["application/json"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Query OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      AdminInput: {
        type: "object",
        properties: {
          names: {
            type: "string",
            example: "ruth",
          },
          password: {
            type: "string",
            example: "user2@2",
          },
          address: {
            type: "string",
            example: "Nyabihu",
          },
          phone: {
            type: "string",
            example: "0789249734",
          },
          nid: {
            type: "string",
            example: "1990493443553467",
          },
          email: {
            type: "string",
            example: "allie@gmail.com",
          },
        },
      },
      AdminLoginInput: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "user5@gmail.com",
          },
          password: {
            type: "string",
            example: "user5",
          },
        },
      },
      VoterInput: {
        type: "object",
        properties: {
          names: {
            type: "string",
            example: "ruth",
          },
          address: {
            type: "string",
            example: "Nyabihu",
          },
          phone: {
            type: "string",
            example: "0789249734",
          },
          nid: {
            type: "string",
            example: "1990493443553467",
          },
          email: {
            type: "string",
            example: "allie@gmail.com",
          },
        },
      },
      VoterLoginInput: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "allie@gmail.com",
          },
        },
      },
      CandidateInput: {
        type: "object",
        properties: {
          names: {
            type: "string",
            example: "Obama",
          },
          gender: {
            type: "string",
            example: "male",
          },
          // prof_pic: {
          //   type: "string",
          //   example: "0789249734",
          // },
          nid: {
            type: "string",
            example: "1990493443553467",
          },
          mission: {
            type: "string",
            example: "Lead for better change",
          },
        },
      },
      AdminInput: {
        type: "object",
        properties: {
          names: {
            type: "string",
            example: "ruth",
          },
          address: {
            type: "string",
            example: "Nyabihu",
          },
          phone: {
            type: "string",
            example: "0789249734",
          },
          nid: {
            type: "string",
            example: "1990493443553467",
          },
          email: {
            type: "string",
            example: "allie@gmail.com",
          },
        },
      },
    },
  },
};

export default documentation;
