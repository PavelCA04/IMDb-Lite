import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { connectToDatabase } from '../utils/db';
import { ObjectId } from 'mongodb';

dotenv.config();

const _limit: number = 12;

interface Movie {
  _id: ObjectId;
  title: string;
  images: { url: string; is_cover: boolean }[];
  cast: { actor_id: ObjectId; character_name: string }[];
}

interface Actor {
  _id: ObjectId;
  name: string;
  birth_date: string;
  biography: string;
  images: { url: string; is_profile: boolean }[];
  movies: { movie_id: ObjectId; character_name: string }[];
}

const actorController = {
    createActor: async (req: Request, res: Response): Promise<void> => {
        try {
          const { name, birth_date, biography, images, movies } = req.body;
      
          if (!name || typeof name !== 'string' || name.trim().length < 3) {
            res.status(400).json({ message: 'Invalid name. It must be a non-empty string with at least 3 characters.' });
            return;
          }
      
          if (!birth_date || isNaN(Date.parse(birth_date))) {
            res.status(400).json({ message: 'Invalid birth date. Provide a valid date in YYYY-MM-DD format.' });
            return;
          }
      
          if (!biography || typeof biography !== 'string' || biography.trim().length < 10) {
            res.status(400).json({ message: 'Invalid biography. It must be a string with at least 10 characters.' });
            return;
          }
      
          if (!Array.isArray(images) || images.some((img) => typeof img !== 'string')) {
            res.status(400).json({ message: 'Invalid images. Provide an array of strings.' });
            return;
          }
      
          if (!Array.isArray(movies) || movies.some((movie) => typeof movie !== 'string')) {
            res.status(400).json({ message: 'Invalid movies. Provide an array of strings.' });
            return;
          }
      
          const actor = {
            name: name.trim(),
            birth_date: new Date(birth_date).toISOString(),
            biography: biography.trim(),
            images,
            movies,
          };
      
          const db = await connectToDatabase();
          const collection = db.collection('Actor');
      
          const result = await collection.insertOne(actor);
      
          if (result.acknowledged) {
            res.status(201).json({ message: 'Actor created successfully', actor });
          } else {
            res.status(500).json({ message: 'Failed to create actor' });
          }
        } catch (error) {
          console.error('Error creating actor:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    readActors: async (req: Request, res: Response): Promise<void> => {
      try {
          const db = await connectToDatabase();
          const collection = db.collection('Actor');
      
          const page = parseInt(req.query.page as string) || 1;
          const limit = parseInt(req.query.limit as string) || _limit;
          const skip = (page - 1) * limit;

          const filters: any = {};

          if (req.query.name) { filters.name = { $regex: req.query.name, $options: 'i' } }
          if (req.query.birth_date) {
            const birthYear = parseInt(req.query.birth_date as string);
            filters.birth_date = {
                $regex: `^${birthYear}`,
            };
        }

          const sort: any = {};
          if (req.query.sort === 'asc') {
            sort.name = 1;
          } else if (req.query.sort === 'desc') {
            sort.name = -1;
          }

          const actors = await collection
          .find(filters)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .toArray();

          const totalActors = await collection.countDocuments(filters);

          res.status(200).json({
            page,
            limit,
            totalActors,
            totalPages: Math.ceil(totalActors / limit),
            actors,
          });
          
        } catch (error) {
          console.error('Error reading actors:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    readActorByID: async (req: Request, res: Response): Promise<void> => {
      try {
          const db = await connectToDatabase();
          const actorCollection = db.collection<Actor>('Actor');
          const movieCollection = db.collection<Movie>('Movie');
  
          const actorId = new ObjectId(req.params.id);
          const actor = await actorCollection.findOne({ _id: actorId });
  
          if (!actor) {
              res.status(404).json({ message: 'Actor not found' });
              return;
          }
  
          // Fetch all movies where this actor appears in the cast
          const movies: Movie[] = await movieCollection.find({ "cast.actor_id": actorId }).toArray();
  
          // Enrich movies with character_name from the cast
          actor.movies = movies.map((movie: Movie) => {
              // Find the character_name for this actor in the cast array
              const castEntry = movie.cast.find((c: { actor_id: ObjectId; character_name: string }) => c.actor_id.equals(actorId));
              
              return {
                  movie_id: movie._id,
                  title: movie.title,
                  images: movie.images,
                  character_name: castEntry ? castEntry.character_name : 'Unknown'
              };
          });
  
          res.status(200).json(actor);
      } catch (error) {
          console.error('Error reading actor by ID:', error);
          res.status(500).json({ message: 'Internal Server Error' });
      }
  },
  
  
    updateActor: async (req: Request, res: Response): Promise<void> => {
        try {
          const db = await connectToDatabase();
          const collection = db.collection('Actor');
      
          const actorId = new ObjectId(req.params.id);
          const updateFields = req.body;
      
          const actorToUpdate = await collection.findOne({ _id: actorId });
      
          if (!actorToUpdate) {
            res.status(404).json({ message: 'Actor not found' });
            return;
          }
      
          const result = await collection.updateOne(
            { _id: actorId },
            { $set: updateFields }
          );
      
          if (result.modifiedCount === 0) {
            res.status(400).json({ message: 'No changes made to the actor' });
            return;
          }
      
          const updatedActor = await collection.findOne({ _id: actorId });
      
          res.status(200).json({
            message: 'Actor updated successfully',
            actor: updatedActor,
          });
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deleteActor: async (req: Request, res: Response): Promise<void> => {
        try {
          const db = await connectToDatabase();
          const collection = db.collection('Actor');
      
          const actorToDelete = await collection.findOne({ _id: new ObjectId(req.params.id) });
      
          if (!actorToDelete) {
            res.status(404).json({ message: 'Actor not found' });
            return;
          }
      
          const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
      
          if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Actor not found' });
          } else {
            res.status(200).json({
              message: 'Actor deleted successfully',
              actor: actorToDelete
            });
          }
        } catch (error) {
          console.error('Error deleting actor:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        } 
    },
      
};

export default actorController;