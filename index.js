var startTime = new Date();
var startTimeYear = startTime.getUTCFullYear();
var startTimeMonth = startTime.getUTCMonth();
var startTimeDay = startTime.getUTCDate();
var startTimeHours = startTime.getUTCHours();
var startTimeMinutes = startTime.getUTCMinutes();
var startTimeSeconds= startTime.getUTCSeconds();
var startTimeMonth = startTimeMonth+1;
const Discord = require("discord.js");
const weather = require('weather-js');



const TOKEN = process.env.TOKEN;

var client = new Discord.Client({autoReconnect:true});

var clientID = "393675055139258380"
var funPrefix = "pf?";
var modPrefix = "pf!";
var fortunes = [
    "It is decidedly so",          // 1
    "Without a doubt",             // 2
    "outlook good",                // 3
    "Yes",                         // 4
    "Totally",                     // 5
    "Signs point to yes",          // 6
    "Better not tell you now",          // 1
    "Concentrate and ask again",        // 2
    "Not likely",                  // 1
    "Don't count on it",           // 2
    "My reply is no",              // 3
    "My sources say no",           // 4
    "Outlook not so good",         // 5
    "Very doubtful"                // 6
];
var emptyMessage = String.fromCharCode(32);
var blacklistWords = ["pandabot"];
var botGames = ["pf?help", "with my perms", "tick tack toe", "the piano", "PandaFish.exe", "with my permissions"];
var intervalGames;
var defaultEmbedColor = "#00E5EE";
var servers = {};
var someUnicode = ["","࿈","⌚","⏻","①","②","③","④","⑤","⑥","⑦","⑧","⑨","⓪","♻"];

//emotes
var banHammerEmoteID = "398149721127911424";
var kickEmoteID = "398160661093416970";
var unbanEmoteID = "398156624956751872";
var eightBallEmoteID = "399158202861748225";
var errorEmoteID = "399161807526297600";
var eyesEmoteID = "399169594322845706";
var megaPhoneEmoteID = "399170860046614530";
var pinEmoteID = "399305069419298816";
var gedEmoteID = "399305069473955870";
var trashEmoteID = "401434783772704778";
var failEmoteID = "401443233630257152";
var pandafishEmoteID = "401486157931741205";
// gif emotes
var loadingEmoteGif = "<a:troll_loading:399267255839490051>";
var loadingEmoteGifID = "399267255839490051";
var thinkingSpinEmoteGif = "<a:think_rotate:399274926638366721>";
var thinkingSpinEmoteGifID = "399274926638366721";
var reviveEmoteGif = "<a:revive:401431614825037826>";
var reviveEmoteGifID = "401431614825037826";
var coin_spinEmoteGif = "<a:coin_spin:401431615135416321>";
var coin_spinEmoteGifID = "401431615135416321";
var partyEmoteGif = "<a:party:401431615156518912>";
var partyEmoteGifID = "401431615156518912";
var pandafishSpinEmoteGif = "<a:PandaFishSpin:401486157386350602>";
var pandafishSpinEmoteGifID = "401486157386350602";
var pandafishExplosionEmoteGif = "<a:explosion:403220801295220738>";
var pandafishExplosionEmoteGifID = "403220801295220738";
var pandafishBeatEmoteGif = "";
var pandafishBeatEmoteGifID = "";



client.on("ready", function(){
  console.log(`Client is now online. Logged in as ${client.user.username}!`);
  intervalGames = setInterval(function setGame(){
    client.user.setPresence({game: {name: botGames[Math.floor(Math.random()* botGames.length)], type: 0}});
    //client.user.setPresence({game: {name: "maintenance", type: 0}});
  },600000);
});

