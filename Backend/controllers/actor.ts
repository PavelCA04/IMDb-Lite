import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { connectToDatabase } from '../utils/db';
import { ObjectId } from 'mongodb';

dotenv.config();

const _limit: number = 12;

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
            
          const pipeline = [
            { $skip: skip },
            { $limit: limit },
            { $project: { _id: 1, name: 1, birth_date: 1, biography: 1, images: 1, movies: 1 } }
          ];
      
          const actors = await collection.aggregate(pipeline).toArray();
            
          if (actors.length === 0) {
            res.status(404).json({ message: 'No actors found' });
          } else {
            res.status(200).json({
              page,
              limit,
              totalActors: actors.length,
              actors,
            });
          }
        } catch (error) {
          console.error('Error reading actors:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    readActorByID: async (req: Request, res: Response): Promise<void> => {
        try {
          const db = await connectToDatabase();
          const collection = db.collection('Actor');
      
          const actor = await collection.findOne({ _id: new ObjectId(req.params.id) });
      
          if (!actor) {
            res.status(404).json({ message: 'Actor not found' });
          } else {
            res.status(200).json({
              name: actor.name,
              birth_date: actor.birth_date,
              biography: actor.biography,
              images: actor.images,
              movies: actor.movies,
            });
          }
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