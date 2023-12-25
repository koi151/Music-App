import mongoose from 'mongoose';

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connect successful')
  } catch (error) {
    console.log('CONNECT ERROR!', error)
  }
}