const { isUuid } = require("uuidv4");

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID.'})
  }

  return next();
}

module.exports = validateProjectId; 