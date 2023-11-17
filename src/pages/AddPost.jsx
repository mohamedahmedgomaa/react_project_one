import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {insertPost} from "../state/postSlice";
import {useNavigate} from "react-router-dom";
import Loading from "../components/Loading";
import withGuard from "../util/withGuard";

const AddPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const {loading, error} = useSelector((state) => state.posts)
    const formHandler = (e) => {
        e.preventDefault();
        // const id = Math.floor((Math.random() * 500))
        dispatch(insertPost({title, description}))
            .unwrap()
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
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

export default withGuard(AddPost);
