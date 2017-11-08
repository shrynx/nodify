import format from 'date-fns/format';

export const hello = (event, context, callback) => {
  const dateString = format(new Date(), '[Today is a] dddd');
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Your function built using nodify executed successfully! ${dateString}`,
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
