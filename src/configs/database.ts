import mongoose from 'mongoose';

export default async function ConnectDB() {
  try {
    await mongoose.connect(process.env.DB_URI!, {
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('>>>> DATABASE CONNECTED!!! <<<<');
  } catch (error) {
    console.log(error.message);
  }
}
