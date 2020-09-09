const Database = require('./db.js')        // "./" = quer dizer que é a pasta local/do momento
const createProffy = require('./createProffy')

Database.then( async (db) => {
    //inserir dados

    proffyValue = {
        name: "Maganez Filho",
        avatar: "https://avatars1.githubusercontent.com/u/58009515?s=400&u=bf65ed61100a2d4ba2c2b95d692487fb59920a02&v=4",
        whatsapp: "8888-8888",
        bio: "Viciado e apaixonado por T.I e tudo aquilo que envolva tecnologia. Tesão há 1000% sempre ^^"
    }

    classValue = {
        subject: 11,
        cost: "100,00",
        // o proddy id virá pelo Banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo BD após cadastrarmos a aula(class)
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },

        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }

    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //consultar dados inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")       // '*' = significa 'tudo'
    
    //console.log(selectedProffys)

    //consultar as classes de um determinado professor e retornar os dados desse prof

    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    //console.log(selectedClassesAndProffys)

    //o horario que a pessoa trabalha, exemplo, é das 8h ate as 18h
    //o horario time_from (8h) precisa ser <= ao horario solicitado
    //o time_to precisa ser >

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)  
    
    //console.log(selectClassesSchedules)


})