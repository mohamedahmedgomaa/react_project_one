import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Button, ButtonGroup, Table} from "react-bootstrap";
import PostList from "./PostList";
import {fetchPosts} from "../state/postSlice"
const Index = () => {
    const dispatch = useDispatch();
    const {records, loading, error} = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch]);
    return (
        <PostList data={records} loading={loading} error={error}/>
    );
};

export default Index;
