import { Schema, model, models } from "mongoose";

export interface ICard {
  name: string,
  serial: string;
  quantity: number;
  language: string;
  set: string;
  isGraded: boolean;
  grade: string;
} 



const CardSchema = new Schema({
    name: { type: String, required: true },
    serial: { type: String, required: true, unique: true},
    quantity: { type: Number, required: true },
    language: { type: String, required: true },
    set: { type: String, required: true },
    isGraded: { type: Boolean, required: true, default: false },
    grade: { type: String, required: true, default: 'N/A'},
})

const Card = models.Card || model('Card', CardSchema);

export default Card;