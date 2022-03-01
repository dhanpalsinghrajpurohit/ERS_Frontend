import Loader from "react-js-loader";

const Spinner = (props) => (
        props.isActive?
        (<div className={"item"}>
        <Loader type="spinner-cub" bgColor={"#4257f5"} title={"Loading..."} color={'#FFFFFF'} size={100} />
        </div>):null
)
export default Spinner;