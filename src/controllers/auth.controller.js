import { generateToken } from "../utils/token-generator.js";
import { default_user } from "../utils/constants.js";

export function login(req, res) {
  // #swagger.parameters['body'] = {  in: 'body', schema: { $ref: '#/definitions/SampleLogin' } }
  const { email, password } = req.body;
  const authenticatedId = authenticate({ email, password });
  if (authenticatedId) {
    res.json({ token: generateToken({ id: authenticatedId, email }) });
  } else {
    res.status(401).json({ error: "Invalid credentials." });
  }
}

function authenticate({ email, password }) {
  if (email === default_user.email && password === default_user.password)
    return default_user.id;
}
