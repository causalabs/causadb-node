import axios from 'axios';
import { CausaDB } from './causadb';
import * as fs from 'fs';
import csv from 'csv-parser';
import { getCausadbUrl } from './utils';

const causadbUrl = getCausadbUrl();

export class Data {
    public client: CausaDB;
    public dataName: string;

    /**
     * Initializes the Data class.
     * @param dataName The name of the data.
     * @param client A CausaDB client.
     */
    constructor(dataName: string, client: CausaDB) {
        this.dataName = dataName;
        this.client = client;
    }

    /**
     * Remove the data from the CausaDB system.
     */
    async remove(): Promise<void> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            await axios.delete(`${causadbUrl}/data/${this.dataName}`, { headers });
        } catch (error) {
            throw new Error('CausaDB server request failed');
        }
    }

    /**
     * Add data from a CSV file.
     * @param filepath The path to the CSV file.
     */
    async fromCSV(filepath: string): Promise<void> {
        const dataset: any = {};
        fs.createReadStream(filepath)
            .pipe(csv())
            .on('data', (row: any) => {
                Object.keys(row).forEach((key) => {
                    if (!dataset[key]) {
                        dataset[key] = [];
                    }
                    dataset[key].push(row[key]);
                });
            })
            .on('end', () => {
                this.push(dataset);
            });
    }

    /**
     * Add data from a JSON object.
     */
    async fromJSON(data: any): Promise<void> {
        this.push(data);
    }

    /**
     * Pushes the data to the CausaDB server.
     * @param data The new data.
     */
    private async push(data: any): Promise<void> {
        const headers = { 'token': this.client.tokenSecret };
        try {
            const response = await axios.post(`${causadbUrl}/data/${this.dataName}`, data, { headers });
            if (response.data.status !== 'success') {
                throw new Error(`Failed to push data: ${response.data.message}`);
            }
        } catch (error) {
            throw new Error('CausaDB client failed to connect to server');
        }
    }
}