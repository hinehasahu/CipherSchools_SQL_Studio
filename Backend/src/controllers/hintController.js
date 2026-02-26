const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const geminiai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const hintProvider = async (req, res) => {
  const { question } = req.body;

  if (!question) return res.status(400).json({ message: "Question required." });

  try {
    const model = geminiai.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `You are a SQL tutor. Your job is to give only hints. Do NOT provide full solution. Question: ${question}`;

    const result = await model.generateContent(prompt);

    const hint = result.response.text();

    res.status(200).json({ message: "Hint provided.", hint });
  } catch (error) {
    res.status(500).json({ message: "Hint generation failed." });
    console.log(error);
  }
};

module.exports = hintProvider;
