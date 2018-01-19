message.delete();
var emotemessage = ' ';
var length = message.content.length;
var inputMessage = message.content.slice(funPrefix.length+args[0].length).toLowerCase();
for (let i=0; i < length; i++){
  var character = inputMessage.charAt(i);
  if (/^[a-zA-Z]/.test(character)) {
      emotemessage = emotemessage+':regional_indicator_'+character+': ';
  }
  if (!(isNaN(character))){
    switch(character){
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

      default:
      break;
    }
  }
  if (i == length){
    message.channel.send(emotemessage);
  }
}
