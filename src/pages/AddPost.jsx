import React from "react";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {insertPost} from "../state/postSlice";
import {useNavigate} from "react-router-dom";
import Loading from "../components/Loading";
import withGuard from "../util/withGuard";

import {useFormik} from "formik";
import * as Yup from 'yup';
import {postSchema} from "../util/validationSchema";

const AddPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, error} = useSelector((state) => state.posts)

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: postSchema,
        onSubmit: values => {
            dispatch(insertPost({title: values.title, description: values.description}))
                .unwrap()
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    isValid={formik.touched.title && !formik.errors.title}
                    isInvalid={!!formik.errors.title}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.title}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    isValid={formik.touched.description && !formik.errors.description}
                    isInvalid={!!formik.errors.description}
                    rows={3}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
                </Form.Control.Feedback>
            </Form.Group>
            <Loading loading={loading} error={error}>
                <Button variant="primary" type="submit">Submit</Button>
            </Loading>
        </Form>
    );
};

export default withGuard(AddPost);
