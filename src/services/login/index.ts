import {Responder} from 'cote'

const responder = new Responder({name: 'login.responder', key: 'login'})

responder.on('GET', async (data: any) => {

    return {
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    }
})

responder.on('POST', async (data: any) => {

    console.log(data)
    return {
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    }
})