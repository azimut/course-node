import "dotenv/config";

export const port = process.env.PORT || 3030;
export const secret_key = process.env.JWT_SECRET_KEY;
export const default_user = {
  id: 1,
  email: "user@email.com",
  password: "stronPass123",
};
