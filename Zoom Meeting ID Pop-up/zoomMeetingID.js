const xapi = require('xapi');
let isInZoomCall = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

xapi.event.on('CallDisconnect', (event) => {
	isInZoomCall = 0;
    });

xapi.status.on('Call RemoteNumber', (remoteNumber) => {
	if(remoteNumber.includes('zoom1@zoomcrc.com')){
	    isInZoomCall = 1;
	    sleep(5000).then(() => {
		    if(isInZoomCall){ // need to check again in case call has dropped within the last 5 seconds
			xapi.command("UserInterface Message TextInput Display", {
				Duration: 45
				, FeedbackId:'zoom pin'
				, InputType: 'SingleLine'
				, KeyboardState:'Open'
				, Placeholder:'Please enter the Meeting ID'
				, SubmitText:'Submit ID'
				, Title: 'Zoom Meeting ID'
				, Text: 'Please enter the Meeting ID'
			    });
		    }
		});
	}
    });



xapi.event.on('UserInterface Message TextInput Response', (event) => {
	switch(event.FeedbackId){
        case 'zoom pin':
	sleep(500).then(() => {
                xapi.command("Call DTMFSend", {DTMFString: event.Text});
                if(!event.Text.includes('#')){
                    xapi.command("Call DTMFSend", {DTMFString: '#'});
                }
            });
	break;
	}
    });