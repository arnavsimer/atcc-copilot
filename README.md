# Introduction 
This is the front end implementation of the Web 3.0 ATCC chatbot. 
The chatbot will have following features.
- __RAG Engine__ which will have 3 data sources. Which will try to give answer to common users queries related to products, FAQs or any other proces mentioned in the website.
    - [ATCC Website](https://atcc.org)
    - Products Information
    - FAQs
- __Order Statu__ : Logged in user can check the status of their order.
- __Ticket generation__ : If bot fails to answer user or user is not satisfied and live agent is not available to take care then a CRM ticket will be created.
- __Talk to Live Agent__ : User can talk to live agent if unsatisfied and agent is available.
- __Ticket Status__ : User can talk to live agent about the status of the CRM ticket.

# Prerequisites
Copilot creted in [Microsoft Copilot Studio](https://copilotstudio.microsoft.com).
[Node JS](https://nodejs.org/en/download/prebuilt-installer) - Latest Version.
[http-server](https://www.npmjs.com/package/http-server) - NPM module.

# Running on local
- Clone the repo : "master" branch for production and "development" branch for the development version with latest changes.
- run ```http-server .``` 
- Open browser with url : ```http://localhost:8080/index.html```

# For Integration on any website 
copy ```<script crossorigin="anonymous" src="https://yourdomainname.org/assets/js/chatbot.js"></script>``` script tag and paste in index.html or in a common place from where chatbot can be rendered on all pages i.e. website header . 

__*NOTE*__ : Replace ```https://yourdomainname.org``` with appropriate domain name in the ```src``` attribute of script tag 