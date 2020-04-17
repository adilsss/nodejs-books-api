module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            fullName: String,
            img: String,
            birthYear: Number,
            country: String,
            bio: String,
            bibliography: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Author = mongoose.model("author", schema);
    return Author;
}