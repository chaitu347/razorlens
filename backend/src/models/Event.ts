import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  provider: string;
  eventType: string;
  payload: any;
  headers: any;
  signatureValid: boolean;
  receivedAt: Date;
}

const EventSchema: Schema = new Schema({
  provider: { type: String, required: true },
  eventType: { type: String, required: true },
  payload: { type: Schema.Types.Mixed, required: true },
  headers: { type: Schema.Types.Mixed, required: true },
  signatureValid: { type: Boolean, required: true },
  receivedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IEvent>("Event", EventSchema);