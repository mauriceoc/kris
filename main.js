const { generateKrisKindle } = require("./generateKrisKindle");
const { people, exclusions } = require("./folks");

const emails = people.map((p) => p.email);
const output = generateKrisKindle(emails, exclusions);

const lookupPerson = (email) => people.find((p) => p.email === email);

for ([gifterEmail, receiverEmail] of Object.entries(output)) {
  const receiver = lookupPerson(receiverEmail);
  const gifter = lookupPerson(gifterEmail);

  console.log(
    `Hey ${gifter.firstName}, your kris kindle is ${receiver.firstName}`,
  );
}
