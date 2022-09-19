import { model, models, Schema, Types } from 'mongoose';

interface IUserSkills {
    userId: Types.ObjectId;
    techStack: [];
}

const SkillsSchema = new Schema<IUserSkills>(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'users', index: true },
        techStack: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Skills = models.skills || model<IUserSkills>('skills', SkillsSchema);

export default Skills;
