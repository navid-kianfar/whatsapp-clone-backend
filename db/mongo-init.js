db.createUser({
  user: 'wwebjs_user',
  pwd: 'wwebjs_passwd',
  roles: [
    {
      role: 'readWrite',
      db: 'wwebjs',
    },
  ],
});
