export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const email = req.body?.email;

  if (!email) {
    return res.status(400).json({ message: "E-mail obrigatório" });
  }

  try {
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email,
        groups: [process.env.MAILERLITE_GROUP_ID]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("MailerLite error:", error);
      return res.status(500).json({ message: "Erro ao inscrever" });
    }

    // sucesso → redireciona
    res.writeHead(302, { Location: "/newsletter-sucesso/" });
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
}
