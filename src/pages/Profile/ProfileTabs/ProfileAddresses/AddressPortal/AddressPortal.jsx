import { useState, useEffect } from "react";
import FormFiled from '../../../../../components/FormField/FormField';
import "./AddressPortal.css";

const BackIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EMPTY_FORM = {
  full_name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postal_code: "",
  is_default: false,
};

export default function AddressPortal({ onClose, onSubmit, editAddress = null }) {
  const isEditing = Boolean(editAddress);

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editAddress) {
      setForm({
        full_name:   editAddress.full_name   || "",
        address:     editAddress.address     || "",
        city:        editAddress.city        || "",
        state:       editAddress.state       || "",
        country:     editAddress.country     || "",
        postal_code: editAddress.postal_code || "",
        is_default:  editAddress.is_default  || false,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editAddress]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const required = ["full_name", "address", "city", "state", "country"];
    const next = {};
    required.forEach((key) => {
      if (!form[key].trim()) next[key] = "This field is required";
    });
    return next;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await onSubmit(form, editAddress?.id);
    setLoading(false);
    onClose();
  };

  return (
    <div className="ap-card" onClick={(e) => e.stopPropagation()}>

      {/* ══ HEADER ══ */}
      <div className="ap-header">
        <button className="ap-back-btn" onClick={onClose}>
          <BackIcon />
          Back
        </button>
        <div className="ap-header-center">
          <span className="ap-header-eyebrow">
            {isEditing ? "Edit Address" : "New Address"}
          </span>
          <span className="ap-header-title">
            {isEditing ? "Update your address" : "Add a new address"}
          </span>
        </div>
        <div style={{ width: 64 }} />
      </div>

      {/* ══ BODY ══ */}
      <div className="ap-body">

        <FormFiled
          label="Full Name" name="full_name"
          placeholder="Enter your full name" required
          value={form.full_name} onChange={handleChange} error={errors.full_name}
        />

        <FormFiled
          label="Address" name="address"
          placeholder="Flat, House no., Building, Street" required
          value={form.address} onChange={handleChange} error={errors.address}
        />

        <div className="ap-row">
          <FormFiled
            label="City" name="city"
            placeholder="Enter city" required
            value={form.city} onChange={handleChange} error={errors.city}
          />
          <FormFiled
            label="Postal Code" name="postal_code"
            placeholder="Enter postal code"
            value={form.postal_code} onChange={handleChange} error={errors.postal_code}
          />
        </div>

        <div className="ap-row">
          <FormFiled
            label="State" name="state"
            placeholder="Enter state" required
            value={form.state} onChange={handleChange} error={errors.state}
          />
          <FormFiled
            label="Country" name="country"
            placeholder="Enter country" required
            value={form.country} onChange={handleChange} error={errors.country}
          />
        </div>

        <label className="ap-checkbox-row">
          <div className={`ap-checkbox ${form.is_default ? "ap-checkbox--checked" : ""}`}>
            <input
              type="checkbox"
              name="is_default"
              checked={form.is_default}
              onChange={handleChange}
            />
            {form.is_default && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="ap-checkbox-label">Use as my default address</span>
        </label>

      </div>

      {/* ══ FOOTER ══ */}
      <div className="ap-footer">
        <button className="ap-btn-cancel" onClick={onClose}>Cancel</button>
        <button className="ap-btn-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Address"}
        </button>
      </div>

    </div>
  );
}