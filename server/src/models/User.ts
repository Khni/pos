import mongoose, { Model } from "mongoose";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// An interface that describes the properties
// that are requried to create a new User
interface user {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Document has
interface userDoc extends mongoose.Document {
  email: string;
  password: string;
  generateAuthToken(): { token: string; refreshToken: string };
}
// An interface that describes the properties
// that a User Model has
interface userModel extends mongoose.Model<userDoc> {
  build(attrs: user): userDoc;
  findByCredentials(attrs: user): userDoc;
  generateAuthToken(): any;
}
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});
/*
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString(), role: user.role }, 'secret', { expiresIn: "1h" })
  const refreshToken = jwt.sign({ _id: user._id.toString(), role: user.role}, 'refreshToken', { expiresIn: '7 days' })
  user.tokens = user.tokens.concat({ token })
  user.refreshTokens = user.refreshTokens.concat({ refreshToken })
  await user.save()
  const tokens = {
      token,
      refreshToken
  }
  return tokens
}*/

//login verify
userSchema.statics.findByCredentials = async (user: user) => {
  const userLogin = await User.findOne({ email: user.email });

  if (!userLogin) {
    throw new Error("unable to Login");
  }

  const isTruePassword = await bcrypt.compare(
    user.password,
    userLogin.password
  );
  if (!isTruePassword) {
    throw new Error("unable to Login");
  }

  return userLogin;
};

userSchema.methods.generateAuthToken = function () {
  const user = this;

  const token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );

  //user.tokens = user.tokens.concat({ token });
  //user.refreshTokens = user.refreshTokens.concat({ refreshToken });
  //await user.save();
  const tokens = {
    token,
    refreshToken,
  };

  //console.log(tokens);

  return tokens;
};

userSchema.statics.build = (attrs: user) => {
  return new User(attrs);
};

const User = mongoose.model<user, userModel>("User", userSchema);

export { User };
