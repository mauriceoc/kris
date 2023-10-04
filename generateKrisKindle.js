function setsAreEqual(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);

  return setA.length === setB.length && [...setA].every((el) => setB.has(el));
}

function generateKrisKindle(emails, exclusions) {
  const remaining = [...emails];
  const pairs = {};

  for (const gifter of emails) {
    const validReceivers = remaining.filter((receiver) => {
      if (receiver === gifter || pairs[receiver] === gifter) {
        return false; // Skip if the receiver is the same as the gifter or if they have already gifted to each other
      }

      const matchExclusion = Object.entries(exclusions).find(([k, arr]) => {
        return arr.find((el) => setsAreEqual([k, el], [gifter, receiver]));
      });

      if (matchExclusion) {
        return false;
      }

      return true;
    });

    if (validReceivers.length === 0) {
      // If no valid receiver is found, start over
      return generateKrisKindle(emails, exclusions);
    }

    const randomIndex = Math.floor(Math.random() * validReceivers.length);
    const receiver = validReceivers[randomIndex];
    pairs[gifter] = receiver;

    remaining.splice(remaining.indexOf(receiver), 1);
  }

  return pairs;
}

module.exports = {
  generateKrisKindle,
};
