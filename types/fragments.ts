
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "UNION",
        "name": "UserResponse",
        "possibleTypes": [
          {
            "name": "User"
          },
          {
            "name": "Error"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Invoice",
        "possibleTypes": [
          {
            "name": "UserInvoice"
          },
          {
            "name": "PaidInvoice"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "BalanceResponse",
        "possibleTypes": [
          {
            "name": "NodeBalance"
          },
          {
            "name": "Error"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ChannelResponse",
        "possibleTypes": [
          {
            "name": "ChannelPayload"
          },
          {
            "name": "Error"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "NewUserResponse",
        "possibleTypes": [
          {
            "name": "NewUser"
          },
          {
            "name": "Error"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "TokenResponse",
        "possibleTypes": [
          {
            "name": "TokenPayload"
          },
          {
            "name": "Error"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "LogoutResponse",
        "possibleTypes": [
          {
            "name": "UserInvoice"
          },
          {
            "name": "Error"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "UserInvoiceResponse",
        "possibleTypes": [
          {
            "name": "UserInvoice"
          },
          {
            "name": "Error"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "PayInvoiceResponse",
        "possibleTypes": [
          {
            "name": "PaidInvoice"
          },
          {
            "name": "Error"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "PaidInvoiceResponse",
        "possibleTypes": [
          {
            "name": "UserInvoice"
          },
          {
            "name": "Error"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "DecodeInvoiceresponse",
        "possibleTypes": [
          {
            "name": "DecodeInvoicePayload"
          },
          {
            "name": "Error"
          }
        ]
      }
    ]
  }
};
      export default result;
    