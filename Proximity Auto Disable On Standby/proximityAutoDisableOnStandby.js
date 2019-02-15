const xapi = require('xapi');

/*
Written by Jaron Davis - 1/22/2019

Purpose:
This macro automatically disables Cisco Proximity whenever the system enters standby.

Important Notes:
- This was written specifically for the 6901 S. Havana St. Cafe, to prevent the entire AV system from turning on when users with Proximity walk into the cafe.
- There is no XML file required for this macro, simply upload this file as a macro within the codec.
*/

xapi.status.on('Standby State', state => {
  console.log('going to ', state);
    if (state === 'Standby') xapi.config.set("Proximity Mode", "Off"), console.log('If Proximity Was Enabled, It Is Now Disabled');
});
