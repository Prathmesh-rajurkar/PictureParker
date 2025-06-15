import mongoose, { Schema, model, models } from "mongoose";

// export const PICTURE_DIMENSION = {
//   WIDTH: 1280,
//   HEIGHT: 720,
// } as const;

export interface IPicture {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  url: string;
  transformation?:{
    width?: number;
    height?: number;
    crop?: string; // e.g., "fill", "fit", "limit", etc.
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const pictureSchema = new Schema<IPicture>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    transformation:{
      height:{type: Number, default: 720},
      width:{type: Number, default: 1280},
      crop: { type: String, default: "fill" },
    }
  },
  {
    timestamps: true,
  }
);

const Picture = models?.Picture || model<IPicture>("Picture", pictureSchema);

export default Picture;