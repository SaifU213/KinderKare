import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());



mongoose.connect(
	'mongodb+srv://4450group:Capstone@cluster0.2mdk7ji.mongodb.net/test',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log('DB connected');
		console.log(mongoose.connection.readyState);
	},
	(err)=>{
		if (err) {
			console.error(err);
			process.exit(1);
		  }
	}
);

//parent schemas
const parentSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	children: [String],
	role: String
});
const Parent = new mongoose.model('Parent', parentSchema);

//child schemas
const childSchema = new mongoose.Schema({
	name: String,
	parent: String,
	parentemail: String,
	nameparentemail: String,
	medical: String,
	diatery: String,
	report: String
});
const Child = new mongoose.model('Child', childSchema);

//owner schemas
const ownerSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	role: String
});
const Owner = new mongoose.model('Owner', ownerSchema);

//staff schemas
const staffSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	employer: String,
	employeremail: String,
	clockin: [Date],
	clockout: [Date],
	start: [Date],
	end: [Date],
	role: String
});
const Staff = new mongoose.model('Staff', staffSchema);

//DayCare schemas
const daycareSchema = new mongoose.Schema({
	name: String,
	owner: String,
	owneremail: String,
	workersemail: [String],
	children: [String],
	childparent: [String],
	parentsemail: [String],
	starttime: [Date],
	closetime: [Date]
});
const Daycare = new mongoose.model('Daycare', daycareSchema);

//Routes
app.post('/parentlogin', (req, res) => {
	const { email, password} = req.body;
	Parent.findOne({ email: email }, (err, user) => {
		if (user) {
			if (password === user.password && user.role === 'Parent') {
				res.send({ message: 'Login Successful', user: user });
			} else {
				res.send({message: 'Information entered was incorrect'})
				 
			}
		} else {
			res.send({ message: 'User not registered ' });
		}
	});
});

app.post('/parentregister', (req, res) => {
	const { name, email, password, role } = req.body;
	Parent.findOne({ email: email }, (err, user) => {
		if (user) {
			res.send({ message: 'Parent already registered' });
		} else {
			const user = new Parent({
				name,
				email,
				password,
				role
			});
			user.save((err) => {
				if (err) {
					res.send(err);
				} else {
					res.send({ message: 'Successfully Registered, Please login now.' });
				}
			});
		}
	});
});
app.post('/parentlist', (req, res) => {
	const { parent } = req.body;
	Parent.find({ email: {$in: parent }}, (err, user) => {
		if(user.length>0){
			const list = []
			let add = (({name, email, children}) => ({name, email, children}))(user[0]);
			let x = user.length 
			for(let i = 0; i<x; i++){
				add = (({ name, email, children}) => ({ name, email, children  }))(user[i]);
				list.push(add)
			}
			res.send({message: list})
		}else{
			res.send({message: ""})
		}
		
	});
});
app.post('/parentcheck', (req, res) => {
	const { email } = req.body;
	Daycare.findOne({ owneremail: email }, (err, user) => {
		if(err){
			console.log(err)
		}
		if(user){
			if(user.parentsemail.length == 0){
				res.send({message: "no parents"})
			}else{
				res.send(user.parentsemail)
			}
		}
	})
})

app.post('/findchildren', (req, res) => {
	const { parentemail } = req.body;
	Parent.findOne({ email: parentemail }, (err, user) => {
		if(err){
			console.log(err)
		}
		if (user) {
			if(user.children.length == 0){
				res.send({message: false})
			}else{
				res.send({message: user.children})
			}
			
		} else {
			res.send({ message: 'User not registered ' });
		}
	});
});

const childDelete = async (req,res) => {
	const { parentemail, childsname } = req
	const deleteChild = await Child.deleteOne({ name: childsname, parentemail: parentemail})
}
const childDeleteFromParent = async (req,res) => {
	const { parentemail, childsname } = req
	const removeChildromParent = await Parent.updateOne({ email: parentemail},{ $pull: {children: childsname}})
}

app.post('/deletechild', (req, res) => {
	const { parentemail, childsname} = req.body;
	const info = {parentemail: parentemail, childsname: childsname}
	Child.findOne({ name: childsname, parentemail: parentemail}, (err, user) => {
		childDelete(info)
		childDeleteFromParent(info)
		res.send({message: ""})
	});
});

