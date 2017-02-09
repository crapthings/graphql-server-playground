// http framework
import express from 'express'

// graphqlExpress 查询时需要的 middleware 分析 body 内容
import bodyParser from 'body-parser'

import {
  graphqlExpress, // graphql middleware
  graphiqlExpress, // 开发工具的 middleware
} from 'graphql-server-express'

// 生成查询方案的 module
// makeExecutableSchema({ typeDefs, resolvers })
// typeDefs: 这个就是 graphql 的 type 定义
// resolvers: typeDefs 对应的数据来源，数据库，文件系统，其他 http 请求等。。。
import {
  makeExecutableSchema,
} from 'graphql-tools'

import CONFIG from './config'

import { typeDefs, resolvers } from './schema'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express()

// 利用 graphql-server 提供的中间件来生成两个路由
app.use(CONFIG.graphqlEndpointUrl, bodyParser.json(), graphqlExpress({ schema }))
app.use(CONFIG.graphiqlEndpointUrl, graphiqlExpress({ endpointURL: CONFIG.graphqlEndpointUrl }))

app.listen(
  CONFIG.port,
  () => {
    console.log(`open "http://localhost:${CONFIG.port}/graphiql" to test your schema`)
  }
)
