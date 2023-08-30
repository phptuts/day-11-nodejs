const isAdmin = (request, response, next) => {
  if (!request.user.is_admin) {
    response.status(403).send("forbidden");
    return;
  }

  next();
};

module.exports = isAdmin;
