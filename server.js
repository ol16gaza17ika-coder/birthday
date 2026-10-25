// Простой сервер без зависимостей: отдаёт сайт из папки public и хранит пожелания в data/wishes.json
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 8080;
const PUB = path.join(__dirname, 'public');
const DATA = process.env.DATA_DIR || path.join(__dirname, 'data');
const FILE = path.join(DATA, 'wishes.json');
fs.mkdirSync(DATA, { recursive: true });

const load = () => { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch (e) { return []; } };
const save = (w) => { fs.writeFileSync(FILE + '.tmp', JSON.stringify(w, null, 1)); fs.renameSync(FILE + '.tmp', FILE); };
const clean = (s, max) => String(s || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').replace(/\s+\n/g, '\n').trim().slice(0, max);

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

// не больше 5 пожеланий с одного адреса за 10 минут
const hits = new Map();
const limited = (ip) => { const now = Date.now(), a = (hits.get(ip) || []).filter(t => now - t < 600000); a.push(now); hits.set(ip, a); return a.length > 5; };
const send = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(obj)); };

http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (u.pathname === '/api/wishes') {
    if (req.method === 'GET') return send(res, 200, load().map(({ t, n, d }) => ({ t, n, d })));
    if (req.method === 'POST') {
      let body = '';
      req.on('data', c => { body += c; if (body.length > 10000) req.destroy(); });
      req.on('end', () => {
        let j; try { j = JSON.parse(body); } catch (e) { return send(res, 400, { error: 'Некорректный запрос' }); }
        const t = clean(j.t, 500), n = clean(j.n, 60);
        if (t.length < 2) return send(res, 400, { error: 'Напиши хотя бы пару слов 💙' });
        const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
        if (limited(ip)) return send(res, 429, { error: 'Слишком часто, попробуй чуть позже' });
        const all = load();
        if (all.length >= 1000) return send(res, 400, { error: 'Пожеланий уже слишком много' });
        const w = { t, n, d: new Date().toISOString() };
        all.push(w); save(all); send(res, 201, { t, n, d: w.d });
      });
      return;
    }
    return send(res, 405, { error: 'Метод не поддерживается' });
  }
  // статические файлы
  let p = decodeURIComponent(u.pathname); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(PUB, path.normalize(p));
  if (f !== PUB && !f.startsWith(PUB + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(f, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Не найдено'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css') ? 'no-cache' : 'public, max-age=86400' });
    res.end(buf);
  });
}).listen(PORT, () => console.log('Сайт запущен: http://localhost:' + PORT));
