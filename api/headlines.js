import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`
    );

    const headlines = response.data.articles.map(a => a.title);
    res.status(200).json(headlines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch headlines" });
  }
}
