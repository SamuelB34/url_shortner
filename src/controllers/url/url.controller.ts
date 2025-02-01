import { BaseController } from "../base.controller"
import { NextFunction, Request, Response } from "express"
import { nanoid } from "nanoid";
import {addHttpsProtocol, validateUrl} from "../../middlewares/validations";
import ShortenedUrlModel from "../../models/ShortenedUrl";

// In-memory store to hold the URLs
const memoryStore = new Map();

/**
 * Controller to handle URL shortening operations.
 */
class UrlController extends BaseController {

    /**
     * Retrieves and redirects to the original URL based on the short ID.
     *
     * @param req - Express request object.
     * @param res - Express response object.
     * @param next - Next middleware function.
     * @returns {Response} - Redirects to the original URL or responds with an error message if not found.
     */
    public getUrl = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params; // Get the short ID from the URL parameters

        try {
            // Search for the URL in the database using the 'nanoid'
            const urlRecord = await ShortenedUrlModel.findOne({ nanoid: id });

            if (urlRecord) {
                // Redirect to the original URL if found
                return res.redirect(addHttpsProtocol(urlRecord.url));
            } else {
                // If the URL is not found, respond with an error message
                return this.respondInvalid(res, 'Url does not exist');
            }
        } catch (error) {
            console.error('Error fetching the URL:', error);
            // Return a 500 status for internal server error in case of failure
            return res.status(500).send('Internal Server Error');
        }
    };

    /**
     * Creates a new shortened URL.
     *
     * @param req - Express request object containing the original URL.
     * @param res - Express response object.
     * @param next - Next middleware function.
     * @returns {Response} - Responds with the shortened URL and its ID.
     */
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;

        // Validate the URL format using a helper function
        if (!validateUrl(body.url)) {
            return this.respondInvalid(res, 'Invalid url');
        }

        // Generate a short ID using nanoid (6 characters long)
        const shortId = nanoid(6);

        try {
            // Create a new shortened URL object
            const newUrl = new ShortenedUrlModel({
                url: body.url,
                nanoid: shortId
            });

            // Save the new shortened URL in the database
            await newUrl.save();

            // Respond with the success message and the shortened URL details
            return this.respondSuccess(res, 'Success', {
                short_id: `${process.env.SERVER_HOST}:${process.env.PORT}/${shortId}`
            });
        } catch (error) {
            console.error('Error saving the shortened URL:', error);
            // Return a 500 status for internal server error in case of failure
            return res.status(500).send('Internal Server Error');
        }
    };
}

// Export the UrlController instance
export default new UrlController();
