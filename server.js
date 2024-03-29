const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: 'YOUR_KEY_HERE'
});

// setup Server
const app = express();
app.use(express.json());
app.use(express.static('./dist'))
app.use(bodyParser.json());
app.use(cors());

// endpoint for ChatGPT
app.post("/chat", async (req, res) => {
  try{
    const { prompt } = req.body;
    console.log(req.body);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      messages: [
        {role: "system", content: "You are a knowledgeable assistant and teacher. You help to ask useful questions based on the context provided to guide understanding and learning."},
        {role: "user", content: prompt}
      ],
      response_format: {type: "json_object"}
    
    });
    res.send(completion.choices[0].message.content);
    console.log(completion.choices[0].message.content);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred");
    }
  });

// After all your API routes...
// Add a catch-all handler to serve the index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
  
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
