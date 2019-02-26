const xapi = require('xapi');

const pin = '12345';

xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
    if(event.PanelId == 'Divisible_Room_Control_PanelID'){
      showPinPad();
    }
});

xapi.event.on('UserInterface Message TextInput Clear', (event) => {
  if(event.FeedbackId === 'PIN' && event.Text !== pin) {
    xapi.command('UserInterface Extensions Panel Close');
  }
})

function showPinPad(text){
  xapi.command('UserInterface Message TextInput Display', {
    Title: 'Enter PIN',
    Text: 'A PIN is required to put these rooms into combined mode.',
    InputType: 'PIN',
    KeyboardState: 'Open',
    Duration: '0',
    FeedbackId: 'PIN'
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
