import { Request, Response } from 'express';
import { connectToDatabase } from '../utils/db';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const userController = {
    createUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
                res.status(400).json({ message: 'Invalid email format.' });
                return;
            }

            if (!password || typeof password !== 'string' || password.length < 6) {
                res.status(400).json({ message: 'Invalid password. It must be at least 6 characters long.' });
                return;
            }

            const db = await connectToDatabase();
            const collection = db.collection('User');

            const user = await collection.findOne({ email: email.trim() });

            if (user) {
                res.status(409).json({ message: 'User already exists' });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            
            const newUser = {
                email: email.trim(),
                password: hashedPassword,
                role: 'user'
            };

            const result = await collection.insertOne(newUser);

            if (result.acknowledged) {
                res.status(201).json({ message: 'User created successfully', userId: result.insertedId, email: newUser.email, role: newUser.role });
            } else {
                res.status(500).json({ message: 'Failed to create user' });
            }
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    loginUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' });
                return;
            }

            const db = await connectToDatabase();
            const collection = db.collection('User');
            const user = await collection.findOne({ email: email.trim() });

            if (!user) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            res.status(200).json({ message: 'Login successful', userId: user._id, email: user?.email ,role: user?.role });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export default userController;
