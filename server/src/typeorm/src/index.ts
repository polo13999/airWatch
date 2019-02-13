import 'reflect-metadata'
import { createConnection } from 'typeorm'
//import {User} from "./entity/User";
import { Photo } from './entity/Photo'

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'test',
  database: 'test',
  entities: [Photo],
  synchronize: true,
  logging: false
})
  .then(async connection => {
    console.log('test')
  })
  .catch(error => console.log(error))
