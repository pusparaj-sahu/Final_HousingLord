import { patch, fetch } from "../utils/sanityClient";
import sendApprovalEmail from "../services/emailService";

const approveProperty = async (req, res) => {
  const { propertyId, adminName } = req.body;

  try {
    // First, fetch the property to get owner information
    const property = await fetch(`*[_id == "${propertyId}"][0]{
      title,
      "ownerEmail": owner->email,
      "ownerName": owner->name
    }`);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Update the property status to approved
    await patch(propertyId)
      .set({ 
        approved: true,
        approvalDetails: {
          approvedBy: adminName || "Admin",
          approvedAt: new Date().toISOString(),
          approvalSource: "dashboard"
        }
      })
      .commit();

    // Send email notification to the owner
    if (property.ownerEmail) {
      await sendApprovalEmail(
        property.ownerEmail, 
        {
          propertyTitle: property.title,
          ownerName: property.ownerName || "Property Owner",
          approvalDate: new Date().toLocaleString(),
          dashboardLink: `${process.env.CLIENT_URL}/dashboard`
        }
      );
      
      return res.status(200).json({ 
        message: "Property approved and notification email sent to owner." 
      });
    } else {
      return res.status(200).json({ 
        message: "Property approved but couldn't send notification (owner email not found)." 
      });
    }
  } catch (err) {
    console.error("Property approval error:", err);
    return res.status(500).json({ 
      error: "Approval process failed", 
      details: err.message 
    });
  }
};

// Add a function to get pending properties for admin dashboard
const getPendingProperties = async (req, res) => {
  try {
    const pendingProperties = await fetch(`*[_type == "property" && approved == false]{
      _id,
      title,
      description,
      price,
      images,
      "owner": owner->{name, email},
      location->{city, state, country, approved}
    }`);
    
    return res.status(200).json(pendingProperties);
  } catch (err) {
    console.error("Error fetching pending properties:", err);
    return res.status(500).json({ 
      error: "Failed to fetch pending properties", 
      details: err.message 
    });
  }
};

export default { approveProperty, getPendingProperties };