import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer, Server } from 'http';
import routesUrl from './routes/url.routes';

export class App {

    private app: Application;
    private httpServer: Server;

    private apiRoutes = {
        url: '/api',
    }

    constructor(){
        this.app = express();
        this.config();
        this.httpServer = createServer(this.app);
        this.routes();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    private routes(){
        this.app.use( this.apiRoutes.url, routesUrl );
    }

    async listen(port: string): Promise<void> {

        await this.httpServer.listen( port );
        console.log(`SERVER RUN ON PORT ${ port }`)
    }

}