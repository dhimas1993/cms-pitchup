const Users = require('../../models/users.model')
const Pitchdeck = require('../../models/pitchdeck.model')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const fs = require('fs-extra')
const path = require('path');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dhimas.hertianto@bubu.com',
        pass: 'akugantengbangeth123'
    }
});


module.exports = {
    login : async (req,res) => {
        try {
            const { email, password } = req.body
            const users = await Users.findOne({
                email: email,
                status: 'active',
                role: 'startup'
            })
            // console.log(users)
            if(users === null){
                return res.send('FAILED')
            } else {
                const match = await bcrypt.compare(password, users.password)
                if(match){
                    return res.send(users)
                } else {
                    return res.send('FAILED')
                }
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //register user
    register : async (req,res) => {
        try {
            const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const { firstName,email,password} = req.body
            const exist = await Users.findOne({ email : email })

            let token = '';
            for (let i = 0; i < 25; i++) {
                token += characters[Math.floor(Math.random() * characters.length )];
            }

            var mailOptions = {
                from: 'dhimas.hertianto@bubu.com',
                to: email,
                subject: 'Confirmation Email',
                html: `
                    <div>
                        <h3>Halo ${firstName}</h3>
                        <h3>Silehkan Klik link berikut untuk konfirmasi email anda</h3>
                        </br> 
                        <a href="https://pitchup.herokuapp.com/confirmationCode/${token}">Click Here !!</a> 
                    </div>
                `
            };

            if(exist){
                return res.send({
                    status : 500,
                    data : "sudah ada"
                })
            } else {
                const save = await Users.create({ 
                    firstName,
                    status : "pending",
                    email,
                    password : bcrypt.hashSync(password, 6),
                    role : 'startup',
                    confirmationCode: token
                })

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    console.log('Email sent: ' + info.response);
                    res.send({
                        status : 200,
                        data : "SUCCEESS"
                    })
                });
            }
        } catch (err) {
            return res.send({
                status: 500,
                data : "gagal create",
            })
        }
    },
    detailUser : async (req,res) => {
        try {
            const { id } = req.params
            const users = await Users.findOne({
                _id: id
            }).populate('category')
            if(users){
                return res.send(users)
            } else {
                return res.send('FAILED')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    confirmasiEmail : async (req,res) => {
        try {
            const {token} = req.params
            const exist = await Users.findOne({ 
                confirmationCode : token
            })
            console.log(token)
            if(exist.confirmationCode === token){
                exist.status = 'active'
                await exist.save()
                res.send('SUCCEESS INPUT')
            } else {
                res.send("DATA TIDAK DITEMUKAN")
            }
        } catch (error) {
            res.status(500).send(error)
        }
    },
    registerStartup : async (req,res) => {
        try {
            const { id, startupName, websiteLink, shortDescription, category, location, startupStage, elevatorPitch } = req.body
            const user = await Users.findOne({ _id : id })
            if (req.file === undefined){
                user.startupName = startupName;
                user.websiteLink = websiteLink;
                user.shortDescription = shortDescription;
                user.category = category;
                user.startupLocation = location;
                user.startupStage = startupStage;
                user.elevatorPitch = elevatorPitch
                await user.save();
                res.status(200).json("SUCCESS")
            } else if( user.startupLogo === undefined && req.file ){
                user.startupName = startupName;
                user.websiteLink = websiteLink;
                user.shortDescription = shortDescription;
                user.category = category;
                user.startupLocation = location;
                user.startupStage = startupStage;
                user.elevatorPitch = elevatorPitch
                user.startupLogo = `image/user/${req.file.filename}`
                await user.save()
                res.status(200).json("SUCCESS PICTURE")
            } else {
                await fs.unlink(path.join(`public/${user.startupLogo}`))
                user.startupName = startupName;
                user.websiteLink = websiteLink;
                user.shortDescription = shortDescription;
                user.category = category;
                user.startupLocation = location;
                user.startupStage = startupStage;
                user.elevatorPitch = elevatorPitch
                user.startupLogo = `image/user/${req.file.filename}`
                await user.save()
                res.status(200).json("SUCCESS PICTURE REPLACE")
            }
        } catch (error) {
            res.status(201).json(error.message)
        }
    },
    registerCategory : async (req,res) => {
        try {
            const {id, category} = req.body
            console.log(id, category)
            const user = await Users.findOne({_id : id})
            user.category = category
            await user.save()
            res.status(200).json("SUCCESS")
        } catch (error) {
            res.status(201).json(error)
        }
    },
    registerLocated : async (req,res) => {
        try {
            const {id, city} = req.body
            console.log(id, city)
            const user = await Users.findOne({_id : id})
            user.startupLocation = city
            await user.save()
            res.status(200).json("SUCCESS")
        } catch (error) {
            res.status(201).json(error)
        }
    },
    registerStage : async (req,res) => {
        try {
            const {id, stage} = req.body
            console.log(id, stage)
            const user = await Users.findOne({_id : id})
            user.startupStage = stage
            await user.save()
            res.status(200).json("SUCCESS")
        } catch (error) {
            res.status(201).json(error)
        }
    },
    registerUpload : async (req,res) => {
        try {
            let { id } = req.body
            let data = req.files
            let mockup = null
            let pitchdeck_file = null

            data.map((item) => {
                if(item.mimetype === 'image/png'){
                    mockup = item
                } else {
                    pitchdeck_file = item
                }
            })

            const user = await Users.findOne({_id : id})
            user.mockup = `image/pitchdeck/${mockup.filename}`
            await user.save()
            const pitch = await Pitchdeck.create({ 
                user : id,
                file : `image/pitchdeck/${pitchdeck_file.filename}`,
                isCurated : false,
            }).then((res) => {
                res.status(200).json("SUCCESS")
            })
        } catch (error) {
            res.status(201).json(error.message)
        }
    },
    yourProfile : async (req,res) => {
        try {
            const {id, firstName, lastName, linkedinProfile} = req.body
            const user = await Users.findOne({_id : id})
            user.firstName = firstName
            user.lastName = lastName
            user.linkedinProfile = linkedinProfile
            user.save()
            res.status(200).json("SUCCESS")
        } catch (error) {
            res.status(201).json(error.message)
        }
    },
    hearAboutUs : async (req,res) => {
        try {
            const {id, hearAboutUs} = req.body
            const user = await Users.findOne({ _id : id })
            user.hearAboutUs = hearAboutUs
            user.save()
            res.status(200).json("SUCCESS")
        } catch (error) {
            res.status(201).json(error.message)
        }
    },
    packagePlan : async (req,res) => {
        try {
            const {id, package_plan} = req.body
            const user = await Users.findOne({ _id : id })
            user.package_plan = package_plan
            user.save()
            res.status(200).json("SUCCESS")
        } catch (error) {
            res.status(201).json(error.message)
        }
    },
    uploadPitchdeck : async (req,res) => {
        try {
            let { id } = req.body
            let data = req.files[0]
            const pitch = await Pitchdeck.create({ 
                user : id,
                file : `image/pitchdeck/${data.filename}`,
                isCurated : false,
                name : data.originalname
            }).then((res) => {
                console.log(res)
                res.status(200).json("SUCCESS")
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(201).json(error.message)
        }
    },
    uploadMockup : async (req,res) => {
        try {
            let {id} = req.body
            let data = req.files[0]

            const user = await Users.findOne({ _id : id})
            if(!user.mockup[0]){
                user.mockup = `image/pitchdeck/${data.filename}`
                user.save()
                res.status(200).json(user)
            } else {
                user.mockup.push(`image/pitchdeck/${data.filename}`)
                user.save()
                res.status(200).json(user)
            }
        } catch (error) {
            res.status(201).json(error.message)
        }
    },
    pitchdeckByUserId : async (req,res) => {
        try {
            const { id } = req.body
            const pitchdeck = await Pitchdeck.find({ user : id })
            if(pitchdeck){
                res.status(200).json(pitchdeck)
            } else {
                res.status(201).json("FAILED")
            }
        } catch (err) {
            res.status(201).status(err.message)
        }
    },
    getUser : async (req,res) => {
        try {
            let {id} = req.body
            const user =await Users.findOne({ _id : id})
            .populate('categories')
            res.status(200).json(user)
        } catch (error) {
            res.status(201).json(error.message)
        }
    },
    editAccount : async (req,res) => {
        try {
            const { id, password } = req.body
            const user = await Users.findOne({ _id : id })
            if (req.file === undefined){
                user.password = bcrypt.hashSync(password, 6);
                await user.save();
                res.status(200).json("SUCCESS PASSWORD")
            } else if( user.startupLogo === undefined && req.file ){
                // await fs.unlink(path.join(`public/${user.startupLogo}`))
                user.password = password;
                user.startupLogo = `image/user/${req.file.filename}`
                await user.save()
                res.status(200).json("SUCCESS PICTURE")
            } else {
                await fs.unlink(path.join(`public/${user.startupLogo}`))
                user.password = password;
                user.startupLogo = `image/user/${req.file.filename}`
                await user.save()
                res.status(200).json("SUCCESS PICTURE REPLACE")
            }
        } catch (error) {
            res.status(201).json(error.message)
        }
    },
    editPersonal : async (req,res) => {
        try {
            const { id, firstName, lastName, jobTitle, linkedinProfile } = req.body
            const user = await Users.findOne({ _id : id})
            if(user){
                user.firstName = firstName
                user.lastName = lastName
                user.jobTitle = jobTitle
                user.linkedinProfile = linkedinProfile
                await user.save()
                res.status(200).json('SUCCESS')
            }
        } catch (error) {
            res.status(201).json(error.message)
        }
    },
    editCompany : async (req,res) => {
        try {
            const { id, startupName, shortDescription, websiteLink, category, location, startupStage, elevatorPitch } = req.body
            const user = await Users.findOne({ _id : id })
            if (req.file === undefined){
                user.startupName = startupName
                user.shortDescription = shortDescription
                user.websiteLink = websiteLink
                user.category = category
                user.location = location
                user.startupStage = startupStage
                user.elevatorPitch = elevatorPitch
                await user.save();
                res.status(200).json("SUCCESS")
            } else if( user.startupLogo === undefined && req.file ){
                user.startupName = startupName
                user.shortDescription = shortDescription
                user.websiteLink = websiteLink
                user.category = category
                user.location = location
                user.startupStage = startupStage
                user.elevatorPitch = elevatorPitch
                user.startupLogo = `image/user/${req.file.filename}`
                await user.save()
                res.status(200).json("SUCCESS PICTURE")
            } else {
                await fs.unlink(path.join(`public/${user.startupLogo}`))
                user.startupName = startupName;
                user.websiteLink = websiteLink;
                user.shortDescription = shortDescription;
                user.startupLogo = `image/user/${req.file.filename}`
                await user.save()
                res.status(200).json("SUCCESS PICTURE REPLACE")
            }
        } catch (error) {
            res.status(201).json(error.message)
        }
    },
}