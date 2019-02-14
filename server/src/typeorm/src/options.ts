import { Photo } from './entity/Photo'
import { PhotoMetadata } from './entity/PhotoMetadata'
import { Album } from './entity/Album'
import { Author } from './entity/Author'

import { ConnectionOptions } from 'typeorm'

const options: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'test',
  database: 'test',
  entities: [Photo, PhotoMetadata, Author, Album],
  synchronize: true,
  logging: false
}

export default options
