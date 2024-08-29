import React from "react";

function SignupForm({
  signup,
}: {
  signup: (formData: FormData) => Promise<never>;
}) {
  return (
    <form className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Sign Up</h1>
        <p className="text-sm">Sign up to create your account</p>
      </div>
      <div className="form-group">
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email address
          </label>

          <input
            placeholder="Type here"
            type="email"
            name="email"
            className="input max-w-full"
          />
          <label className="form-label">
            <span className="form-label-alt">Please enter a valid email.</span>
          </label>
        </div>
        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="form-control">
            <input
              placeholder="Type here"
              type="password"
              name="password"
              className="input max-w-full"
            />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="password2" className="form-label">
            Confirm Password
          </label>
          <div className="form-control">
            <input
              placeholder="Type here"
              type="password"
              name="password2"
              className="input max-w-full"
            />
          </div>
        </div>
        <div className="form-field pt-5">
          <div className="form-control justify-between">
            <button
              type="submit"
              formAction={signup}
              className="btn btn-primary w-full"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignupForm;
