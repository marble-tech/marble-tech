import * as express from "express";
import { User } from "../entities/User";
import { UserService } from "../services/userService";
import { validateUser } from "../validation/userValidation";


const userService = new UserService();

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
                    res.status(409).json({Error: error.detail});
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

            if(loggedId != id) return res.status(403).json({Error: "You are not allowed to delete this user!"});

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

            if(loggedId != id) return res.status(403).json({Error: "You are not allowed to update this user!"});
            
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
}