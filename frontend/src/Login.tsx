import React from "react";

const Login = () => {
  return (
    <>
    <div className="auth-content">
      <div className="auth-content-inner">
        <div className="siw-main-view identify primary-auth">
          <div className="siw-main-header">
            <div></div>
          </div>
          <div className="siw-main-body">
            <form method="POST" action="/oauth2/default/v1/authorize" id="form20" className="ion-form o-form o-form-edit-mode">
              <div className="o-form-content o-form-theme clearfix">
                <h2 className="okta-form-title o-form-head">Sign In</h2>
                <div className="o-form-info-container"></div>
                <div className="o-form-error-container" role="alert"></div>
                <div className="o-form-fieldset-container">
                  <div className="o-form-fieldset o-form-label-top">
                    <div className="okta-form-label o-form-label">
                      <label htmlFor="input28">Username</label>
                    </div>
                    <div className="o-form-input">
                      <span className="o-form-input-name-identifier o-form-control okta-form-input-field input-fix">
                        <input type="text" name="identifier" id="input28" autoComplete="username" className="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="o-form-button-bar">
                <input className="button button-primary" type="submit" value="Next" />
              </div>
            </form>
          </div>
          <div className="siw-main-footer">
            <a target="_blank" rel="noopener noreferrer" href="https://account.churchofjesuschrist.org/recovery?lang=eng" className="link">
              I forgot my username or password
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://account.churchofjesuschrist.org/register?lang=eng" className="link">
              Create a new Account
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
