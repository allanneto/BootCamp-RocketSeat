// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

faker.locale = 'pt_BR';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: faker.name.findName(),
          street: faker.address.streetName(),
          number: faker.random.number(),
          compliment: faker.random.word(),
          state: faker.address.stateAbbr(),
          city: faker.address.city(),
          postal_code: faker.address.zipCode('########'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: faker.name.findName(),
          street: faker.address.streetName(),
          number: faker.random.number(),
          compliment: faker.random.word(),
          state: faker.address.stateAbbr(),
          city: faker.address.city(),
          postal_code: faker.address.zipCode('########'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: faker.name.findName(),
          street: faker.address.streetName(),
          number: faker.random.number(),
          compliment: faker.random.word(),
          state: faker.address.stateAbbr(),
          city: faker.address.city(),
          postal_code: faker.address.zipCode('########'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: faker.name.findName(),
          street: faker.address.streetName(),
          number: faker.random.number(),
          compliment: faker.random.word(),
          state: faker.address.stateAbbr(),
          city: faker.address.city(),
          postal_code: faker.address.zipCode('########'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: faker.name.findName(),
          street: faker.address.streetName(),
          number: faker.random.number(),
          compliment: faker.random.word(),
          state: faker.address.stateAbbr(),
          city: faker.address.city(),
          postal_code: faker.address.zipCode('########'),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
