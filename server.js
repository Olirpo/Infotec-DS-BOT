/////////CONSTANTES/////////////
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require ("./config.json");
const log = console.log;
const prefix = config.prefix
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
    presencia();

    }
    
);

/////////////////////FUNCION AL RECIBIR MENSAJE/////////////
client.on("message", (message)=> {



 //Si el autor es un bot no retornar nada
    if (message.author.bot){
    console.log('bot')
    return
    };  

//Si no comienza con el prefijo no retornar nada
    if (!message.content.startsWith(prefix)){
        return
    };

    const args = message.content;
    const command = args.toLocaleLowerCase();//selecciono el texto a la derecha del prefijo


    ////////////////////////COMANDO AGREGADOS/////////////////////////////////////////////
    if (command =="!sale"){

        var random = Math.floor(Math.random() * ((2+1)-1)+1);
        var respuesta = (random==1?"si":"no");
        devolverMensaje(`${respuesta}`,message)
        }
    
    else if (command =="!pedro"){
        devolverMensaje("jose",message);
    }
    else{
        devolverMensaje('Que decis flaco', message)
    }



});

    function devolverMensaje(respuesta,message){
        message.channel.send(respuesta);
        console.log(message.content)
    }

client.login(config.token);