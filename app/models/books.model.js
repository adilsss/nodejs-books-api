module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            author: String,
            published: Number,
            publisher: String,
            pages: Number,
            description: String,
            img: String,
            link: String,
            language: String,
            pLanguage: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Book = mongoose.model("book", schema);
    return Book;
}