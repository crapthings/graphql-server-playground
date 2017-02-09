export const authors = _.times(10, n => ({
  id: n + 1,
  name: faker.name.findName(),
}))

export const posts = _.times(100, n => ({
  id: n + 1,
  title: faker.lorem.sentence(),
  authorId: _.sample(authors).id
}))
