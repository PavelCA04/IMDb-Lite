import { Request, Response } from 'express';
import { connectToDatabase } from '../utils/db';
import { ObjectId } from 'mongodb';

const _limit: number = 18;

interface Movie {
  _id: ObjectId;
  title: string;
  genre: string[];
  director: string;
  cast: Cast[];
  release_year: number;
  rating: number;
  // Add other fields here as needed
}

interface Cast {
  actor_id: string; // or ObjectId, depending on your setup
  character_name: string;
}


const movieController = {
    createMovie: async (req: Request, res: Response): Promise<void> => {
        try {
          const { title, description, genre, director, cast, release_year, rating, images } = req.body;
      
          if (!title || typeof title !== 'string' || title.trim().length < 3) {
            res.status(400).json({ message: 'Invalid title. It must be a non-empty string with at least 3 characters.' });
            return;
          }
      
          if (!description || typeof description !== 'string' || description.trim().length < 10) {
            res.status(400).json({ message: 'Invalid description. It must be a string with at least 10 characters.' });
            return;
          }
      
          if (!Array.isArray(genre) || genre.some((g) => typeof g !== 'string')) {
            res.status(400).json({ message: 'Invalid genre. Provide an array of strings.' });
            return;
          }
      
          if (!director || typeof director !== 'string' || director.trim().length < 3) {
            res.status(400).json({ message: 'Invalid director. It must be a non-empty string with at least 3 characters.' });
            return;
          }
      
          if (!Array.isArray(cast) || cast.some((c) => typeof c !== 'object' || !c.name)) {
            res.status(400).json({ message: 'Invalid cast. Each cast member must be an object with a `name` field.' });
            return;
          }
      
          if (!release_year || typeof release_year !== 'number' || release_year < 1900 || release_year > new Date().getFullYear() + 1) {
            res.status(400).json({ message: 'Invalid release year. Provide a valid year.' });
            return;
          }
      
          if (!rating || typeof rating !== 'number' || rating < 0 || rating > 10) {
            res.status(400).json({ message: 'Invalid rating. It must be a number between 0 and 10.' });
            return;
          }
      
          if (!Array.isArray(images) || images.some((img) => typeof img !== 'object' || !img.url)) {
            res.status(400).json({ message: 'Invalid images. Provide an array of objects with a `url` field.' });
            return;
          }
      
          const movie = {
            title: title.trim(),
            description: description.trim(),
            genre,
            director: director.trim(),
            cast,
            release_year,
            rating,
            images,
          };
      
          const db = await connectToDatabase();
          const collection = db.collection('Movie');
          const result = await collection.insertOne(movie);
      
          if (result.acknowledged) {
            res.status(201).json({ message: 'Movie created successfully', movie });
          } else {
            res.status(500).json({ message: 'Failed to create movie' });
          }
        } catch (error) {
          console.error('Error creating movie:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
    },  
    readMovies: async (req: Request, res: Response): Promise<void> => {
        try {
          const db = await connectToDatabase();
          const collection = db.collection('Movie');
          const actorCollection = db.collection('Actor');
      
          const page = parseInt(req.query.page as string) || 1;
          const limit = parseInt(req.query.limit as string) || _limit;
          const skip = (page - 1) * limit;
      
          const filters: any = {};
          if (req.query.genre) {
            if (Array.isArray(req.query.genre)) {
                filters.genre = { $in: req.query.genre }; 
            } else {
                filters.genre = req.query.genre;
            }
          }
          if (req.query.title) { filters.title = { $regex: req.query.title, $options: 'i' } }
          if (req.query.director) filters.director = req.query.director;
          if (req.query.release_year){
            filters.release_year = parseInt(req.query.release_year as string);
          } else if (req.query.year_start || req.query.year_end) {
            filters.release_year = {};
            if (req.query.year_start) {
              filters.release_year.$gte = parseInt(req.query.year_start as string);
            }
            if (req.query.year_end) {
              filters.release_year.$lte = parseInt(req.query.year_end as string);
            }
          }
          if (req.query.rating) {
            const rating = parseFloat(req.query.rating as string);
            filters.rating = {
                $gte: rating - 0.5,
                $lte: rating + 0.5,
            };
          }
      
          const movies = await collection
            .find(filters)
            .skip(skip)
            .limit(limit)
            .toArray();
      
          const totalMovies = await collection.countDocuments(filters);

          res.status(200).json({
            page,
            limit,
            totalMovies,
            totalPages: Math.ceil(totalMovies / limit),
            movies: movies,
          });
        } catch (error) {
          console.error('Error reading movies:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
    },
      
    readMovieByID: async (req: Request, res: Response): Promise<void> => {
      try {
          const db = await connectToDatabase();
          const collection = db.collection('Movie');
          const actorCollection = db.collection('Actor');

          const { id } = req.params;

          const movie = await collection.findOne({ _id: new ObjectId(id) });

          if (!movie) {
              res.status(404).json({ message: 'Movie not found.' });
              return;
          }

          movie.cast = await Promise.all(
            movie.cast.map(async (c: any) => {
                const actorId = new ObjectId(c.actor_id);
                const actor = await actorCollection.findOne({ _id: actorId });
                if (actor) {
                    c.actor_name = actor.name;
                    c.images = actor.images;
                    
                }
                return c;
            })
          );

          res.status(200).json(movie);
      } catch (error) {
            console.error('Error reading movie by ID:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
      },
      
      updateMovie: async (req: Request, res: Response): Promise<void> => {
        try {
          const db = await connectToDatabase();
          const collection = db.collection('Movie');
      
          const { id } = req.params;
      
          const { title, description, genre, director, cast, release_year, rating, images } = req.body;
    
          const updateData: any = {};
      
          if (title) updateData.title = title;
          if (description) updateData.description = description;
          if (genre) updateData.genre = genre;
          if (director) updateData.director = director;
          if (cast) updateData.cast = cast;
          if (release_year) updateData.release_year = release_year;
          if (rating) updateData.rating = rating;
          if (images) updateData.images = images;
      
          const result = await collection.updateOne(
            { _id: new ObjectId(id) }, 
            { $set: updateData } 
          );
      
          if (result.matchedCount === 0) {
            res.status(404).json({ message: 'Movie not found' });
            return;
          }
      
          const updatedMovie = await collection.findOne({ _id: new ObjectId(id) });
          res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
        } catch (error) {
          console.error('Error updating movie:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deleteMovie: async (req: Request, res: Response): Promise<void> => {
        try {
          const db = await connectToDatabase();
          const collection = db.collection('Movie');
      
          const { id } = req.params;
    
          const result = await collection.deleteOne({ _id: new ObjectId(id) });
      
          if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Movie not found' });
            return;
          }
      
          res.status(200).json({ message: 'Movie deleted successfully', id });
        } catch (error) {
          console.error('Error deleting movie:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
    },
      
}
export default movieController;