app.post('/ownerlogin', (req, res) => {
	const { email, password} = req.body;
	Owner.findOne({ email: email }, (err, user) => {
		if (user) {
			if (password === user.password && user.role === 'Owner') {
				res.send({ message: 'Login Successful', user: user });
			} else {
				res.send({message: 'Information entered was incorrect'})
				 
			}
		} else {
			res.send({ message: 'User not registered ' });
		}
	});
});
const createDayCare = async (req,res) => {
	const { name, daycarename, email } = req
	const newdaycare = await Daycare.create({ name : daycarename, owner: name, owneremail: email})
	newdaycare.save()
}
app.post('/ownerregister', (req, res) => {
	const { name, email, password, role, daycarename } = req.body;
	const daycareinfo = {name: name, daycarename: daycarename, email: email}
	Owner.findOne({ email: email }, (err, user) => {
		if (user) {
			res.send({ message: 'Owner already registered' });
		} else {
			const user = new Owner({
				name,
				email,
				password,
				role,
			});
			createDayCare(daycareinfo);
			user.save((err) => {
				if (err) {
					res.send(err);
				} else {
					res.send({ message: 'Successfully Registered, Please login now.' });
				}
			});
		}
	});
});
const addChildToParent = async (req,res) => {
	const { parentemail, name } = req
	const newchild = await Parent.updateOne({ email: parentemail},{ $push: {children: name}})
}
app.post('/childregister', (req, res) => {
	const { name, parent, parentemail, medical, diatery } = req.body;
	const FindParent= {parentemail: parentemail, name: name}
	const nameparentemail = name + " " + parentemail
	Child.findOne({ name: name, parentemail: parentemail }, (err, user) => {
		if (user) {
			res.send({ message: 'child already registered' });
		} else{
			const user = new Child({
				name,
				parent,
				parentemail,
				nameparentemail,
				medical,
				diatery,
			});
			addChildToParent(FindParent)
			user.save((err) => {
				if (err) {
					res.send(err);
				} else {
					res.send({ message: 'child now registered.' });
				}
			});
		}
	});
});
const addChildToDaycare = async (req,res) => {
	const {name, nameparentemail, daycarename, ownersemail, parentemail} = req
	const newchild = await Daycare.updateOne({ email: ownersemail},{ $push: {children: name, childparent: nameparentemail, parentsemail: parentemail}})

	
}
app.post('/childToDaycare', (req, res) => {
	const { parentemail, daycarename,   ownersemail, childsname} = req.body;
	Child.findOne({ name: childsname, parentemail: parentemail }, (err, user) => {
		const updatedaycare = {name: childsname, nameparentemail: user.nameparentemail, daycarename: daycarename, ownersemail: ownersemail, parentemail: parentemail }
		Daycare.findOne({email: ownersemail, childparent: user.nameparentemail}, (err, user) =>{
			if(user){
				res.send({message : "exist"})
				
			}else{
				addChildToDaycare(updatedaycare)
				res.send({message : "doesn't exist"})
			}
		})
	});
});

const saveReport = async (req,res) => {
	const { nameemail, report} = req
	const sendReport = await Child.updateOne({ nameparentemail: nameemail},{report:report })
}
app.post('/writereport', (req, res) => {
	const { nameemail, report} = req.body;
	const info ={nameemail:nameemail, report }
	Child.findOne({ nameparentemail: nameemail}, (err, user) => {
		if(user){
			saveReport(info)
			res.send("")
		}
	});
});

app.post('/ownerfindchildren', (req, res) => {
	const { owneremail } = req.body;
	Daycare.findOne({ owneremail: owneremail }, (err, user) => {
		if(err){
			console.log(err)
		}
		let list = []
		for(let i = 0; i<user.childparent.length; i++){
			list.push(user.childparent[i])
		}
		if (user) {
			if(user.childparent.length == 0){
				res.send({message: false})
			}else{
				res.send({message: list})
			}
			
		} else {
			res.send({ message: 'User not registered ' });
		}
	});
});

const childDeleteFromDaycare = async (req,res) => {
	const { owneremail, childsname, parentemail, nameemail} = req
	const removeChildFromDaycare = await Daycare.updateOne({ email: owneremail},{ $pull: {children:  childsname, childparent :nameemail , parentsemail :parentemail }})
}
const addBackNameDaycare = async (req,res) => {
	const { owneremail, childsname, parentemail, nameemail} = req
	const addName = await Daycare.updateOne({ email: owneremail},{ $push: {children:  childsname}})
}
const addBackEmailDaycare = async (req,res) => {
	const { owneremail, childsname, parentemail, nameemail} = req
	const addEmail = await Daycare.updateOne({ email: owneremail},{ $push: {parentsemail :parentemail }})
}

