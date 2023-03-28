# Relay-MVP
Main goal of this 3 day MVP was go give my 2023 runners a better virtual relay experience than I provided in 2021 using google sheets.

While working to finalize the app for use, I decided to deploy a demo to be able to experience the app from all prespectives at the click of a button or two.

Demo: [DEMO](http://52.21.107.140:3008/)

The following walk throughs can help you understand the demo. As you move down the list you can still do everything above.

Viewer Walkthrough:

This is the view without clicking either option at the bottom. At the top is a progress bar to show how much of the relay has been completed. Below that are the race details where you can see when each leg is supposed to start and end, and how on pace the race is. If you click on a leg you can see who is running it, the distance, and the runners pace.

Runner Walkthrough:

The first addition you might notice when clicking the runner button is a new button at the top that says runner infromation. This allows runners easy access to eachothers phone numbers for hand offs and other communication needs. The phone number can be found by clicking on a runner accordion in the modal that pops up after clicking the runner infromation button. Also underneath the leg feed is a new button that says mark leg compelete. This is a feature I wanted my runners to have, because part of the fun is being able to mark your own leg complete. When running this in google sheets, I did not want anything to happen, so there was no edit access.

Organizer walk through:

In the organizer view, you now have the ability to add and edit runners, legs and the start time for the relay. Now when you open the runner info modal, a button will apear at the bottom allowing you to add runners. To edit a runners info open their accordion in the runner info modal and click the edit runner button. The same hold true for how to edit legs, now when you open the leg accordions a button to edit exists. The button to add a leg in underneath the legs next to the mark complete button. Just below that is the final feature. I updated the relay start time to take a user friendly date time and convert it to unix to for the calculations. Watch all the leg time estimates update when you change the day and time, its probably my favorite part of the app.

Since I am the organizer, and this app is designed to be used by very few people, the features and styles may not change much as a continue preping it for the race, but this is undoubtedly much more runner friendly than storing the information on spread sheets.