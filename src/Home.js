import { useState, useEffect } from "react"
import Bloglist from "./Bloglist";

const Home = () => {
    const [blogs, setBlogs] = useState([
        {title: 'My new website', body:'lorem ipsum', authour: 'mario', id: 1},
        {title: 'Welcome post', body:'lorem ipsum', authour: 'yoshi', id: 2},
        {title: 'My new website', body:'lorem ipsum', authour: 'mario', id: 3},
    ]);

    const [name, setName] = useState('mairo');

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }

    useEffect(() => {
        console.log('useEffect ran');
        console.log(name);
    }, [name]);

    return (
        <div className="home">
            <Bloglist blogs={blogs} title="All Blogs!" handleDelete={handleDelete} />
            <button onClick={() => setName('luigi')}>Change Name</button>
            <p>The name is {name}</p>
        </div>
    );
}
 
export default Home;