app.post('/deletechildfromdaycare', (req, res) => {
	const { owneremail, childsname, parentemail, nameemail} = req.body;
	const info = {owneremail: owneremail, childsname: childsname, parentemail: parentemail, nameemail: nameemail}
	Daycare.findOne({ email:owneremail}, (err, user) => {
		let p = -1
		let c = -1
		for(let i = 0; i<user.parentsemail.length; i++){
			if(user.parentsemail[i] === parentemail){
				p++;
			}
		}
		for(let i = 0; i<user.children.length; i++){
			if(user.children[i] === childsname){
				c++;
			}
		}
		childDeleteFromDaycare(info)
		for(let i = 0; i< p; i++){
			addBackEmailDaycare(info)
		}
		for(let i = 0; i< c; i++){
			addBackNameDaycare(info)
		}
		res.send({message: ""})
	});
});

app.post('/childlistOwner', (req, res) => {
	const { child } = req.body;
	Child.find({ nameparentemail: {$in: child } }, (err, user) => {
		let list = []
		let add = (({ name, parent, parentemail, medical, diatery }) => ({ name, parent, parentemail, medical, diatery }))(user[0]);
		let x = user.length 
		for(let i = 0; i<x; i++){
			add = (({ name, parent, parentemail, medical, diatery }) => ({ name, parent, parentemail, medical, diatery  }))(user[i]);
			list.push(add)
		}
		res.send({message: list})
	});
});
app.post('/childcheckOwner', (req, res) => {
	const { email } = req.body;
	Daycare.findOne({ owneremail: email }, (err, user) => {
		if(err){
			console.log(err)
		}
		if(user){
			if(user.children.length == 0){
				res.send({message: "no children"})
			}else{
				res.send({message: user.childparent})
			}
		}
	});
});

app.post('/childlistParent', (req, res) => {
	const { email } = req.body;
	Child.find({ parentemail: email }, (err, user) => {
		if(user.length>0){
			let list = []
			let add = (({ name, parent, parentemail, medical, diatery, report }) => ({ name, parent, parentemail, medical, diatery, report }))(user[0]);
			let x = user.length 
			for(let i = 0; i<x; i++){
				add = (({name, parent, parentemail, medical, diatery, report }) => ({name, parent, parentemail, medical, diatery, report }))(user[i]);
				list.push(add)
			}
			res.send({message: list})
		}
		
	});
});

app.post('/childcheckParent', (req, res) => {
	const { email } = req.body;
	Parent.findOne({ email: email}, (err, user) => {
		if(user){
			if(user.children.length == 0){
				res.send({message: false})
			}else{
				res.send({message: user.children})
			}
		}	
	});
});


app.post('/getstaff', (req, res) => {
	const { staffemail } = req.body;
	Staff.findOne({ email: staffemail}, (err, user) => {
		if(user){
			res.send({message: user.employeremail})
		}	
	});
});

const updateChild = async (req,res) => {
	const {childsname, parentemail, medical, diatery} = req
	const updatechild = await Child.updateOne({name: childsname, parentemail: parentemail},{ $set: {medical: medical, diatery: diatery }})

	
}
app.post('/editchild', (req, res) => {
	const { childsname, parentemail, medical, diatery } = req.body;
	const updatethis = {childsname : childsname, parentemail: parentemail, medical: medical, diatery: diatery}
	Child.findOne({ name: childsname, parentemail: parentemail }, (err, user) => {
		updateChild(updatethis)
		res.send({message: ""})
	});
});

const addstafftodaycare = async (req,res) => {
	const { email, employeremail } = req
	const newemployee = await Daycare.updateOne({ owneremail: employeremail},{ $push: {workersemail: email}})
}

app.post('/staffregister', (req, res) => {
	const { name, email, password, employer, employeremail, role} = req.body;
	const staffinfo = {email: email, employeremail: employeremail}
	Staff.findOne({ name: name, email: email, employer: employer, employeremail: employeremail }, (err, user) => {
		if (user) {
			res.send({ message: 'This person has already been registered as staff' });
		} else{
			const user = new Staff({
				name, 
				email, 
				password, 
				employer,
				employeremail, 
				role
			});
			addstafftodaycare(staffinfo);
			user.save((err) => {
				if (err) {
					res.send(err);
				} else {
					res.send({ message: 'Staff Member now Registered.' });
				}
			});
		}
	});
});

