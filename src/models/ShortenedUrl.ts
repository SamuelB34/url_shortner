import { Schema, model } from "mongoose";

export interface ShortenedUrl {
    url: string;
    nanoid: string;
}

const shortenedUrlSchema = new Schema<ShortenedUrl>({
    url: { type: String, required: true },
    nanoid: { type: String, required: true, unique: true }, // Aseguramos que el nanoid sea único
});

const ShortenedUrlModel = model<ShortenedUrl>("ShortenedUrl", shortenedUrlSchema);

export default ShortenedUrlModel;
