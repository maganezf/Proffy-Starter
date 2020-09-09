const Database = require('./database/db.js')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format.js')

function pageLanding(req, res){
    return res.render("index.html")
}

/* req = requerimento = o que ta sendo pedido no https = o que é recebido pelo backend quando tem alguuma resposta de algo atraves do cliente na pagina*/
//o filters recebe o requerimento pego/selecionado

//async vem antes da funcao para poder usar o 'await' dentro da funcao

async function pageStudy(req, res){       
    const filters = req.query       

    //if qualquer um desses vinher vazio faça:
    if ( !filters.subject || !filters.weekday || !filters.time ){
        return res.render("study.html", { filters, subjects, weekdays })
    }

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `
    
    //caso haja erro na hora da consulta do banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy)=> {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html", { proffys, subjects, filters, weekdays } )

    } catch (error) {
        console.log(error)
    }

}

function pageGiveClasses(req, res){   
    return res.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses (req, res){
    const createProffy = require('./database/createProffy')
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    // esse segundo parametro do "map()" (index) é um número que vai ser a posicao do array

    const classScheduleValues = req.body.weekday.map( ( weekday, index ) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index]) 
        }

    })

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)           //redireciona para a pagina "/study"
        
    } catch (error) {
        console.log(error)
    }
    

}

module.exports = { pageLanding, pageStudy, pageGiveClasses, saveClasses }