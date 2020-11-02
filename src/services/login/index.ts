import {Responder} from 'cote'

const responder = new Responder({name: 'login.responder', key: 'login'})

responder.on('GET', async (data: any) => {


    console.log(process.env.DATABASE)
    return {
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    }
})