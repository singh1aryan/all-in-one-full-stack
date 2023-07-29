import Link from 'next/link'
import { useState } from 'react';

function Posts() {

    const [posts, setPosts] = useState([]);

    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => setPosts(json))

    return (
        <ul>
            All posts
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/posts/${encodeURIComponent(post.id)}`}>
                        {post.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Posts

// {
//     "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false
//   }