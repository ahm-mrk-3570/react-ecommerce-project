import { useContext, useState } from "react";
import "./AddAddress.css";
import {
  addAddress,
  setDefaultAddress,
} from "../../../../services/addressServices";
import { toast } from "react-toastify";
import GlobalContext from "../../../../context/Context";
import AuthContext from "../../../../context/AuthContext";

export default function AddAddress() {
  const [form, setForm] = useState({
    full_name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    is_default: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const required = ["full_name", "address", "city", "state", "country"];

    const next = {};

    required.forEach((item) => {
      if (!form[item].trim()) next[item] = "This Field is required";
    });

    return next;
  };

  const { setAddresses } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const { data, error } = await addAddress({ ...form, user_id: user.id });
    if (form.is_default === true) {
      const { error } = await setDefaultAddress(data.id, user.id);
      if (error) {
        toast.error("Failed to set default");
        return;
      }
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, is_default: a.id === data.id })),
      );
      toast.success("Default address updated");
    }
    if (error) {
      toast.error("Failed to add address");
      return;
    }
    setAddresses((prev) => [...prev, data]);
    toast.success("Address added");
    setForm({
      full_name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      is_default: false,
    });
  };

  return (
    <div className="add-address">
      <h3>Add a new Address</h3>
      <div className="full_name">
        <label htmlFor="full_name">
          Full Name <span className="ap-required">*</span>
        </label>
        <input
          type="text"
          name="full_name"
          id="full_name"
          onChange={handleChange}
          value={form.full_name}
        />
        {errors["full_name"] && (
          <span className="ap-error-msg">{errors["full_name"]}</span>
        )}
      </div>
      <div className="address">
        <label htmlFor="address">
          Address <span className="ap-required">*</span>
        </label>
        <input
          type="text"
          name="address"
          id="address"
          onChange={handleChange}
          value={form.address}
        />
        {errors["address"] && (
          <span className="ap-error-msg">{errors["address"]}</span>
        )}
      </div>
      <div className="city">
        <label htmlFor="city">
          City <span className="ap-required">*</span>
        </label>
        <input
          type="text"
          id="city"
          name="city"
          onChange={handleChange}
          value={form.city}
        />
        {errors["city"] && (
          <span className="ap-error-msg">{errors["city"]}</span>
        )}
      </div>
      <div className="state">
        <label htmlFor="state">
          State <span className="ap-required">*</span>
        </label>
        <input
          type="text"
          id="state"
          name="state"
          onChange={handleChange}
          value={form.state}
        />
        {errors["state"] && (
          <span className="ap-error-msg">{errors["state"]}</span>
        )}
      </div>
      <div className="country">
        <label htmlFor="country">
          Country <span className="ap-required">*</span>
        </label>
        <input
          type="text"
          id="country"
          name="country"
          onChange={handleChange}
          value={form.country}
        />
        {errors["country"] && (
          <span className="ap-error-msg">{errors["country"]}</span>
        )}
      </div>
      <div className="postal_code">
        <label htmlFor="postal_code">Postal Code</label>
        <input
          type="text"
          id="postal_code"
          name="postal_code"
          onChange={handleChange}
          value={form.postal_code}
        />
      </div>
      <div className="use-default-address">
        <input
          type="checkbox"
          id="use-default-address"
          name="is_default"
          checked={form.is_default}
          onChange={(e) =>
            e.target.checked
              ? setForm({ ...form, is_default: true })
              : setForm({ ...form, is_default: false })
          }
        />
        <label htmlFor="use-default-address">Use as my default address</label>
      </div>
      <button className="add-new-address" onClick={() => handleSubmit()}>
        Add New Address
      </button>
    </div>
  );
}
