const cold = temperature => `${temperature < 17 ? "It's cold brrrr." : ""}`;

const tweeds = temperature => [
  `In Lüneburg temperatures are round about ${temperature} degrees celsius.${
    temperature >= 26 ? "It's so hot today." : cold(temperature)
  }`,
  `Hello again! We have ${temperature} degrees in Lüneburg uwu.`,
  `Now we've got ${temperature} °C.`,
  `In Lüneburg, north of Germany, temperatures are ${temperature} degrees celsius.`,
  `What a wonderful day, we've got ${temperature} °C. ${cold(temperature)}`,
  `Currently, we've got ${temperature} degrees celsius.`,
  `${temperature} degrees celsius today. ${cold()}`,
  `Cold or hot? I feel good with ${temperature} degrees celsius.`,
  `${temperature} degrees celsius.`,
  `${temperature} °C.`
];

module.exports = tweeds;
