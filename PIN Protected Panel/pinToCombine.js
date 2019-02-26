const xapi = require('xapi');

const pin = '12345';

xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
    if(event.PanelId === 'Divisible_Room_Control_PanelID'){
      showPinPad();
    }
});

xapi.event.on('UserInterface Message TextInput Clear', (event) => {
  if(event.FeedbackId === 'FID_PIN' && event.Text !== pin) {
    xapi.command('UserInterface Extensions Panel Close');
    console.log('User backed out of pin prompt');
  }
})

xapi.event.on('UserInterface Message TextInput Response', (event) => {
    if(event.Text === pin){
      xapi.command('UserInterface Message TextInput Clear');
      console.log('User Entered: ' + event.Text);
    }
    if(event.Text !== pin) {
      xapi.command('UserInterface Extensions Panel Close');
      console.log('User Entered ' + event.Text + ' which is incorrect.');
    }
  });

function showPinPad(text){
  xapi.command('UserInterface Message TextInput Display', {
    Title: 'Enter PIN',
    Text: 'A PIN is required to put these rooms into combined mode.',
    InputType: 'PIN',
    KeyboardState: 'Open',
    Duration: '0',
    FeedbackId: 'FID_PIN'
  })
}
