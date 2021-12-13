import express, {Request, Response} from 'express';
import { UserController } from '../../modules/User/controllers/userController'; // import the user controller
import { createConnection } from "typeorm";
import { join } from 'path';

class Server {

  private userController: UserController;
  private app: express.Application;

  
  constructor(){
    this.app = express(); 
    this.configuration();
    this.routes();
  }


  public configuration() {
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(express.json());
  }

  public async routes(){
    await createConnection({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "docker",
      "database": "b8one",
      "entities": [join(__dirname, '../../modules/**', '*.entity.{ts,js}')],
      "migrations": [
        "../migrations/*.ts"
      ],
      "cli": {
        "migrationsDir":  "./src/shared/migrations"
      },
      "name": "users",
      synchronize: true
     })
    this.userController = new UserController();

    this.app.get( "/", (req: Request, res: Response ) => {
      res.send( "Hello world!" );
    });

    this.app.use(`/api/users/`,this.userController.router); 
  }

  public start(){
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server(); 
server.start(); 