

export const getCurrentUser = async (req, res) => {
    try{
        return res.status(200).json(req.user)
    }catch(error){
        res.status(500).json({ message: `getCurrentUser error: ${error.message}` });
    }
}