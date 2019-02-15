const xapi = require('xapi');

/*
Written by Jaron Davis - 1/20/2019
Note - The xapi.command(UserInterface Extensions Panel Close'); only functions in CE9.5+
This has not been tested yet in a CE9.5 environment.
*/

//This is the Laptop Source.  If backwards, notate change here.
xapi.event.on('UserInterface Extensions Page Action', (event) => {
    if(event.Type == 'Opened' && event.PageId == 'source3'){
         xapi.command("Presentation Start", {PresentationSource: 3});
    }
});


//This is the stop button within the Laptop Source panel.  
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if(event.Type == 'pressed' && event.WidgetId == 'widget_1'){
         xapi.command("Presentation Stop", {PresentationSource: 3});
         xapi.command('UserInterface Extensions Panel Close');
    }
});


//This is the In-Room PC Source.
xapi.event.on('UserInterface Extensions Page Action', (event) => {
    if(event.Type == 'Opened' && event.PageId == 'source2'){
         xapi.command("Presentation Start", {PresentationSource: 2});
    }
});


//This is the Stop button for In-Room PC Source Panel.
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if(event.Type == 'pressed' && event.WidgetId == 'widget_2'){
         xapi.command("Presentation Stop", {PresentationSource: 2});
         xapi.command('UserInterface Extensions Panel Close');
    }
});