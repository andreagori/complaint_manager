// Service to create, retrieve, update, and delete complaints
import prisma from "@/lib/prisma";
import { createCustomer,getCustomerByEmail } from "./customerService";
import { CreateComplaintInput, UpdateComplaintInput } from "./types/types";

/* 
* Function to create a new complaint.
* Search for existing customer by name or email. If not found, create a new customer.
* returns the created complaint object
*/
export async function createComplaint(data: CreateComplaintInput)
{
    let customer = await getCustomerByEmail(data.customerEmail);
    if (!customer) {
    customer = await createCustomer({
      fullname: data.fullname,
      email: data.customerEmail,
    });
    
  }

  const complaint = await prisma.complaint.create({
    data: {
      title: data.title,
      body: data.body,
      customerId: customer.customer_Id,
    },
  });

  return complaint;
}

/* 
* Function to retrieve all complaints.
* returns the created complaint object
*/
export async function getAllComplaints() {
    const complaints = await prisma.complaint.findMany();
    return complaints;
}

/* 
* Function to update a complaint
* returns the updated complaint object
*/
export async function updateComplaint(data: UpdateComplaintInput) {
  const { complaintId, status, dueDate, notes, userId } = data;

  // Actualizamos los campos que lleguen
  const complaint = await prisma.complaint.update({
    where: { complaint_Id: complaintId },
    data: {
      ...(status && { status }),
    },
    include: { reviewedComplaints: true },
  });

  // Si status indica que debe haber ReviewedComplaint y no existe uno para este userId, creamos
  if ((status === "in_progress" || status === "closed")) {
    const existingReview = await prisma.reviewedComplaint.findFirst({
      where: { complaintId: complaintId, userId },
    });

    if (!existingReview) {
      await prisma.reviewedComplaint.create({
        data: {
          complaintId,
          userId,
          dueDate: dueDate ? new Date(dueDate) : new Date(),
          notes,
        },
      });
    }
  }

  return complaint;
}

/* 
* Function to add notes on complaint
* returns the updated complaint object
*/
export async function addReviewedNotes(reviewedComplaintId: number, notes: string) {
  return await prisma.reviewedComplaint.update({
    where: { reviewedComplaint_Id: reviewedComplaintId },
    data: { notes },
  });
}