const xapi = require('xapi');

/*
Written by Jaron Davis - 2/26/2019

Purpose:
This macro allows you to password protect specific panels on a touch 10 so that users canot make changes without knowing the pin.  
This prevents random users from making unauthorized changes.

Important Notes:
- This js file references specific panel IDs from the associated XML file.
*/


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
      xapi.command('UserInterface Message TextLine Display', {
        Text: 'PIN Incorrect, Please Try Again',
        Duration: 3,
      });
      showPinPad();
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
