import React,{useState} from "react";
import {Helmet} from "react-helmet";

export default function Login() {
  const [siteTabTitle, setSiteTitle] = useState('Login - American Specialized Load Board');

  const _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Microsoft login page
    // Upon successful login, a cookie session will be stored in the client
    const callbackURL = process.env.REACT_APP_TARGET_ENV === 'development' ? `${process.env.REACT_APP_BACKEND_DEV_URL}` : `${process.env.REACT_APP_BACKEND_PROD_URL}`;
    window.open(callbackURL + "/auth/microsoft", "_self");
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 min-vw-100 text-center">
        <Helmet defer={false}>
          <title>{siteTabTitle}</title>
          <meta name="description" content="Dashboard" />
        </Helmet>
        <div className="card p-5 align-center">
            <span className="card-title"><h5>Sign in to the load board</h5><span className="card-subtitle mb-2 text-muted">American Specialized Load Board Application</span></span>
            <div className="card-body">
              <button
                className="btn flex-column justify-content-center align-items-center bg-dark text-white"
                onClick={_handleSignInClick}
              >
                <svg width="4.66em" height="1em" viewBox="0 0 512 110"><path fill="#706D6E" d="M511.874 49.436v-9.002h-11.179V26.44l-.376.116l-10.5 3.212l-.207.063v10.604h-16.573v-5.906c0-2.75.616-4.856 1.828-6.26c1.203-1.387 2.925-2.092 5.12-2.092c1.58 0 3.214.372 4.859 1.106l.412.183v-9.48l-.193-.071c-1.535-.552-3.623-.83-6.21-.83c-3.26 0-6.223.71-8.806 2.116c-2.586 1.408-4.62 3.418-6.044 5.975c-1.42 2.553-2.14 5.502-2.14 8.765v6.494h-7.784v9.002h7.784V87.36h11.174V49.436h16.573v24.1c0 9.926 4.682 14.957 13.915 14.957c1.517 0 3.114-.179 4.745-.527c1.66-.357 2.79-.714 3.455-1.096l.147-.086v-9.086l-.454.3c-.607.406-1.362.735-2.248.98c-.89.25-1.632.376-2.207.376c-2.163 0-3.763-.583-4.757-1.733c-1.004-1.16-1.513-3.19-1.513-6.03V49.436h11.179Zm-82.748 29.92c-4.056 0-7.253-1.346-9.507-3.995c-2.267-2.663-3.416-6.459-3.416-11.282c0-4.975 1.149-8.87 3.417-11.58c2.255-2.692 5.422-4.058 9.415-4.058c3.875 0 6.96 1.305 9.168 3.88c2.221 2.59 3.347 6.453 3.347 11.487c0 5.095-1.06 9.01-3.149 11.628c-2.075 2.599-5.195 3.92-9.275 3.92Zm.498-40.052c-7.738 0-13.885 2.267-18.266 6.739c-4.38 4.473-6.6 10.661-6.6 18.397c0 7.347 2.167 13.257 6.443 17.562c4.275 4.308 10.093 6.49 17.29 6.49c7.502 0 13.526-2.3 17.906-6.833c4.38-4.53 6.599-10.66 6.599-18.215c0-7.462-2.083-13.416-6.191-17.693c-4.11-4.278-9.892-6.447-17.181-6.447Zm-42.883 0c-5.264 0-9.617 1.346-12.944 4c-3.346 2.67-5.043 6.173-5.043 10.411c0 2.203.367 4.16 1.088 5.82c.725 1.665 1.848 3.131 3.339 4.362c1.48 1.22 3.764 2.499 6.792 3.8c2.545 1.047 4.443 1.933 5.649 2.631c1.178.684 2.015 1.372 2.488 2.042c.458.655.692 1.552.692 2.66c0 3.153-2.361 4.686-7.22 4.686c-1.801 0-3.857-.375-6.108-1.117a22.967 22.967 0 0 1-6.256-3.173l-.464-.332v10.758l.17.08c1.582.73 3.575 1.344 5.924 1.829c2.346.485 4.476.732 6.327.732c5.712 0 10.312-1.353 13.668-4.024c3.377-2.688 5.09-6.273 5.09-10.659c0-3.163-.922-5.875-2.739-8.063c-1.804-2.17-4.934-4.162-9.302-5.923c-3.479-1.396-5.708-2.555-6.627-3.445c-.886-.86-1.336-2.075-1.336-3.614c0-1.365.555-2.458 1.696-3.344c1.15-.89 2.749-1.343 4.755-1.343c1.862 0 3.767.294 5.661.87c1.894.577 3.556 1.349 4.944 2.293l.457.312V41.348l-.176-.076c-1.28-.549-2.969-1.018-5.02-1.4c-2.042-.377-3.894-.568-5.505-.568Zm-47.119 40.051c-4.054 0-7.253-1.345-9.506-3.994c-2.268-2.663-3.415-6.458-3.415-11.282c0-4.975 1.148-8.87 3.417-11.58c2.253-2.692 5.42-4.058 9.415-4.058c3.873 0 6.957 1.305 9.167 3.88c2.22 2.59 3.347 6.453 3.347 11.487c0 5.095-1.06 9.01-3.15 11.628c-2.074 2.599-5.193 3.92-9.275 3.92Zm.5-40.051c-7.74 0-13.887 2.267-18.267 6.739c-4.379 4.473-6.6 10.661-6.6 18.397c0 7.35 2.168 13.257 6.443 17.562c4.275 4.308 10.093 6.49 17.291 6.49c7.5 0 13.525-2.3 17.905-6.833c4.379-4.53 6.6-10.66 6.6-18.215c0-7.462-2.084-13.416-6.193-17.693c-4.112-4.278-9.892-6.447-17.18-6.447Zm-41.83 9.257v-8.127h-11.039V87.36h11.038V63.356c0-4.082.926-7.435 2.752-9.968c1.803-2.503 4.205-3.77 7.139-3.77c.994 0 2.11.163 3.319.488c1.196.322 2.063.672 2.574 1.04l.463.336V40.354l-.178-.077c-1.029-.437-2.482-.657-4.323-.657c-2.773 0-5.256.891-7.382 2.646c-1.866 1.542-3.215 3.657-4.247 6.295h-.117Zm-30.806-9.257c-5.064 0-9.581 1.086-13.424 3.226c-3.85 2.145-6.827 5.209-8.852 9.104c-2.017 3.886-3.04 8.424-3.04 13.486c0 4.433.992 8.502 2.954 12.088c1.963 3.592 4.743 6.402 8.26 8.35c3.513 1.947 7.572 2.935 12.067 2.935c5.246 0 9.725-1.05 13.316-3.117l.145-.084V75.179l-.464.339a20.761 20.761 0 0 1-5.4 2.812c-1.951.68-3.73 1.025-5.29 1.025c-4.33 0-7.807-1.356-10.332-4.027c-2.53-2.676-3.812-6.432-3.812-11.16c0-4.757 1.338-8.61 3.974-11.454c2.627-2.834 6.11-4.272 10.353-4.272c3.628 0 7.163 1.228 10.508 3.655l.463.336V41.778l-.15-.085c-1.258-.704-2.975-1.286-5.107-1.727c-2.121-.44-4.197-.662-6.17-.662Zm-32.92 1.13h-11.038V87.36h11.039V40.435Zm-5.406-19.99c-1.816 0-3.4.618-4.703 1.844c-1.307 1.23-1.97 2.777-1.97 4.603c0 1.797.655 3.316 1.95 4.512c1.286 1.193 2.875 1.798 4.723 1.798c1.848 0 3.443-.605 4.745-1.796c1.31-1.198 1.975-2.717 1.975-4.514c0-1.763-.647-3.295-1.921-4.554c-1.273-1.256-2.887-1.893-4.799-1.893Zm-27.54 16.528V87.36h11.264V21.881h-15.59l-19.818 48.635l-19.232-48.635h-16.226V87.36h10.586V36.967h.364l20.308 50.392h7.989l19.99-50.387h.364Z"></path><path fill="#F1511B" d="M51.927 51.927H0V0h51.927v51.927Z"></path><path fill="#80CC28" d="M109.26 51.927H57.334V0h51.926v51.927Z"></path><path fill="#00ADEF" d="M51.925 109.28H0V57.354h51.925v51.926Z"></path><path fill="#FBBC09" d="M109.26 109.28H57.334V57.354h51.926v51.926Z"></path></svg>
                <div>Sign in with Microsoft</div>
              </button>
            </div>
        </div>
    </div>
  );
}
