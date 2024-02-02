import amongus, { Schema } from 'mongoose';

const victimSchema = new Schema({
    userid: String,
    displayname: String,
    username: String,
    discrim: String,
    tags: [String],
    description: String,
    icon: String,
    valid: Boolean,
    timestamp: Number,
});

const Victim = amongus.models.victim || amongus.model('victim', victimSchema);

export default Victim;
