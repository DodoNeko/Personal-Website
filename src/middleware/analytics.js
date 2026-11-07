import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const logPopularity = async (req, res, next) => {
    if (req.query.search && req.query.search.trim() !== '') {
        return next(); 
    }

    const date = new Date().toLocaleString('pl-PL');
    const ip = req.ip || req.connection.remoteAddress;
    
    let action = '';
    
    if (req.params.id) {
        action = `Szczegóły elementu: ${req.params.id}`;
    } else {
        action = `Przeglądanie listy - Kategoria: ${req.query.category || 'wszystkie'}`;
    }

    const logLine = `[${date}] IP: ${ip} | Akcja: ${action}\n`;

    try {
        const logsDir = path.join(__dirname, '../../logs');
        const logFilePath = path.join(logsDir, 'analytics.txt');

        await fs.mkdir(logsDir, { recursive: true });
        await fs.appendFile(logFilePath, logLine);
    } catch (error) {
        console.error('Błąd podczas zapisywania logów analitycznych:', error);
    }

    next();
};