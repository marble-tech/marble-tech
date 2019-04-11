import { uploader } from './../middlewares/fileUploader';
import { ProfileImage } from './../entities/ProfileImage';
import * as express from "express";
import { User, RankEntry } from "../entities/User";
import { UserService } from "../services/userService";
import { validateUser } from "../validation/userValidation";
import { ProfileImageService } from '../services/profileImageService';
import { testFileRemover } from '../handlers/testFileRemover';
import * as fs from 'fs';
import * as path from 'path'
import { convertToDataUrl } from '../handlers/convertToDataUrl';


const userService = new UserService();
const profileImageService = new ProfileImageService();

export class UserController {

    public constructor() { }

    public async create(req: express.Request, res: express.Response) {
        try {
            const newUser = req.body; // get information from body
            const result = validateUser(newUser); // validate against schema

            // check if validation returned error, returning 400 and displaying message if so.
            if (result.error) return res.status(400).json({ Error: "User details invalid. Please check your fields." }); // ir invalid, return 400 with message

            // save user
            const user = await userService.create(newUser)
                .catch(error => {
                    res.status(409).json({ Error: error.detail });
                }); // save to the DB

            // return added user and status 200
            res.status(201).json({
                'Result': `User [ID ${(user as User).id}] added successfully!`,
                user
            });
        } catch (error) { // catch any exception
            console.log(error);
            res.status(500).json({
                Error: "Exception caught!"
            });
        }
    }

    public async findById(req: express.Request, res: express.Response) {
        try {
            const id = req.params.id; // get user id by URL
            const user = await userService.findById(id); // get user from DB

            if (!user) return res.status(404).json({ Error: "User not found." }) // return error if not found

            res.status(200).json(user);
        } catch (error) { // catch any exception
            console.log(error);
            res.status(500).json({
                Error: "Exception caught!"
            });
        }
    }

    public async findAll(req: express.Request, res: express.Response) {
        try {
            const users = await userService.findAll(); // get all users
            if (!users) return res.status(404).json({ Error: "No users were found!" });

            res.status(200).json(users);
        } catch (error) { // catch any exception
            console.log(error);
            res.status(500).json({
                Error: "Exception caught!"
            });
        }
    };


    public async deleteUser(req: express.Request, res: express.Response) {
        try {
            const id = req.params.id; // get user ID from URL
            const user = await userService.findById(id); // get user from DB
            const loggedId = (req as any).userId; // get logged user ID

            if (loggedId != id) return res.status(403).json({ Error: "You are not allowed to delete this user!" });

            if (!user) return res.status(404).json({ Error: "User not found." }) // return error if not found

            const deletedUser = await userService.delete(user.id); // delete user using service

            return res.status(200).json(deletedUser); // return status 200 and the deleted user

        } catch (error) { // catch any exception
            console.log(error);
            return res.status(500).json({
                Error: "Exception caught!"
            });
        }
    };

    public async updateUser(req: express.Request, res: express.Response) {
        try {
            // add validation
            const values = req.body; // retrieve information from body
            const id = req.params.id; // retrieve user ID from params
            const loggedId = (req as any).userId; // retrieve logged user ID from token

            if (loggedId != id) return res.status(403).json({ Error: "You are not allowed to update this user!" });

            const user = await userService.findById(id); // retrieve user using the ID

            const savedUser = await userService.update(user as User, values); // call service function to update user

            // if it was successfull, display message and the user info
            return res.status(200).json({
                Result: "User updated successfully",
                savedUser
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                Error: "Exception caught!"
            })
        }
    }

    public async addProfileImage(req: express.Request, res: express.Response) {
        try {
            // Get logger user id
            const loggedUserId = (req as any).userId;
            // Get user id to upload image
            const userId = req.params.id;
            // If logged is not owner return not allowed
            if (loggedUserId != userId) {
                return res.status(403).json({ Error: 'Not allowed' });
            }
            // Get logged user
            const user = await userService.findById(loggedUserId);
            // If not found return 404 status
            if (!user) return res.status(404).json({ Error: `User id ${loggedUserId} not found` });
            // If users does not have profile image create one
            if (!user.profileImage) {
                // Create data url
                const dataUrl = convertToDataUrl(req.file);
                // Create new profile image
                const image = new ProfileImage(dataUrl);
                // Save profile image in database
                const profileImage = await profileImageService.create(image, user);
                return res.status(200).json(profileImage);
            }
            
            // If user has profile image, update it

            // Create data url
            const dataUrl = convertToDataUrl(req.file);
            // Update user profile in database
            const profileImage = await profileImageService.findById(user.profileImage.id);
            profileImage!.url = dataUrl;
            const updatedImage = await profileImageService.save(profileImage!);

            return res.status(200).json(updatedImage);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: 'Internal server error' });
        }
    }

    public async getRank(req: express.Request, res: express.Response) {
        try {
            const loggedId = (req as any).userId; // get logged user id

            // two options: with or without limit
            //with
            const limit = req.body.limit;
            const rank: RankEntry[] = await userService.getRank(limit); // get TOP N rank
            //without
            // const rank: RankEntry[] = await userService.getRank(limit); // get whole rank

            // if rank is null, return error
            if(!rank) return res.status(403).json({Error: "Couldn't retrieve rank."});

            // add authUser flag (true when it's the logged user)
            const flaggedRank = rank.map((user)=>{
                (user.id == loggedId) ? user.authUser = true : user.authUser = false;
                return user;
            })

            return res.status(200).json(flaggedRank);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                Error: "Exception caught!"
            })
        }
    }

}