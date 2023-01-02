import { useEffect, useRef, useState } from "react";
import Post from './Post';

import '../assets/scss/components/Page.scss';


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default function Page(props) {

    const [posts, setPosts] = useState([]);

    const { fetchDate } = props;
    const prevFetchDate = usePrevious(fetchDate);
    useEffect(() => {
        let ignore = false;
        if (prevFetchDate !== fetchDate) {

            fetch(`${process.env.REACT_APP_SERVER_URL}/fb/account/${props.page.id}/posts?accessToken=${props.page.accessToken}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    throw new Error("Une erreur est survenue.");
                })
                .then(responseJson => {
                    // TODO Pagination
                    if (!ignore) {
                        setPosts(responseJson.data.data);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
        return () => {
            ignore = true;
        };
    }, [props.page.accessToken, props.page.id, fetchDate, prevFetchDate]);

    return (
        <section id="page">
            <h1>{props.page.name}</h1>
            <div className='post-container'>
                {posts && posts.map((post, index) => {
                    return <Post post={post} key={index} />
                })}
            </div>
        </section>
    )
}