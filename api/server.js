// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000

const projeto = {
    id: 1,
    descricao: 'Your Way Tracker 3.0'
  }
  
  const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave, receptor) {
      console.log(`Alguém pediu a chave ${chave} do projeto`)
      return Reflect.get(objetoOriginal, chave, receptor)
    },
    set(objetoOriginal, chave, valor) {
      console.log(`Alguém alterou a chave ${chave} do projeto para o valor ${valor}`)
      objetoOriginal[chave] = valor
    },
  })
  


server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
