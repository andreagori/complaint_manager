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
    const complaints = await prisma.complaint.findMany(
      {include: {reviewedComplaints: true},
    });
    return complaints;
}

/* 
* Function to create a date without timezone issues
*/
function createDateFromString(dateString: string): Date {
  // Tomar la fecha string y crear una fecha local sin timezone issues
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month es 0-based en JavaScript
}

/* 
* Function to update a complaint
* returns the updated complaint object
*/
export async function updateComplaint(data: UpdateComplaintInput) {
  const { complaintId, status, dueDate, notes, userId } = data;

  // Primero actualizamos el complaint
  const complaint = await prisma.complaint.update({
    where: { complaint_Id: complaintId },
    data: {
      ...(status && { status }),
    },
  });

  // Si hay dueDate o notes, manejamos el ReviewedComplaint
  if (dueDate || notes || (status === "in_progress" || status === "closed")) {
    // Verificar si ya existe un ReviewedComplaint para este complaint y usuario
    const existingReview = await prisma.reviewedComplaint.findFirst({
      where: { 
        complaintId: complaintId, 
        userId: userId 
      },
    });

    if (existingReview) {
      // Actualizar el existente solo con los campos que se proporcionaron
      const updateData: { dueDate?: Date; notes?: string | null } = {};
      
      if (dueDate) {
        updateData.dueDate = createDateFromString(dueDate);
      }
      
      if (notes !== undefined) {
        updateData.notes = notes;
      }

      await prisma.reviewedComplaint.update({
        where: { reviewedComplaint_Id: existingReview.reviewedComplaint_Id },
        data: updateData,
      });
    } else {
      // Crear uno nuevo solo si se proporcionó dueDate o si el status requiere tracking
      if (dueDate || (status === "in_progress" || status === "closed")) {
        await prisma.reviewedComplaint.create({
          data: {
            complaintId,
            userId,
            dueDate: dueDate ? createDateFromString(dueDate) : new Date(),
            notes: notes || null,
          },
        });
      }
    }
  }

  // Retornar el complaint actualizado con sus reviewedComplaints
  const updatedComplaint = await prisma.complaint.findUnique({
    where: { complaint_Id: complaintId },
    include: { reviewedComplaints: true },
  });

  return updatedComplaint;
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