import 'reflect-metadata'
import { createConnection } from 'typeorm'
import options from './options'
//import {User} from "./entity/User";
import { Photo } from './entity/Photo'
import { PhotoMetadata } from './entity/PhotoMetadata'
import { Album } from './entity/Album'
import { Author } from './entity/Author'

async function go(option) {
  let connection = await createConnection(options)

  // create a few albums
  let album1 = new Album()
  album1.name = 'Bears'
  await connection.manager.save(album1)

  let album2 = new Album()
  album2.name = 'Me'
  await connection.manager.save(album2)

  // create a few photos
  let photo = new Photo()
  photo.name = 'Me and Bears'
  photo.description = 'I am near polar bears'
  photo.filename = 'photo-with-bears.jpg'
  photo.albums = [album1, album2]
  photo.views = 1
  photo.isPublished = true
  await connection.manager.save(photo)

  // now our photo is saved and albums are attached to it
  // now lets load them:
  const loadedPhoto = await connection
    .getRepository(Photo)
    .findOne(1, { relations: ['albums'] })

  console.log('loadedPhoto', loadedPhoto)
}

go(options)
