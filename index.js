const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();
const { UserRoute } = require("./Routes/userRoute");
const { Configuration, OpenAIApi } = require("openai");
const { HistoryRoute } = require("./Routes/historyRoute");

const cors = require("cors");
const { connection } = require("./db");
const { historyModel } = require("./Models/historyModel");
const { Auth } = require("./Middleware/authMiddleware");

const app = express();

const port = 3000;

app.use(express.json());

app.use(cors());

app.use("/user", UserRoute);
app.use("/history", HistoryRoute);

const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

app.post("/generate", Auth, async (req, res) => {
  try {
    const { content, language, input } = req.body;
    console.log(content, language, input);

    const response = await main(content, language, input);

    let data = response[0].message.content;

    const history = new historyModel({
      body: data,
      userID: req.body.userId,
      date: Date(),
    });
    await history.save();

    res.json(response[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

async function main(content, language, input) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `act as a Professional artist 
    I want you to give me great lines for (quotes,jokes,shayari) and i could ask you to give me specific type of content in hindi or english language and  i will give you a keyword , based on which you could decide the subject for required data, Give me specific response in more than 40 words,
    
    based on above data here is the prompt ,  
    tell me a ${content} in ${language} language about ${input} `,
      },
    ],
    model: "gpt-3.5-turbo", //it will be costly to use
    // model:'GPT-3',
  });

  return chatCompletion.choices;
}

app.get("/", (req, res) => {
  res.send("Welcome to the backend of Shayri Genarator");
});

app.listen(port, async () => {
  try {
    await connection();
    console.log(`Listening at port - ${port}`);
  } catch (error) {
    console.error(error.message);
  }
});
