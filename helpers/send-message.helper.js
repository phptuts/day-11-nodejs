const sendMessage = (wss, message) => {
  wss.clients.forEach((c) => {
    c.send(message);
  });
};

module.exports = sendMessage;
