import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h2>Opps!!</h2>
            <Link to='/'><button className="btn">Go back to home</button></Link>
        </div>
    );
};

export default ErrorPage;