import { patch } from "../utils/sanityClient";
import sendApprovalEmail from "../services/emailService";

const approveProperty = async (req, res) => {
  const { propertyId } = req.body;

  try {
    const property = await patch(propertyId)
      .set({ status: "approved" })
      .commit();

    const { ownerEmail, title } = property;

    await sendApprovalEmail(ownerEmail, title);

    res.status(200).json({ message: "Approved and notification sent." });
  } catch (err) {
    res.status(500).json({ error: "Approval failed", details: err.message });
  }
};

export default { approveProperty };
