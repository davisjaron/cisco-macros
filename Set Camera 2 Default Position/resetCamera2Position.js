const xapi = require('xapi');

/*
Written by Jaron Davis - 2/13/2019

Purpose:
This macro sets the default position for Camera 2 since that cannot be done automatically in the codec.

Information:
- To reset positioning, you can SSH into the codec CLI and use the command 'xStatus Cameras Camera Position' to get the positions.
- The original command is 'xCommand Camera PositionSet CameraId:2 Focus:4333 Pan:4079 Tilt:-612 Zoom:6237'
*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

xapi.status.on('Standby State', state => {
  console.log('Changing Standby State To: ', state);
    if (state === 'Off') sleep(10000).then(() => {
      xapi.command("Camera PositionSet", {
			 CameraId: '2',
			 Focus: '4333',
			 Pan: '4079',
			 Tilt: '-612',
			 Zoom: '6237'
			 });
    });
});
