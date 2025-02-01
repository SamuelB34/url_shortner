import { BaseController } from "../base.controller"
import { NextFunction, Request, Response } from "express"
import { nanoid } from "nanoid";
import {addHttpsProtocol, validateUrl} from "../../middlewares/validations";

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
        const { id } = req.params;

        // Check if the 'links' exist in memory; if not, initialize it.
        if (!memoryStore.has('links')) {
            memoryStore.set('links', []);
        }

        // Get the list of URLs stored in memory
        const urls = memoryStore.get('links');

        // Find the URL object with the matching short ID
        const value = urls.find((url: any) => url.short === id);

        // Redirect to the original URL if found, otherwise respond with an error
        if (value) {
            return res.redirect(addHttpsProtocol(value.url))
        } else {
            return this.respondInvalid(res, 'Url does not exist');
        }
    }

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

        if(!validateUrl(body.url)) {
            return this.respondInvalid(res, 'Invalid url');
        }

        // Generate a short ID using nanoid (6 characters long)
        const shortId = nanoid(6);

        // Check if the 'links' exist in memory; if not, initialize it.
        if (!memoryStore.has('links')) {
            memoryStore.set('links', []);
        }

        // Get the list of URLs stored in memory
        const urls = memoryStore.get('links');

        // Add the new shortened URL to the list
        urls.push({
            short: shortId,
            url: body.url,
        });

        // Respond with the success message and the shortened URL details
        return this.respondSuccess(res, `Success`, {
            short_id: `${process.env.SERVER_HOST}:${process.env.PORT}/${ shortId }`
        });
    }
}

// Export the UrlController instance
export default new UrlController();
