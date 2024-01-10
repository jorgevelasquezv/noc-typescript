import { Schema, model, Document } from 'mongoose';

interface ILog extends Document {
    level: string;
    message: string;
    origin: string;
    createAt: Date;
}

const logSchema = new Schema<ILog>({
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
        required: true,
    },
    message: { type: String, required: true },
    origin: { type: String, required: false },
    createAt: { type: Date, default: new Date() },
});

export const LogModel = model<ILog>('Log', logSchema);


