

class Sanitization {
    User(user: any) {
        return {
            _id: user?._id,
            name: user?.name,
            username: user?.username,
            email: user?.email,
            image: user?.image,
            role: user?.role,
            active: user?.active,
            hasPassword: user?.hasPassword,
            googleId: user?.googleId
        }
    }
}

const sanitization = new Sanitization();

export default sanitization;