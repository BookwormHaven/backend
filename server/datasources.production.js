module.exports = {
  db: {
    name: 'db',
    connector: 'postgresql',
    url: process.env.DB_URL,
  },
};
