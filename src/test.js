const { handler } = require('./index');
const event = {
    body: JSON.stringify({query: "{users{name}}", variables: null})
};

const context = {};

const main = async (paramEvent, paramContext) => {
    await handler(paramEvent, paramContext);
}

main(event, context);

