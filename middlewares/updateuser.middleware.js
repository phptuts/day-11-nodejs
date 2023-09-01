const updateUserMiddleware = (request, response, next) => {
  const userIdRoute = +request.params.id;
  if (request.user.is_admin || userIdRoute === +request.user.id) {
    next();
    return;
  }

  response.status(403).send("forbidden");
};

module.exports = updateUserMiddleware;
