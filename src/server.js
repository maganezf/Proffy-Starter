//servidor

const express = require('express')
const server = express()    //express já executando
const nunjucks = require('nunjucks')

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages.js')

//configurar nunjucks
nunjucks.configure("src/views", {   /* aqui ja referenciou o diretorio dos arquivos pro nunjucks */
    express: server,
    noCache: true,
})

server

//receber os dados do req.body
.use(express.urlencoded({ extended: true }))

.use(express.static("public"))                        /* .use = configuracao do servidor | static = arquivos estaticos (scripts, css, imgs)*/
//rotas da aplicacao
.get("/", pageLanding)
.get("/study", pageStudy) 
.get("/give-classes", pageGiveClasses) 
.post("/save-classes", saveClasses)
//start do servidor
.listen(5500)
