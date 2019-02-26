const xapi = require('xapi');

const pin = '12345';

xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
    if(event.PanelId == 'Divisible_Room_Control_PanelID'){
      showPinPad('Enter Divisible Room Control PIN');
    }
});

function showPinPad(text){
  xapi.command('UserInterface Message TextInput Display', {
    Title: 'Enter PIN',
    Text: 'A PIN is required to put these rooms into combined mode.',
    InputType: 'PIN',
    KeyboardState: 'Open',
    Duration: '0' 
  })
  .then(checkPinMatch);
}
	
function checkPinMatch(event) {
  xapi.event.on('UserInterface Message TextInput Response', (event) => {
    if(event.Text === pin){
      xapi.command('UserInterface Message TextInput Clear');
    }
    if(event.Text !== pin) {
      xapi.command('UserInterface Extensions Panel Close');
    }
  });
}
