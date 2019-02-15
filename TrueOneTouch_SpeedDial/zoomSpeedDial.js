const xapi = require('xapi');

/*

Written by Jaron Davis - 1/24/2019

Purpose:
This macro is a one touch speed dial to zoom.

Important Notes:
- Upload the macro (zoomSpeedDial.js) first and then upload the in room control file (zoomSpeedDial.xml) after.
- This is written for CE9.5 and above.

*/

const ZOOMSPEED_DIAL_NUMBER = 'zoom1@zoomcrc.com';

xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
    if(event.PanelId == 'oneTouchZoomDial_PID'){
         xapi.command("dial", {Number: ZOOMSPEED_DIAL_NUMBER});
    }
});