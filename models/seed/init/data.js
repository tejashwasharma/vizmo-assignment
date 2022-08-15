const { mongoose } = require('../..');

module.exports = {
    floor: [
        {
            _id: new mongoose.Types.ObjectId(),
            name: "Ground",
            acronym: "G",
            department: [
                {
                    _id: new mongoose.Types.ObjectId(),
                    name: "Security",
                    acronym: "SEC",
                    totalSeats: 10
                }
            ]
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "First",
            acronym: "01",
            department: [
                {
                    _id: new mongoose.Types.ObjectId(),
                    name: "Engineering",
                    acronym: "ENG",
                    totalSeats: 50
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    name: "Management",
                    acronym: "MNG",
                    totalSeats: 20
                }
            ]
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "Second",
            acronym: "02",
            department: [
                {
                    _id: new mongoose.Types.ObjectId(),
                    name: "Networking",
                    acronym: "NET",
                    totalSeats: 20
                }
            ]
        }
    ],
    user: [
        {
            _id: new mongoose.Types.ObjectId(),
            name: "Admin",
            email: "admin@vizmo.com",
            password: "admin@1234",
            isAdmin: true
        }
    ]
}