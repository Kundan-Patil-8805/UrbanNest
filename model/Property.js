const mongoose = require("mongoose");

// Define the propertySchema
const propertySchema = new mongoose.Schema(
    {
        property_type: { type: String, required: true },
        society_name: { type: String, required: true },
        city: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, default: "" },
        area: { type: Number, required: true },
        price_per_sqft: { type: Number },
        price: { type: Number, required: true },
        bedroom_num: { type: Number, required: true },
        balcony_num: { type: Number, default: 0 },
        floor_num: { type: Number, default: 1 },
        total_floor: { type: Number, required: true },
        age: { type: String, default: "New" },
        furnish: { type: String, default: "Unfurnished" },
        facing_direction: { type: String, default: "East" },
        amenity_luxury: { type: String },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        loan_availability: { type: Boolean, default: false },
        estimated_monthly_emi: { type: Number },
        maintenance_fees: { type: Number, default: 0 },
        property_tax: { type: Number, default: 0 },
        stamp_duty_registration_costs: { type: Number, default: 0 },
        nearest_school_name: { type: String },
        nearest_school_distance: { type: Number },
        nearest_college_name: { type: String },
        nearest_college_distance: { type: Number },
        nearest_hospital_name: { type: String },
        nearest_hospital_distance: { type: Number },
        nearest_market_name: { type: String },
        nearest_market_distance: { type: Number },
        nearest_public_transport_name: { type: String },
        nearest_public_transport_distance: { type: Number },
        nearest_restaurant_name: { type: String },
        nearest_restaurant_distance: { type: Number },
        nearest_railway_station_name: { type: String },
        nearest_railway_station_distance: { type: Number },
        nearest_mall_name: { type: String },
        nearest_mall_distance: { type: Number },
        swimming_pool: { type: Boolean, default: false },
        playground: { type: Boolean, default: false },
        visitor_parking: { type: Boolean, default: false },
        intercom_facility: { type: Boolean, default: false },
        power_backup: { type: Boolean, default: false },
        pet_friendly: { type: Boolean, default: false },
        fire_safety_installed: { type: Boolean, default: false },
        water_supply: { type: String, default: "24/7" },
        rera_registration_number: { type: String },
        images: { type: [String], default: [] },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create the Property model
const Property = mongoose.model("Property", propertySchema);

// Export the Property model
module.exports = Property;
