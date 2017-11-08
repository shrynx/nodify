import delay from 'delay';

export const hello = async (event, context, callback) => {
  await delay(2000);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Your function built using nodify executed successfully!`,
      input: event,
    }),
  };

  callback(null, response);
};
