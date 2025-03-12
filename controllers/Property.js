const Property = require("../model/Property");
const fs = require("fs");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

// Fetch all property listings
const listings = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Error fetching properties", error: error.message });
    }
};

// Add a new property
const add = async (req, res) => {
    try {
        const {
            property_type,
            society_name,
            city,
            location,
            description,
            area,
            price_per_sqft,
            price,
            bedroom_num,
            balcony_num,
            floor_num,
            total_floor,
            age,
            furnish,
            facing_direction,
            amenity_luxury,
            latitude,
            longitude,
            loan_availability,
            estimated_monthly_emi,
            maintenance_fees,
            property_tax,
            stamp_duty_registration_costs,
            nearest_school_name,
            nearest_school_distance,
            nearest_college_name,
            nearest_college_distance,
            nearest_hospital_name,
            nearest_hospital_distance,
            nearest_market_name,
            nearest_market_distance,
            nearest_public_transport_name,
            nearest_public_transport_distance,
            nearest_restaurant_name,
            nearest_restaurant_distance,
            nearest_railway_station_name,
            nearest_railway_station_distance,
            nearest_mall_name,
            nearest_mall_distance,
            swimming_pool,
            playground,
            visitor_parking,
            intercom_facility,
            power_backup,
            pet_friendly,
            fire_safety_installed,
            water_supply,
            rera_registration_number,
        } = req.body;

        // Ensure at least one image file is uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one property image is required." });
        }

        // Upload each image to Cloudinary
        const uploadedImages = [];
        for (const file of req.files) {
            const imageUpload = await uploadOnCloudinary(file.path);
            if (imageUpload && imageUpload.url) {
                uploadedImages.push(imageUpload.url);
            }
        }

        // Create a new property document
        const newProperty = new Property({
            property_type,
            society_name,
            city,
            location,
            description,
            area,
            price_per_sqft,
            price,
            bedroom_num,
            balcony_num,
            floor_num,
            total_floor,
            age,
            furnish,
            facing_direction,
            amenity_luxury,
            latitude,
            longitude,
            loan_availability,
            estimated_monthly_emi,
            maintenance_fees,
            property_tax,
            stamp_duty_registration_costs,
            nearest_school_name,
            nearest_school_distance,
            nearest_college_name,
            nearest_college_distance,
            nearest_hospital_name,
            nearest_hospital_distance,
            nearest_market_name,
            nearest_market_distance,
            nearest_public_transport_name,
            nearest_public_transport_distance,
            nearest_restaurant_name,
            nearest_restaurant_distance,
            nearest_railway_station_name,
            nearest_railway_station_distance,
            nearest_mall_name,
            nearest_mall_distance,
            swimming_pool,
            playground,
            visitor_parking,
            intercom_facility,
            power_backup,
            pet_friendly,
            fire_safety_installed,
            water_supply,
            rera_registration_number,
            images: uploadedImages, // Save all uploaded image URLs
        });

        // Save to the database
        const savedProperty = await newProperty.save();

        // Respond with success
        res.status(201).json({
            message: "Property created successfully.",
            property: savedProperty,
        });
    } catch (error) {
        console.error("Error creating property:", error);
        res.status(500).json({
            message: "Error creating property.",
            error: error.message,
        });
    }
};
// Edit an existing property
const edit = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const updatedData = req.body;

        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json({
            message: "Property updated successfully",
            property: updatedProperty,
        });
    } catch (error) {
        console.error("Error updating property:", error);
        res.status(500).json({ message: "Error updating property", error: error.message });
    }
};

// Show a specific property by ID
const show = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the property by ID
        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ message: "Property not found." });
        }

        // Return the property data
        return res.status(200).json({
            message: "Property fetched successfully!",
            property,
        });
    } catch (error) {
        console.error("Error fetching property:", error);
        return res.status(500).json({
            message: "An error occurred while fetching the property.",
            error: error.message,
        });
    }
};

// Export all functions
module.exports = {
    listings,
    add,
    edit,
    show,
};
