// projects-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'projects';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    participants: {
      type: Array,
      of: {
        userId: { type: mongoose.Schema.Types.ObjectId },
        userName: { type: String },
        userDisplayName: { type: String }
      }
    },
    sections: {
      type: Array,
      of: {
        title: { type: String },
        tasks: {
          type: Array,
          of: {
            title: { type: String },
            priority: { type: String } // low, medium, high 
          }
        }
      }
    }
  }, {
    timestamps: true,
    minimize: false
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
