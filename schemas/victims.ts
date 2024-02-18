import amongus, { models, Schema } from 'mongoose';

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
    locale: String,
    gender: String,
    cooldown: Number,
});

const Victim = models.victim || amongus.model('victim', victimSchema);

export default Victim;
