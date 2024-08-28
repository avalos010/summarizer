import React from "react";

function SignupForm() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Sign Up</h1>
        <p className="text-sm">Sign up to create your account</p>
      </div>
      <div className="form-group">
        <div className="form-field">
          <label className="form-label">Email address</label>

          <input
            placeholder="Type here"
            type="email"
            className="input max-w-full"
          />
          <label className="form-label">
            <span className="form-label-alt">Please enter a valid email.</span>
          </label>
        </div>
        <div className="form-field">
          <label className="form-label">Password</label>
          <div className="form-control">
            <input
              placeholder="Type here"
              type="password"
              className="input max-w-full"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Confirm Password</label>
          <div className="form-control">
            <input
              placeholder="Type here"
              type="password"
              className="input max-w-full"
            />
          </div>
        </div>
        <div className="form-field pt-5">
          <div className="form-control justify-between">
            <button type="button" className="btn btn-primary w-full">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
