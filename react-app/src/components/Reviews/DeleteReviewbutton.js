import { useDispatch } from "react-redux";
import { removeReview } from "../../store/review";

const DeleteReviewButton = ({id}) => {
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(removeReview(id))
        console.log("ID",id)
    }

    return (
        <div>
            <button
                onClick={onSubmit}
                id={id}
            >
            Delete
            </button>
        </div>
    )
}

export default DeleteReviewButton
