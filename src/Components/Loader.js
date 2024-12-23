
import { RotatingLines } from "react-loader-spinner";

export default function Loader(props) {
    return (
        <div className="loader">
            <RotatingLines
            visible={true}
            height={props.size || 50}
            width={props.size || 50}
            color="grey"
            strokeColor={props.strokeColor}
            strokeWidth={props.strokeWidth || 4}
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass="" />
        </div>
    )
}