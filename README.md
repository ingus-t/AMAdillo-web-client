![Amadillo logo](https://github.com/ingus-t/SPAI-AMA-nodejs/blob/master/img/amadillo.png "Amadillo")
# AMAdillo Slack App

Author: Ingus Terbets

# What is this?
This is an app that allows Slack users to search the AMA transcript database by using fuzzy string matching.

In total there are 4 parts in the Slack App project:
1. Node.js web service (this repository)
2. Slack App
3. AMA transcript parser: [https://github.com/ingus-t/SPAI-AMA-search/blob/master/converter/converter.py](https://github.com/ingus-t/SPAI-AMA-search/blob/master/converter/converter.py)
4. Web interface for testing - currently disabled [https://ingus-t.github.io/SPAI-AMA-search/](https://ingus-t.github.io/SPAI-AMA-search/)

# Requirements on local machine to build/run the project:
* Having Heroku CLI installed. If you don't have it, you can install it via this link.
https://devcenter.heroku.com/articles/heroku-cli#download-and-install
* registration on [https://heroku.com](https://heroku.com)
* Having git installed

# How to push the web service on Heroku server.
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

# How to connect Slack App to the Node web service:
* Create a new Slack App and install it on your workspace (can do it via this link [https://api.slack.com/apps](https://api.slack.com/apps));
* Add a slash command to your app, with following values:  
  * Command:				**/amadillo**  
  * Request URL:			**[full link to your Heroku app instance]**  
  * Short Description:		**/amadillo When is the deadline? | 0.5**  
  * Usage Hint:				**search query | threshold (optional)**  

![Slack Slash command](https://raw.githubusercontent.com/ingus-t/SPAI-AMA-nodejs/master/img/Slack_slash_command.PNG "Slack Slash command")

# Example commands:
* /amadillo deadline - search for term deadline
* /amadillo deadline | 0.25 - search for term deadline with error threshold 0.75
* /amadillo [help/h/-h] - see tips and examples, no need to look here :)

# Screenshot:
![Screenshot](https://github.com/ingus-t/SPAI-AMA-nodejs/blob/master/img/ss.PNG "Screenshot")

# Issues, planned changes (long list... :) )
* 

# Acknowledgements

AMA transcript dataset:  
Taimur Zahid  

Logo:  
Parkjisun from noun project  
https://thenounproject.com/term/armadillo/930998/
