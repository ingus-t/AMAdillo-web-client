<p align="center">
  <img src="https://github.com/ingus-t/SPAI-AMA-nodejs/blob/master/img/amadillo.png" alt="AMAdillo" width="200"/>
</p>

# AMAdillo

Author: Ingus Terbets

## Introduction
**AMAdillo** is a Slack app that allows users to search the AMA transcript database by using fuzzy string matching.  
**1427** questions have been asked during AMA sessions until August 15th. I think that many of the questions asked in AMA have already been answered before. And they are often repeated.  
One possible reason for that is FAQ information fragmentation across many pages. S&P AI page has an FAQ section, #60daysofudacity page has FAQ section, #showcase page has an FAQ section. AMA question/answer transcript and the Slack channel are not convenient to search through for many students, especially because of the 10 000 message limit.  

It would be useful if questions from all these FAQs and also the AMA transcript would be combined. If they were properly weighed, answers from official FAQs come before AMA answers (they still have to match the keywords).  
Making this simple search possible through Slack would really benefit the students.  
The best or most interesting answers from Slack could also be added to the dataset.

## Parts of this project
In total there are 4 parts in the Slack App project:
1. Node.js web service (this repository)
2. Slack App
3. AMA transcript parser: [https://github.com/ingus-t/SPAI-AMA-search/blob/master/converter/converter.py](https://github.com/ingus-t/SPAI-AMA-search/blob/master/converter/converter.py)
4. Web interface for testing (outside Slack) - currently disabled [https://ingus-t.github.io/SPAI-AMA-search/](https://ingus-t.github.io/SPAI-AMA-search/)

## Requirements on local machine to build/run the project:
* Having Heroku CLI installed. If you don't have it, you can install it via this link.
https://devcenter.heroku.com/articles/heroku-cli#download-and-install
* registration on [https://heroku.com](https://heroku.com)
* Having git installed

## How to push the web service on Heroku server.
* download this project
* open the terminal/commandline
* navigate to project folder
* npm install
* git init
* **!! Request dataset file _transcript.js_ from author and put it inside /data folder. It is not included for privacy reasons, as suggested by Udacity community admin !!**
* git add . 
* git commit -m "New deployment"
* heroku create (Take note of the new Heroku instance web address)
* git push heroku master

## How to connect Slack App to the Node web service:
* Create a new Slack App and install it on your workspace (can do it via this link [https://api.slack.com/apps](https://api.slack.com/apps));
* Add a slash command to your app, with following values:  
  * Command:				**/amadillo**  
  * Request URL:			**[full link to your Heroku app instance]**  
  * Short Description:		**/amadillo When is the deadline? | 0.5**  
  * Usage Hint:				**search query | threshold (optional)**  

![Slack Slash command](https://raw.githubusercontent.com/ingus-t/SPAI-AMA-nodejs/master/img/Slack_slash_command.PNG "Slack Slash command")

## Example commands:
* **/amadillo deadline** - search for the term *deadline*
* **/amadillo deadline | 0.25** - search for term deadline with error threshold 0.25
* **/amadillo help** - see tips and examples, no need to look up the GitHub page :)

## Screenshot:
![Screenshot](https://github.com/ingus-t/SPAI-AMA-nodejs/blob/master/img/ss.PNG "Screenshot")

## Issues, planned changes (long list... :) )
* If I got full user name list from Udacity admins - then all usernames could be completely removed from the dataset (they are only partially removed in an automated process. And doing it manually is error prone and time consuming).
* For safe Slack integration I would need an admin from Udacity to talk to me. Privacy is important.

Possible additional commands:  
* **/60days 1** - allows adding or editing information about a specific #60daysofudacity challenge day. And the full log would automatically be saved and available to Udacity staff.

## Acknowledgements
1. Taimur Zahid, for compiling the AMA transcript dataset.
2. Parkjisun from noun project, Logo, [https://thenounproject.com/term/armadillo/930998/](https://thenounproject.com/term/armadillo/930998/)
