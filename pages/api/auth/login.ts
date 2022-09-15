import { connectToDatabase } from '../../../Utils/mongodb';
import User from '../users/models/UserSchema';
import bcrypt from 'bcryptjs';
import { sendOtp } from '../users/otp/generate';

export default async (req: any, res: any) => {
    await connectToDatabase();
    const { email, password } = req.query;

    if (!email || !password) {
        return res.status(400).json({ message: 'request param is missing' });
    }

    // const salt = await bcrypt.genSalt(8);
    // const hassedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'user not found' });

        // check user is verified
        if (!user?.verified) {
            // ignore call back from sendOtp
            sendOtp(email, () => {});

            return res.status(401).json({ message: 'user is not verified' });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(404).json({ message: 'wrong credential' });
        delete user.password;

        return res.status(200).json(user);
    } catch (e) {
        console.error(e);

        return res.status(500).json({ message: 'something wrong happened' });
    }
};
