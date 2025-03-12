const mongoose = require("mongoose");

// Define the nearestSchema first
const nearestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
}, { _id: false });

// Define the propertySchema
const propertySchema = new mongoose.Schema(
    {
        property_type: {
            type: String,
            required: true,
        },
        society_name: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        bedroom_num: {
            type: Number,
            required: true,
        },
        balcony_num: {
            type: Number,
            required: true,
        },
        area: {
            type: Number,
            required: true,
        },
        price_per_sqft: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        furnish: {
            type: String,
            required: true,
        },
        amenity_luxury: {
            type: String, 
            required: true,
        },
        floor_num: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        total_floor: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        facing_direction: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        loan_availability: {
            type: Boolean,
            required: true,
        },
        estimated_monthly_emi: {
            type: Number,
            required: true,
        },
        maintenance_fees: {
            type: Number,
            required: true,
        },
        property_tax: {
            type: Number,
            required: true,
        },
        stamp_duty_registration_costs: {
            type: Number,
            required: true,
        },
        nearest_schools: {
            type: [nearestSchema],
            default: [],
        },
        nearest_colleges: {
            type: [nearestSchema], 
            default: [],
        },
        nearest_hospitals: {
            type: [nearestSchema], 
            default: [],
        },
        nearest_markets: {
            type: [nearestSchema], 
            default: [],
        },
        nearest_public_transport: {
            type: [nearestSchema], 
            default: [],
        },
        nearest_restaurants: {
            type: [nearestSchema],
            default: [],
        },
        nearest_railway_stations: {
            type: [nearestSchema], 
            default: [],
        },
        nearest_malls: {
            type: [nearestSchema],
            default: [],
        },
        swimming_pool: {
            type: Boolean,
            required: true,
        },
        playground: {
            type: Boolean,
            required: true,
        },
        rera_registration_number: {
            type: Number,
            required: true,
        },
        visitor_parking: {
            type: Boolean,
            required: true,
        },
        intercom_facility: {
            type: Boolean,
            required: true,
        },
        power_backup: {
            type: Boolean,
            required: true,
        },
        water_supply: {
            type: String,
            required: true,
        },
        pet_friendly: {
            type: Boolean,
            required: true,
        },
        fire_safety_installed: {
            type: Boolean,
            required: true,
        },
    });

// Create the Property model
const Property = mongoose.model("Property", propertySchema);

// Export the Property model
module.exports = Property;