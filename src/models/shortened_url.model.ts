import { Schema, model } from "mongoose";

export interface Shortened_urlModel {
    url: string;
    nanoid: string;
}

const shortenedUrlSchema = new Schema<Shortened_urlModel>({
    url: { type: String, required: true },
    nanoid: { type: String, required: true, unique: true }, // Aseguramos que el nanoid sea único
});

const ShortenedUrlModel = model<Shortened_urlModel>("ShortenedUrl", shortenedUrlSchema);

export default ShortenedUrlModel;
