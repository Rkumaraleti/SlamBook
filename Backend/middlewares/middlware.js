exports.isLoggedIn = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
        return next();
    }
    } catch{
        return new Error("User must be Logged in");
    }
    
}