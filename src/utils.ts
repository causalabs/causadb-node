import dotenv from 'dotenv';

dotenv.config();

export const getCausadbUrl = (): string => {
    return process.env.CAUSADB_URL ?? 'https://api.causadb.com/v1';
}