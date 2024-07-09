import { Schema, model } from "mongoose";
import ISubscription from "../interfaces/subscription.interface";

const subscriptionSchema = new Schema<ISubscription>(
  {
    title: { type: String, required: true },
    num_of_devices: { type: Number, required: true },
    amount: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const SubscriptionModel = model<ISubscription>("Subscription", subscriptionSchema);

export default SubscriptionModel;
