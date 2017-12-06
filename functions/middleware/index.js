module.exports = {
  auth(admin) {
    return (req, res, next) => {
      if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer ')
      ) {
        res.status(403).send('Unauthorized');
        return;
      }

      let idToken;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
      ) {
        // eslint-disable-next-line
        idToken = req.headers.authorization.split('Bearer ')[1];
      }
      admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedIdToken => {
          req.user = decodedIdToken;
          next();
        })
        .catch(() => {
          res.status(403).send('Unauthorized');
        });
    };
  },
};