function hook(channel, name, message, text, color, avatarURL){
  if(!channel) {channel.send("Channel not specified");return;}
  if(!name) {channel.send("Name not specified");return;}
  if(!text) {channel.send("Message not specified");return;}
  if(!color) {var color = defaultEmbedColor;}
  if(!avatar) {var avatar = client.user.avatarURL;}
  color = color.replace(/\s/g, '');
  avatar = avatar.replace(/\s/g, '');

  channel.fetchWebhooks()
    .then(webhook =>{
      let foundhook = webhook.find('name', "Webhook");
      if(!foundhook){
        channel.createWebhook("Webhook", client.user.avatarURL)
          .then(webhook => {
            webhook.send(message, {
              "username": name,
              "avatarURL": avatar,
              "embeds": [{
                "color": parseInt('0x'+color),
                "description": text
              }]
            })
              .catch(error =>{
                console.log(error);
                channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Error occured while executing `` "+message.content+" ``")
              })
          })
        } else {
          foundhook.send(message, {
              "username": name,
              "avatarURL": avatar,
              "embeds": [{
                "color": parseInt('0x'+color),
                "description": text
              }]
          })
            .catch(error =>{
              console.log(error);
              message.channel.sendMessage(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Error occured while executing `` "+message.content+" ``")
            })
      }
    })
}


client.on("message", function(message){
  if(message.guild){} else {
    console.log("DM by: "+message.author.username);
    console.log("DM content: "+message.content);
  }
  if (message.author.equals(client.user)) {
  /* message.delete(60000)
    .then(msg => console.log(`Deleted message from `+message.author.id))
    .catch(console.error); */
    // return;
  }//

                  // --> WHITELISTS <--
                  var whitelistBotMod = ["244126983489978368", "393675055139258380"];
                  // me, mybot
                  var whitelistSudo = ["244126983489978368", "393675055139258380"];
                    if(message.guild) {whitelistSudo.push(message.guild.ownerID);}
                  // me, mybot, guildOwner
                  var whitelistOutsideBotChannel = ["244126983489978368", "120968309050048512"];
                    if(message.guild) {whitelistOutsideBotChannel.push(message.guild.ownerID);}
                  // me, Foxy, guildOwner
                  var whitelistDM = ["244126983489978368"];
                  // me
                  var whitelistNitroemote = ["244126983489978368", "393675055139258380"];
                  // me, mybot,


  var messageInLowerCase = message.content.toLowerCase();
  if (blacklistWords.some(word => messageInLowerCase.includes(word))) {
    message.react(eyesEmoteID)/* .then(msg => message.react("🗨"))*/;
  }
  /* if (message.mentions.users.first()) {
    if(message.mentions.users(client.user))
    message.react(pinEmoteID).then(msg => message.react(gedEmoteID));
  } */
  if (message.content.startsWith(funPrefix)){


    if (message.channel.name != "bot-spam" && whitelistOutsideBotChannel.indexOf(message.author.id) > -1 === false ) {
      message.delete(1000)
      .catch(console.error);
      message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Please don't use me in this channel. (This message will be deleted in 10sec...)")
      .then(send =>
        {
        setTimeout(function(){
          send.delete();
        }, 10000);
      });
      return;
    }
    var args = message.content.substring(funPrefix.length).split(" ");

    switch (args[0].toLowerCase()) {

      case "test":
        message.react(client.emojis.find("id", pandafishSpinEmoteGifID));
        message.channel.send("** **")
          .then(send => { setTimeout(function(){  send.delete();  }, 10000);  });
        message.channel.send(partyEmoteGif+" Testing, huh? "+partyEmoteGif);
      break;

      case "echo":
        message.channel.send(client.emojis.find("id", megaPhoneEmoteID)+"  "+"Pong!... Oh wait.. this isn't ``"+funPrefix+"ping`` "+client.emojis.find("id", eyesEmoteID));
        message.react(megaPhoneEmoteID);
      break;
      case "ping":
        message.channel.send("Pong! 🏓");
        message.react('🏓');
      break;
      case "pong":
        message.channel.send("Ping! 🏓");
        message.react('🏓');
      break;

      case "weather":
        var degreeTypeDummy = "C"
        weather.find({search: args.join(" "), degreeType: degreeTypeDummy}, function(err, result){
          if (err) {
            message.channel.send(err);
            return;
          }
          if (result[0] === undefined){
            message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Error finding the Location of `` "+ message.content.substring(funPrefix.length+args[0].length)+" ``")
              .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
            message.react(errorEmoteID);
            return;
          } else {
            message.delete();
            var current = result[0].current;
            var location = result[0].location;

            // message.channel.send(JSON.stringify(result[0].current, null, 2));


            var embed = new Discord.RichEmbed()
              .setColor(defaultEmbedColor)
              .setAuthor(`Weather for ${current.observationpoint}`)
              .setDescription("Requested by - "+message.author)
              .setTitle(`**${current.skytext}**`)
              .addField("Timezone :", `UTC ${location.timezone}`, true)
              .addField("Temperature:", `${current.temperature} `+"°"+degreeTypeDummy, true)
              .addField("Feels like: ", `${current.feelslike} `+"°"+degreeTypeDummy, true)
              .addField("Winds", current.winddisplay, true)
              .addField("Humidity", `${current.humidity}%`, true)
              .addField("Local time: ",`${current.observationtime}`, true)
              .addField("Location: ", `https://www.google.com/maps/?q=${location.lat},${location.long}`,true)
              .setFooter("~pandabot")
              .setThumbnail(current.imageUrl)
            message.channel.sendEmbed(embed)
              .then(send => { setTimeout(function(){  send.delete();  }, 1200000);  });
          }
        });
      break;

      case "info":
      message.delete()
      .catch(console.error);
      message.channel.send(":information_source: <@"+message.author.id+"> My creator is "+pandafishSpinEmoteGif+" <@244126983489978368>. I am a beta version of a bot, so please excuse possible errors. \n If you are looking for help please try `pf?help` "+reviveEmoteGif)
        .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
      break;

      case "bs":
      case "botstats":
        message.delete();
        message.channel.send("**:robot: Bot stats :robot:**\n\n"+" Server count: "+client.guilds.size.toLocaleString()+"\n"+" Online since: "+startTimeYear+"-"+startTimeMonth+"-"+startTimeDay+"   ("+startTimeHours+":"+startTimeMinutes+":"+startTimeSeconds+" (UTC))");
      break;

      case "8ball":
        if (args[1]) {
          message.channel.send(client.emojis.find("id", eightBallEmoteID)+"  "+fortunes[Math.floor(Math.random()* fortunes.length)]);
          message.react(eightBallEmoteID);
        } else {
          message.channel.send(thinkingSpinEmoteGif+"I didn't got your statement.")
            .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
          message.react(errorEmoteID);
        }
      break;

      case "bigemote":
        message.delete();
        var bigemoteDummy = message.content.split(":");
        var emoteID = bigemoteDummy[2].substring(0,bigemoteDummy[2].length-1);
        if(!(isNaN(emoteID))){
          message.channel.sendFile("https://cdn.discordapp.com/emojis/"+emoteID+".png", bigemoteDummy[1]+".png", bigemoteDummy[1]+".png");
        } else {
          message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"Please insert the emote ID only... "+message.content.substring(funPrefix.length+args[0].length+2,funPrefix.length+args[0].length+1+args[1].length));
        }
      break;

      case "bigemotegif":
        message.delete();
        var bigemoteDummy = message.content.split(":");
        var emoteID = bigemoteDummy[2].substring(0,bigemoteDummy[2].length-2);
        if(!(isNaN(emoteID))){
          message.channel.sendFile("https://cdn.discordapp.com/emojis/"+emoteID+".gif", "Emote.gif", "Emote.gif");
        } else {
          message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"Please insert the emote ID only... "+message.content.substring(funPrefix.length+args[0].length+2,funPrefix.length+args[0].length+1+args[1].length));
        }
      break;

      case "guildemotes" :
      case "serveremotes":
          const emojiListID = message.guild.emojis.map(e=>e.toString()).join(" \\");
          const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
          message.channel.send("\\"+emojiListID+" \n\n "+emojiList)
            .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
      break;

      /* case "em": // emote message emotemessage
        message.delete();
        var emotemessage;
        var length = message.content.length;
        var inputMessage = message.content.slice(funPrefix.length+args[0].length).toLowerCase();
        var alphabeth = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i=1; i < length; i++){
          var characterDummy = inputMessage.charAt(i);
           if (alphabeth.includes(characterDummy)) {
              emotemessage = emotemessage+':regional_indicator_'+characterDummy+': ';
          }
          switch(characterDummy){
              case "1":
               emotemessage = emotemessage+':one: ';
              break;

              case "2":
                emotemessage = emotemessage+':two: ';
              break;

              case "3":
               emotemessage = emotemessage+':three: ';
              break;

              case "4":
               emotemessage = emotemessage+':four: ';
              break;

              case "5":
               emotemessage = emotemessage+':five: ';
              break;

              case "6":
               emotemessage = emotemessage+':six: ';
              break;

              case "7":
               emotemessage = emotemessage+':seven: ';
              break;

              case "8":
               emotemessage = emotemessage+':eight: ';
              break;

              case "9":
               emotemessage = emotemessage+':nine: ';
              break;

              case "0":
               emotemessage = emotemessage+':zero: ';
              break;
            }
          if (i+1 == length){
            message.channel.send(emotemessage);
          }
        }
      break; */

      case "guildinfo":
      case "serverinfo":
        message.delete();
        var embed = new Discord.RichEmbed()
          .setColor(defaultEmbedColor)
          .setTitle("Guild name: "+message.guild.name)
          .setDescription("ID : "+message.guild.id)
          .addField("Membercount :", message.guild.memberCount, false)
          .addField("Guild region: ", message.guild.region, false)
          .addField("Guild owner: ", "<@"+message.guild.ownerID+">", false)
          .addField("Vertification level: ",message.guild.verificationLevel,false)
          .addField("Guild created on: ",message.guild.createdTimestamp,false)
          .setFooter("~pandabot")
          .setThumbnail(message.guild.iconURL)
        message.channel.sendEmbed(embed, "Requested by: <@"+message.author.id+">")
          .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
      break;

      case "profile":
        var user;
        if (message.mentions.users.first()){
          user = message.mentions.users.first();
        } else {
          user = message.author;
        }
          message.delete();
          var embed = new Discord.RichEmbed()
            .setColor(defaultEmbedColor)
            .setTitle("User name - "+user.username)
            .setDescription("ID : "+user.id)
            .addField("Profile :", "<@"+user.id+">", false)
            .addField("Avatar URL :", user.avatarURL, false)
            .addField("Client created on: ", user.createdAt, false)
            .addField("Joined  guild on:", message.guild.member(user).joinedAt, false)
            .addField("Is a bot?" ,user.bot ,false)
            .setFooter("~pandabot")
            .setThumbnail(user.avatarURL)
          message.channel.sendEmbed(embed, "Requested by: <@"+message.author.id+">");
      break;

      case "avatar":
        message.delete();
        if (args[1]){
            var user = message.mentions.users.first();
        } else {
            var user = message.author;
        }
        message.channel.send("**"+user.username+"** (<@"+user.id+">) - Avatar: "+user.avatarURL+" (requested by: <@"+message.author.id+">)");
      break;


      case "embedtest":
        var embed = new Discord.RichEmbed()
          .setAuthor("Author")
          .setColor("#0000FF")
          .setDescription("Description")
          .addField("Field_1.1_Title", "Field_1.1_Description", false)
          .addField("Field_2.1_Title", "Field_2.1_Description", true)
          .addField("Field_2.2_Title", "Field_2.2_Description", true)
          .addField("Field_2.2_Title", "Field_2.2_Description", true)
          .addField("Field_2.2_Title", "Field_2.2_Description", true)
          .addField("Field_2.2_Title", "Field_2.2_Description", true)
          .addField("Field_2.2_Title", "Field_2.2_Description", true)
          .addField("Field_2.2_Title", "Field_2.2_Description", true)

          // .setFile("")
          .setFooter("Footer")
          .setImage("https://i.imgur.com/0wOURcn.png")
          .setThumbnail("https://i.imgur.com/0wOURcn.png")
          // .setTimestamp("00:00:00am")
          .setTitle("Title")
          .setURL("http://pandafish.atwebpages.com")
        message.channel.sendEmbed(embed)
          .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
      break;

      /* case "play":
        if (!args[1]) {
            message.channel.send("No link provided");
            return;
        }
        if (!message.member.voiceChannel) {
            message.channel.send("You must be in a voice channel");
            return;
        }
        if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
        };
        var server = servers[message.guild.id];
        server.queue.push(args[1]);
        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            play(connection, message);
        });
      break;
      case "skip":
        message.delete();
        var server = servers[message.guild.id];
        if(server.dispatcher) {
          server.dispatcher.end();
        }
      break;
      case "stop":
        message.delete();
        var server = servers[message.guild.id];
        if(message.guild.voiceConnection) {
          message.guild.voiceConnection.disconnect();
        }
      break; */


      case "help":
        message.channel.send(':information_source: <@'+message.author.id+'>\n A full list of my commands can be found on the following webpage: <http://pandafish.atwebpages.com/010_discordBot/html/discordbot.html>.\n If you want to suggest any feature or report a bug, please follow this link: <https://goo.gl/forms/byEXtLPMVNiwITru2>');
      break;

      case "invite":
        message.delete();
        message.channel.send('<@'+message.author.id+'> Invite me to your server through <https://discordapp.com/api/oauth2/authorize?client_id='+clientID+'&scope=bot&permissions=8>')
          .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
      break;

      default:
      message.react(client.emojis.find("id", failEmoteID));
        message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Error finding the following command: `` "+message.content+" `` "+client.emojis.find("id", failEmoteID))
          .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
      break;
    }
  } else {
    if (message.content.startsWith(modPrefix)){
      var args = message.content.substring(modPrefix.length).split(" ");
      switch (args[0].toLowerCase()) {

        case "changeusername":
          if(whitelistBotMod.indexOf(message.author.id) > -1) {
            message.channel.send("Changing username...");
            console.log("Changing username to "+message.content.substring(funPrefix.length+args[0].length)+"... Executed by "+ message.author.id);
            client.user.setUsername(message.content.substring(modPrefix.length+args[0].length)).then(user => message.channel.send('My new nickname is `` '+user.username+' `` !')).catch(console.error);
          } else {
            message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``');
          }
        break;

        case "destroy":
          if(whitelistBotMod.indexOf(message.author.id) > -1) {
            message.channel.send("Destroying client...");
            console.log("Destroying... Executed by "+ message.author.id);
            client.destroy();
          } else {
            message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``');
          }
        break;

        case "hacktest":
        if(whitelistBotMod.indexOf(message.author.id) > -1) {
          message.channel.sendFile(args[1], args[2]+'.png', args[2]);
        } else {
          message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``');
        }
        break;

        case "restart":
          if(whitelistBotMod.indexOf(message.author.id) > -1) {
            message.channel.send(loadingEmoteGif+" Restarting client...");
            client.setTimeout(function(){
              console.log("Restarting... Executed by "+ message.author.id);
              process.exit();
            }, 1000);
          } else {
            message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'`` '+client.emojis.find("id", failEmoteID));
          }
        break;

        case "dm":
          message.delete();
          if(whitelistDM.indexOf(message.author.id) > -1) {
            var user = message.mentions.users.first();
            if(args[2]){
              if (args[1]){
                console.log(message.content+" ------"+user.username+"--------- "+message.author+"-----"+message.author.username);
                user.send(message.content.substring(modPrefix.length+args[0].length+args[1].length+1));
              } else {
                message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'Wrong Input?')
                  .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
              }
            }
          } else {
              message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``')
                .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
          }
        break;

        case "kick":
          if(message.guild.member(message.author).hasPermissions("KICK_MEMBERS") || whitelistBotMod.indexOf(message.author.id) > -1) {
            if(message.guild.member(clientID).hasPermissions("KICK_MEMBERS")){
              if (message.mentions.users.first()){
                var user = message.mentions.users.first();
                if(user == args[1]){
                  if(args[2]){
                    if(message.guild.member(user).kickable){
                      message.guild.member(user).kick()
                        .then((user) => {
                          message.channel.send("**"+client.emojis.find("id", kickEmoteID)+" ** <@"+user.id+"> **has sucessfully been kicked by:** <@"+message.author.id+"> **for:** ``'"+message.content.substring(modPrefix.length+args[0].length+args[1].length+1)+"'``");
                        }).catch(() => {
                          message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Couldn't ban user ``"+args[1]+"``");
                        });
                    } else {
                        message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> This member is not kickable.")
                          .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
                    }
                  } else {
                    message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> You need to define a kick reason")
                      .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
                  }
                } else {
                  message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Wrong use of arguments.")
                    .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
                }
              } else {
                  message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> No valid user- mention detected.")
                    .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
              }
            } else {
              message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Seems like I dont have permissions for that.")
                .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
            }
          } else {
              message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``')
                .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
          }
        break;

        case "ban":
          if(message.guild.member(message.author).hasPermissions("BAN_MEMBERS") || whitelistBotMod.indexOf(message.author.id) > -1) {
            if(message.guild.member(clientID).hasPermissions("BAN_MEMBERS")){
              if(message.mentions.users.first()){
                var user = message.mentions.users.first();
                if(user == args[1]){
                  if(args[2]){
                    if(message.guild.member(user).bannable){
                      message.guild.member(user).ban()
                        .then((user) => {
                          message.channel.send("**"+client.emojis.find("id", banHammerEmoteID)+" ** <@"+user.id+"> **has sucessfully been banned by:** <@"+message.author.id+"> **for: ** ``'"+message.content.substring(modPrefix.length+args[0].length+args[1].length+1)+"'``");
                        }).catch(() => {
                          message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Couldn't ban user ``"+args[1]+"``");
                        });
                    } else {
                        message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> This member is not bannable to me.")
                          .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
                    }
                  } else {
                    message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> You need to define a ban reason")
                      .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
                  }
                } else {
                  message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+">Wrong use of arguments.")
                    .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
                }
              } else {
                  message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> No valid user- mention detected.")
                    .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
              }
            } else {
              message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Seems like I dont have permissions for that.")
                .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
            }
          } else {
              message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``')
                .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
          }
        break;

        case "hackban":
          message.delete();
          if(message.guild.member(message.author).hasPermissions("BAN_MEMBERS") || whitelistBotMod.indexOf(message.author.id) > -1) {
            message.channel.send('Command in progress...')
              .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
          } else {
              message.channel.send('<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``')
                .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
          }
        break;

        case "unban":
          if(message.guild.member(message.author).hasPermissions("BAN_MEMBERS") || whitelistBotMod.indexOf(message.author.id) > -1) {
            if(message.guild.member(clientID).hasPermissions("BAN_MEMBERS")){
              if (args[1]){
                user = args[1];
                message.guild.unban(user)
                  .then((user) => {
                    message.channel.send("**"+client.emojis.find("id", unbanEmoteID)+" ** <@"+user.id+"> **has sucessfully been unbanned by:** <@"+message.author.id+"> **for:** ``'"+message.content.substring(modPrefix.length+args[0].length+args[1].length+1)+"'``");
                  }).catch(() => {
                    message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Couldn't unban ``"+args[1]+"``");
                  });
              } else {
                  message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> No valid user- id detected.")
                    .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
              }
            } else {
              message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Seems like I dont have permissions for that.")
                .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
            }
          } else {
              message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``')
                .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
          }
        break;

        case "sudo":
          var sudo = message.content.substring(funPrefix.length+4);
          if(whitelistSudo.indexOf(message.author.id) > -1) {
            message.delete()
            .then(msg => console.log(`Sudoing `+message.content+" From:"+message.author.id))
            .catch(console.error);
            message.channel.send(sudo);
          } else {
            message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``');
            message.delete();
          }
        break;

        case "hacksudo":
          var sudo = message.content.substring(funPrefix.length+args[0].length+2,message.content.length-1);
          if(whitelistSudo.indexOf(message.author.id) > -1) {
            message.delete()
            .then(msg => console.log(`Deleted message from `+message.author.id))
            .catch(console.error);
            message.channel.send(sudo);
          } else {
            message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``');
            message.delete();
          }
        break;

        case "nitroemote":
          message.delete();
          if(whitelistNitroemote.indexOf(message.author.id) > -1) {
            var emoteID = args[1];
            const emote = client.emojis.find("id", emoteID);
            message.channel.send("*"+emote+"*");
          } else {
            message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``')
              .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });

          }
        break;

        case "wh": //webhook
        message.delete();
        if(message.guild.member(message.author).hasPermissions("MANAGE_WEBHOOKS") || whitelistBotMod.indexOf(message.author.id) > -1) {
          if(message.guild.member(clientID).hasPermissions("MANAGE_WEBHOOKS")){
            if(message.content == modPrefix+args[0]){
                return hook(message.channel,'Hook Usage',`${modPrefix}wh <name># <message># <text># [HEXColor]# [avatarURL]\n\n**<> is  required\n[] is optional**`, defaultEmbedColor, client.user.avatarURL)
                  .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
              }
            if(message.content.indexOf('#')){
              let hookArgs = message.content.slice(modPrefix.length+3).split("#");
              if(hookArgs[0].length < 2){
                message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Name must be longer than 2 Characters.\n Error at: : ``'+message.content+'``')
                  .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
                return;
              }
              if(args[1].length){
                hook(message.channel, hookArgs[0],hookArgs[1],hookArgs[2],hookArgs[3],hookArgs[4]);
              } else {
                return hook(message.channel,'Hook Usage',`${modPrefix}wh <name># <message># <text># [HEXColor]# [avatarURL]\n\n**<> is  required\n[] is optional**`, defaultEmbedColor, client.user.avatarURL)
                  .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
              }
            } else {
              return message.channel.send("You need to sepertate your arguments with #s.")
                .then(send => { setTimeout(function(){  send.delete();  }, 60000);  }); return;
              }
          } else {
            message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Seems like I dont have permissions for that.")
              .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
          }
        } else {
            message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+'<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``')
              .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
        }
        break;

        case "prune":
        case "purge":
          if(message.guild){
            if(message.guild.member(message.author).hasPermissions("MANAGE_MESSAGES") || whitelistBotMod.indexOf(message.author.id) > -1) {
              var bulkDeleteAmount = message.content.substring(funPrefix.length+5);
              bulkDeleteAmount = parseInt(bulkDeleteAmount);
              if (isNaN(bulkDeleteAmount)){
                message.channel.send('Argument is not a number.')
                  .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
                return;
              }
              var orginalBulkDeleteAmount = bulkDeleteAmount;
              if (bulkDeleteAmount == 101) {
                message.channel.bulkDelete(51);
                message.channel.send(client.emojis.find("id", trashEmoteID)+"["+args[0]+"] `` "+orginalBulkDeleteAmount+" `` messages deleted by <@"+message.author.id+"> ...")
                  .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
                  message.channel.bulkDelete(50)
                    .catch(error => message.channel.send(`Error: ${error}`));
                  return;
              }
              while (bulkDeleteAmount > 100) {
                message.channel.bulkDelete(100);
                bulkDeleteAmount = bulkDeleteAmount-100;
              }
              message.channel.bulkDelete(bulkDeleteAmount)
                .catch(error => message.channel.send(`Error: ${error}`));
              message.channel.send(client.emojis.find("id", trashEmoteID)+"["+args[0].toUpperCase()+"] `` "+orginalBulkDeleteAmount+" `` messages deleted by <@"+message.author.id+"> ...")
                .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
             } else {
              message.delete();
              message.channel.send('<@'+message.author.id+'> Insufficient Permission for executing : ``'+message.content+'``')
                .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
            }
          }
        break;

        default:
          message.react(client.emojis.find("id", failEmoteID));
          message.channel.send(client.emojis.find("id", errorEmoteID)+"  "+"<@"+message.author.id+"> Error finding the following command: `` "+message.content+" ``")
            .then(send => { setTimeout(function(){  send.delete();  }, 60000);  });
        break;
    }
    }
  }
});

client.login(TOKEN);
