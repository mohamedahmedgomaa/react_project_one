import React, {useEffect, useState} from "react";
import usePostDetails from "../hooks/use-post-details";
import {useDispatch} from "react-redux";

import Loading from "../components/Loading";
import {Form, Button} from "react-bootstrap";
import {editPost} from "../state/postSlice";
import {useNavigate} from "react-router-dom";

const EditPost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {loading, error, record} = usePostDetails();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (record) {
            setTitle(record.title)
            setDescription(record.description)
        }
    }, [record]);

    useEffect(() => {
        return () => {
            dispatch({type: "posts/cleanRecord"})
        }
    }, [dispatch]);
    const formHandler = (e) => {
        e.preventDefault();
        dispatch(editPost({id: record.id, title, description})).unwrap()
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
        ;
    }
    return (
        <Form onSubmit={formHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}
                              rows={3}/>
            </Form.Group>
            <Loading loading={loading} error={error}>
                <Button variant="primary" type="submit">Submit</Button>
            </Loading>
        </Form>
    );
};

export default EditPost;
