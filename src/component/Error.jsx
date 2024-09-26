/* eslint-disable react/prop-types */
const ErrorComponent = ({ message }) => {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p>{message}</p>
      </div>
    );
  };
  
  export default ErrorComponent;