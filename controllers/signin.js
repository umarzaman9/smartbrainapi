const handleSignIn = (db,bcrypt,saltRounds) => (req,res) => {
	const {email,password} = req.body;
	if(!email || !password) {
		return res.status(400).json('invalid form submission!')
	}
	db.select('email', 'hash').from('login')
		.where('email' , '=' , email)
		.then(data=> {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if(isValid) {
				return db.select('*').from('users')
				.where('email' , '=', email)
				.then(user=> {
					res.json(user[0])
				})
				.catch(err=> res.status(400).json('error getting user'))
			} else {
			res.status(400).json('wrong password/email entered')
			}
		})
		.catch(err=> res.status(400).json('wrong data entered'))
}
module.exports = {
	handleSignIn : handleSignIn
}