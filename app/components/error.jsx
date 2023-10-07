import { isRouteErrorResponse } from "@remix-run/react";
import { Link } from "react-router-dom";

function Error({error}) {
  return (
    <div>
      {
        (isRouteErrorResponse(error)) ?
        (
          <>
            <p className='error'>
              {error.status} {error.statusText}
            </p>
            <p>
              {error.data}
            </p>
            <Link 
              className='error-enlace' 
              to='/'
            >
              Tal vez quieras volver a la página principal
            </Link>
          </>
        ) : 
        (
          (error instanceof Error) ?
          (
            <>
              <p className='error'>
                Error: {error.message}
              </p>
              <Link 
                className='error-enlace' 
                to='/'
              >
                Tal vez quieras volver a la página principal
              </Link>
            </>
          ) :
          (
            <>
              <p className='error'>
                Uhknown Error
              </p>
              <Link 
                className='error-enlace' 
                to='/'
              >
                Tal vez quieras volver a la página principal
              </Link>
            </>
          )
        )
      }
    </div>
  );
}

export default Error;