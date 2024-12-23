import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {modifyOffer,createOffer,fetchOffer,} from "../Apis/APIOffer.js";
/* ***************************************************************************** */
const AddOrEditOffer = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    offer: "",
    discountCode: "",
    minimumCartValue: "",
    discountPercentage: "",
    productId: "",
    productVariantId: "",
    backgroundColor: "FFFFFF",
    fontColor: "000000",
    buttonColor: "4997E0",
    buttonFontColor: "FFFFFF",
    buttonHoverColor: "FFFFFF",
    buttonHoverFontColor: "000000",
    expirationDate: "",
    impressions: "",
    conversions: "",
    revenue: "",
    conversionRate: "",
    enabled: true,
  });
  const editingOffer = !!id;
  const [loading, setLoading] = useState(false);
  /* ************************************************************************************************ */
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchOffer();
      console.log("Fetched Data in Offers:", fetchedData); /* Fetch using ID */
      setData(fetchedData);
    };
    loadData();
  }, []);
  /* ************************************************************************************************ */
  /* Edit or Add */
  useEffect(() => {
    if (editingOffer) {
      console.log("editing 1");
      const existingOffer = data.find((offer) => offer.id == id);
      if (existingOffer) {
        console.log("editing 2");
        setFormValues(existingOffer);
      }
    } else {
      console.log("ERROR. . . ");
    }
  }, [data, id, editingOffer]);
  /* **************************************************************************************************** */
  /* Handle Change */
  const handleChange = (e) => {
    console.log("change");
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "offer" ? value : value,
    }));
  };
  /* ***************************************************************************************************** */
  /* Handle Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const requiredFields = [
      "offer",
      "minimumCartValue",
      "discountPercentage",
      "impressions",
      "conversions",
      "revenue",
    ];

    const isValid = requiredFields.every((field) => {
      return formValues[field] !== "" && formValues[field] !== undefined;
    });

    if (!isValid) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const newOffer = {
      id: formValues.id,
      offer: formValues.offer,
      discountCode: formValues.discountCode,
      minimumCartValue: Number(formValues.minimumCartValue),
      discountPercentage: Number(formValues.discountPercentage),
      productId: formValues.productId,
      productVariantId: formValues.productVariantId,
      backgroundColor: formValues.backgroundColor,
      fontColor: formValues.fontColor,
      buttonColor: formValues.buttonColor,
      buttonFontColor: formValues.buttonFontColor,
      buttonHoverColor: formValues.buttonHoverColor,
      buttonHoverFontColor: formValues.buttonHoverFontColor,
      expirationDate: formValues.expirationDate,
      runUntilPaused: formValues.runUntilPaused,
      impressions: parseInt(formValues.impressions, 10),
      conversions: parseInt(formValues.conversions, 10),
      revenue: parseFloat(formValues.revenue),
      conversionRate:
        (
          (parseInt(formValues.conversions, 10) /
            parseInt(formValues.impressions, 10)) *
          100
        ).toFixed(2) + "%",
      enabled: formValues.enabled,
    };
    try {
      setLoading(true);
      if (editingOffer) {
        console.log("New offer data:", newOffer);
        // Edit existing offer
        await modifyOffer(formValues.id, newOffer);
        console.log("New offer data:", newOffer);
        setData((prevData) =>
          prevData.map((offer) =>
            offer.id === formValues.id ? newOffer : offer
          )
        );
      } else {
        const response = await createOffer(newOffer);
        setData((prevData) => [...prevData, response.data]);
      }
      setFormValues({
        id: "",
        offer: "",
        discountCode: "",
        minimumCartValue: "",
        discountPercentage: "",
        productId: "",
        productVariantId: "",
        backgroundColor: "000000",
        fontColor: "000000",
        buttonColor: "4997E0",
        buttonFontColor: "000000",
        buttonHoverColor: "000000",
        buttonHoverFontColor: "000000",
        expirationDate: "",
        runUntilPaused: true,
        impressions: "",
        conversions: "",
        revenue: "",
        conversionRate: "",
        enabled: true,
      });
      navigate("/offers");
    } catch (error) {
      console.error(
        "Error saving offer:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setTimeout(() => {
        setLoading(false); 
      }, 1000); 
    }
  };
  /************************************************************************************************************* */
  return (
    <div className="box_sty1 p-4 ">
      <div className="create-offer col-md-8">
        <h1 className="mb-4 box_sty1 ">
          {editingOffer ? "Edit Offer" : "Create New Offer"}
        </h1>
        <div className="box_sty1">
          {/* Offer Code */}
          <div className=" form-group mb-4 box_sty1">
            <label htmlFor="discountCode">
              Offer Discount Code (Must Be Unique)
            </label>
            <input
              className="form-control"
              type="text"
              name="offer"
              placeholder="e.g. OFFER2020"
              value={formValues.offer}
              onChange={handleChange}
              required
            />
          </div>
          {/* Minimum Cart Value */}
          <div className="form-group mb-4 box_sty1">
            <label htmlFor="minimumCartValue">
              Minimum Cart Value (to Trigger Offer)
            </label>
            <input
              className="form-control"
              type="number"
              name="minimumCartValue"
              value={formValues.minimumCartValue}
              onChange={handleChange}
              placeholder="$ Minimum Cart Value"
              min="0"
              step="0.01"
              required
            />
          </div>
          {/* Set Offer Discount */}
          <div className="form-group mb-4 box_sty1">
            <label htmlFor="discountPercentage">Set Offer Discount</label>
            <input
              className="form-control"
              type="number"
              id="discountPercentage"
              name="discountPercentage"
              value={formValues.discountPercentage}
              onChange={handleChange}
              placeholder="% Set Offer Discount "
              min="0"
              max="100"
              required
            />
          </div>
          {/* Choose Your Offer Product */}
          <div className="form-group mb-4 box_sty1">
            <label htmlFor="productId">Choose Your Offer Product</label>
            <select
              className="form-control "
              id="productId"
              name="productId"
              value={formValues.productId}
              onChange={handleChange}
              required
            >
              <option value="">Select a product</option>
              <option value="xyz">xyz</option>
              {/* Add your product options here */}
            </select>
          </div>

          {/* Choose Your Offer Product Variant */}
          <div className="form-group mb-4 box_sty1">
            <label htmlFor="productVariantId">
              Choose Your Offer Product Variant
            </label>
            <select
              className="form-control"
              id="productVariantId"
              name="productVariantId"
              value={formValues.productVariantId}
              onChange={handleChange}
              required
            >
              <option value="">Select a variant</option>
              <option value="xyz">xyz</option>
              {/* Add your variant options here */}
            </select>
          </div>

          {/* Color Inputs */}
          {[
            "backgroundColor",
            "fontColor",
            "buttonColor",
            "buttonFontColor",
            "buttonHoverColor",
            "buttonHoverFontColor",
          ].map((field) => (
            <div className="form-input  mt-4 box_sty1" key={field}>
              <label htmlFor={field}>
                {field.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <input
                className="form-control"
                type="text"
                id={field}
                name={field}
                value={formValues[field]}
                onChange={handleChange}
                placeholder="FFFFFF"
                pattern="^[0-9A-Fa-f]{6}$"
                style={{
                  backgroundColor:
                    formValues[field]?.length === 6
                      ? `#${formValues[field]}`
                      : "#FFFFFF",
                  color:
                    formValues[field]?.length === 6 ? "#000000" : "inherit",
                }}
                required
              />
            </div>
          ))}

          {/* Choose Expiration Date */}
          <div className="form-group mt-4 box_sty1">
            <label htmlFor="expirationDate">Choose Expiration Date</label>
            <input
              className="form-control"
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={formValues.expirationDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          {/* Impressions */}
          <div className="form-group mt-4 box_sty1">
            <label htmlFor="impressions">Impressions</label>
            <input
              className="form-control"
              type="number"
              name="impressions"
              placeholder="Impressions"
              value={formValues.impressions}
              onChange={handleChange}
              required
            />
          </div>
          {/* Conversions */}
          <div className="form-group  mt-4 box_sty1">
            <label htmlFor="conversions">Conversions</label>
            <input
              className="form-control"
              type="number"
              name="conversions"
              placeholder="Conversions"
              value={formValues.conversions}
              onChange={handleChange}
              required
            />
          </div>
          {/* Revenue */}
          <div className="form-group  mt-4 box_sty1">
            <label htmlFor="revenue">Revenue</label>
            <input
              className="form-control"
              type="number"
              name="revenue"
              placeholder="Revenue"
              value={formValues.revenue}
              onChange={handleChange}
              required
            />
          </div>
          {/* Enabled Checkbox */}
          <div className="form-group  mt-4 box_sty1">
            <label>
              <input
                type="checkbox"
                name="enabled"
                checked={formValues.enabled}
                onChange={() =>
                  setFormValues((prev) => ({ ...prev, enabled: !prev.enabled }))
                }
                required
              />
              Run Until Paused
            </label>
          </div>
        </div>
      </div>
      {/* Submit */}
      <div className="d-flex justify-content-end mt-3 col-gap-15">
        <button
          type="cancel"
          className="btn btn-danger"
          onClick={() => {
            navigate("/offers");
          }}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-sty1" onClick={handleSubmit}>
          {editingOffer ? "Update Offer" : "Create Offer"}
        </button>
      </div>

      {/* Offer Preview Section */}
      <div className="left-form">
        <div
          className="offer-preview mt-4 box_sty1 col-md-4"
          style={{ backgroundColor: `#${formValues.backgroundColor}` }}
        >
          <h3>Offer Preview</h3>
          <div className="offer-card">
            <img
              src="product-image.jpg"
              alt="Product Image"
              className="product-image"
              style={{ color: `#${formValues.fontColor}` }}
            />
            <div
              className="offer-details "
              style={{ color: `#${formValues.fontColor}` }}
            >
              <h4>{formValues.offer}</h4>
              <p className="discount">
                {formValues.discountPercentage}% Discount
              </p>
              <p className="pricing">
                <span className="original-price">
                  Original Price ${formValues.minimumCartValue}
                </span>
                <br></br>
                <span className="discounted-price">
                  Discount Price $
                  {(
                    formValues.minimumCartValue -
                    (formValues.minimumCartValue *
                      formValues.discountPercentage) /
                      100
                  ).toFixed(2)}
                </span>
              </p>
            </div>
            <button
              className="add-button"
              style={{
                backgroundColor: `#${formValues.buttonColor}`,
                color: `#${formValues.buttonFontColor}`,
                "--hover-bg-color": `#${
                  formValues.buttonHoverColor || formValues.buttonColor
                }`,
              }}
            >
              Add it now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddOrEditOffer;
