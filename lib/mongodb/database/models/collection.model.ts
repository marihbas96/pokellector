import { Schema, models, model } from "mongoose";

export interface ICollection {
    _id: Schema.Types.ObjectId;
    title: string;
    value: number;
    cards: { _id: string, name: string};
    createdAt: Date;
    lastModified: Date;
    isPrimary: boolean;
}

const CollectionSchema = new Schema<ICollection>({ 
    title:{ type: String, required: true, unique: true },
    value: { type: Number, required: true },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    isPrimary: { type: Boolean, default: false },
})

const Collection = models.Collection || model('Collection', CollectionSchema);

export default Collection;