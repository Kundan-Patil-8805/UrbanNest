const Property = require("../model/Property");
const fs = require("fs");

const { uploadOnCloudinary } = require("../utils/cloudinary.js")



// Fetch all property listings
const listings = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Error fetching properties', error: error.message });
    }
};

const add = async (req, res) => {
    try {
        const {
            property_type,
            society_name,
            city,
            location,
            bedroom_num,
            balcony_num,
            area,
            price_per_sqft,
            price,
            age,
            furnish,
            amenity_luxury,
            floor_num,
            latitude,
            longitude,
            total_floor,
            description,
            facing_direction,
            loan_availability,
            estimated_monthly_emi,
            maintenance_fees,
            property_tax,
            stamp_duty_registration_costs,
            nearest_schools,
            nearest_colleges,
            nearest_hospitals,
            nearest_markets,
            nearest_public_transport,
            nearest_restaurants,
            nearest_railway_stations,
            nearest_malls,
            swimming_pool,
            playground,
            rera_registration_number,
            visitor_parking,
            intercom_facility,
            power_backup,
            water_supply,
            pet_friendly,
            fire_safety_installed
        } = req.body;

        // Ensure an image file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Property image is required." });
        }

        // Upload image to Cloudinary
        const imageUpload = await uploadOnCloudinary(req.file.path); // Adjust utility as needed
        if (!imageUpload || !imageUpload.url) {
            throw new Error("Failed to upload property image.");
        }

        // Create a new property document
        const newProperty = new Property({
            property_type,
            society_name,
            city,
            location,
            bedroom_num,
            balcony_num,
            area,
            price_per_sqft,
            price,
            age,
            furnish,
            amenity_luxury,
            floor_num,
            latitude,
            longitude,
            total_floor,
            description,
            facing_direction,
            image: imageUpload.url, // Store Cloudinary URL
            loan_availability,
            estimated_monthly_emi,
            maintenance_fees,
            property_tax,
            stamp_duty_registration_costs,
            nearest_schools,
            nearest_colleges,
            nearest_hospitals,
            nearest_markets,
            nearest_public_transport,
            nearest_restaurants,
            nearest_railway_stations,
            nearest_malls,
            swimming_pool,
            playground,
            rera_registration_number,
            visitor_parking,
            intercom_facility,
            power_backup,
            water_supply,
            pet_friendly,
            fire_safety_installed
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
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({
            message: 'Property updated successfully',
            property: updatedProperty
        });
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({ message: 'Error updating property', error: error.message });
    }
};

// Show a specific property by ID
const show = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL params

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
        console.error('Error fetching property:', error);
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
    show
};