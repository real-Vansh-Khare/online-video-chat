
// todo: later improve this implementation
const getRandomUserId = () => {
  return crypto.randomUUID().slice(0, 5) + crypto.randomUUID().slice(0, 5);
};

export default getRandomUserId;