import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const Edit = () => {
    const { id } = useParams(); // Get the blog ID
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/blogs/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setTitle(data.title);
                    setBody(data.body);
                    setAuthor(data.author);
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        const url = id
            ? `http://localhost:8000/blogs/${id}` // Update blog
            : 'http://localhost:8000/blogs'; // Create new blog

        const method = id ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
        }).then(() => {
            setIsPending(false);
            history.push('/');
        });
    };

    return (
        <div className="create">
            <h2>{id ? 'Edit Blog' : 'Add a New Blog'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>{id ? 'Update Blog' : 'Add Blog'}</button>}
                {isPending && <button disabled>{id ? 'Updating Blog...' : 'Adding Blog...'}</button>}
            </form>
        </div>
    );
};

export default Edit;
