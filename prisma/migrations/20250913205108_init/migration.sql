-- CreateTable
CREATE TABLE "public"."User" (
    "user_Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_Id")
);

-- CreateTable
CREATE TABLE "public"."Customer" (
    "customer_Id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_Id")
);

-- CreateTable
CREATE TABLE "public"."Complaint" (
    "complaint_Id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("complaint_Id")
);

-- CreateTable
CREATE TABLE "public"."ReviewedComplaint" (
    "reviewedComplaint_Id" SERIAL NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "complaintId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ReviewedComplaint_pkey" PRIMARY KEY ("reviewedComplaint_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "public"."Customer"("email");

-- AddForeignKey
ALTER TABLE "public"."Complaint" ADD CONSTRAINT "Complaint_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("customer_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReviewedComplaint" ADD CONSTRAINT "ReviewedComplaint_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "public"."Complaint"("complaint_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReviewedComplaint" ADD CONSTRAINT "ReviewedComplaint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
