const { default: mongoose } = require("mongoose");


const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        description: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        time: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        date: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        complete: {
            type: Boolean,
            required: true,
            default: false
        }




    }, {
    timestamps: true
}
)

const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;