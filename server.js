
/////////CONSTANTES/////////////
const {fetchUserHours} = require('./utils.js')
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
function presencia(){
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
    const args = input.toLocaleLowerCase().split(' ')[1];

 //Si el autor es un bot no retornar nada
    if (author.bot){
    console.log('bot')
    return
    };  

//Si no comienza con el prefijo no retornar nada
    if (!input.startsWith(prefix)){
        return
    };
    ////////////////////////COMANDO AGREGADOS/////////////////////////////////////////////
    if(command === "!horas"){
        if(args){
            devolverMensaje(await fetchUserHours(args), message)
        } else{
            alumnos[author.username]
            ? devolverMensaje(await fetchUserHours(alumnos[author.username]), message)
            : devolverMensaje('Profeee', message);
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