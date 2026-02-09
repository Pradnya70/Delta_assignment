import React, { useState, useEffect, useCallback } from "react";
import { USER_FIELDS } from "../config/fields";

const UserForm = ({ user, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
      setErrors({});
    } else {
      setFormData({});
      setErrors({});
    }
  }, [user]);

  const validateField = useCallback((field, value) => {
    const fieldConfig = USER_FIELDS.find((f) => f.key === field);
    const error = {};

    if (!fieldConfig) return error;

    if (fieldConfig.required && !value?.trim()) {
      error[field] = `${fieldConfig.label} is required`;
      return error;
    }

    if (fieldConfig.validation) {
      const { minLength, maxLength, pattern } = fieldConfig.validation;

      if (minLength && value.length < minLength) {
        error[field] =
          `${fieldConfig.label} must be at least ${minLength} characters`;
      }

      if (maxLength && value.length > maxLength) {
        error[field] =
          `${fieldConfig.label} must not exceed ${maxLength} characters`;
      }

      if (pattern && !pattern.test(value)) {
        error[field] = `${fieldConfig.label} format is invalid`;
      }
    }

    return error;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate all fields
    USER_FIELDS.forEach((field) => {
      const fieldError = validateField(field.key, formData[field.key]);
      Object.assign(newErrors, fieldError);
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      {USER_FIELDS.map((field) => (
        <div key={field.key} className="col-md-6">
          <label className="form-label">
            {field.label}{" "}
            {field.required && <span className="text-danger">*</span>}
          </label>
          <input
            type={field.type}
            className={`form-control ${errors[field.key] ? "is-invalid" : ""}`}
            name={field.key}
            placeholder={field.placeholder}
            value={formData[field.key] || ""}
            onChange={handleChange}
            disabled={loading}
            required={field.required}
          />
          {errors[field.key] && (
            <div className="invalid-feedback">{errors[field.key]}</div>
          )}
        </div>
      ))}

      <div className="col-12">
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : user ? "Update User" : "Create User"}
          </button>
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default UserForm;
