import {
  authors,
  posts,
} from './fake'

export const typeDefs = `
  # 系统可做的查询
  type Query {
    # 所有作者列表
    authors: [Author]
    # 所有文章列表
    posts: [Post]
  }

  # 定义了作者
  type Author {
    id: Int
    name: String
    # 可以通过当前作者查到该作者的所有文章
    posts: [Post]
  }

  # 定义了作者的文章
  type Post {
    id: Int
    title: String
    # 可以通过当前文章查到该文章的作者
    author: Author
    # 作者的 id
    authorId: Int
  }
`

export const resolvers = {
  // 我们能查询什么，必须对应 typeDefs 中的 Query, Mutation, Subscription 等
  // 这里我们只使用了 Query
  // Mutation 对应 更新插入删除等操作
  // Subscription 用来实时订阅 websocket 内容
  Query: {
    authors: () => authors,
    posts: () => posts
  },

  // 解决查询时的关联
  Author: {
    posts: author => _.filter(posts, { authorId: author.id })
  },

  // 解决查询时的关联
  Post: {
    author: post => _.find(authors, { id: post.authorId })
  }
}
