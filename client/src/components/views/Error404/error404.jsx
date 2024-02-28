import React from "react"
import GridLoader from "react-spinners/GridLoader";
import "./index.css";
function Error404() {
    
          return <div className="sweet-loading">
    
          <GridLoader
            color={"orange"}
            loading={true}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
}

export default Error404;