module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) { 
    
    //await = aguarde/espera terminar isso aqui (o que estara sendo passado depois do 'await')
    //await só pode ser usado numa funcao se antes da funcao ser chamada estiver um 'async' | ex: async function(){}"
    //cada db.run() é uma promessa | db.run = ele vai tentar rodar, nao significa que vá dar certo

    //inserir dados na tabela de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio            
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );

    `)

    const proffy_id = insertedProffy.lastID

    //inserir dados na tabela classes

    const insertedClass = await db.run(`
            INSERT INTO classes(
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    //inserir dados na tabela class_schedule
    //map = vai percorrer o array e retornar o valor final em um novo array que ele mesmo cria | se tiver mais de 1 elemento, ele colocara cada elemento em uma posicao do array

    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule(
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    //executar todos os bd.runs() das class_schedules
    await Promise.all(insertedAllClassScheduleValues)   //aguarda todas as promessas e terminando ele volta pra proxima linha no './test.js'
}