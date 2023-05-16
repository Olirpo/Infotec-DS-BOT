
/////////CONSTANTES/////////////
const {fetchUserHours, setUserHours} = require('./utils.js')
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require ("./config.json");
const log = console.log;
const prefix = config.prefix;
const alumnos = {
    Olirpo: 'Oliverio',
    NEUBLED: 'Martin',
    DRAGÓN: 'Larraya',
}
/////////FUNCION DE ESTADO DE DISCORD////////////////
const presencia = () =>{
    client.user.setPresence({
        status:"online",
        activity:{
            name:"twitch.tv/olirpos",
            type:"WATCHING"
        }
    })
}
////////// FUNCION AL ESTAR READY///////////
client.on("ready", ()=> {
    console.log(`ready on ${client.user.tag}`);
    // presencia();

    }
    
);
/////////////////////FUNCION AL RECIBIR MENSAJE/////////////
client.on("message", async (message)=> {
    const author = message.author
    const input = message.content;
    const command = input.toLocaleLowerCase().split(' ')[0];
    const args = input.toLocaleLowerCase().split(' ').slice(1);

 //Si el autor es un bot no retornar nada
    if (author.bot){
    return
    };  
//Si no comienza con el prefijo no retornar nada
    if (!input.startsWith(prefix)){
        return
    };
    ////////////////////////COMANDO AGREGADOS/////////////////////////////////////////////
    if(command === "!horas"){
        if(args){
            devolverMensaje(await fetchUserHours(args[1]), message)
        } else{
            alumnos[author.username]
            ? devolverMensaje(await fetchUserHours(alumnos[author.username]), message)
            : devolverMensaje('Profeee', message);
        }
    }
    if(command === "!add"){
        console.log(author.username !== 'Olirpo')
        if(author.username !== 'K100' && author.username !== 'Joacko' && author.username !== 'Olirpo'){
            devolverMensaje('Vos no podes añadirte horas panflin', message);
            return
        }
        const hours = args[0]
        const userToChange = args[1]
        try{
            const response = await setUserHours(userToChange, hours);
            console.log(response)
            devolverMensaje(`Añadiste correctamente ${hours} horas a ${userToChange}. Nuevas horas totales: ${await fetchUserHours(userToChange)}`,message)
        } catch (err){
            console.error(err)
            devolverMensaje('Algo salió mal', message)
        }
        
    }

    else{
        devolverMensaje('Que decis flaco', message)
    }
});
    function devolverMensaje(respuesta,message){
        message.channel.send(respuesta);
    }
client.login(config.token);