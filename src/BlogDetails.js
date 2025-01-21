import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./usefetch";

const BlogDetails = () => {
    const {id} = useParams();
    const {data: blog, error, isPending} = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE',
        }). then(() => {
            history.push('/');
        })
    }

    const handleEdit = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'GET',
        }). then(() => {
            history.push('/edit/' + blog.id);
        })
    }

    return ( 
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div> 
                    <button onClick={handleClick}>Delete</button>
                    <div><button onClick={handleEdit}>Edit</button></div>
                </article>                
            )}
        </div>
     );
}
 
export default BlogDetails;