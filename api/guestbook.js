import fs from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.join(process.cwd(), 'src', '_data', 'guestbook.json');

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function sanitizeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function readMessages() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return { messages: [] };
  }
}

function writeMessages(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    const data = readMessages();
    const messages = data.messages
      .slice()
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return res.status(200).json({ messages });
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { name, message, honeypot } = body;

      if (honeypot) {
        return res.status(400).json({ error: 'Spam detected' });
      }

      if (!name || !message) {
        return res.status(400).json({ error: 'Nome e mensagem são obrigatórios' });
      }

      if (name.length > 100 || message.length > 2000) {
        return res.status(400).json({ error: 'Nome ou mensagem muito longos' });
      }

      const data = readMessages();
      const newMessage = {
        id: generateId(),
        name: sanitizeHtml(name.trim()),
        message: sanitizeHtml(message.trim()),
        timestamp: new Date().toISOString()
      };

      data.messages.push(newMessage);
      writeMessages(data);

      return res.status(201).json({ success: true, message: newMessage });
    } catch (e) {
      return res.status(500).json({ error: 'Erro ao salvar mensagem' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}