app.post('/stafflogin', (req, res) => {
	const { email, password} = req.body;
	Staff.findOne({ email: email }, (err, user) => {
		if (user) {
			if (password === user.password && user.role === 'Staff') {
				res.send({ message: 'Login Successful', user: user });
			} else {
				res.send({message: 'Information entered was incorrect'})			}
		} else {
			res.send({ message: 'User not registered ' });
		}
	});
});

app.post('/stafflist', (req, res) => {
	const { email } = req.body;
	Staff.find({ employeremail: email }, (err, user) => {
		
		let list = []
		let add = (({ _id, name, email }) => ({ _id, name, email }))(user[0]);
		let x = user.length 
		for(let i = 0; i<x; i++){
			add = (({ _id, name, email }) => ({ _id, name, email }))(user[i]);
			list.push(add)
		}
		res.send({message: list})
	});
});
app.post('/staffcheck', (req, res) => {
	const { email } = req.body;
	Daycare.findOne({ owneremail: email }, (err, user) => {
		if(err){
			console.log(err)
		}
		if(user){
			if(user.workersemail.length == 0){
				res.send({message: false})
			}else{
				res.send({message: true})
			}
		}
	});
});

const updateStaff = async (req,res) => {
	const {email, newPassword} = req
	const updatestaff = await Staff.updateOne({ email: email},{ $set: { password: newPassword }})

	
}

app.post('/editstaff', (req, res) => {
	const { email, newPassword, rePassword } = req.body;
	const updatethis = {email: email, newPassword: newPassword}
	Staff.findOne({ email:email}, (err, user) => {
		updateStaff(updatethis)
		res.send({message: ""})
	});
});

const staffClockIn = async (req,res) => {
	const { email, time } = req
	const clockInTime = await Staff.updateOne({ email: email},{ $push: {clockin: time}})
}

app.post('/clockin', (req, res) => {
	const { email, time } = req.body;
	const clockIn = {email: email, time: time}
	Staff.findOne({ email:email}, (err, user) => {
		staffClockIn(clockIn)
		res.send({message: "You've Clocked In"})
	});
});

const staffClockOut = async (req,res) => {
	const { email, time } = req
	const clockOutTime = await Staff.updateOne({ email: email},{ $push: {clockout: time}})
}

app.post('/clockout', (req, res) => {
	const { email, time} = req.body;
	const clockOut = {email: email, time: time}
	Staff.findOne({ email:email}, (err, user) => {
		staffClockOut(clockOut)
		res.send({message: "You've Clocked Out"})
	});
});

app.post('/findstaff', (req, res) => {
	const { owneremail } = req.body;
	Staff.find({ employeremail: owneremail }, (err, user) => {
		if(err){
			console.log(err)
		}
		let list = []
		for(let i = 0; i<user.length; i++){
			list.push(user[i].email)
		}
		if (user) {
			if(user == 0){
				res.send({message: false})
			}else{
				res.send({message: list})
			}
			
		} else {
			res.send({ message: 'User not registered ' });
		}
	});
});
const staffDelete = async (req,res) => {
	const { Oemail, Semail } = req
	const deleteStaff = await Staff.deleteOne({ email: Semail})
}
const staffDeleteFromDaycare = async (req,res) => {
	const { Oemail, Semail } = req
	const removeStaffFromDaycare = await Daycare.updateOne({ email: Oemail},{ $pull: {workersemail: Semail}})
}

app.post('/deletestaff', (req, res) => {
	const { owneremail, staffsname} = req.body;
	const info = {Oemail: owneremail, Semail: staffsname}
	Staff.findOne({ email:staffsname}, (err, user) => {
		staffDelete(info)
		staffDeleteFromDaycare(info)
		res.send({message: ""})
	});
});

app.post('/stafffindchildren', (req, res) => {
	const { staffemail, owneremail } = req.body;
	Daycare.find({ workersemail: staffemail}, (err, user) => {
		if(err){
			console.log(err)
		}
		let newuser
		for(let i = 0; i < user.length; i++){
			if(user[i].owneremail === owneremail){
				newuser = user
			}
		}
		if (newuser) {
			let list = newuser[0].childparent
			if(list.length == 0){
				res.send({message: false})
			}else{
				res.send({message: list})
			}
		}
	});
});
app.listen(9002, () => {
	console.log('BE started at port 9002');
});
