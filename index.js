const line = require('@line/bot-sdk');
const express = require('express');
// const axios = require('axios');
const dotenv = require('dotenv');
const {handleText} = require('./handleText.js')


const env = dotenv.config().parsed;
const app = express();

const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN
};

const lineClient = new line.Client(lineConfig);

app.post('/webhook', line.middleware(lineConfig), (req, res) => {
    try {
        const events = req.body.events;
        // console.log(events);
        return events.length > 0 ? events.forEach(item => handleEvent(item)) : res.status(200).send("OK");
    
    } catch (error) {
        res.status(500).end();  
    }
});


const handleEvent = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null;
    }

    // ให้ handleText ทำงานและส่งข้อความที่ได้กลับ
    const responseText = await handleText(event.message.text, event.replyToken);
    // console.log("responseText========", responseText);
    return lineClient.replyMessage(event.replyToken, responseText);
};





app.listen(4000, () => {
    console.log('listening on 4000');
});
