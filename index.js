import express, { json } from 'express'
import mongoose from 'mongoose';
import cors from 'cors';

const app = express()
const port = 8000

app.use(express.json())
app.use(cors())

const OurServicesSchema = new mongoose.Schema({
    name: String,
    description: String,
    icon: String

});

const Service = mongoose.model('ourservice', OurServicesSchema);

app.get('/', async (req, res) => {
    try {
        const services = await Service.find({})
        res.send(services)
    } catch (error) {
        res.send(error.message)
    }
})



app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const service = await Service.findById(id)
        res.send(service)
    } catch (error) {
        res.send(error.message)
    }
})

app.post('/', async (req, res) => {
    try {
        const { name, description, icon } = req.body
        const newServices = new Service({ name, description, icon })
        await newServices.save()
        res.send('Post yaradildi')
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, icon } = req.body
        const service = await Service.findByIdAndUpdate(id, { name, description, icon })
        res.send(service)
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const service = await Service.findByIdAndDelete(id)
        res.send(service)
    } catch (error) {
        res.send(error.message)
    }
})

mongoose.connect('mongodb+srv://arzu:arzu@cluster0.9p2kmwb.mongodb.net/')
    .then(() => console.log('Connected!'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})