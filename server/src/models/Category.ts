import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
interface category {
  name: string;
  userId: string;
}

// An interface that describes the properties
// that a User Document has
interface categoryDoc extends mongoose.Document {
  name: string;
  userId: string;
}
// An interface that describes the properties
// that a User Model has
interface userModel extends mongoose.Model<categoryDoc> {
  build(attrs: category): categoryDoc;
}
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

categorySchema.statics.build = (attrs: category) => {
  return new Category(attrs);
};

const Category = mongoose.model<category, userModel>(
  "Category",
  categorySchema
);

export { Category };
