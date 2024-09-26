import "../style/loader.css"
export const Loader=()=>{
    return(<>
     <div className="loader-overlay">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3">Loading, please wait...</span>
      </div>
    </div>
    </>)
}