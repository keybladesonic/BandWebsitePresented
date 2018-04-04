# Band Website
Setup (Using Ubuntu Mate VM)
1. Download all files.
2. Start a command line window where you downloaded the files.
3. Type: dpd create bandwebsite-backend
4. Move the reources folder to bandwebsite-backend/resources.6. Type: cd bandwebsite-backend
5. Type: dpd
6. Open a second command line window at the root of the downloaded files. (same folder as step 2)
7. Type: browser-sync start --server --files ".html, stylesheets/.css, scripts/.js"
8. The webpage should be viewable at http://localhost:3000/Home.html

Instructions for Using the Site
1. The Home Page allows for the individual band to sign up/log in to the site. Signing up allows for the band to create their own page with their description. Upon logging in, band members are able to add any recent events that they were at.
2. Once an event is added (with the date and location), then it will appear on their band page. It will be open for attendees of their events to click and review said event. 
3. Upon clicking the event, it will take them to the specific event page, where it will show all the details of the event, and the avg. rating; with the most recent reviews appearing below.
4. For attendees, they will be able to click a review button, where a form will appear to leave a review. Once the review is completed and submitted, the page will refresh with the added review.
