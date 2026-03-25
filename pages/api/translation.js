const translate = require("translate-google");

/**
 * This handles server side of the message translation
 * @param {*} req
 * @param {*} res
 * return the translated text
 */
export default async function translateHandler(req, res) {
  const { text = "", to = "en", options } = req.body;
  const translatedText = await translate(text, { to, ...options });
  res.json({ translatedText });
}
