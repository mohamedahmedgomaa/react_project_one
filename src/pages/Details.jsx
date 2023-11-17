import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const Details = () => {
    const dispatch = useDispatch()
    const {loading, error, record} = usePostDetails();

    useEffect(() => {
        return () => {
            dispatch({type: "posts/cleanRecord"})
        }
    }, [dispatch]);
    return (
        <>
            <Loading loading={loading} error={error}>
                <p>Title : {record?.title}</p>
                <p>Description : {record?.description}</p>
            </Loading>
           </>
    );
};

export default Details;
